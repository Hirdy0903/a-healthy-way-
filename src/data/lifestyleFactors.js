// Lifestyle & Biological Factors affecting student mental health
// Scientifically structured explanations

const lifestyleFactors = [
  {
    id: 'sleep-cycle-disruption',
    title: 'Sleep Cycle Disruption',
    subtitle: 'Circadian Rhythm & Academic Performance',
    icon: '😴',
    color: 'from-indigo-500 to-blue-600',
    bgColor: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    overview:
      'The circadian rhythm is your body\'s internal 24-hour clock, regulated by the suprachiasmatic nucleus (SCN) in the hypothalamus. This clock controls sleep-wake cycles, hormone release, body temperature, and cognitive function. Students frequently disrupt this cycle through irregular schedules, late-night studying, and excessive screen use.',
    scienceExplanation: [
      {
        heading: 'How the Circadian Rhythm Works',
        content: 'Light entering the eyes signals the SCN to suppress melatonin production (the sleep hormone) during the day and increase it at night. This cycle takes approximately 24.2 hours and is reset daily by light exposure. Disrupting this cycle — through irregular sleep times or artificial light at night — desynchronizes the body\'s internal processes.',
      },
      {
        heading: 'Sleep Architecture',
        content: 'A complete sleep cycle lasts ~90 minutes and includes 4 stages: N1 (light sleep), N2 (consolidation), N3 (deep/restorative sleep), and REM (dreaming/memory). You need 4-6 complete cycles per night (7-9 hours). Cutting sleep short eliminates later REM cycles critical for learning and emotional regulation.',
      },
      {
        heading: 'Impact on Learning',
        content: 'During N3 sleep, the brain replays and consolidates information learned during the day through a process called memory consolidation. During REM sleep, the brain processes emotional memories and integrates new knowledge with existing schemas. Students who pull all-nighters retain 40% less information than those who sleep.',
      },
    ],
    studentImpact: [
      'Delayed Sleep Phase Syndrome — natural tendency to sleep later shifts further in college, making early classes difficult',
      'Social jet lag — sleeping until noon on weekends and waking at 7 AM on weekdays creates a 5+ hour rhythm disruption',
      'All-nighter culture — cramming leads to acute sleep deprivation, with cognitive performance equivalent to legal intoxication (BAC 0.05%)',
      'Caffeine dependency cycle — using stimulants to compensate for poor sleep further disrupts nighttime sleep quality',
    ],
    recommendations: [
      { title: 'Anchor Your Wake Time', description: 'Choose a consistent wake time (±30 min) 7 days a week. This is the single most effective circadian intervention.' },
      { title: 'Morning Light Exposure', description: 'Get 10-15 minutes of bright light within 30 minutes of waking. This strongly entrains your circadian clock.' },
      { title: 'Digital Curfew', description: 'Stop screens 60 minutes before bed. Blue light (460nm wavelength) is the strongest melatonin suppressant.' },
      { title: 'Strategic Napping', description: 'If needed, nap for 20 minutes (avoid entering deep sleep) before 3 PM. Longer naps disrupt nighttime sleep.' },
      { title: 'Sleep Banking', description: 'Before exams, extend sleep to 9 hours for a week. This builds cognitive reserves and improves memory consolidation.' },
    ],
  },
  {
    id: 'vitamin-deficiencies',
    title: 'Vitamin Deficiencies',
    subtitle: 'Vitamin D, B12 & Iron',
    icon: '💊',
    color: 'from-green-500 to-emerald-600',
    bgColor: 'bg-green-50',
    textColor: 'text-green-700',
    overview:
      'Nutritional deficiencies are widespread among college students due to poor dietary choices, limited budgets, and indoor lifestyles. Three deficiencies — Vitamin D, Vitamin B12, and Iron — have the strongest evidence-based links to mental health symptoms including depression, fatigue, cognitive impairment, and anxiety.',
    scienceExplanation: [
      {
        heading: 'Vitamin D & Mental Health',
        content: 'Vitamin D receptors exist throughout the brain, particularly in areas involved in mood regulation (prefrontal cortex, hippocampus). Vitamin D influences serotonin synthesis — the "feel good" neurotransmitter. Studies show that people with low Vitamin D (<20 ng/mL) have a 2.4x higher risk of depression. Students who spend most time indoors are especially vulnerable.',
      },
      {
        heading: 'Vitamin B12 & Neurological Function',
        content: 'B12 is essential for myelin sheath formation (nerve insulation), DNA synthesis, and red blood cell production. Deficiency causes fatigue, brain fog, memory problems, numbness/tingling, and depression. Vegetarian and vegan students are at highest risk since B12 is primarily found in animal products. Deficiency can take years to manifest and may cause irreversible nerve damage if untreated.',
      },
      {
        heading: 'Iron & Cognitive Performance',
        content: 'Iron is required for hemoglobin production (oxygen transport) and is a cofactor in dopamine synthesis. Iron deficiency — the world\'s most common nutritional deficiency — causes fatigue, poor concentration, reduced physical endurance, and depressive symptoms. Female students lose iron through menstruation and are 3x more likely to be deficient than male students.',
      },
    ],
    studentImpact: [
      'Indoor lifestyle (library, dorms, classrooms) reduces Vitamin D synthesis from sunlight',
      'Budget constraints push students toward processed, nutrient-poor foods',
      'Skipping meals — 35% of students skip breakfast regularly, reducing nutrient intake',
      'Restrictive diets (veganism, dieting) without proper supplementation create deficiency risks',
    ],
    recommendations: [
      { title: 'Vitamin D', description: 'Get 15-20 min of midday sun exposure when possible. Consider 1000-2000 IU daily supplementation, especially in winter or if you spend most time indoors.' },
      { title: 'Vitamin B12', description: 'If vegetarian/vegan, supplement with 250-500 mcg daily or eat fortified foods (nutritional yeast, fortified plant milks). Get levels tested annually.' },
      { title: 'Iron Intake', description: 'Eat iron-rich foods: lentils, spinach, fortified cereals, red meat. Pair with Vitamin C (citrus, bell peppers) to enhance absorption. Avoid tea/coffee with iron-rich meals (tannins inhibit absorption).' },
      { title: 'Regular Blood Work', description: 'Request a basic blood panel annually including Vitamin D, B12, iron/ferritin, and complete blood count. Early detection prevents serious complications.' },
    ],
  },
  {
    id: 'screen-addiction',
    title: 'Screen Addiction & Dopamine',
    subtitle: 'Digital Overuse & Reward System Hijacking',
    icon: '📱',
    color: 'from-orange-500 to-red-600',
    bgColor: 'bg-orange-50',
    textColor: 'text-orange-700',
    overview:
      'The average college student spends 8-10 hours daily on screens outside of academic work. Social media, gaming, and streaming platforms are designed using behavioral psychology to maximize engagement. This constant stimulation hijacks the brain\'s dopamine reward system, creating patterns similar to behavioral addiction.',
    scienceExplanation: [
      {
        heading: 'The Dopamine Reward System',
        content: 'Dopamine is released not when you receive a reward, but in anticipation of one. Social media notifications, likes, and algorithmic feeds create unpredictable reward schedules (variable-ratio reinforcement) — the same mechanism that makes gambling addictive. Each notification triggers a small dopamine spike, training the brain to compulsively check.',
      },
      {
        heading: 'Dopamine Tolerance & Baseline Drop',
        content: 'Constant stimulation downregulates dopamine receptors, requiring more stimulation for the same pleasure (tolerance). Over time, baseline dopamine drops, making everyday activities (studying, reading, conversation) feel boring and unsatisfying. This creates a cycle where you need screens to feel "normal" — a hallmark of behavioral addiction.',
      },
      {
        heading: 'Impact on the Prefrontal Cortex',
        content: 'Excessive screen use reduces gray matter volume in the prefrontal cortex — the brain region responsible for impulse control, decision-making, and sustained attention. Studies show that heavy smartphone users perform worse on cognitive tasks and have thinner cortical regions associated with attention.',
      },
    ],
    studentImpact: [
      'Task-switching costs: checking your phone for "just a second" takes 23 minutes on average to fully refocus',
      'Social comparison on Instagram/TikTok correlates with increased depression, anxiety, and body dissatisfaction',
      'Doom scrolling before bed delays sleep onset by 30-60 minutes due to cognitive arousal and blue light',
      'Phantom vibration syndrome: 89% of students report feeling vibrations from their phone when none occurred',
    ],
    recommendations: [
      { title: 'Dopamine Detox Periods', description: 'Designate 2-4 hours daily as "low-dopamine time." No social media, no streaming, no gaming. Study, walk, cook, or have face-to-face conversations.' },
      { title: 'App Timers & Blockers', description: 'Set daily time limits: 30 min max for social media. Use tools like Freedom, Cold Turkey, or built-in Screen Time. Delete infinite-scroll apps during exam periods.' },
      { title: 'Phone-Free Zones', description: 'Keep your phone out of your bedroom and out of sight during study sessions. Physical distance is more effective than willpower.' },
      { title: 'Notification Audit', description: 'Turn off ALL non-essential notifications. Keep only calls, messages from close contacts, and calendar alerts. Check apps on your schedule, not theirs.' },
      { title: 'Analog Alternatives', description: 'Replace screen activities with analog equivalents: physical books, board games, journaling with pen and paper, in-person socializing.' },
    ],
  },
  {
    id: 'physical-inactivity',
    title: 'Physical Inactivity',
    subtitle: 'Sedentary Lifestyle & Mental Health',
    icon: '🏃',
    color: 'from-cyan-500 to-blue-600',
    bgColor: 'bg-cyan-50',
    textColor: 'text-cyan-700',
    overview:
      'Physical inactivity has been called "the new smoking" by researchers due to its extensive health consequences. College students are particularly sedentary — sitting in classes, studying at desks, and consuming entertainment on screens. Regular physical activity is one of the most powerful, evidence-based interventions for mental health.',
    scienceExplanation: [
      {
        heading: 'Exercise & Neurotransmitters',
        content: 'Physical activity increases the production of serotonin, dopamine, norepinephrine, and endorphins — the brain\'s natural mood regulators. A single bout of exercise can increase serotonin levels for up to 48 hours. Regular exercise has been shown to be as effective as antidepressant medication for mild-to-moderate depression in multiple clinical trials.',
      },
      {
        heading: 'BDNF & Brain Growth',
        content: 'Exercise stimulates the release of Brain-Derived Neurotrophic Factor (BDNF), a protein that promotes the growth of new neurons (neurogenesis) in the hippocampus — the brain\'s memory center. Higher BDNF levels are associated with better memory, faster learning, and protection against neurodegenerative diseases.',
      },
      {
        heading: 'Stress Hormone Regulation',
        content: 'Regular exercise reduces baseline cortisol levels and improves the body\'s stress response system (HPA axis). After consistent exercise for 6+ weeks, the body becomes more efficient at managing stress — cortisol rises less sharply during stressful events and returns to baseline faster.',
      },
    ],
    studentImpact: [
      'The average student sits for 11.5 hours per day (classes + studying + leisure)',
      'Only 20% of college students meet WHO recommended activity levels (150 min/week moderate exercise)',
      'Sedentary behavior independently increases risk of depression by 25%, regardless of other factors',
      'Physical inactivity impairs blood flow to the brain, reducing cognitive performance by up to 15%',
    ],
    recommendations: [
      { title: 'Start Small', description: 'Begin with 10-minute daily walks. Research shows that even small amounts of movement provide mental health benefits. Gradually increase to 30 minutes.' },
      { title: 'Movement Snacking', description: 'Incorporate 2-3 minute movement breaks every 30 minutes of sitting. Stand up, stretch, do 10 squats or walk to fill your water bottle.' },
      { title: 'Social Exercise', description: 'Join a recreational sports team, yoga class, or running club. Social exercise provides both physical and social mental health benefits.' },
      { title: 'Active Transportation', description: 'Walk or bike to campus instead of driving or taking the bus. This builds exercise into your routine without extra time.' },
      { title: 'Habit Stacking', description: 'Link exercise to existing habits: "After my 10 AM class, I will take a 15-minute walk before lunch." This leverages existing neural pathways.' },
    ],
  },
];

export default lifestyleFactors;
