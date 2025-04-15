import React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const JavaContent: React.FC = () => {
  const theoryContent = `
# Introduction to Java Programming

Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It's widely used for enterprise applications, Android development, and web applications.

## Key Features:
- Write Once, Run Anywhere (WORA)
- Automatic memory management
- Strong type checking
- Multi-threading support
- Rich standard library
- Platform independence

## Basic Syntax:
Java programs are organized into classes, with the main() method serving as the entry point. Java is strictly object-oriented, requiring all code to be written within classes.
`;

  const codeExample = `public class Main {
    public static void main(String[] args) {
        // Array example
        int[] numbers = {1, 2, 3, 4, 5};
        
        // Enhanced for loop
        for (int num : numbers) {
            System.out.print(num + " ");
        }
        System.out.println();
        
        // Class usage
        Person person = new Person("Alice", 25);
        person.introduce();
    }
}

class Person {
    private String name;
    private int age;
    
    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void introduce() {
        System.out.println("Hello, I'm " + name + 
                          " and I'm " + age + " years old.");
    }
}`;

  return (
    <div>
      <div className="theory-section">
        <h2>Theory</h2>
        <div dangerouslySetInnerHTML={{ __html: theoryContent }} />
      </div>
      <div className="code-section">
        <h2>Code Example</h2>
        <SyntaxHighlighter language="java" style={docco}>
          {codeExample}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default JavaContent; 