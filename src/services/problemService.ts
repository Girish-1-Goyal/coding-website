export interface TestCase {
  input: string;
  output: string;
  explanation?: string;
}

export interface Constraint {
  description: string;
  value: string;
}

export interface Problem {
  id: string;
  name: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string[];
  description: string;
  constraints: Constraint[];
  inputFormat: string;
  outputFormat: string;
  testCases: TestCase[];
  timeLimit: string;
  memoryLimit: string;
  sampleCode: {
    python?: string;
    javascript?: string;
    cpp?: string;
    java?: string;
  };
  hints: string[];
  solution?: string;
  explanation?: string;
}

// Categories for better organization
export const categories = [
  'Arrays',
  'Strings',
  'Linked Lists',
  'Stacks & Queues',
  'Trees',
  'Graphs',
  'Dynamic Programming',
  'Sorting & Searching',
  'Math',
  'Implementation',
  'Greedy',
  'Two Pointers',
  'Binary Search',
  'Recursion',
  'Bit Manipulation'
];

// Load problems from JSON file
import problemsData from '../data/problems.json';

const problems: Problem[] = (problemsData.problems as Problem[]).map(p => ({
  ...p,
  difficulty: p.difficulty as 'Easy' | 'Medium' | 'Hard'
}));

export const getAllProblems = (): Problem[] => {
  return problems;
};

export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] => {
  return problems.filter(problem => problem.difficulty === difficulty);
};

export const getProblemById = (id: string): Problem | undefined => {
  return problems.find(problem => problem.id === id);
};

export const getProblemsByCategory = (category: string): Problem[] => {
  return problems.filter(problem => problem.category.includes(category));
}; 