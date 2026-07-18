export const hunterProfile = {
  name: 'K. Praveen Kumar',
  title: 'Data Science Student · Data Analyst & AI Developer',
  location: 'Bengaluru, India',
  email: 'praveenkumar2542@gmail.com',
  github: 'https://github.com/praveen-pk021',
  linkedin: 'https://linkedin.com/in/praveenkumar-pk21',
  website: 'https://praveenportfolio.pages.dev/',
  summary:
    'Data Science undergraduate at CMR University with a strong foundation in Python, SQL, Machine Learning, and Data Analytics. I build practical software through analytical thinking, web development, and data-driven problem solving.',
} as const

export const hunterSkills = [
  'Python',
  'SQL',
  'JavaScript',
  'Flask',
  'REST APIs',
  'Pandas',
  'Machine Learning',
  'Power BI',
  'MySQL',
  'Git & GitHub',
] as const

interface HunterProject {
  readonly title: string
  readonly rank: string
  readonly description: string
  readonly stack: string
  readonly demo?: string
  readonly github?: string
}

export const hunterProjects: readonly HunterProject[] = [
  {
    title: 'Smart Expense Tracker',
    rank: 'A',
    description:
      'Expense tracking application that categorizes transactions with machine learning and a rule-based fallback, with monthly analysis through Flask and MySQL.',
    stack: 'Python · Flask · MySQL · Scikit-learn',
  },
  {
    title: 'Campus Placement Predictor & Skill Gap Analyzer',
    rank: 'S',
    description:
      'Streamlit application that predicts placement chances and identifies growth areas by comparing a student profile with placed candidates.',
    stack: 'Python · Pandas · Scikit-learn · Streamlit',
    demo: 'https://skillanalyzer-iwo5ypypmjguzzjkq4dnwe.streamlit.app/',
    github: 'https://github.com/praveen-pk021/skill_analyzer',
  },
  {
    title: 'Retail Sales & Customer Insights Dashboard',
    rank: 'S',
    description:
      'Interactive dashboard for 100K+ Brazilian e-commerce orders, using SQL, a SQLite pipeline, KPI visualisations, and filterable analysis.',
    stack: 'Python · SQL · SQLite · Streamlit · Pandas',
    demo: 'https://retail-sales-customer-dashboard-s6bnjekbt2dxivljxmzr9c.streamlit.app/',
    github: 'https://github.com/praveen-pk021/retail-sales-customer-dashboard',
  },
  {
    title: 'RFID Door Lock System',
    rank: 'B',
    description: 'Secure RFID-based access control system for authorised entry.',
    stack: 'Arduino UNO · RFID Module',
  },
] as const

export const hunterEducation = [
  'B.Tech in Data Science · CMR University · 2023–2027',
  'Intermediate (MPC) · Narayana Junior College · 93%',
  'SSC · Sri Lakshmi High School · 100%',
] as const

export const hunterCertificates = [
  [
    'Web Development Fundamentals · IBM',
    'https://drive.google.com/file/d/19_5PWt4vYaIWAJjoHDJxceAc2Ygl9wqq/view',
  ],
  [
    'Data Analysis with Python · IBM SkillsBuild',
    'https://drive.google.com/file/d/14JmPgH91Rwo_OTSXJZHlzfjU9_ZqQhlk/view?usp=sharing',
  ],
  [
    'Deloitte Australia Data Analytics Job Simulation · Forage',
    'https://drive.google.com/file/d/1RjuWY_rGM4EgE6nBYPfsafWQaALv5JoF/view?usp=sharing',
  ],
  [
    'Google Analytics Certification · Google',
    'https://drive.google.com/file/d/1-AOQcP-WZsRDEoQc8VRk0hPQd87sLBds/view',
  ],
  [
    'GenAI Powered Data Analytics Job Simulation · Forage',
    'https://drive.google.com/file/d/14chMXSc1n_bZzDuXg9KU56kcuYKBa1Uu/view?usp=sharing',
  ],
  [
    'Green Skills and Artificial Intelligence',
    'https://drive.google.com/file/d/1KiV4XdXQ99v3m46XhO_ic2QW2RgWHyj6/view?usp=sharing',
  ],
] as const
