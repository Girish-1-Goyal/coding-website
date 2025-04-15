import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CppContent: React.FC = () => {
  const theoryContent = `
# Introduction to C++ Programming

C++ is a powerful general-purpose programming language created as an extension of C. It's widely used for system/software development, game development, and performance-critical applications.

## Key Features:
- Object-oriented programming
- Template metaprogramming
- Memory management control
- Standard Template Library (STL)
- Exception handling
- Operator overloading

## Basic Syntax:
C++ programs are made up of classes and functions, with the main() function serving as the entry point. C++ supports both procedural and object-oriented programming paradigms.
`;

  const codeExample = `#include <iostream>
#include <vector>
#include <string>

class Person {
private:
    std::string name;
    int age;
public:
    Person(std::string n, int a) : name(n), age(a) {}
    
    void introduce() {
        std::cout << "Hello, I'm " << name 
                  << " and I'm " << age << " years old." << std::endl;
    }
};

int main() {
    // Vector example
    std::vector<int> numbers = {1, 2, 3, 4, 5};
    
    // Range-based for loop
    for (const auto& num : numbers) {
        std::cout << num << " ";
    }
    std::cout << std::endl;
    
    // Class usage
    Person person("Alice", 25);
    person.introduce();
    
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
        <SyntaxHighlighter language="cpp" style={docco}>
          {codeExample}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CppContent; 