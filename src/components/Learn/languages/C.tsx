import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CContent: React.FC = () => {
  const theoryContent = `
# Introduction to C Programming

C is a general-purpose programming language created in the 1970s. It's one of the most widely used programming languages and has influenced many other languages like C++, Java, and Python.

## Key Features:
- Procedural programming language
- Low-level access to memory
- Simple and efficient
- Portable across different platforms
- Rich set of built-in operators
- Structured programming support

## Basic Syntax:
C programs are made up of functions, and every program must have a main() function. The program execution starts from the main() function.
`;

  const codeExample = `#include <stdio.h>

int main() {
    // Print "Hello, World!"
    printf("Hello, World!\\n");
    
    // Variables and basic operations
    int number = 10;
    float pi = 3.14;
    char letter = 'A';
    
    // If-else statement
    if (number > 5) {
        printf("Number is greater than 5\\n");
    } else {
        printf("Number is 5 or less\\n");
    }
    
    // For loop
    for (int i = 0; i < 5; i++) {
        printf("Iteration %d\\n", i);
    }
    
    return 0;
}`;

  return (
    <div>
      <div className="theory-section">
        <h2>Theory</h2>
        <div dangerouslySetInnerHTML={{ __html: theoryContent }} />
      </div>
      <div className="code-section">
        <h2>Code Example</h2>
        <SyntaxHighlighter language="c" style={docco}>
          {codeExample}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CContent; 