import React, { useEffect, useRef } from 'react';
import * as monaco from 'monaco-editor';
import './Editor.css';

interface EditorProps {
  initialCode?: string;
  language?: string;
  onCodeChange?: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({
  initialCode = '',
  language = 'javascript',
  onCodeChange,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const editorInstanceRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorInstanceRef.current = monaco.editor.create(editorRef.current, {
        value: initialCode,
        language,
        theme: 'vs-dark',
        automaticLayout: true,
        minimap: {
          enabled: true,
        },
        scrollBeyondLastLine: false,
        fontSize: 14,
        lineNumbers: 'on',
        roundedSelection: false,
        scrollbar: {
          vertical: 'visible',
          horizontal: 'visible',
        },
      });

      editorInstanceRef.current.onDidChangeModelContent(() => {
        const code = editorInstanceRef.current?.getValue() || '';
        onCodeChange?.(code);
      });
    }

    return () => {
      editorInstanceRef.current?.dispose();
    };
  }, []);

  return <div ref={editorRef} className="editor-container" />;
};

export default Editor; 