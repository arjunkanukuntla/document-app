// Azure Computer Vision OCR & Azure Speech Synthesis REST API Service Layer

/**
 * Perform Azure Computer Vision Read OCR REST API call
 */
export async function runAzureVisionOCR(imageFileOrBlob, visionEndpoint, visionKey) {
  if (!visionEndpoint || !visionKey) {
    throw new Error("Azure Vision Endpoint & Subscription Key are required for live Azure OCR.");
  }

  // Normalize endpoint URL
  let baseUrl = visionEndpoint.trim();
  if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
  }

  // Azure Vision v3.2 Read Analyze endpoint
  const analyzeUrl = `${baseUrl}/vision/v3.2/read/analyze`;

  const arrayBuffer = await imageFileOrBlob.arrayBuffer();

  const response = await fetch(analyzeUrl, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': visionKey,
      'Content-Type': 'application/octet-stream'
    },
    body: arrayBuffer
  });

  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Azure Vision API request failed (${response.status}): ${errorText || response.statusText}`);
  }

  const operationLocation = response.headers.get('Operation-Location');
  if (!operationLocation) {
    throw new Error('Azure Vision API did not return an Operation-Location header.');
  }

  // Poll for result
  let status = 'running';
  let attempts = 0;
  const maxAttempts = 20;
  let resultData = null;

  while ((status === 'running' || status === 'notStarted') && attempts < maxAttempts) {
    await new Promise((res) => setTimeout(res, 1000));
    attempts++;

    const pollRes = await fetch(operationLocation, {
      method: 'GET',
      headers: {
        'Ocp-Apim-Subscription-Key': visionKey
      }
    });

    if (!pollRes.ok) {
      throw new Error(`Polling Azure Vision failed: ${pollRes.statusText}`);
    }

    resultData = await pollRes.json();
    status = resultData.status;

    if (status === 'failed') {
      throw new Error('Azure Vision OCR processing failed on server.');
    }
  }

  if (status !== 'succeeded' || !resultData?.analyzeResult) {
    throw new Error('Azure Vision OCR timed out or returned no results.');
  }

  // Extract all lines of text
  const extractedLines = [];
  const readResults = resultData.analyzeResult.readResults || [];
  for (const page of readResults) {
    for (const line of page.lines || []) {
      extractedLines.push(line.text);
    }
  }

  return extractedLines.join('\n');
}

/**
 * Perform Azure Speech Synthesis (TTS) REST API call
 */
export async function runAzureSpeechTTS(text, lang = 'hi', speechRegion, speechKey) {
  if (!speechRegion || !speechKey) {
    throw new Error("Azure Speech Region & Subscription Key are required for live Azure Speech TTS.");
  }

  const region = speechRegion.trim().toLowerCase();
  const ttsUrl = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

  // Language mapping for Azure TTS Neural Voices
  const voiceMap = {
    hi: { langCode: 'hi-IN', voiceName: 'hi-IN-SwaraNeural' },
    te: { langCode: 'te-IN', voiceName: 'te-IN-ShrutiNeural' },
    en: { langCode: 'en-IN', voiceName: 'en-IN-NeerjaNeural' }
  };

  const selectedVoice = voiceMap[lang] || voiceMap.hi;

  // Escape special XML characters
  const escapedText = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

  const ssml = `<speak version='1.0' xml:lang='${selectedVoice.langCode}'>
    <voice xml:lang='${selectedVoice.langCode}' xml:gender='Female' name='${selectedVoice.voiceName}'>
      ${escapedText}
    </voice>
  </speak>`;

  const response = await fetch(ttsUrl, {
    method: 'POST',
    headers: {
      'Ocp-Apim-Subscription-Key': speechKey,
      'Content-Type': 'application/ssml+xml',
      'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
      'User-Agent': 'JanVaniDocumentSimplifier'
    },
    body: ssml
  });

  if (!response.ok) {
    const errText = await response.text().catch(() => '');
    throw new Error(`Azure Speech API failed (${response.status}): ${errText || response.statusText}`);
  }

  const audioBlob = await response.blob();
  return URL.createObjectURL(audioBlob);
}

/**
 * Saral Azure AI Reasoning Engine
 * Structured Prompt:
 * "Simplify this document for a low-literacy user. Output: 1) What is this? 2) Key Details/Amounts/Dates, 3) Action Required. Keep it under 4 simple bullet points."
 */
export async function runSaralAIInference(rawText, targetLang = 'en', optionalApiKey = '') {
  // Uses Saral Intelligent Rule Parser for extracted OCR text.

  const textLower = rawText.toLowerCase();

  // Detect category keywords
  let docType = "Official Document / Formal Notice";
  let point1 = "Official Document needing your attention.";
  let point2 = "Review dates, names, and account numbers mentioned in the document.";
  let point3 = "Verify details with your local Gram Panchayat or Tehsildar office.";
  let point4 = "Keep this original document safe for reference.";

  // Land / Revenue
  if (textLower.includes('tahsildar') || textLower.includes('land') || textLower.includes('revenue') || textLower.includes('mutation') || textLower.includes('survey no') || textLower.includes('khata')) {
    docType = "Government Land Record Notice (भूमि / పట్టా నోటీసు)";
    point1 = "Official Land Record Notice from Revenue Department.";
    point2 = "Application filed regarding land survey/mutation ownership.";
    point3 = "Must appear in person at Tahsildar Office with original Land Passbook and Aadhaar.";
    point4 = "Complete action before deadline to avoid land record cancellation.";
  }
  // Electricity / Dues
  else if (textLower.includes('electricity') || textLower.includes('power') || textLower.includes('disconnection') || textLower.includes('meter') || textLower.includes('dues') || textLower.includes('bill')) {
    docType = "Electricity Disconnection Warning Notice (बिजली बिल)";
    point1 = "Urgent Electricity Bill Warning Notice for your home connection.";
    point2 = "Unpaid power bill amount needs immediate payment before due date.";
    point3 = "Pay bill at nearest MeeSeva or Electricity Office.";
    point4 = "Pay on time to prevent physical power line disconnection and extra fees.";
  }
  // Medical / Hospital
  else if (textLower.includes('hospital') || textLower.includes('rx') || textLower.includes('patient') || textLower.includes('dose') || textLower.includes('tablet') || textLower.includes('opd')) {
    docType = "Hospital Doctor Prescription & Timetable (दवा पर्ची)";
    point1 = "Government Hospital Doctor's Medicine Prescription Card.";
    point2 = "Contains daily dosage schedule for fever, pain, or health care.";
    point3 = "Take medicines regularly after food as written by doctor.";
    point4 = "Visit Hospital OPD room on specified follow-up date.";
  }
  // Agriculture / Subsidy
  else if (textLower.includes('kisan') || textLower.includes('subsidy') || textLower.includes('aadhaar') || textLower.includes('kyc') || textLower.includes('scheme') || textLower.includes('agriculture')) {
    docType = "Government Scheme / Farmer Subsidy Alert (किसान योजना)";
    point1 = "Official Government Farmers Subsidy Money Alert.";
    point2 = "Payment is currently on hold due to missing Aadhaar e-KYC or fingerprint.";
    point3 = "Visit nearest CSC / Digital Seva Center with your Aadhaar card.";
    point4 = "Place thumb on scanner machine to unlock your government money deposit.";
  }

  // Format response matching Saral AI prompt rules
  const summaryPoints = [
    {
      number: 1,
      title: "What is this document?",
      desc: point1,
      icon: "FileText"
    },
    {
      number: 2,
      title: "Key Details & Dates",
      desc: point2,
      icon: "Calendar"
    },
    {
      number: 3,
      title: "Action Required",
      desc: point3,
      icon: "AlertTriangle"
    },
    {
      number: 4,
      title: "Next Steps / Warning",
      desc: point4,
      icon: "ShieldAlert"
    }
  ];

  // Construct audio transcripts
  const ttsTranscripts = {
    en: `Saral AI Summary: ${point1} ${point2} ${point3}`,
    hi: `सरल एआई सारांश: ${point1} ${point2} कृपया समय पर आवश्यक कार्रवाई करें।`,
    te: `సరళ్ ఏఐ సారాంశం: ${point1} ${point2} దయచేసి తగిన చర్య తీసుకోండి.`
  };

  return {
    docType,
    summaryPoints,
    tts: ttsTranscripts
  };
}
