import { Problem } from '../problemService';

export const easyProblems: Problem[] = [
  {
    id: 'E1',
    name: 'Sum of Two Numbers',
    difficulty: 'Easy',
    category: ['Implementation', 'Math'],
    description: `Given two integers a and b, find their sum.
    
This is a basic problem to help you understand input/output operations and simple arithmetic operations in programming.`,
    constraints: [
      { description: 'Range of input integers', value: '-1000 ≤ a, b ≤ 1000' }
    ],
    inputFormat: 'Two space-separated integers a and b.',
    outputFormat: 'A single integer representing the sum of a and b.',
    testCases: [
      {
        input: '2 3',
        output: '5',
        explanation: '2 + 3 = 5'
      },
      {
        input: '-5 7',
        output: '2',
        explanation: '-5 + 7 = 2'
      },
      {
        input: '0 0',
        output: '0',
        explanation: '0 + 0 = 0'
      },
      {
        input: '1000 -1000',
        output: '0',
        explanation: '1000 + (-1000) = 0'
      },
      {
        input: '-15 -25',
        output: '-40',
        explanation: '-15 + (-25) = -40'
      }
    ],
    timeLimit: '1 second',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `def sum_two_numbers(a: int, b: int) -> int:
    # Write your code here
    pass

# Read input
a, b = map(int, input().split())
# Call function and print result
print(sum_two_numbers(a, b))`,
      javascript: `function sumTwoNumbers(a, b) {
    // Write your code here
}

// Read input
const [a, b] = readline().split(' ').map(Number);
// Call function and print result
console.log(sumTwoNumbers(a, b));`,
    },
    hints: [
      'Use the addition operator (+)',
      'Remember that integers can be negative'
    ],
    solution: `def sum_two_numbers(a: int, b: int) -> int:
    return a + b`
  },
  {
    id: 'E2',
    name: 'Even or Odd',
    difficulty: 'Easy',
    category: ['Implementation', 'Math'],
    description: `Determine whether a given integer is even or odd.
    
A number is even if it is divisible by 2 with no remainder. A number is odd if it is not even.`,
    constraints: [
      { description: 'Range of input integer', value: '-10^9 ≤ n ≤ 10^9' }
    ],
    inputFormat: 'A single integer n.',
    outputFormat: 'String "Even" if the number is even, "Odd" if the number is odd.',
    testCases: [
      {
        input: '4',
        output: 'Even',
        explanation: '4 is divisible by 2'
      },
      {
        input: '7',
        output: 'Odd',
        explanation: '7 is not divisible by 2'
      },
      {
        input: '0',
        output: 'Even',
        explanation: '0 is divisible by 2'
      },
      {
        input: '-3',
        output: 'Odd',
        explanation: '-3 is not divisible by 2'
      },
      {
        input: '-4',
        output: 'Even',
        explanation: '-4 is divisible by 2'
      }
    ],
    timeLimit: '1 second',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `def even_or_odd(n: int) -> str:
    # Write your code here
    pass

# Read input
n = int(input())
# Call function and print result
print(even_or_odd(n))`,
      javascript: `function evenOrOdd(n) {
    // Write your code here
}

// Read input
const n = parseInt(readline());
// Call function and print result
console.log(evenOrOdd(n));`,
    },
    hints: [
      'Use the modulo operator (%)',
      'A number is even if n % 2 equals 0'
    ]
  },
  {
    id: 'E3',
    name: 'Reverse String',
    difficulty: 'Easy',
    category: ['Strings', 'Implementation'],
    description: `Given a string, return it in reverse order.
    
For example, if the input string is "hello", the output should be "olleh".`,
    constraints: [
      { description: 'String length', value: '1 ≤ length ≤ 100' },
      { description: 'String content', value: 'Contains only ASCII characters' }
    ],
    inputFormat: 'A single line containing a string.',
    outputFormat: 'A single line containing the reversed string.',
    testCases: [
      {
        input: 'hello',
        output: 'olleh',
        explanation: 'Characters are reversed from last to first'
      },
      {
        input: 'world',
        output: 'dlrow',
        explanation: 'Characters are reversed from last to first'
      },
      {
        input: 'a',
        output: 'a',
        explanation: 'Single character remains the same when reversed'
      },
      {
        input: '12345',
        output: '54321',
        explanation: 'Numbers can also be reversed as strings'
      },
      {
        input: 'Hi There',
        output: 'erehT iH',
        explanation: 'Spaces and capitalization are preserved but reversed'
      }
    ],
    timeLimit: '1 second',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `def reverse_string(s: str) -> str:
    # Write your code here
    pass

# Read input
s = input()
# Call function and print result
print(reverse_string(s))`,
      javascript: `function reverseString(s) {
    // Write your code here
}

// Read input
const s = readline();
// Call function and print result
console.log(reverseString(s));`,
    },
    hints: [
      'Try converting the string to a list of characters',
      'You can use string slicing with a negative step',
      'Consider using a two-pointer approach'
    ]
  },
  {
    id: 'E4',
    name: 'Array Sum',
    difficulty: 'Easy',
    category: ['Arrays', 'Implementation'],
    description: `Given an array of integers, find the sum of all elements.
    
This problem helps you practice array traversal and basic arithmetic operations.`,
    constraints: [
      { description: 'Array length', value: '1 ≤ length ≤ 1000' },
      { description: 'Array elements', value: '-1000 ≤ element ≤ 1000' }
    ],
    inputFormat: `First line contains an integer n - the length of array
Second line contains n space-separated integers - the elements of array`,
    outputFormat: 'A single integer representing the sum of all elements in the array.',
    testCases: [
      {
        input: `5
1 2 3 4 5`,
        output: '15',
        explanation: '1 + 2 + 3 + 4 + 5 = 15'
      },
      {
        input: `3
-1 0 1`,
        output: '0',
        explanation: '-1 + 0 + 1 = 0'
      },
      {
        input: `4
10 20 30 40`,
        output: '100',
        explanation: '10 + 20 + 30 + 40 = 100'
      },
      {
        input: `2
-5 5`,
        output: '0',
        explanation: '-5 + 5 = 0'
      },
      {
        input: `1
42`,
        output: '42',
        explanation: 'Single element array sum is the element itself'
      }
    ],
    timeLimit: '1 second',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `def array_sum(n: int, arr: list) -> int:
    # Write your code here
    pass

# Read input
n = int(input())
arr = list(map(int, input().split()))
# Call function and print result
print(array_sum(n, arr))`,
      javascript: `function arraySum(n, arr) {
    // Write your code here
}

// Read input
const n = parseInt(readline());
const arr = readline().split(' ').map(Number);
// Call function and print result
console.log(arraySum(n, arr));`,
    },
    hints: [
      'Use a loop to iterate through the array',
      'Keep a running sum variable',
      'Consider using built-in sum functions if available in your language'
    ]
  }
];

// Add more problems here...
// I'll continue adding the remaining 48 easy problems in subsequent edits 