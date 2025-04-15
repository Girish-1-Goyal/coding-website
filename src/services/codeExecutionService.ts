interface TestResult {
  passed: boolean;
  input: string;
  expectedOutput: string;
  actualOutput: string;
  error?: string;
}

export async function executeCode(code: string, testCases: { input: string; output: string }[]): Promise<TestResult[]> {
  const results: TestResult[] = [];

  for (const testCase of testCases) {
    try {
      // Create a safe execution environment
      const executionContext = {
        input: testCase.input,
        output: null as any,
        console: {
          log: (value: any) => {
            executionContext.output = value?.toString();
          }
        }
      };

      // Wrap user code in a function and add console.log capture
      const wrappedCode = `
        ${code}
        try {
          const result = solve(${JSON.stringify(testCase.input)});
          console.log(result);
        } catch (error) {
          console.log('Error: ' + error.message);
        }
      `;

      // Execute the code in a new Function context
      const fn = new Function('console', wrappedCode);
      fn(executionContext.console);

      // Compare output
      const normalizedExpected = testCase.output.trim();
      const normalizedActual = (executionContext.output || '').trim();

      results.push({
        passed: normalizedExpected === normalizedActual,
        input: testCase.input,
        expectedOutput: normalizedExpected,
        actualOutput: normalizedActual
      });
    } catch (error) {
      results.push({
        passed: false,
        input: testCase.input,
        expectedOutput: testCase.output,
        actualOutput: '',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  return results;
} 