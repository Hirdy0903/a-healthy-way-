// Emergency helpline information and resources
const helplines = {
  disclaimer: 'MindWell is an educational tool and is NOT a substitute for professional mental health treatment. If you or someone you know is in immediate danger, please call your local emergency number (911 in the US, 112 in the EU, 999 in the UK) immediately.',
  whenToSeekHelp: [
    { situation: 'You are having thoughts of suicide or self-harm', urgency: 'immediate', action: 'Call a crisis helpline or go to your nearest emergency room immediately.' },
    { situation: 'You feel unable to keep yourself safe', urgency: 'immediate', action: 'Tell someone you trust and seek immediate professional help.' },
    { situation: 'Symptoms persist for more than 2 weeks and affect daily functioning', urgency: 'soon', action: 'Schedule an appointment with your university counseling center or a therapist.' },
    { situation: 'Your coping strategies are no longer working', urgency: 'soon', action: 'Talk to a counselor about professional interventions like therapy or medication.' },
    { situation: 'You are using substances to cope with emotional pain', urgency: 'soon', action: 'Reach out to a substance abuse counselor or your university health services.' },
    { situation: 'Your relationships or academic performance are significantly declining', urgency: 'moderate', action: 'Consider speaking with a counselor or academic advisor.' },
  ],
  helplineNumbers: [
    { name: 'National Suicide Prevention Lifeline (US)', number: '988', description: 'Free, confidential 24/7 support for people in distress.', available: '24/7' },
    { name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Free text-based crisis support.', available: '24/7' },
    { name: 'NIMHANS Helpline (India)', number: '080-46110007', description: 'National mental health helpline by NIMHANS.', available: '24/7' },
    { name: 'Vandrevala Foundation (India)', number: '1860-2662-345', description: 'Free mental health counseling in multiple languages.', available: '24/7' },
    { name: 'iCall (India)', number: '9152987821', description: 'Psychosocial helpline by TISS Mumbai.', available: 'Mon-Sat, 8 AM - 10 PM' },
    { name: 'Samaritans (UK)', number: '116 123', description: 'Free emotional support for anyone in the UK.', available: '24/7' },
    { name: 'Kids Helpline (Australia)', number: '1800 55 1800', description: 'Free counseling for young people aged 5-25.', available: '24/7' },
    { name: 'International Association for Suicide Prevention', number: 'https://www.iasp.info/resources/Crisis_Centres/', description: 'Directory of crisis centers worldwide.', available: 'Varies' },
  ],
  universityResources: [
    { title: 'University Counseling Center', description: 'Most universities offer free or low-cost counseling sessions. Check your university website or student services office.' },
    { title: 'Student Health Services', description: 'Your campus health center can provide referrals to psychiatrists and therapists.' },
    { title: 'Peer Support Programs', description: 'Many campuses have trained peer counselors who can provide initial support and guidance.' },
    { title: 'Academic Advisors', description: 'Academic advisors can help with accommodations, reduced course loads, and academic planning during difficult periods.' },
    { title: 'Disability Services', description: 'If you have a diagnosed mental health condition, you may qualify for academic accommodations (extended deadlines, exam modifications).' },
  ],
  selfHelpResources: [
    { title: 'CBT (Cognitive Behavioral Therapy)', description: 'The most evidence-based therapy for anxiety and depression. Many resources are available for self-guided CBT techniques.', link: 'https://www.apa.org/ptsd-guideline/patients-and-families/cognitive-behavioral' },
    { title: 'Mindfulness-Based Stress Reduction (MBSR)', description: 'An 8-week evidence-based program combining mindfulness meditation and yoga.', link: 'https://www.umassmed.edu/cfm/mindfulness-based-programs/' },
    { title: 'Sleep Hygiene Guidelines', description: 'Evidence-based recommendations for improving sleep quality from the Sleep Foundation.', link: 'https://www.sleepfoundation.org/sleep-hygiene' },
  ],
};

export default helplines;
