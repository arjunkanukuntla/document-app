// Sample documents for Jan-Vani Hackathon Demo

export const SAMPLE_DOCUMENTS = [
  {
    id: "land-record-notice",
    title: "Government Land Record Notice",
    subtitle: "राजस्व एवं भूमि सुधार / Revenue Dept Notice",
    category: "Land & Legal",
    badgeColor: "bg-red-500/20 text-red-400 border-red-500/40",
    urgent: true,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none"><rect width="600" height="750" fill="%23fcfbfa"/><rect x="20" y="20" width="560" height="710" fill="none" stroke="%23991b1b" stroke-width="4"/><rect x="35" y="35" width="530" height="680" fill="none" stroke="%23b45309" stroke-width="1.5" stroke-dasharray="6 4"/><text x="300" y="80" font-family="sans-serif" font-weight="bold" font-size="22" fill="%237f1d1d" text-anchor="middle">GOVERNMENT OF TELANGANA / REVENUE DEPT</text><text x="300" y="110" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23991b1b" text-anchor="middle">OFFICE OF THE TAHSILDAR &amp; EXECUTIVE MAGISTRATE</text><line x1="60" y1="130" x2="540" y2="130" stroke="%23991b1b" stroke-width="2"/><text x="60" y="170" font-family="sans-serif" font-weight="bold" font-size="16" fill="%231e293b">NOTICE NO: REV/2026/LND-40291</text><text x="440" y="170" font-family="sans-serif" font-size="14" fill="%23475569">DATE: 05-OCT-2026</text><text x="60" y="210" font-family="sans-serif" font-weight="bold" font-size="16" fill="%230f172a">TO: Sri Ramesh V. Kumar</text><text x="60" y="235" font-family="sans-serif" font-size="14" fill="%23334155">Khata No: 402, Plot No: 128/B, Village: Devapur, District: Warangal</text><rect x="60" y="260" width="480" height="35" fill="%23fef2f2" stroke="%23fca5a5"/><text x="70" y="283" font-family="sans-serif" font-weight="bold" font-size="14" fill="%23991b1b">SUBJECT: MUTATION &amp; ENCROACHMENT OBJECTION NOTICE</text><text x="60" y="330" font-family="sans-serif" font-size="14" fill="%231e293b">Take notice that Sri Mahesh Reddy has submitted an official application</text><text x="60" y="355" font-family="sans-serif" font-size="14" fill="%231e293b">for mutation of ownership rights for Survey No. 402/B measuring 1.45 Acres.</text><text x="60" y="400" font-family="sans-serif" font-weight="bold" font-size="14" fill="%237f1d1d">MANDATORY ACTION REQUIRED:</text><text x="60" y="430" font-family="sans-serif" font-size="14" fill="%231e293b">You are hereby directed to appear in person before the Tahsildar Office on</text><text x="60" y="455" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23991b1b">or before 25-OCT-2026 at 10:30 AM</text><text x="60" y="485" font-family="sans-serif" font-size="14" fill="%231e293b">along with original Title Deed, Pattadar Passbook, and Aadhaar card.</text><text x="60" y="530" font-family="sans-serif" font-size="13" fill="%23b91c1c">Failure to submit objections in writing within 15 days will result in ex-parte</text><text x="60" y="550" font-family="sans-serif" font-size="13" fill="%23b91c1c">mutation approval and cancellation of previous records.</text><circle cx="480" cy="620" r="45" fill="none" stroke="%23991b1b" stroke-width="3" stroke-dasharray="8 4"/><text x="480" y="625" font-family="sans-serif" font-weight="bold" font-size="12" fill="%23991b1b" text-anchor="middle">OFFICIAL SEAL</text><text x="480" y="680" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a" text-anchor="middle">Tahsildar &amp; Magistrate</text></svg>`,
    rawOcrText: `GOVERNMENT OF TELANGANA / REVENUE DEPARTMENT
OFFICE OF THE TAHSILDAR & EXECUTIVE MAGISTRATE
NOTICE NO: REV/2026/LND-40291  DATE: 05-OCT-2026
TO: Sri Ramesh V. Kumar
Khata No: 402, Plot No: 128/B, Village: Devapur, District: Warangal
SUBJECT: MUTATION & ENCROACHMENT OBJECTION NOTICE

Take notice that Sri Mahesh Reddy has submitted an official application for mutation of ownership rights for Survey No. 402/B measuring 1.45 Acres.

MANDATORY ACTION REQUIRED:
You are hereby directed to appear in person before the Tahsildar Office on or before 25-OCT-2026 at 10:30 AM along with original Title Deed, Pattadar Passbook, and Aadhaar card.

Failure to submit objections in writing within 15 days will result in ex-parte mutation approval and cancellation of previous records.
By Order of Tahsildar & Executive Magistrate.`,
    mandanaAnalysis: {
      docType: "Official Government Land Ownership Notice (भूमि स्वामित्व सूचना)",
      summaryPoints: [
        {
          number: 1,
          title: "What is this document?",
          desc: "Official Government notice regarding your Land Plot No: 128/B (Survey No. 402/B).",
          icon: "FileText"
        },
        {
          number: 2,
          title: "Key Details & Dates",
          desc: "Someone (Mahesh Reddy) has filed an application to transfer land ownership. Deadline to submit objection is 25th October 2026.",
          icon: "Calendar"
        },
        {
          number: 3,
          title: "Action Required",
          desc: "Go to Tehsildar Office before 25th October with your Original Land Passbook (పట్టాదారు పాస్ పుస్తకం / भू-स्वामित्व पुस्तिका) and Aadhaar Card.",
          icon: "AlertTriangle"
        },
        {
          number: 4,
          title: "Risk Warning",
          desc: "If you do not visit the office before Oct 25, the government may cancel your land record entry!",
          icon: "ShieldAlert"
        }
      ],
      tts: {
        en: "This is an urgent Government Land Notice regarding your Survey Number 402/B. Someone has applied to transfer your land ownership. You must visit the Tehsildar Office before 25th October 2026 with your original Land Passbook and Aadhaar Card to protect your land.",
        hi: "यह आपके भूमि सर्वे 402/बी का सरकारी नोटिस है। किसी ने आपकी ज़मीन अपने नाम करवाने का आवेदन दिया है। अपनी ज़मीन बचाने के लिए 25 अक्टूबर से पहले तहसीलदार दफ़्तर में अपना आधार कार्ड और ज़मीन की रसीद लेकर ज़रूर जाएं।",
        te: "ఇది మీ భూమి సర్వే నంబర్ 402/B కి సంబంధించిన ప్రభుత్వ నోటీసు. మరొకరు ఈ భూమి మార్పిడికి దరఖాస్తు చేశారు. మీ భూమిని కాపాడుకోవడానికి అక్టోబర్ 25 లోగా ఒరిజినల్ పట్టాదారు పాస్ పుస్తకం, ఆధార్ కార్డుతో తహశీల్దార్ ఆఫీసుకు తప్పక వెళ్లండి."
      }
    }
  },
  {
    id: "electricity-bill-warning",
    title: "Electricity Disconnection Notice",
    subtitle: "विद्युत विभाग / Power Distribution Notice",
    category: "Utility Bill",
    badgeColor: "bg-amber-500/20 text-amber-400 border-amber-500/40",
    urgent: true,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none"><rect width="600" height="750" fill="%23fefce8"/><rect x="20" y="20" width="560" height="710" fill="none" stroke="%23ca8a04" stroke-width="3"/><rect x="40" y="40" width="520" height="80" fill="%23fef08a"/><text x="300" y="75" font-family="sans-serif" font-weight="bold" font-size="20" fill="%23854d0e" text-anchor="middle">STATE POWER DISTRIBUTION CORPORATION</text><text x="300" y="100" font-family="sans-serif" font-weight="bold" font-size="16" fill="%23a16207" text-anchor="middle">FINAL DISCONNECTION WARNING NOTICE</text><text x="60" y="160" font-family="sans-serif" font-weight="bold" font-size="15" fill="%231e293b">Consumer Name: Smt. Sunita Devi</text><text x="380" y="160" font-family="sans-serif" font-size="14" fill="%23475569">Meter No: 884920</text><text x="60" y="190" font-family="sans-serif" font-size="14" fill="%23334155">Service Connection: Domestic 1A | Substation: Rampur</text><line x1="60" y1="210" x2="540" y2="210" stroke="%23eab308" stroke-width="2"/><rect x="60" y="230" width="480" height="90" fill="%23fee2e2" stroke="%23ef4444" stroke-width="2"/><text x="80" y="265" font-family="sans-serif" font-weight="bold" font-size="18" fill="%23991b1b">TOTAL OUTSTANDING DUES: ₹ 3,450.00</text><text x="80" y="295" font-family="sans-serif" font-weight="bold" font-size="18" fill="%23991b1b">LAST PAYMENT DUE DATE: 18-OCT-2026</text><text x="60" y="360" font-family="sans-serif" font-weight="bold" font-size="14" fill="%23991b1b">STATUTORY DISCONNECTION WARNING:</text><text x="60" y="390" font-family="sans-serif" font-size="14" fill="%231e293b">As per Electricity Act Section 56(1), power supply line will be disconnected</text><text x="60" y="415" font-family="sans-serif" font-size="14" fill="%231e293b">physically without further notice if dues are not settled before 18-OCT-2026.</text><text x="60" y="445" font-family="sans-serif" font-size="13" fill="%23475569">A mandatory reconnection fee of Rs. 500 will apply after cut-off.</text><text x="60" y="500" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a">Payment Options:</text><text x="60" y="525" font-family="sans-serif" font-size="14" fill="%23334155">1. Local MeeSeva / Digital Seva Center</text><text x="60" y="550" font-family="sans-serif" font-size="14" fill="%23334155">2. Electricity Sub-Station Counter, Rampur</text><text x="60" y="575" font-family="sans-serif" font-size="14" fill="%23334155">3. Online UPI / Electricity Portal</text></svg>`,
    rawOcrText: `STATE POWER DISTRIBUTION CORPORATION
FINAL DISCONNECTION WARNING NOTICE
Consumer Name: Smt. Sunita Devi  Meter No: 884920
Service Connection: Domestic 1A | Substation: Rampur

TOTAL OUTSTANDING DUES: ₹ 3,450.00
LAST PAYMENT DUE DATE: 18-OCT-2026

STATUTORY DISCONNECTION WARNING:
As per Electricity Act Section 56(1), power supply line will be disconnected physically without further notice if dues are not settled before 18-OCT-2026.
A mandatory reconnection fee of Rs. 500 will apply after cut-off.

Payment Options:
1. Local MeeSeva / Digital Seva Center
2. Electricity Sub-Station Counter, Rampur
3. Online UPI / Electricity Portal`,
    mandanaAnalysis: {
      docType: "Electricity Bill Disconnection Warning (बिजली बिल चेतावनी)",
      summaryPoints: [
        {
          number: 1,
          title: "What is this document?",
          desc: "Final Warning Notice for your electricity meter connection (Meter No. 884920).",
          icon: "Zap"
        },
        {
          number: 2,
          title: "Key Details & Amounts",
          desc: "Unpaid Electricity Bill Amount: ₹3,450. Last Payment Deadline: 18th October 2026.",
          icon: "CreditCard"
        },
        {
          number: 3,
          title: "Action Required",
          desc: "Pay ₹3,450 at your nearest MeeSeva center or Electricity Office before 18th October.",
          icon: "CheckCircle2"
        },
        {
          number: 4,
          title: "Penalty Risk",
          desc: "If unpaid by Oct 18, your electricity line will be cut and you will be charged ₹500 extra to reconnect.",
          icon: "AlertOctagon"
        }
      ],
      tts: {
        en: "This is your Electricity Bill Last Warning Notice. You have an unpaid bill of 3,450 Rupees. You must pay this bill at your nearest MeeSeva or electricity office before 18th October to prevent your power from being cut off.",
        hi: "यह आपकी बिजली कटने की आखिरी चेतावनी है। आपका कुल बकाया 3,450 रुपये है। बिजली कटने से बचने के लिए 18 अक्टूबर तक मी-सेवा या बिजली दफ़्तर जाकर बिल ज़रूर भरें।",
        te: "ఇది మీ విద్యుత్ కనెక్షన్ రద్దు హెచ్చరిక నోటీసు. మీరు చెల్లించాల్సిన బాకీ రూ. 3,450. కరెంట్ కట్ కాకుండా ఉండటానికి అక్టోబర్ 18 లోగా మీసేవలో లేదా కరెంట్ ఆఫీసులో బిల్లు చెల్లించండి."
      }
    }
  },
  {
    id: "hospital-prescription",
    title: "Civil Hospital Medical Prescription",
    subtitle: "सरकारी अस्पताल दवा पर्ची / Hospital Dosage Guide",
    category: "Health & Pharma",
    badgeColor: "bg-emerald-500/20 text-emerald-400 border-emerald-500/40",
    urgent: false,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none"><rect width="600" height="750" fill="%23f0fdf4"/><rect x="20" y="20" width="560" height="710" fill="none" stroke="%2316a34a" stroke-width="3"/><path d="M50 40 H550 V100 H50 Z" fill="%23dcfce7"/><text x="300" y="70" font-family="sans-serif" font-weight="bold" font-size="20" fill="%2315803d" text-anchor="middle">GOVERNMENT GENERAL HOSPITAL - OPD</text><text x="300" y="92" font-family="sans-serif" font-size="13" fill="%23166534" text-anchor="middle">DEPARTMENT OF GENERAL MEDICINE</text><text x="60" y="145" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a">PATIENT: Lakshmi Bai | Age: 58 / F</text><text x="420" y="145" font-family="sans-serif" font-size="14" fill="%23475569">DATE: 07-OCT-2026</text><text x="60" y="170" font-family="sans-serif" font-size="13" fill="%23334155">Diagnosis: Acute Fever + Mild BP (140/90)</text><line x1="60" y1="190" x2="540" y2="190" stroke="%2322c55e" stroke-width="2"/><text x="60" y="230" font-family="sans-serif" font-weight="bold" font-size="28" fill="%2315803d">Rx</text><text x="60" y="270" font-family="sans-serif" font-weight="bold" font-size="15" fill="%230f172a">1. Tab Paracetamol 500mg</text><text x="80" y="295" font-family="sans-serif" font-size="14" fill="%23166534">Dose: 1 - 1 - 1 (Morning, Afternoon, Night after food) x 5 Days</text><text x="60" y="340" font-family="sans-serif" font-weight="bold" font-size="15" fill="%230f172a">2. Tab Amoxicillin 500mg (Antibiotic)</text><text x="80" y="365" font-family="sans-serif" font-size="14" fill="%23166534">Dose: 1 - 0 - 1 (Morning and Night after food) x 7 Days</text><text x="60" y="410" font-family="sans-serif" font-weight="bold" font-size="15" fill="%230f172a">3. Tab Amlodipine 5mg (BP Care)</text><text x="80" y="435" font-family="sans-serif" font-size="14" fill="%23166534">Dose: 1 - 0 - 0 (One tablet daily in morning) x 30 Days</text><rect x="60" y="480" width="480" height="80" fill="%23f0fdf4" stroke="%2386efac"/><text x="80" y="510" font-family="sans-serif" font-weight="bold" font-size="14" fill="%2315803d">DOCTOR'S ADVICE:</text><text x="80" y="535" font-family="sans-serif" font-size="13" fill="%23166534">Drink boiled water. Avoid cold drinks. Complete full 7-day antibiotic course.</text><text x="60" y="600" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a">FOLLOW UP RE-VISIT:</text><text x="60" y="625" font-family="sans-serif" font-weight="bold" font-size="15" fill="%2315803d">Next Wednesday (14-OCT-2026) in OPD Room No. 4</text></svg>`,
    rawOcrText: `GOVERNMENT GENERAL HOSPITAL - OPD
DEPARTMENT OF GENERAL MEDICINE
PATIENT: Lakshmi Bai | Age: 58 / F  DATE: 07-OCT-2026
Diagnosis: Acute Fever + Mild BP (140/90)

Rx:
1. Tab Paracetamol 500mg
Dose: 1 - 1 - 1 (Morning, Afternoon, Night after food) x 5 Days

2. Tab Amoxicillin 500mg (Antibiotic)
Dose: 1 - 0 - 1 (Morning and Night after food) x 7 Days

3. Tab Amlodipine 5mg (BP Care)
Dose: 1 - 0 - 0 (One tablet daily in morning) x 30 Days

DOCTOR'S ADVICE:
Drink boiled water. Avoid cold drinks. Complete full 7-day antibiotic course.

FOLLOW UP RE-VISIT:
Next Wednesday (14-OCT-2026) in OPD Room No. 4`,
    mandanaAnalysis: {
      docType: "Hospital Prescription & Medicine Timetable (डॉक्टर दवा पर्ची)",
      summaryPoints: [
        {
          number: 1,
          title: "What is this document?",
          desc: "Civil Hospital Prescription for fever & blood pressure care.",
          icon: "Activity"
        },
        {
          number: 2,
          title: "Medicine Schedule",
          desc: "• Fever Tablet (Paracetamol): Morning, Afternoon, Night (3 times after food).\n• Antibiotic (Amoxicillin): Morning & Night (2 times after food for 7 days).\n• BP Tablet: 1 tablet every morning.",
          icon: "Pill"
        },
        {
          number: 3,
          title: "Doctor's Advice",
          desc: "Drink boiled warm water. Do not stop antibiotic early even if fever goes away.",
          icon: "HeartPulse"
        },
        {
          number: 4,
          title: "Hospital Re-visit Date",
          desc: "Return to OPD Room No. 4 next Wednesday (14th October 2026) for follow-up checkup.",
          icon: "CalendarCheck"
        }
      ],
      tts: {
        en: "This is your doctor's medicine prescription card. Take the fever tablet 3 times a day after eating food. Take the antibiotic tablet morning and night after food for 7 days. Take the BP tablet 1 time every morning. Visit OPD Room 4 next Wednesday for checkup.",
        hi: "यह सरकारी अस्पताल की डॉक्टर दवा पर्ची है। बुख़ार की गोली दिन में 3 बार खाना खाने के बाद लें। एंटीबायोटिक गोली सुबह और रात को 7 दिन तक लें। बीपी की गोली हर सुबह एक लें। अगले बुधवार डॉक्टर को दोबारा दिखाएं।",
        te: "ఇది ప్రభుత్వ ఆసుపత్రి డాక్టర్ మందుల చీటీ. జ్వరం బిళ్ళ ఉదయం, మధ్యాహ్నం, రాత్రి అన్నం తిన్నాక వేసుకోవాలి. యాంటిబయోటిక్ బిళ్ళ ఉదయం, రాత్రి 7 రోజులు వేసుకోవాలి. వచ్చే బుధవారం ఓపిడి రూమ్ 4కి వెళ్ళి చూపించుకోండి."
      }
    }
  },
  {
    id: "pm-kisan-kyc",
    title: "PM-Kisan Farmer Subsidy Verification",
    subtitle: "पीएम किसान ₹2000 योजना / Farmer Scheme",
    category: "Agri Subsidy",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/40",
    urgent: true,
    thumbnailSvg: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750" fill="none"><rect width="600" height="750" fill="%23eff6ff"/><rect x="20" y="20" width="560" height="710" fill="none" stroke="%232563eb" stroke-width="3"/><path d="M50 40 H550 V110 H50 Z" fill="%23dbeafe"/><text x="300" y="75" font-family="sans-serif" font-weight="bold" font-size="20" fill="%231e40af" text-anchor="middle">MINISTRY OF AGRICULTURE &amp; FARMERS WELFARE</text><text x="300" y="100" font-family="sans-serif" font-weight="bold" font-size="16" fill="%231d4ed8" text-anchor="middle">PM-KISAN SAMMAN NIDHI SCHEME NOTICE</text><text x="60" y="160" font-family="sans-serif" font-weight="bold" font-size="15" fill="%230f172a">Farmer Name: Sri Kanakaiah B.</text><text x="380" y="160" font-family="sans-serif" font-size="14" fill="%23475569">Reg ID: AP-8839201</text><line x1="60" y1="185" x2="540" y2="185" stroke="%233b82f6" stroke-width="2"/><rect x="60" y="210" width="480" height="85" fill="%23fef3c7" stroke="%23f59e0b" stroke-width="2"/><text x="80" y="245" font-family="sans-serif" font-weight="bold" font-size="17" fill="%23b45309">STATUS: Installment #16 (₹ 2,000) PAYMENT ON HOLD</text><text x="80" y="275" font-family="sans-serif" font-weight="bold" font-size="14" fill="%2392400e">REASON: Aadhaar Biometric e-KYC Verification Pending</text><text x="60" y="335" font-family="sans-serif" font-weight="bold" font-size="14" fill="%231e3a8a">SCHEME DIRECTIVE:</text><text x="60" y="365" font-family="sans-serif" font-size="14" fill="%231e293b">As per Ministry directive, direct bank deposit of ₹2,000 installment will only</text><text x="60" y="390" font-family="sans-serif" font-size="14" fill="%231e293b">be credited after mandatory biometric thumb authentication at CSC Center.</text><text x="60" y="440" font-family="sans-serif" font-weight="bold" font-size="15" fill="%23b91c1c">LAST DATE FOR E-KYC: 31-OCT-2026</text><text x="60" y="490" font-family="sans-serif" font-weight="bold" font-size="14" fill="%230f172a">Steps to Complete Verification:</text><text x="60" y="520" font-family="sans-serif" font-size="14" fill="%23334155">1. Take original Aadhaar Card to nearest CSC / Digital Seva Kendra.</text><text x="60" y="545" font-family="sans-serif" font-size="14" fill="%23334155">2. Provide thumb fingerprint on biometric scanner machine.</text><text x="60" y="570" font-family="sans-serif" font-size="14" fill="%23334155">3. Verification status will update within 24 hours.</text><text x="60" y="630" font-family="sans-serif" font-size="13" fill="%23475569">PM-Kisan Toll Free Helpline: 155261 / 1800115526</text></svg>`,
    rawOcrText: `MINISTRY OF AGRICULTURE & FARMERS WELFARE
PM-KISAN SAMMAN NIDHI SCHEME NOTICE
Farmer Name: Sri Kanakaiah B.  Reg ID: AP-8839201

STATUS: Installment #16 (₹ 2,000) PAYMENT ON HOLD
REASON: Aadhaar Biometric e-KYC Verification Pending

SCHEME DIRECTIVE:
As per Ministry directive, direct bank deposit of ₹2,000 installment will only be credited after mandatory biometric thumb authentication at CSC Center.

LAST DATE FOR E-KYC: 31-OCT-2026

Steps to Complete Verification:
1. Take original Aadhaar Card to nearest CSC / Digital Seva Kendra.
2. Provide thumb fingerprint on biometric scanner machine.
3. Verification status will update within 24 hours.

PM-Kisan Toll Free Helpline: 155261 / 1800115526`,
    mandanaAnalysis: {
      docType: "PM-Kisan ₹2,000 Scheme Verification Alert (पीएम किसान योजना)",
      summaryPoints: [
        {
          number: 1,
          title: "What is this document?",
          desc: "Notice from Agriculture Ministry about your PM-Kisan ₹2,000 farmer payment.",
          icon: "Sprout"
        },
        {
          number: 2,
          title: "Key Details & Status",
          desc: "Your ₹2,000 payment is currently ON HOLD because your Aadhaar thumb fingerprint is not verified.",
          icon: "Fingerprint"
        },
        {
          number: 3,
          title: "Action Required",
          desc: "Take your Aadhaar card to the nearest CSC / Digital Seva Center and place your thumb on the scanner machine.",
          icon: "CheckCircle"
        },
        {
          number: 4,
          title: "Deadline Date",
          desc: "Complete thumb fingerprint e-KYC before 31st October 2026 to get money in your bank account.",
          icon: "Clock"
        }
      ],
      tts: {
        en: "This is your PM Kisan 2,000 Rupees farmer scheme notice. Your 2,000 payment is currently blocked because your thumb fingerprint e-KYC is pending. Visit your nearest CSC Digital Center with your Aadhaar card before 31st October to complete fingerprint verification.",
        hi: "यह आपकी पीएम किसान योजना की ₹2000 किश्त रुकने की सूचना है। आधार अंगूठा सत्यापन नहीं होने के कारण पैसा अटका है। 31 अक्टूबर से पहले अपना आधार कार्ड लेकर नज़दीकी सीएससी सेंटर जाएं और अंगूठा लगाकर ई-केवाईसी पूरा करें।",
        te: "ఇది పిఎమ్ కిసాన్ ₹2000 రైతు సాయం నిలిచిపోయిన నోటీసు. మీ ఆధార్ వేలిముద్ర లంకె లేకపోవడం వల్ల డబ్బులు ఆగాయి. అక్టోబర్ 31 లోగా మీ దగ్గరలోని సీఎస్‌సీ సెంటర్‌కి వెళ్ళి ఆధార్ వేలిముద్ర వేయించండి."
      }
    }
  }
];
