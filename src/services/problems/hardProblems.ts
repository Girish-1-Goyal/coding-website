import { Problem } from '../problemService';

export const hardProblems: Problem[] = [
  {
    id: 'H1',
    name: 'Longest Increasing Path in Matrix',
    difficulty: 'Hard',
    category: ['Dynamic Programming', 'Depth-First Search', 'Matrix'],
    description: `Given an m x n integers matrix, return the length of the longest increasing path in matrix.

From each cell, you can either move in four directions: left, right, up, or down. You may NOT move diagonally or move outside the boundary (i.e., wrap-around is not allowed).

An increasing path is defined as a path where each cell's value is strictly greater than the previous cell's value.`,
    constraints: [
      { description: 'Matrix dimensions', value: '1 ≤ m, n ≤ 200' },
      { description: 'Matrix values', value: '0 ≤ matrix[i][j] ≤ 2^31 - 1' }
    ],
    inputFormat: `First line contains two integers m and n - the dimensions of the matrix
Next m lines contain n space-separated integers each - the matrix values`,
    outputFormat: 'A single integer representing the length of the longest increasing path.',
    testCases: [
      {
        input: `3 3
9 9 4
6 6 8
2 1 1`,
        output: '4',
        explanation: 'Longest path is [1, 2, 6, 9] with length 4'
      },
      {
        input: `3 3
3 4 5
3 2 6
2 2 1`,
        output: '4',
        explanation: 'Longest path is [1, 2, 3, 4] with length 4'
      },
      {
        input: `1 1
1`,
        output: '1',
        explanation: 'Single cell matrix has path length 1'
      },
      {
        input: `5 5
1 2 3 4 5
16 17 18 19 6
15 24 25 20 7
14 23 22 21 8
13 12 11 10 9`,
        output: '25',
        explanation: 'Path follows spiral pattern from 1 to 25'
      },
      {
        input: `3 4
1 2 3 4
8 7 6 5
9 10 11 12`,
        output: '4',
        explanation: 'Multiple possible paths of length 4'
      },
      {
        input: `4 4
1 2 3 4
8 7 6 5
9 10 11 12
16 15 14 13`,
        output: '7',
        explanation: 'Path can traverse up and down'
      },
      {
        input: `3 3
7 7 7
7 7 7
7 7 7`,
        output: '1',
        explanation: 'All equal values, so max path length is 1'
      },
      {
        input: `4 3
1 2 3
8 9 4
7 6 5
10 11 12`,
        output: '12',
        explanation: 'Path follows spiral pattern'
      },
      {
        input: `2 2
1 1
1 1`,
        output: '1',
        explanation: 'All equal values'
      },
      {
        input: `3 3
9 8 7
10 11 6
12 13 14`,
        output: '6',
        explanation: 'Path can go in multiple directions'
      }
    ],
    timeLimit: '2 seconds',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `def longest_increasing_path(matrix: list[list[int]]) -> int:
    # Write your code here
    pass

# Read input
m, n = map(int, input().split())
matrix = []
for _ in range(m):
    row = list(map(int, input().split()))
    matrix.append(row)

# Call function and print result
print(longest_increasing_path(matrix))`,
      javascript: `function longestIncreasingPath(matrix) {
    // Write your code here
}

// Read input
const [m, n] = readline().split(' ').map(Number);
const matrix = [];
for (let i = 0; i < m; i++) {
    matrix.push(readline().split(' ').map(Number));
}

// Call function and print result
console.log(longestIncreasingPath(matrix));`,
    },
    hints: [
      'Consider using DFS with memoization',
      'Each cell can be the start of a path',
      'Cache the results to avoid recalculating paths',
      'Use directions array for movement: [[0,1], [1,0], [0,-1], [-1,0]]'
    ]
  },
  {
    id: 'H2',
    name: 'Regular Expression Matching',
    difficulty: 'Hard',
    category: ['Dynamic Programming', 'String', 'Recursion'],
    description: `Implement regular expression matching with support for '.' and '*' where:
- '.' Matches any single character
- '*' Matches zero or more of the preceding element

The matching should cover the entire input string (not partial).`,
    constraints: [
      { description: 'String length (s)', value: '1 ≤ length ≤ 20' },
      { description: 'Pattern length (p)', value: '1 ≤ length ≤ 30' },
      { description: 'String content', value: 'Contains only lowercase English letters' },
      { description: 'Pattern content', value: 'Contains only lowercase English letters, "." and "*"' }
    ],
    inputFormat: `First line contains string s
Second line contains pattern p`,
    outputFormat: '"true" if the pattern matches the string, "false" otherwise.',
    testCases: [
      {
        input: `aa
a`,
        output: 'false',
        explanation: 'Pattern matches only one "a"'
      },
      {
        input: `aa
a*`,
        output: 'true',
        explanation: '"*" means zero or more of preceding element "a"'
      },
      {
        input: `ab
.*`,
        output: 'true',
        explanation: '".*" means zero or more of any character'
      },
      {
        input: `mississippi
mis*is*p*.`,
        output: 'false',
        explanation: 'Pattern cannot match the string'
      },
      {
        input: `aab
c*a*b`,
        output: 'true',
        explanation: 'c* can match zero occurrences'
      },
      {
        input: `aaa
a*a`,
        output: 'true',
        explanation: 'First a* matches "aa", second a matches last "a"'
      },
      {
        input: `ab
.*c`,
        output: 'false',
        explanation: 'Must match entire string'
      },
      {
        input: `aaa
.*`,
        output: 'true',
        explanation: '.* can match any sequence'
      },
      {
        input: `a
ab*`,
        output: 'true',
        explanation: 'b* can match zero occurrences of b'
      },
      {
        input: `a
.*..a*`,
        output: 'false',
        explanation: 'Pattern is too long for the string'
      }
    ],
    timeLimit: '2 seconds',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `def is_match(s: str, p: str) -> bool:
    # Write your code here
    pass

# Read input
s = input().strip()
p = input().strip()

# Call function and print result
print(str(is_match(s, p)).lower())`,
      javascript: `function isMatch(s, p) {
    // Write your code here
}

// Read input
const s = readline().trim();
const p = readline().trim();

// Call function and print result
console.log(isMatch(s, p).toString());`,
    },
    hints: [
      'Consider using dynamic programming',
      'Handle the "*" case separately',
      'Build a 2D DP table',
      'Base case: empty string matches empty pattern'
    ]
  }
];

// Continue adding more hard problems... 