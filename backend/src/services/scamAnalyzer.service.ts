import type { ScanInput } from "../schemas/scan.schema";

type RiskLevel = "low" | "medium" | "high";
type SignalSeverity = "low" | "medium" | "high";

interface RiskSignal {
  id: string;
  title: string;
  description: string;
  severity: SignalSeverity;
  points: number;
}

interface ScanAnalysis {
  riskScore: number;
  riskLevel: RiskLevel;
  verdict: string;
  signals: RiskSignal[];
  recommendations: string[];
  limitations: string[];
  analyzedAt: string;
}

interface DetectionRule {
  id: string;
  title: string;
  description: string;
  severity: SignalSeverity;
  points: number;
  patterns: RegExp[];
  types?: ScanInput["type"][];
}

/**
 * ScamShield rule-based analyzer.
 *
 * This engine detects suspicious language and URL patterns. It is not an
 * AI model, does not verify a sender's identity, and does not query live
 * domain/phone reputation services.
 */

const normalizeText = (value: string): string =>
  value
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[₹]/g, " rs ")
    .replace(/\s+/g, " ")
    .trim();

const addSignal = (signals: RiskSignal[], signal: RiskSignal): void => {
  if (!signals.some((item) => item.id === signal.id)) {
    signals.push(signal);
  }
};

/**
 * Avoid treating clear safety warnings as requests.
 * Example: "Never share your OTP with anyone."
 *
 * This is intentionally conservative: quoted scam messages such as
 * "The caller told me to share my OTP" should still be detected.
 */
const isClearlyNegated = (text: string, matchIndex: number): boolean => {
  const precedingText = text.slice(Math.max(0, matchIndex - 75), matchIndex);

  return /(?:\bdo not\b|\bdon't\b|\bnever\b|\bnever ever\b|\bmust not\b|\bshould not\b|\bshouldn't\b|\bavoid\b|\bwithout\b|\bnot to\b)\s+(?:\w+\s+){0,4}$/i.test(
    precedingText
  );
};

const findPositiveMatch = (
  text: string,
  patterns: RegExp[]
): RegExpExecArray | null => {
  for (const pattern of patterns) {
    const flags = pattern.flags.includes("g") ? pattern.flags : `${pattern.flags}g`;
    const matcher = new RegExp(pattern.source, flags);
    let match: RegExpExecArray | null;

    while ((match = matcher.exec(text)) !== null) {
      if (!isClearlyNegated(text, match.index)) {
        return match;
      }

      // Prevent an infinite loop if a future rule contains a zero-width match.
      if (match[0].length === 0) matcher.lastIndex += 1;
    }
  }
  return null;
};

const rules: DetectionRule[] = [
  {
    id: "credential-request",
    title: "Sensitive information requested",
    description:
      "The content appears to ask for an OTP, PIN, password, CVV or other authentication secret. Legitimate organizations should not ask you to disclose these secrets.",
    severity: "high",
    points: 38,
    patterns: [
      /\b(?:share|send|tell|provide|give|forward|reveal|submit|enter|confirm)\s+(?:me\s+|us\s+|the\s+|your\s+|the\s+received\s+)?(?:your\s+)?(?:otp|one[\s-]?time password|verification code|security code|upi pin|atm pin|debit card pin|credit card pin|cvv|cvc|card number|banking password|net banking password|account password)\b/i,
      /\b(?:otp|one[\s-]?time password|verification code|upi pin|atm pin|cvv|cvc)\b.{0,45}\b(?:share|send|tell|provide|give|forward|reveal|enter|submit)\b/i,
      /\b(?:enter|type|input)\s+(?:your\s+)?(?:upi\s+)?pin\s+to\s+(?:receive|get|accept|unlock)\s+(?:money|payment|funds)\b/i,
      /\b(?:tell|read out|dictate)\s+(?:the\s+)?(?:otp|verification code|pin)\b/i,
      /\b(?:we need|需要)\s+(?:your\s+)?(?:otp|pin|password|cvv)\b/i
    ]
  },
  {
    id: "upi-collect-fraud",
    title: "Potential UPI collect or payment-request fraud",
    description:
      "The content describes a UPI collect request, QR-code payment or PIN entry in a way that may trick someone into sending money instead of receiving it.",
    severity: "high",
    points: 34,
    patterns: [
      /\b(?:scan|send|open)\s+(?:this\s+)?(?:upi\s+)?qr\s+code\b/i,
      /\b(?:approve|accept|authorize)\s+(?:the\s+)?(?:upi\s+)?(?:collect|payment)\s+request\b/i,
      /\b(?:enter|type)\s+(?:your\s+)?upi\s+pin\s+to\s+(?:receive|get|accept)\s+(?:money|payment|refund|cash)\b/i,
      /\b(?:receive|get)\s+(?:the\s+)?payment\b.{0,55}\b(?:upi pin|collect request|qr code)\b/i,
      /\b(?:payment|money|refund)\b.{0,55}\b(?:approve|collect request|upi pin)\b/i
    ]
  },
  {
    id: "digital-arrest-threat",
    title: "Digital arrest or law-enforcement intimidation",
    description:
      "The content uses threats of arrest, remote surveillance or fabricated legal action to pressure the recipient. Verify any legal claim independently.",
    severity: "high",
    points: 42,
    patterns: [
      /\bdigital arrest\b/i,
      /\b(?:you are|you have been|your name is)\s+(?:under\s+)?(?:investigation|surveillance)\b/i,
      /\b(?:police|cbi|ed|customs|narcotics|crime branch)\b.{0,65}\b(?:arrest|video call|investigation|case|custody)\b/i,
      /\b(?:arrest warrant|money laundering case|terror funding case|criminal parcel)\b/i,
      /\b(?:stay on|remain on)\s+(?:the\s+)?video call\b.{0,50}\b(?:police|investigation|arrest)\b/i
    ]
  },
  {
    id: "urgency-pressure",
    title: "Urgency and pressure tactics",
    description:
      "The content pressures the recipient to act quickly, reducing the opportunity to independently verify the request.",
    severity: "medium",
    points: 12,
    patterns: [
      /\b(?:act now|immediately|urgent|urgently|within\s+\d+\s*(?:minutes?|hours?|days?)|limited time|expires today|last chance|hurry|without delay|right away|today only)\b/i,
      /\b(?:account|card|connection|service|sim)\b.{0,45}\b(?:block|blocked|suspend|suspended|deactivat\w*)\b.{0,35}\b(?:today|now|immediately|hours?|minutes?)\b/i,
      /\b(?:final warning|final notice|last reminder|time is running out)\b/i
    ]
  },
  {
    id: "prize-claim",
    title: "Unexpected prize or reward claim",
    description:
      "The content claims an unexpected prize, lottery, cashback or reward. Unexpected winnings that require fees or sensitive details are especially suspicious.",
    severity: "high",
    points: 25,
    patterns: [
      /\b(?:you have won|you've won|winner selected|claim your prize|free reward|cash prize|lottery winner|lucky draw|selected for (?:a|the) reward|congratulations.{0,50}(?:won|prize|reward|cashback))\b/i,
      /\b(?:won|winning|winner)\b.{0,45}\b(?:prize|lottery|cash|reward|gift|draw)\b/i,
      /\b(?:claim|collect)\s+(?:your\s+)?(?:gift|reward|cashback|prize|bonus)\b/i
    ]
  },
  {
    id: "payment-request",
    title: "Potentially suspicious payment request",
    description:
      "The content requests money, a fee, a deposit or a transfer. Payment requests should be independently verified, especially when paired with urgency or unusual promises.",
    severity: "medium",
    points: 20,
    patterns: [
      /\b(?:pay|send|transfer|deposit)\s+(?:only\s+)?(?:rs\.?\s*)?(?:₹\s*)?\d[\d,.]*(?:\s*(?:rs|rupees|inr))?\b/i,
      /\b(?:pay|send|transfer)\s+(?:a|the|an|your)\s+(?:fee|amount|deposit|charge|token|advance)\b/i,
      /\b(?:registration fee|processing fee|advance payment|send money|transfer money|pay immediately|gift card|payment required|deposit money|refundable fee|security fee|release fee)\b/i,
      /\b(?:pay|transfer|deposit)\b.{0,45}\b(?:to claim|to receive|to release|to activate|to verify|to avoid|to secure)\b/i
    ]
  },
  {
    id: "personal-data-request",
    title: "Request for sensitive identity or financial information",
    description:
      "The content appears to request identity or financial information such as Aadhaar, PAN, bank details or a full card number. Share such information only through a verified official channel when necessary.",
    severity: "high",
    points: 26,
    patterns: [
      /\b(?:send|share|provide|upload|submit|tell|give)\s+(?:your\s+)?(?:aadhaar|aadhar|pan card|pan number|identity proof|id proof|bank details|account number|debit card number|credit card number)\b/i,
      /\b(?:aadhaar|aadhar|pan|bank details|account number)\b.{0,45}\b(?:send|share|provide|upload|submit|give)\b/i
    ]
  },
  {
    id: "remote-access",
    title: "Remote access or screen-sharing request",
    description:
      "The content mentions remote-access software or screen sharing. Untrusted remote access can expose banking apps, passwords and personal information.",
    severity: "high",
    points: 32,
    patterns: [
      /\b(?:anydesk|teamviewer|ultraviewer|rustdesk|remote access|screen sharing|share your screen|install remote app)\b/i,
      /\b(?:install|download)\b.{0,45}\b(?:remote support|screen sharing|remote access|anydesk|teamviewer)\b/i,
      /\b(?:give|grant|allow)\s+(?:me\s+)?remote access\b/i
    ]
  },
  {
    id: "authority-impersonation",
    title: "Possible authority or organization impersonation",
    description:
      "The content invokes a bank, government department, police or other authority in a way that may be intended to create trust or fear.",
    severity: "medium",
    points: 18,
    patterns: [
      /\b(?:bank official|government officer|police officer|income tax department|customs officer|cbi officer|rbi official)\b/i,
      /\b(?:your account|your kyc|your pan|your aadhaar|your sim)\b.{0,50}\b(?:blocked|blocked today|suspended|expired|deactivated|frozen)\b/i,
      /\b(?:kyc|know your customer)\b.{0,50}\b(?:update|expire|suspend|block|verify)\b/i,
      /\b(?:pretending to be|impersonat\w*|fake officer|official from the bank)\b/i
    ]
  },
  {
    id: "kyc-phishing",
    title: "Potential KYC or account-verification phishing",
    description:
      "The content uses KYC or account verification as a reason to request action. Verify through the bank's official app or website rather than a message link.",
    severity: "high",
    points: 28,
    patterns: [
      /\b(?:kyc|re-kyc|e-kyc)\b.{0,65}\b(?:update|verify|complete|link|click|suspend|block|expire)\b/i,
      /\b(?:update|verify|complete)\b.{0,45}\b(?:kyc|aadhaar|pan|bank account)\b/i,
      /\b(?:bank account|wallet|sim card)\b.{0,50}\b(?:will be|is being|has been)\s*(?:blocked|suspended|deactivated)\b/i
    ]
  },
  {
    id: "courier-scam",
    title: "Potential courier, parcel or customs-fee scam",
    description:
      "The content mentions a parcel problem, delivery hold or small release fee. Verify directly with the courier using its official tracking service.",
    severity: "medium",
    points: 24,
    patterns: [
      /\b(?:parcel|package|courier|shipment|delivery)\b.{0,70}\b(?:held|blocked|stuck|customs|address issue|failed|pending|release fee|redelivery)\b/i,
      /\b(?:pay|clear|release)\b.{0,45}\b(?:customs fee|delivery fee|parcel fee|redelivery charge|courier charge|insurance fee)\b/i,
      /\b(?:courier|parcel|delivery)\b.{0,55}\b(?:insurance fee|insurance charge|release fee|customs fee)\b/i,
      /\b(?:small fee|₹?\s*\d+\s*(?:rs|rupees)?)\b.{0,50}\b(?:parcel|courier|delivery|customs)\b/i
    ]
  },
  {
    id: "investment-scam",
    title: "Potential investment or guaranteed-return scam",
    description:
      "The content promises unusually high or guaranteed investment returns, trading profits or risk-free earnings. Such claims require careful independent verification.",
    severity: "high",
    points: 30,
    patterns: [
      /\b(?:guaranteed|fixed|assured)\s+(?:daily\s+|weekly\s+|monthly\s+)?returns?\b/i,
      /\b(?:double|triple)\s+(?:your\s+)?money\b/i,
      /\b(?:earn|make)\s+\d+\s*%?\s*(?:profit|returns?)\s*(?:daily|weekly|monthly)?\b/i,
      /\b(?:risk[- ]free|no risk)\b.{0,35}\b(?:investment|trading|profit|returns?)\b/i,
      /\b(?:crypto|forex|stock market|trading)\b.{0,55}\b(?:guaranteed profit|fixed returns|double your money)\b/i
    ]
  },
  {
    id: "loan-fee-scam",
    title: "Potential upfront-fee loan scam",
    description:
      "The content appears to request a fee before a loan is released or approved. Verify the lender and all charges through regulated, official channels.",
    severity: "high",
    points: 27,
    patterns: [
      /\b(?:loan|credit)\b.{0,55}\b(?:processing fee|insurance fee|release fee|advance fee|pay first|upfront payment)\b/i,
      /\b(?:pay|send|deposit)\b.{0,45}\b(?:to approve|to release|to get)\s+(?:your\s+)?loan\b/i,
      /\b(?:instant loan|guaranteed loan)\b.{0,55}\b(?:fee|deposit|advance payment)\b/i
    ]
  },
  {
    id: "task-scam",
    title: "Potential task or rating scam",
    description:
      "The content describes simple online tasks or ratings with unusually high pay, potentially followed by deposits or recharge requirements.",
    severity: "high",
    points: 27,
    patterns: [
      /\b(?:like|rate|review|subscribe|follow)\b.{0,55}\b(?:earn|₹|rupees|daily income|commission)\b/i,
      /\b(?:task|prepaid task|merchant task|recharge task)\b.{0,55}\b(?:deposit|recharge|top up|unlock|commission)\b/i,
      /\b(?:complete|finish)\s+\d+\s+(?:tasks|orders|reviews)\b.{0,55}\b(?:payment|commission|earn)\b/i
    ]
  }
];

const typeSpecificRules: DetectionRule[] = [
  {
    id: "unrealistic-job-income",
    title: "Potentially unrealistic job income promise",
    description:
      "The job offer promises unusually high or guaranteed earnings with little apparent qualification or effort.",
    severity: "medium",
    points: 20,
    types: ["job"],
    patterns: [
      /\b(?:earn|make)\s+(?:rs\.?\s*)?(?:₹\s*)?\d[\d,.]*\s*(?:daily|per day|a day|every day)\b/i,
      /\b(?:guaranteed income|easy money|no experience required.{0,40}(?:high salary|high income)|work from home.{0,50}(?:daily income|earn))\b/i,
      /\b(?:part time|work from home)\b.{0,55}\b(?:earn|salary|income)\b.{0,30}\b(?:daily|per day|weekly)\b/i
    ]
  },
  {
    id: "job-payment",
    title: "Payment requested for employment",
    description:
      "The offer appears to request money as a condition of getting a job, interview, training or offer letter.",
    severity: "high",
    points: 32,
    types: ["job"],
    patterns: [
      /\b(?:job|employment|interview|joining|training|offer letter)\b.{0,55}\b(?:fee|deposit|payment|charge|registration amount)\b/i,
      /\b(?:pay|send|deposit)\b.{0,45}\b(?:to get hired|to secure the job|for interview|for offer letter|for joining)\b/i,
      /\b(?:job fee|interview fee|training fee|security deposit|pay to get hired|registration payment)\b/i
    ]
  },
  {
    id: "marketplace-payment",
    title: "Potentially unsafe marketplace payment",
    description:
      "The buyer or seller appears to request advance or off-platform payment. Use the marketplace's protected payment process where available.",
    severity: "high",
    points: 28,
    types: ["marketplace"],
    patterns: [
      /\b(?:pay outside the platform|direct bank transfer|advance before delivery|send advance|pay token amount|off-platform payment)\b/i,
      /\b(?:i will send|sending)\b.{0,40}\b(?:courier|delivery agent|army|defence|security)\b.{0,55}\b(?:qr|upi|payment|advance|refund|insurance fee)\b/i,
      /\b(?:pay|send)\b.{0,35}\b(?:insurance fee|courier fee|release fee)\b/i,
      /\b(?:scan|share)\b.{0,35}\b(?:qr code|upi id)\b.{0,45}\b(?:receive|release|get)\s+(?:the\s+)?payment\b/i,
      /\b(?:pay|send)\b.{0,35}\b(?:token amount|booking amount|advance)\b.{0,45}\b(?:before|prior to)\b.{0,25}\b(?:inspection|delivery|dispatch)\b/i
    ]
  }
];

const detectRule = (
  text: string,
  rule: DetectionRule,
  signals: RiskSignal[]
): void => {
  if (findPositiveMatch(text, rule.patterns)) {
    addSignal(signals, {
      id: rule.id,
      title: rule.title,
      description: rule.description,
      severity: rule.severity,
      points: rule.points
    });
  }
};

const extractUrls = (content: string): string[] => {
  const matches =
    content.match(
      /(?:https?:\/\/|www\.)[^\s<>"']+|\b(?:[a-z0-9-]+\.)+(?:com|in|net|org|co|io|gov|edu|biz|info|app|site|online|store|xyz)(?:\/[^\s<>"']*)?/gi
    ) || [];

  return [...new Set(matches.map((item) => item.replace(/[),.;!?]+$/g, "")))];
};

const isValidIpv4 = (hostname: string): boolean => {
  const parts = hostname.split(".");
  return (
    parts.length === 4 &&
    parts.every((part) => /^\d{1,3}$/.test(part) && Number(part) >= 0 && Number(part) <= 255)
  );
};

const analyzeUrls = (content: string, signals: RiskSignal[]): void => {
  const shortenerDomains = [
    "bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "rb.gy",
    "ow.ly", "buff.ly", "shorturl.at", "rebrand.ly"
  ];

  for (const rawUrl of extractUrls(content)) {
    // Avoid interpreting an email address as a website URL.
    const rawIndex = content.indexOf(rawUrl);
    if (rawIndex > 0 && content[rawIndex - 1] === "@") continue;

    try {
      const candidate = /^https?:\/\//i.test(rawUrl)
        ? rawUrl
        : `https://${rawUrl.replace(/^www\./i, "www.")}`;

      const parsed = new URL(candidate);
      const hostname = parsed.hostname.toLowerCase().replace(/\.$/, "");

      if (parsed.protocol === "http:") {
        addSignal(signals, {
          id: "insecure-link",
          title: "Unencrypted website connection",
          description:
            "The URL uses HTTP rather than HTTPS. This is a security weakness, but does not by itself prove that the website is fraudulent.",
          severity: "low",
          points: 5
        });
      }

      if (shortenerDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))) {
        addSignal(signals, {
          id: "shortened-link",
          title: "Shortened URL detected",
          description:
            "The link uses a URL-shortening service that obscures its final destination. Check the destination independently before opening it.",
          severity: "medium",
          points: 16
        });
      }

      if (hostname.includes("xn--")) {
        addSignal(signals, {
          id: "punycode-domain",
          title: "Internationalized domain encoding detected",
          description:
            "The domain contains punycode encoding. This can be legitimate, but can also be used in lookalike-domain attacks.",
          severity: "high",
          points: 25
        });
      }

      if (isValidIpv4(hostname)) {
        addSignal(signals, {
          id: "ip-address-link",
          title: "Website link uses an IP address",
          description:
            "The URL points directly to an IPv4 address rather than a conventional domain. Verify the destination before interacting with it.",
          severity: "high",
          points: 24
        });
      }

      if (/@|%40/i.test(parsed.username + parsed.password)) {
        addSignal(signals, {
          id: "url-userinfo",
          title: "URL contains embedded login information",
          description:
            "The URL contains user-information fields that can be used to make a deceptive destination appear trustworthy.",
          severity: "high",
          points: 25
        });
      }

      const suspiciousHostPattern =
        /(?:^|[.-])(?:secure|verify|verification|login|account|banking|wallet|claim|reward|kyc|update|support|customer-care)(?:[.-]|$)/i;

      if (suspiciousHostPattern.test(hostname)) {
        addSignal(signals, {
          id: "suspicious-domain-words",
          title: "Potentially deceptive domain wording",
          description:
            "The hostname contains terms often used in account, banking or reward-themed lures. These words alone do not establish that a domain is malicious.",
          severity: "low",
          points: 7
        });
      }

      if (/(?:login|signin|verify|kyc|password|otp|wallet|payment|claim|update)/i.test(parsed.pathname + parsed.search)) {
        addSignal(signals, {
          id: "sensitive-url-path",
          title: "Link leads to a sensitive-action page",
          description:
            "The URL path or query refers to login, verification, payment or account actions. Confirm the domain independently before entering information.",
          severity: "low",
          points: 6
        });
      }
    } catch {
      // Invalid or incomplete URL-like text is not scored as a parsed URL.
    }
  }
};

const calculateRisk = (signals: RiskSignal[]): number => {
  let score = signals.reduce((total, signal) => total + signal.points, 0);

  const ids = new Set(signals.map((signal) => signal.id));

  // Combinations are more concerning than isolated weak indicators.
  if (ids.has("credential-request") && (ids.has("urgency-pressure") || ids.has("authority-impersonation"))) {
    score += 10;
  }

  if (ids.has("payment-request") && (ids.has("prize-claim") || ids.has("unrealistic-job-income") || ids.has("job-payment"))) {
    score += 8;
  }

  if (ids.has("shortened-link") && (ids.has("credential-request") || ids.has("prize-claim") || ids.has("kyc-phishing"))) {
    score += 10;
  }

  if (ids.has("remote-access") && (ids.has("authority-impersonation") || ids.has("credential-request"))) {
    score += 10;
  }

  return Math.min(100, score);
};

const buildRecommendations = (signals: RiskSignal[]): string[] => {
  const ids = new Set(signals.map((signal) => signal.id));
  const recommendations = new Set<string>();

  recommendations.add("Verify the sender or organization using contact details from its independently located official website or app.");
  recommendations.add("Do not share OTPs, passwords, PINs, CVV numbers or recovery codes with anyone.");

  if (ids.has("credential-request") || ids.has("upi-collect-fraud")) {
    recommendations.add("Never enter a UPI PIN to receive money. A UPI PIN authorizes a payment from your account.");
  }

  if (ids.has("payment-request") || ids.has("job-payment") || ids.has("marketplace-payment") || ids.has("loan-fee-scam")) {
    recommendations.add("Do not pay advance, registration, release or verification fees until the organization and payment request are independently verified.");
  }

  if (ids.has("digital-arrest-threat") || ids.has("authority-impersonation")) {
    recommendations.add("Do not transfer money because someone threatens arrest or claims to be an investigating officer. Contact the relevant authority independently.");
  }

  if (ids.has("remote-access")) {
    recommendations.add("Do not install remote-access apps or share your screen with an unsolicited caller.");
  }

  if (ids.has("shortened-link") || ids.has("suspicious-domain-words") || ids.has("punycode-domain") || ids.has("ip-address-link") || ids.has("sensitive-url-path")) {
    recommendations.add("Do not open suspicious links. Visit the organization's official website by typing its known address yourself.");
  }

  if (ids.has("courier-scam")) {
    recommendations.add("Check parcel status using the tracking number on the courier's official website or app.");
  }

  if (ids.has("investment-scam")) {
    recommendations.add("Treat guaranteed or unusually high returns as a warning sign and verify the entity and registration with the relevant regulator.");
  }

  if (ids.has("prize-claim")) {
    recommendations.add("Do not pay a fee or disclose personal or banking information to claim an unexpected prize.");
  }

  return [...recommendations];
};

export const analyzeScam = (input: ScanInput): ScanAnalysis => {
  const content = input.content;
  const normalized = normalizeText(content);
  const signals: RiskSignal[] = [];

  // A number alone cannot be reputation-checked by text-pattern rules.
  if (input.type === "phone") {
    return {
      riskScore: 0,
      riskLevel: "low",
      verdict: "Unknown — there is not enough information to assess this phone number. A low score does not mean the number is safe.",
      signals: [],
      recommendations: [
        "Do not assume the number is legitimate based on its appearance or caller ID.",
        "Do not share OTPs, passwords, PINs or banking details.",
        "Verify the caller independently using the organization's official contact number.",
        "For a more useful assessment, analyze the message or describe what the caller asked you to do."
      ],
      limitations: [
        "This version does not access live phone-number reputation databases or caller-identification services.",
        "A phone number alone cannot establish whether its owner is trustworthy.",
        "The assessment is unknown, not a finding that the number is safe."
      ],
      analyzedAt: new Date().toISOString()
    };
  }

  for (const rule of rules) {
    detectRule(normalized, rule, signals);
  }

  for (const rule of typeSpecificRules) {
    if (rule.types?.includes(input.type)) {
      detectRule(normalized, rule, signals);
    }
  }

  // Analyze links in all content types, not only when the input is URL.
  if (input.type === "url" || extractUrls(content).length > 0) {
    analyzeUrls(content, signals);
  }

  const riskScore = calculateRisk(signals);

  let riskLevel: RiskLevel = "low";
  let verdict = "No strong scam indicators were detected. This does not guarantee that the content is safe.";

  if (riskScore >= 60) {
    riskLevel = "high";
    verdict = "Multiple or strong scam warning signs were detected. Do not act until you independently verify the request.";
  } else if (riskScore >= 25) {
    riskLevel = "medium";
    verdict = "Some suspicious patterns were detected. Verify the sender, request and any links independently before taking action.";
  } else if (signals.length > 0) {
    verdict = "A few warning signs were detected. These do not prove fraud, but the content deserves caution and independent verification.";
  }

  const recommendations = buildRecommendations(signals);

  return {
    riskScore,
    riskLevel,
    verdict,
    signals,
    recommendations,
    limitations: [
      "This is a rule-based preliminary assessment, not a definitive scam determination or a probability of fraud.",
      "The engine does not currently check live domain reputation, phone-number databases, sender identity or external fraud reports.",
      "Scam wording changes frequently. A scam may avoid known patterns, and legitimate content may contain suspicious-looking words.",
      "A low score or no detected signals does not guarantee that the content, sender, phone number or website is safe."
    ],
    analyzedAt: new Date().toISOString()
  };
};
