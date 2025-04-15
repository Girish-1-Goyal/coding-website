import { Problem } from '../problemService';

export const mediumProblems: Problem[] = [
  {
    id: 'M1',
    name: 'Valid Parentheses Sequence',
    difficulty: 'Medium',
    category: ['Stacks & Queues', 'Strings'],
    description: `Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    constraints: [
      { description: 'String length', value: '1 ≤ length ≤ 10^4' },
      { description: 'String content', value: 'Contains only parentheses, square brackets, and curly braces' }
    ],
    inputFormat: 'A single line containing a string of brackets.',
    outputFormat: '"true" if the string is valid, "false" otherwise.',
    testCases: [
      {
        input: '()',
        output: 'true',
        explanation: 'Simple matching parentheses'
      },
      {
        input: '()[]{}',
        output: 'true',
        explanation: 'Multiple pairs of matching brackets'
      },
      {
        input: '(]',
        output: 'false',
        explanation: 'Mismatched brackets'
      },
      {
        input: '([)]',
        output: 'false',
        explanation: 'Incorrectly ordered brackets'
      },
      {
        input: '{[]}',
        output: 'true',
        explanation: 'Nested brackets in correct order'
      },
      {
        input: '((()))',
        output: 'true',
        explanation: 'Multiple nested parentheses'
      },
      {
        input: '((',
        output: 'false',
        explanation: 'Unclosed brackets'
      },
      {
        input: ']',
        output: 'false',
        explanation: 'Single closing bracket without opening'
      },
      {
        input: '({[]})',
        output: 'true',
        explanation: 'Complex nested structure'
      },
      {
        input: '({)}',
        output: 'false',
        explanation: 'Invalid nesting order'
      }
    ],
    timeLimit: '1 second',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `def is_valid_parentheses(s: str) -> bool:
    # Write your code here
    pass

# Read input
s = input().strip()
# Call function and print result
print(str(is_valid_parentheses(s)).lower())`,
      javascript: `function isValidParentheses(s) {
    // Write your code here
}

// Read input
const s = readline().trim();
// Call function and print result
console.log(isValidParentheses(s).toString());`,
    },
    hints: [
      'Consider using a stack data structure',
      'Push opening brackets onto the stack',
      'When encountering a closing bracket, check if it matches the top of the stack',
      'The stack should be empty at the end for a valid sequence'
    ]
  },
  {
    id: 'M2',
    name: 'Binary Search Tree Validation',
    difficulty: 'Medium',
    category: ['Trees', 'Binary Search'],
    description: `Given a binary tree, determine if it is a valid binary search tree (BST).

A binary search tree is valid if:
1. The left subtree of a node contains only nodes with keys less than the node's key.
2. The right subtree of a node contains only nodes with keys greater than the node's key.
3. Both the left and right subtrees must also be binary search trees.
4. No duplicate values are allowed.`,
    constraints: [
      { description: 'Number of nodes', value: '1 ≤ nodes ≤ 10^4' },
      { description: 'Node values', value: '-2^31 ≤ value ≤ 2^31 - 1' }
    ],
    inputFormat: `First line contains n - the number of nodes
Second line contains n space-separated integers representing the level-order traversal of the tree
-1 represents null nodes in the level-order traversal`,
    outputFormat: '"true" if the tree is a valid BST, "false" otherwise.',
    testCases: [
      {
        input: `3
2 1 3`,
        output: 'true',
        explanation: 'Valid BST with root=2, left=1, right=3'
      },
      {
        input: `3
1 2 3`,
        output: 'false',
        explanation: '2 is in left subtree but greater than root 1'
      },
      {
        input: `5
5 3 7 1 4`,
        output: 'true',
        explanation: 'Valid BST with proper left and right subtrees'
      },
      {
        input: `7
5 3 7 1 4 6 8`,
        output: 'true',
        explanation: 'Complete BST with all values in correct positions'
      },
      {
        input: `5
5 4 7 -1 -1 6 8`,
        output: 'true',
        explanation: 'BST with some null nodes'
      },
      {
        input: `5
5 4 6 -1 -1 3 7`,
        output: 'false',
        explanation: '3 in right subtree but less than root 5'
      },
      {
        input: `1
1`,
        output: 'true',
        explanation: 'Single node is always a valid BST'
      },
      {
        input: `3
2 2 3`,
        output: 'false',
        explanation: 'Duplicate values are not allowed in BST'
      },
      {
        input: `7
10 5 15 3 7 12 18`,
        output: 'true',
        explanation: 'Perfect BST with all values in correct order'
      },
      {
        input: `7
10 5 15 3 7 12 13`,
        output: 'false',
        explanation: '13 should be in right subtree of 15'
      }
    ],
    timeLimit: '1 second',
    memoryLimit: '256 MB',
    sampleCode: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build_tree(nodes: list) -> TreeNode:
    if not nodes:
        return None
    root = TreeNode(nodes[0])
    queue = [root]
    i = 1
    while queue and i < len(nodes):
        node = queue.pop(0)
        if i < len(nodes) and nodes[i] != -1:
            node.left = TreeNode(nodes[i])
            queue.append(node.left)
        i += 1
        if i < len(nodes) and nodes[i] != -1:
            node.right = TreeNode(nodes[i])
            queue.append(node.right)
        i += 1
    return root

def is_valid_bst(root: TreeNode) -> bool:
    # Write your code here
    pass

# Read input
n = int(input())
nodes = list(map(int, input().split()))
root = build_tree(nodes)
# Call function and print result
print(str(is_valid_bst(root)).lower())`,
      javascript: `class TreeNode {
    constructor(val = 0, left = null, right = null) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

function buildTree(nodes) {
    if (!nodes.length) return null;
    const root = new TreeNode(nodes[0]);
    const queue = [root];
    let i = 1;
    while (queue.length && i < nodes.length) {
        const node = queue.shift();
        if (i < nodes.length && nodes[i] !== -1) {
            node.left = new TreeNode(nodes[i]);
            queue.push(node.left);
        }
        i++;
        if (i < nodes.length && nodes[i] !== -1) {
            node.right = new TreeNode(nodes[i]);
            queue.push(node.right);
        }
        i++;
    }
    return root;
}

function isValidBST(root) {
    // Write your code here
}

// Read input
const n = parseInt(readline());
const nodes = readline().split(' ').map(Number);
const root = buildTree(nodes);
// Call function and print result
console.log(isValidBST(root).toString());`,
    },
    hints: [
      'Consider using an inorder traversal approach',
      'Keep track of the valid range for each node',
      'Use recursion with min and max boundaries',
      'Remember that all nodes in the left subtree must be less than the current node'
    ]
  }
];

// Continue adding more medium problems... 