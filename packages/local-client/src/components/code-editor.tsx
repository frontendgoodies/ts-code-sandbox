import './code-editor.css';
import './syntax.css';
import { useRef } from 'react';
import MonacoEditor, { EditorDidMount } from '@monaco-editor/react';
import prettier from 'prettier';
import parser from 'prettier/parser-babel';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';
import Highlighter from 'monaco-jsx-highlighter';

interface CodeEditorProps {
  initialValue: string;
  onChange(value: string): void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ onChange, initialValue }) => {
  const editorRef = useRef<any>();

  const onEditorDidMount: EditorDidMount = (getValue, monacoEditor) => {
    editorRef.current = monacoEditor;

    monacoEditor.onDidChangeModelContent(() => {
      onChange(getValue());
    });

    monacoEditor.getModel()?.updateOptions({ tabSize: 2 });

    const defaultOptions = {
      parser: 'babel', // for reference only, only babel is supported right now
      isHighlightGlyph: false, // if JSX elements should decorate the line number gutter
      iShowHover: false, // if JSX types should  tooltip with their type info
      isUseSeparateElementStyles: false, // if opening elements and closing elements have different styling
      isThrowJSXParseErrors: false, // Only JSX Syntax Errors are not thrown by default when parsing, true will throw like any other parsign error
    };

    const babelParse = (code: any) => parse(code, { sourceType: 'module' });

    const highlighter = new Highlighter(
      // @ts-ignore
      window.monaco,
      babelParse,
      traverse,
      monacoEditor,
      defaultOptions
    );

    highlighter.highLightOnDidChangeModelContent(100, () => {});
  };

  const onFormatClick = () => {
    //current value from editor
    const unformatted = editorRef.current.getModel().getValue();

    //format value
    const formatted = prettier
      .format(unformatted, {
        parser: 'babel',
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, '');

    // set formatted value in editor
    editorRef.current.setValue(formatted);
  };

  return (
    <div className='editor-wrapper'>
      <button
        className='button button-format is-primary is-small'
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        editorDidMount={onEditorDidMount}
        value={initialValue}
        language='javascript'
        theme='dark'
        height='100%'
        options={{
          wordWrap: 'on',
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 16,
          fontLigatures: true,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;
