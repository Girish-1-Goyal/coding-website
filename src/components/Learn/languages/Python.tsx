import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const PythonContent: React.FC = () => {
  const theoryContent = `
# Introduction to Python Programming

Python is a high-level, interpreted programming language known for its simplicity and readability. It's widely used in web development, data science, artificial intelligence, and automation.

## Key Features:
- Simple and readable syntax
- Dynamic typing
- Extensive standard library
- Cross-platform compatibility
- Strong community support
- Multiple programming paradigms

## Basic Syntax:
Python uses indentation to define code blocks instead of braces. It's dynamically typed and supports multiple programming paradigms including procedural, object-oriented, and functional programming.
`;

  const codeExample = `# List example
numbers = [1, 2, 3, 4, 5]

# List comprehension
squares = [x**2 for x in numbers]
print(squares)  # Output: [1, 4, 9, 16, 25]

# Class example
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def introduce(self):
        print(f"Hello, I'm {self.name} and I'm {self.age} years old.")

# Function example
def greet(name):
    return f"Hello, {name}!"

# Usage
person = Person("Alice", 25)
person.introduce()
print(greet("Bob"))`;

  return (
    <div>
      <div className="theory-section">
        <h2>Theory</h2>
        <div dangerouslySetInnerHTML={{ __html: theoryContent }} />
      </div>
      <div className="code-section">
        <h2>Code Example</h2>
        <SyntaxHighlighter language="python" style={docco}>
          {codeExample}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default PythonContent; 