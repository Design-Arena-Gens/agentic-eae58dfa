import { mulberry32, pick, seededShuffle } from './random';

export type GradeBand = 'KG' | '1' | '2' | '3' | '4' | '5';
export type Subject = 'English' | 'Maths' | 'EVS' | 'Art' | 'General Knowledge' | 'Hindi';
export type Region = 'CBSE' | 'ICSE' | 'State Board';

export type LessonPlanInput = {
  topic: string;
  grade: GradeBand;
  subject: Subject;
  region: Region;
  language: 'English' | 'Hinglish' | 'Hindi';
  durationMins: number;
  focus: 'Creative thinking' | 'Values' | 'Foundational literacy' | 'Foundational numeracy' | 'Art integration';
  seed?: number;
};

export type WorksheetInput = {
  topic: string;
  grade: GradeBand;
  subject: Subject;
  language: 'English' | 'Hinglish' | 'Hindi';
  seed?: number;
};

export type Scene = {
  title: string;
  text: string;
  palette: string[];
  motif: 'school' | 'park' | 'river' | 'village' | 'festival' | 'family';
  sky: 'dawn' | 'day' | 'sunset' | 'night';
  seed: number;
};

function hindiify(text: string): string {
  // Lightweight Hindi/Hinglish stylizer without external APIs
  // Not a translation; swaps some words and adds Indian classroom flavor
  return text
    .replace(/children/gi, 'bachche')
    .replace(/students/gi, 'students')
    .replace(/teacher/gi, 'teacher')
    .replace(/hello/gi, 'namaste')
    .replace(/friend/gi, 'dost')
    .replace(/story/gi, 'kahani');
}

function localize(text: string, lang: 'English'|'Hinglish'|'Hindi') {
  if (lang === 'English') return text;
  if (lang === 'Hinglish') return hindiify(text);
  // "Hindi" option: keep same stylization here for offline mode
  return hindiify(text);
}

export function generateLessonPlan(input: LessonPlanInput): string {
  const seed = input.seed ?? Math.floor(Math.random() * 1e9);
  const rand = mulberry32(seed);

  const openers = [
    `Start with a warm namaste and a short brain teaser related to ${input.topic}.`,
    `Begin with a quick story hook about ${input.topic} to spark curiosity.`,
    `Use a real-life example from Indian context to introduce ${input.topic}.`,
  ];

  const activities = [
    `Pair activity: students discuss where they see ${input.topic} in daily life (bazaar, home, school).`,
    `Art-integrated task: draw a scene showing ${input.topic} and label key ideas.`,
    `Movement game: stand up when you hear a correct example of ${input.topic}.`,
    `Group work: create a 1-minute skit to explain ${input.topic}.`,
    `Learning station: rotate across 3 tables with puzzles about ${input.topic}.`,
  ];

  const assessments = [
    `Exit ticket: One thing I learnt, one question I still have.`,
    `Peer check: exchange notebooks and verify with a simple rubric.`,
    `Quick oral round: 5 rapid-fire questions in a circle.`,
  ];

  const values = {
    'Creative thinking': 'Encourage novel ideas, accept many answers, celebrate attempts.',
    'Values': 'Highlight respect, teamwork, honesty through examples and stories.',
    'Foundational literacy': 'Focus on clear keywords, phonics, read-aloud moments.',
    'Foundational numeracy': 'Use concrete objects, tally marks, number lines on floor.',
    'Art integration': 'Use colour, rhythm, roleplay to make concepts memorable.'
  } as const;

  const opener = pick(openers, rand);
  const selectedActivities = seededShuffle(activities, rand).slice(0, 3);
  const assessment = pick(assessments, rand);

  const minutes = input.durationMins;
  const split = [Math.max(5, Math.floor(minutes * 0.2)), Math.max(10, Math.floor(minutes * 0.6)), Math.max(5, minutes - Math.floor(minutes * 0.2) - Math.floor(minutes * 0.6))];

  const plan = `Lesson Plan: ${input.subject} ? Grade ${input.grade} ? ${input.region}\nTopic: ${input.topic}\nDuration: ${minutes} mins\nFocus: ${input.focus}\n\n1) Warm-up (${split[0]} mins)\n- ${opener}\n\n2) Main Learning (${split[1]} mins)\n- ${selectedActivities.join('\n- ')}\n\n3) Check for Understanding (${split[2]} mins)\n- ${assessment}\n\nMaterials: chart paper, sketch pens, chalk, floor space\nDifferentiation: buddy support, visual cues, simple sentence frames\nTeacher Tip: ${values[input.focus]}\n`;

  return localize(plan, input.language);
}

export function generateWorksheet(input: WorksheetInput): string {
  const seed = input.seed ?? Math.floor(Math.random() * 1e9);
  const rand = mulberry32(seed);

  const formats = [
    'Fill in the blanks',
    'Match the pairs',
    'Circle the correct option',
    'Short answer',
    'Draw and label'
  ];
  const picked = seededShuffle(formats, rand).slice(0, 4);

  const questions: string[] = [];
  for (let i = 1; i <= 8; i++) {
    const style = pick(picked, rand);
    const q = `${i}. (${style}) ${input.topic}: ` + (
      style === 'Fill in the blanks' ? '_____ is an example from your home or school.' :
      style === 'Match the pairs' ? 'Match terms with meanings about the topic.' :
      style === 'Circle the correct option' ? 'Choose the best answer from A/B/C.' :
      style === 'Short answer' ? 'Answer in one or two sentences with your own words.' :
      'Make a small drawing and label two parts.'
    );
    questions.push(q);
  }

  const sheet = `Worksheet: ${input.subject ?? 'General'} ? Grade ${input.grade ?? ''}\nTopic: ${input.topic}\n\nInstructions: Read carefully. Ask a friend or teacher if you need help.\n\n${questions.join('\n')}\n\nBonus: Teach one question to your partner.`;
  return localize(sheet, input.language);
}

const PALETTES: string[][] = [
  ['#FDE68A','#FCA5A5','#93C5FD','#A7F3D0','#FBCFE8'],
  ['#FDE047','#86EFAC','#93C5FD','#F9A8D4','#FBD5CE'],
  ['#A5B4FC','#C7D2FE','#6EE7B7','#FDE68A','#FCA5A5'],
  ['#F59E0B','#84CC16','#22D3EE','#A78BFA','#F472B6']
];

const MOTIFS: Scene['motif'][] = ['school','park','river','village','festival','family'];
const SKIES: Scene['sky'][] = ['dawn','day','sunset','night'];

export function generateStoryScenes(topic: string, grade: GradeBand, language: 'English'|'Hinglish'|'Hindi', seed?: number): Scene[] {
  const s = seed ?? Math.floor(Math.random() * 1e9);
  const rand = mulberry32(s);
  const palette = pick(PALETTES, rand);
  const motif = pick(MOTIFS, rand);
  const sky = pick(SKIES, rand);

  const narrate = (i: number) => {
    const lines = [
      `In a cheerful ${motif}, children discover ${topic} in a simple way.`,
      `They observe, share ideas, and try small tasks together.`,
      `A little challenge appears, but teamwork saves the day.`,
      `They relate ${topic} to home and school life.`,
      `A festival-like joy spreads when everyone understands.`,
      `They say namaste and promise to use ${topic} kindly.`
    ];
    return lines[i];
  };

  const scenes: Scene[] = Array.from({ length: 6 }, (_, i) => ({
    title: i === 0 ? `The ${topic} Adventure` : `Scene ${i+1}`,
    text: narrate(i),
    palette,
    motif,
    sky,
    seed: Math.floor(rand() * 1e9)
  }));

  return scenes.map(sc => ({...sc, text: localize(sc.text, language), title: localize(sc.title, language)}));
}

export function renderSceneSVG(scene: Scene, width = 480, height = 300): string {
  const rand = mulberry32(scene.seed);
  const skyGrad = scene.sky === 'dawn' ? ['#ffedd5', '#93c5fd'] : scene.sky === 'day' ? ['#93c5fd', '#e0f2fe'] : scene.sky === 'sunset' ? ['#fde68a', '#fca5a5'] : ['#0f172a', '#1f2937'];

  const hills = Array.from({length: 3}, (_, i) => {
    const h = height * (0.5 + 0.15 * i + rand() * 0.05);
    const color = scene.palette[i % scene.palette.length] + Math.floor(180 + rand() * 60).toString(16).slice(0,2);
    return { h, color };
  });

  const buildings = Array.from({length: 5}, (_, i) => {
    const x = 20 + i * (width/6) + rand() * 10;
    const w = 20 + rand() * 30;
    const h = 40 + rand() * 60;
    const fill = scene.palette[(i+1) % scene.palette.length];
    return { x, w, h, fill };
  });

  const stars = Array.from({length: scene.sky === 'night' ? 40 : 8}, () => ({
    x: Math.floor(rand()*width), y: Math.floor(rand()*height*0.6), r: rand()*1.8 + 0.3
  }));

  const sunMoon = scene.sky === 'night'
    ? `<circle cx="${width-60}" cy="60" r="16" fill="#e5e7eb" opacity="0.9" />`
    : `<circle cx="${width-60}" cy="60" r="18" fill="#fde68a" />`;

  const people = Array.from({length: 6}, (_, i) => ({
    x: 40 + i*60 + rand()*12, y: height - 60 - rand()*20, c: scene.palette[(i+2)%scene.palette.length]
  }));

  const riverY = height - 40;
  const river = scene.motif === 'river' ? `<rect x="0" y="${riverY}" width="${width}" height="40" fill="#60a5fa" opacity="0.9" />` : '';

  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="sky" x1="0" x2="0" y1="0" y2="1">
      <stop offset="0%" stop-color="${skyGrad[0]}" />
      <stop offset="100%" stop-color="${skyGrad[1]}" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="${width}" height="${height}" fill="url(#sky)" />
  ${stars.map(s => `<circle cx="${s.x}" cy="${s.y}" r="${s.r}" fill="#fff" opacity="${scene.sky==='night'?1:0.4}" />`).join('')}
  ${sunMoon}
  ${hills.map((h,i)=>`<ellipse cx="${width/2 + i*30}" cy="${h.h}" rx="${width*0.7}" ry="${height*0.5}" fill="${scene.palette[i%scene.palette.length]}" opacity="0.15" />`).join('')}
  ${scene.motif==='school' ? buildings.map(b => `<rect x="${b.x}" y="${height-80-b.h}" width="${b.w}" height="${b.h}" fill="${b.fill}" opacity="0.6" />`).join('') : ''}
  ${river}
  ${people.map(p => `<g>
    <circle cx="${p.x}" cy="${p.y}" r="10" fill="#fde68a" />
    <rect x="${p.x-8}" y="${p.y+10}" width="16" height="20" fill="${p.c}" rx="3" />
  </g>`).join('')}
  <text x="16" y="28" fill="#0b1020" opacity="0.4" font-size="14" font-weight="700">${scene.title}</text>
</svg>`;
}
