// Production Documents Data for Jan-Vani

export const DOCUMENTS_DATA = [
  {
    id: "bank-loan-notice",
    title: {
      en: "Bank Loan Overdue Notice",
      te: "బ్యాంకు రుణం గడువు తీరిన నోటీసు",
      hi: "बैंक ऋण बकाया नोटिस"
    },
    category: {
      en: "Bank notice",
      te: "బ్యాంకు నోటీసు",
      hi: "बैंक नोटिस"
    },
    urgency: {
      en: "HIGH URGENCY",
      te: "అత్యవసరం",
      hi: "उच्च प्राथमिकता"
    },
    urgencyColor: "bg-red-500 text-white",
    categoryColor: "bg-0284c7 bg-blue-600 text-white",
    
    // Quick highlight pills matching user image design
    pills: {
      en: [
        { label: "Deadline", value: "15 Oct 2026", color: "bg-amber-500 text-white" },
        { label: "Amount", value: "Rs 4,500", color: "bg-blue-600 text-white" },
        { label: "Security", value: "No red flags found", color: "bg-teal-600 text-white" }
      ],
      te: [
        { label: "గడువు తేదీ", value: "15 అక్టోబర్ 2026", color: "bg-amber-500 text-white" },
        { label: "మొత్తం", value: "రూ. 4,500", color: "bg-blue-600 text-white" },
        { label: "భద్రత", value: "ఎలాంటి సమస్యలు లేవు", color: "bg-teal-600 text-white" }
      ],
      hi: [
        { label: "अंतिम तिथि", value: "15 अक्टूबर 2026", color: "bg-amber-500 text-white" },
        { label: "राशि", value: "रु 4,500", color: "bg-blue-600 text-white" },
        { label: "सुरक्षा", value: "कोई ख़तरा नहीं मिला", color: "bg-teal-600 text-white" }
      ]
    },

    // Main summary sentence
    mainSummary: {
      en: "Your bank says your loan payment is late. Pay Rs 4,500 by 15 October to avoid a penalty.",
      te: "మీ బ్యాంకు రుణం చెల్లింపు ఆలస్యమైందని బ్యాంకు తెలిపింది. పెనాల్టీ పడకుండా ఉండటానికి అక్టోబర్ 15 లోపు రూ. 4,500 చెల్లించండి.",
      hi: "आपके बैंक के अनुसार आपका ऋण भुगतान बकाया है। जुर्माना से बचने के लिए 15 अक्टूबर तक रु 4,500 का भुगतान करें।"
    },

    // Step-by-step Action Points
    actionHeading: {
      en: "What to do",
      te: "ఏమి చేయాలి",
      hi: "क्या करना है"
    },
    actionPoints: {
      en: [
        "1. Pay at the bank or in the bank app.",
        "2. Keep the payment receipt safe.",
        "3. Call the bank if the amount looks wrong."
      ],
      te: [
        "1. బ్యాంకులో లేదా బ్యాంకు యాప్‌లో చెల్లించండి.",
        "2. చెల్లింపు రసీదును భద్రపరచండి.",
        "3. మొత్తంలో ఏమైనా తప్పు ఉంటే బ్యాంకుకు ఫోన్ చేయండి."
      ],
      hi: [
        "1. बैंक में जाकर या बैंक ऐप से भुगतान करें।",
        "2. भुगतान की रसीद सुरक्षित रखें।",
        "3. यदि राशि गलत लगे तो तुरंत बैंक से संपर्क करें।"
      ]
    },

    // Audio text
    audioText: {
      en: "Your bank says your loan payment is late. Pay Rupees 4,500 by 15 October to avoid a penalty. Pay at the bank or bank app and keep the receipt.",
      te: "మీ బ్యాంకు రుణం చెల్లింపు ఆలస్యమైందని బ్యాంకు తెలిపింది. పెనాల్టీ పడకుండా ఉండటానికి అక్టోబర్ 15 లోపు రూ. 4,500 చెల్లించండి.",
      hi: "आपके बैंक के अनुसार आपका ऋण भुगतान बकाया है। जुर्माना से बचने के लिए 15 अक्टूबर तक रु 4,500 का भुगतान करें।"
    },

    // Thumbnail SVG
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none"><rect width="600" height="750" fill="%23ffffff"/><rect x="25" y="25" width="550" height="700" fill="none" stroke="%230284c7" stroke-width="3"/><rect x="40" y="45" width="520" height="75" fill="%23f0f9ff"/><text x="60" y="85" font-family="sans-serif" font-weight="bold" font-size="22" fill="%230369a1">NATIONAL BANK OF INDIA</text><text x="60" y="105" font-family="sans-serif" font-size="13" fill="%230284c7">LOAN RECOVERY &amp; REVENUE DIVISION</text><line x1="40" y1="135" x2="560" y2="135" stroke="%23e0f2fe" stroke-width="2"/><text x="50" y="175" font-family="sans-serif" font-weight="bold" font-size="15" fill="%230f172a">Notice Ref: NBI/LND/99824</text><text x="400" y="175" font-family="sans-serif" font-size="13" fill="%2364748b">Date: 06-OCT-2026</text><text x="50" y="210" font-family="sans-serif" font-size="14" fill="%23334155">To: Customer Account # 408892180</text><rect x="50" y="235" width="500" height="85" fill="%23fef2f2" stroke="%23fca5a5" stroke-width="1.5"/><text x="70" y="270" font-family="sans-serif" font-weight="bold" font-size="18" fill="%23991b1b">OVERDUE AMOUNT: Rs. 4,500.00</text><text x="70" y="298" font-family="sans-serif" font-weight="bold" font-size="15" fill="%23b91c1c">PAYMENT DEADLINE: 15-OCT-2026</text><text x="50" y="360" font-family="sans-serif" font-size="14" fill="%231e293b">Dear Customer, your EMI installment for loan account is past due.</text><text x="50" y="385" font-family="sans-serif" font-size="14" fill="%231e293b">Please deposit the outstanding balance of Rs. 4,500 on or before 15 October 2026</text><text x="50" y="410" font-family="sans-serif" font-size="14" fill="%231e293b">to prevent penalty interest charges and CIBIL score impairment.</text><text x="50" y="460" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a">Payment Options:</text><text x="50" y="485" font-family="sans-serif" font-size="14" fill="%23334155">1. Online Banking / UPI Transfer</text><text x="50" y="510" font-family="sans-serif" font-size="14" fill="%23334155">2. Branch Counter Cash / Cheque Deposit</text><circle cx="480" cy="620" r="40" fill="none" stroke="%230284c7" stroke-width="2" stroke-dasharray="6 3"/><text x="480" y="625" font-family="sans-serif" font-weight="bold" font-size="11" fill="%230284c7" text-anchor="middle">BANK SEAL</text></svg>`,

    rawOcrText: `NATIONAL BANK OF INDIA
LOAN RECOVERY & REVENUE DIVISION
Notice Ref: NBI/LND/99824  Date: 06-OCT-2026
To: Customer Account # 408892180

OVERDUE AMOUNT: Rs. 4,500.00
PAYMENT DEADLINE: 15-OCT-2026

Dear Customer, your EMI installment for loan account is past due.
Please deposit the outstanding balance of Rs. 4,500 on or before 15 October 2026 to prevent penalty interest charges and CIBIL score impairment.

Payment Options:
1. Online Banking / UPI Transfer
2. Branch Counter Cash / Cheque Deposit`
  },
  {
    id: "land-record-notice",
    title: {
      en: "Government Land Record Notice",
      te: "ప్రభుత్వ భూమి రికార్డు నోటీసు",
      hi: "सरकारी भूमि रिकॉर्ड नोटिस"
    },
    category: {
      en: "Land revenue",
      te: "భూమి రెవెన్యూ",
      hi: "भूमि राजस्व"
    },
    urgency: {
      en: "ACTION REQUIRED",
      te: "చర్య అవసరం",
      hi: "कार्रवाई आवश्यक"
    },
    urgencyColor: "bg-red-500 text-white",
    categoryColor: "bg-blue-600 text-white",
    
    pills: {
      en: [
        { label: "Deadline", value: "25 Oct 2026", color: "bg-amber-500 text-white" },
        { label: "Survey No", value: "402/B (1.45 Acres)", color: "bg-blue-600 text-white" },
        { label: "Notice Status", value: "1 Risk Flag", color: "bg-teal-600 text-white" }
      ],
      te: [
        { label: "గడువు తేదీ", value: "25 అక్టోబర్ 2026", color: "bg-amber-500 text-white" },
        { label: "సర్వే నంబర్", value: "402/B (1.45 ఎకరాలు)", color: "bg-blue-600 text-white" },
        { label: "నోటీసు స్థితి", value: "1 హెచ్చరిక", color: "bg-teal-600 text-white" }
      ],
      hi: [
        { label: "अंतिम तिथि", value: "25 अक्टूबर 2026", color: "bg-amber-500 text-white" },
        { label: "सर्वे नंबर", value: "402/B (1.45 एकड़)", color: "bg-blue-600 text-white" },
        { label: "स्थिति", value: "1 जोखिम चेतावनी", color: "bg-teal-600 text-white" }
      ]
    },

    mainSummary: {
      en: "The Revenue Office issued a notice regarding your land Survey No. 402/B. Someone has applied for ownership change. Appear before Tehsildar by 25 Oct.",
      te: "మీ భూమి సర్వే నంబర్ 402/B గురించి రెవెన్యూ ఆఫీస్ నోటీసు ఇచ్చింది. మరొకరు హక్కుల మార్పిడికి దరఖాస్తు చేశారు. అక్టోబర్ 25 లోపు తహశీల్దార్ ముందుకు వెళ్లండి.",
      hi: "राजस्व कार्यालय ने आपकी भूमि सर्वे 402/बी का नोटिस जारी किया है। किसी ने नाम परिवर्तन का आवेदन दिया है। 25 अक्टूबर तक तहसीलदार के सामने उपस्थित हों।"
    },

    actionHeading: {
      en: "What to do",
      te: "ఏమి చేయాలి",
      hi: "क्या करना है"
    },
    actionPoints: {
      en: [
        "1. Carry your original Pattadar Passbook and Aadhaar Card.",
        "2. Visit the Tehsildar Office before 25 October 2026.",
        "3. Submit your written ownership objection to protect your plot."
      ],
      te: [
        "1. మీ ఒరిజినల్ పట్టాదారు పాస్ పుస్తకం మరియు ఆధార్ కార్డు తీసుకెళ్లండి.",
        "2. 25 అక్టోబర్ 2026 లోపు తహశీల్దార్ ఆఫీసుకు వెళ్లండి.",
        "3. మీ భూమిని కాపాడుకోవడానికి లిఖితపూర్వక అభ్యంతరం సమర్పించండి."
      ],
      hi: [
        "1. अपनी मूल भू-स्वामित्व पुस्तिका और आधार कार्ड साथ ले जाएं।",
        "2. 25 अक्टूबर 2026 से पहले तहसीलदार कार्यालय जाएं।",
        "3. अपनी जमीन की सुरक्षा के लिए लिखित आपत्ति दर्ज कराएं।"
      ]
    },

    audioText: {
      en: "The Revenue Office issued a notice regarding your land Survey No 402/B. Visit Tehsildar Office before 25 October with original land passbook to protect your ownership.",
      te: "మీ భూమి సర్వే నంబర్ 402/B గురించి రెవెన్యూ ఆఫీస్ నోటీసు ఇచ్చింది. అక్టోబర్ 25 లోపు ఒరిజినల్ పాస్ పుస్తకంతో తహశీల్దార్ ఆఫీసుకు వెళ్లండి.",
      hi: "राजस्व कार्यालय ने आपकी भूमि सर्वे 402/बी का नोटिस जारी किया है। 25 अक्टूबर से पहले मूल पासबुक के साथ तहसीलदार दफ़्तर जाएं।"
    },

    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none"><rect width="600" height="750" fill="%23ffffff"/><rect x="25" y="25" width="550" height="700" fill="none" stroke="%231e3a8a" stroke-width="3"/><text x="300" y="75" font-family="sans-serif" font-weight="bold" font-size="20" fill="%231e3a8a" text-anchor="middle">REVENUE &amp; LAND RECORDS DEPARTMENT</text><text x="300" y="100" font-family="sans-serif" font-weight="bold" font-size="14" fill="%231d4ed8" text-anchor="middle">TAHSILDAR OFFICE - LAND MUTATION NOTICE</text><line x1="50" y1="125" x2="550" y2="125" stroke="%23cbd5e1" stroke-width="1.5"/><text x="50" y="165" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a">Notice Ref: REV/2026/LND-40291</text><text x="400" y="165" font-family="sans-serif" font-size="13" fill="%2364748b">Date: 05-OCT-2026</text><text x="50" y="200" font-family="sans-serif" font-size="14" fill="%23334155">To: Sri Ramesh V. Kumar (Survey No. 402/B)</text><rect x="50" y="225" width="500" height="75" fill="%23fef2f2" stroke="%23ef4444"/><text x="70" y="255" font-family="sans-serif" font-weight="bold" font-size="15" fill="%23991b1b">MUTATION CLAIM FILED BY THIRD PARTY</text><text x="70" y="280" font-family="sans-serif" font-weight="bold" font-size="15" fill="%23b91c1c">HEARING DEADLINE: 25-OCT-2026 AT 10:30 AM</text><text x="50" y="340" font-family="sans-serif" font-size="14" fill="%231e293b">Take notice that an application has been received for transfer of title</text><text x="50" y="365" font-family="sans-serif" font-size="14" fill="%231e293b">rights for land measuring 1.45 Acres in Survey Plot 402/B.</text><text x="50" y="415" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a">Required Action:</text><text x="50" y="440" font-family="sans-serif" font-size="14" fill="%23334155">Appear before the Tahsildar with original Pattadar Passbook &amp; Aadhaar.</text></svg>`,

    rawOcrText: `REVENUE & LAND RECORDS DEPARTMENT
TAHSILDAR OFFICE - LAND MUTATION NOTICE
Notice Ref: REV/2026/LND-40291  Date: 05-OCT-2026
To: Sri Ramesh V. Kumar (Survey No. 402/B)

MUTATION CLAIM FILED BY THIRD PARTY
HEARING DEADLINE: 25-OCT-2026 AT 10:30 AM

Take notice that an application has been received for transfer of title rights for land measuring 1.45 Acres in Survey Plot 402/B.
Required Action: Appear before the Tahsildar with original Pattadar Passbook & Aadhaar.`
  },
  {
    id: "electricity-warning",
    title: {
      en: "Electricity Disconnection Warning",
      te: "విద్యుత్ కనెక్షన్ రద్దు హెచ్చరిక",
      hi: "बिजली कनेक्शन विच्छेदन चेतावनी"
    },
    category: {
      en: "Utility bill",
      te: "కరెంట్ బిల్లు",
      hi: "बिजली बिल"
    },
    urgency: {
      en: "HIGH URGENCY",
      te: "అత్యవసరం",
      hi: "उच्च प्राथमिकता"
    },
    urgencyColor: "bg-red-500 text-white",
    categoryColor: "bg-blue-600 text-white",
    
    pills: {
      en: [
        { label: "Deadline", value: "18 Oct 2026", color: "bg-amber-500 text-white" },
        { label: "Amount", value: "Rs 3,450", color: "bg-blue-600 text-white" },
        { label: "Penalty Fee", value: "Rs 500 extra after cut", color: "bg-teal-600 text-white" }
      ],
      te: [
        { label: "గడువు తేదీ", value: "18 అక్టోబర్ 2026", color: "bg-amber-500 text-white" },
        { label: "మొత్తం", value: "రూ. 3,450", color: "bg-blue-600 text-white" },
        { label: "అదనపు రుసుము", value: "కట్ అయితే రూ. 500", color: "bg-teal-600 text-white" }
      ],
      hi: [
        { label: "अंतिम तिथि", value: "18 अक्टूबर 2026", color: "bg-amber-500 text-white" },
        { label: "राशि", value: "रु 3,450", color: "bg-blue-600 text-white" },
        { label: "अतिरिक्त शुल्क", value: "कटने पर रु 500", color: "bg-teal-600 text-white" }
      ]
    },

    mainSummary: {
      en: "Electricity department issued final warning notice. Pay Rs 3,450 before 18 October to prevent power disconnection.",
      te: "విద్యుత్ శాఖ చివరి హెచ్చరిక నోటీసు ఇచ్చింది. కరెంట్ కట్ కాకుండా ఉండటానికి అక్టోబర్ 18 లోపు రూ. 3,450 చెల్లించండి.",
      hi: "बिजली विभाग ने अंतिम चेतावनी नोटिस जारी किया है। बिजली कटने से बचने के लिए 18 अक्टूबर से पहले रु 3,450 का भुगतान करें।"
    },

    actionHeading: {
      en: "What to do",
      te: "ఏమి చేయాలి",
      hi: "क्या करना है"
    },
    actionPoints: {
      en: [
        "1. Pay Rs 3,450 at MeeSeva or Electricity Office counter.",
        "2. Keep the printed payment receipt.",
        "3. Pay before 18 October to avoid Rs 500 reconnection charge."
      ],
      te: [
        "1. మీసేవలో లేదా కరెంట్ ఆఫీస్ కౌంటర్‌లో రూ. 3,450 చెల్లించండి.",
        "2. ప్రింట్ చేసిన రసీదును భద్రపరచండి.",
        "3. రూ. 500 అదనపు చార్జ్ పడకుండా ఉండటానికి అక్టోబర్ 18 లోపే చెల్లించండి."
      ],
      hi: [
        "1. मी-सेवा या बिजली कार्यालय काउंटर पर रु 3,450 का भुगतान करें।",
        "2. रसीद संभाल कर रखें।",
        "3. रु 500 पेनल्टी से बचने के लिए 18 अक्टूबर से पहले भुगतान करें।"
      ]
    },

    audioText: {
      en: "Electricity department issued final warning notice. Pay 3,450 Rupees before 18 October at MeeSeva to prevent power line cut.",
      te: "విద్యుత్ శాఖ చివరి హెచ్చరిక నోటీసు ఇచ్చింది. కరెంట్ కట్ కాకుండా ఉండటానికి అక్టోబర్ 18 లోపు రూ. 3,450 చెల్లించండి.",
      hi: "बिजली विभाग ने अंतिम चेतावनी नोटिस जारी किया है। बिजली कटने से बचने के लिए 18 अक्टूबर से पहले रु 3,450 का भुगतान करें।"
    },

    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none"><rect width="600" height="750" fill="%23ffffff"/><rect x="25" y="25" width="550" height="700" fill="none" stroke="%23ca8a04" stroke-width="3"/><rect x="40" y="45" width="520" height="70" fill="%23fef08a"/><text x="300" y="85" font-family="sans-serif" font-weight="bold" font-size="20" fill="%23854d0e" text-anchor="middle">STATE POWER DISTRIBUTION CORPORATION</text><text x="50" y="160" font-family="sans-serif" font-weight="bold" font-size="15" fill="%230f172a">Meter ID: 884920</text><rect x="50" y="190" width="500" height="80" fill="%23fee2e2" stroke="%23ef4444"/><text x="70" y="225" font-family="sans-serif" font-weight="bold" font-size="18" fill="%23991b1b">OUTSTANDING ARREARS: Rs. 3,450</text><text x="70" y="252" font-family="sans-serif" font-weight="bold" font-size="15" fill="%23b91c1c">CUT-OFF DATE: 18-OCT-2026</text></svg>`,

    rawOcrText: `STATE POWER DISTRIBUTION CORPORATION
Meter ID: 884920
OUTSTANDING ARREARS: Rs. 3,450
CUT-OFF DATE: 18-OCT-2026
Warning: Physical disconnection will take place on 18 October.`
  }
];
