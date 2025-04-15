import problemsData from '../../src/data/problems.json';

// Cache for processed problems
let processedProblemsCache: Problem[] | null = null;
let problemsByDifficultyCache: Record<string, Problem[]> = {};

export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags?: string[];
  constraints?: string[];
  examples?: {
    input: string;
    output: string;
  }[];
  testCases?: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  hint?: string;
  followUp?: string;
}

interface LeetCodeQuestion {
  questionId: string;
  title: string;
  content: string | null;
  difficulty: string;
  topicTags: Array<{ name: string }>;
  hints?: string[];
}

interface LeetCodeProblem {
  data: {
    question: LeetCodeQuestion;
  };
}

const validateProblemData = (data: any): data is LeetCodeProblem => {
  return (
    data &&
    typeof data === 'object' &&
    data.data &&
    data.data.question &&
    typeof data.data.question.questionId === 'string' &&
    typeof data.data.question.title === 'string' &&
    (typeof data.data.question.content === 'string' || data.data.question.content === null) &&
    typeof data.data.question.difficulty === 'string' &&
    Array.isArray(data.data.question.topicTags)
  );
};

const cleanHtmlContent = (content: string): string => {
  return content
    .replace(/<p>/g, '\n')
    .replace(/<\/p>/g, '')
    .replace(/<pre>/g, '')
    .replace(/<\/pre>/g, '')
    .replace(/<strong>/g, '')
    .replace(/<\/strong>/g, '')
    .replace(/<em>/g, '')
    .replace(/<\/em>/g, '')
    .replace(/<code>/g, '`')
    .replace(/<\/code>/g, '`')
    .replace(/<span[^>]*>/g, '')
    .replace(/<\/span>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/\n\s*\n/g, '\n')
    .trim();
};

const extractConstraints = (content: string | null): string[] => {
  if (!content) return [];
  
  const constraintsSection = content.split('Constraints:')[1]?.split(/Follow-up:|Example|$/, 1)[0];
  if (!constraintsSection) return [];
  
  return constraintsSection
    .split('\n')
    .map(line => cleanHtmlContent(line))
    .filter(line => line.trim().length > 0);
};

const extractExamples = (content: string | null): { input: string; output: string }[] => {
  if (!content) return [];

  const examples: { input: string; output: string }[] = [];
  const exampleBlocks = content.match(/Input:[\s\S]*?Output:[\s\S]*?(?=Input:|$)/g) || [];

  for (const block of exampleBlocks) {
    const inputMatch = block.match(/Input:\s*([\s\S]*?)(?=Output:)/);
    const outputMatch = block.match(/Output:\s*([\s\S]*?)(?=Input:|$)/);

    if (inputMatch?.[1] && outputMatch?.[1]) {
      examples.push({
        input: cleanHtmlContent(inputMatch[1]),
        output: cleanHtmlContent(outputMatch[1])
      });
    }
  }

  return examples;
};

const extractFollowUp = (content: string | null): string | undefined => {
  if (!content) return undefined;
  
  const followUpMatch = content.match(/Follow-up:[\s\S]*?<\/p>/i);
  return followUpMatch 
    ? followUpMatch[0]
        .replace(/Follow-up:/i, '')
        .replace(/<[^>]*>/g, '')
        .trim() 
    : undefined;
};

const processLeetCodeProblem = (problem: any): Problem | null => {
  if (!validateProblemData(problem)) return null;
  
  const question = problem.data.question;
  try {
    const cleanedContent = question.content ? cleanHtmlContent(question.content) : '';
    return {
      id: question.questionId,
      title: question.title,
      description: cleanedContent,
      difficulty: question.difficulty as 'Easy' | 'Medium' | 'Hard',
      tags: question.topicTags.map(tag => tag.name),
      constraints: extractConstraints(question.content),
      examples: extractExamples(question.content),
      testCases: extractExamples(question.content),
      hint: question.hints?.[0] ? cleanHtmlContent(question.hints[0]) : undefined,
      followUp: question.content ? extractFollowUp(question.content) : undefined
    };
  } catch (error) {
    console.error('Error processing problem:', question.questionId, error);
    return null;
  }
};

export const getProblems = (): Problem[] => {
  // Return cached problems if available
  if (processedProblemsCache) {
    return processedProblemsCache;
  }

  try {
    console.log('Loading problems from JSON...');
    if (!Array.isArray(problemsData)) {
      console.error('Problems data is not an array:', typeof problemsData);
      return [];
    }

    const validProblems = problemsData
      .map(processLeetCodeProblem)
      .filter((p): p is Problem => p !== null);

    // Cache the processed problems
    processedProblemsCache = validProblems;
    
    // Pre-cache problems by difficulty
    problemsByDifficultyCache = {
      Easy: validProblems.filter(p => p.difficulty === 'Easy'),
      Medium: validProblems.filter(p => p.difficulty === 'Medium'),
      Hard: validProblems.filter(p => p.difficulty === 'Hard')
    };

    console.log(`Successfully processed ${validProblems.length} problems`);
    return validProblems;
  } catch (error) {
    console.error('Error loading problems:', error);
    return [];
  }
};

export const getProblemsByDifficulty = (difficulty: 'Easy' | 'Medium' | 'Hard'): Problem[] => {
  // Return cached problems by difficulty if available
  if (problemsByDifficultyCache[difficulty]) {
    return problemsByDifficultyCache[difficulty];
  }

  // If not cached, get all problems and filter
  const allProblems = getProblems();
  const filteredProblems = allProblems.filter(p => p.difficulty === difficulty);
  problemsByDifficultyCache[difficulty] = filteredProblems;
  return filteredProblems;
};

export const getProblemById = (problemId: string): Problem | null => {
  // First check the cache
  if (processedProblemsCache) {
    const cachedProblem = processedProblemsCache.find(p => p.id === problemId);
    if (cachedProblem) return cachedProblem;
  }

  try {
    if (!Array.isArray(problemsData)) {
      console.error('Invalid problems data structure in getProblemById');
      return null;
    }

    const problem = problemsData.find(p => 
      validateProblemData(p) && p.data.question.questionId === problemId
    );

    if (!problem) {
      console.log(`Problem not found with ID: ${problemId}`);
      return null;
    }

    return processLeetCodeProblem(problem);
  } catch (error) {
    console.error('Error finding problem:', error);
    return null;
  }
}; 