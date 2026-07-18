import type { AscensionMilestone } from '@/modules/ascension/types/AscensionTypes'

/** Evidence-led growth record derived from the public hunter profile. */
export const timeline: readonly AscensionMilestone[] = [
  {
    id: 'foundation',
    title: 'Data Science foundation',
    date: '2023',
    description:
      'Started B.Tech studies in Data Science at CMR University, building the analytical and programming foundation for a hunter-class career.',
    state: 'completed',
    skills: ['Python', 'SQL', 'Data Analysis'],
  },
  {
    id: 'expense-tracker',
    title: 'Smart Expense Tracker cleared',
    date: '2024',
    description:
      'Built an expense tracking application with machine-learning categorisation, Flask, and MySQL.',
    state: 'completed',
    skills: ['Python', 'Flask', 'MySQL', 'Scikit-learn'],
  },
  {
    id: 'skill-analyzer',
    title: 'Placement Skill Analyzer deployed',
    date: '2025',
    description:
      'Created a Streamlit application that predicts placement chances and identifies practical skill gaps.',
    state: 'completed',
    skills: ['Pandas', 'Scikit-learn', 'Streamlit'],
    evidenceUrl: 'https://github.com/praveen-pk021/skill_analyzer',
  },
  {
    id: 'retail-insights',
    title: 'Retail Insights dashboard unlocked',
    date: '2025',
    description:
      'Analysed more than 100K e-commerce orders through a SQL-backed interactive dashboard.',
    state: 'completed',
    skills: ['SQL', 'SQLite', 'Pandas', 'Data Visualisation'],
  },
  {
    id: 'internship',
    title: 'Industry expedition',
    date: 'Next quest',
    description:
      'Target an internship where data analysis and AI development can be applied to production problems.',
    state: 'future',
    skills: ['Collaboration', 'Production analytics'],
  },
]
