import 'bulmaswatch/nuclear/bulmaswatch.min.css';
import { useState } from 'react';
import ReactDOM from 'react-dom';
import bundle from './bundler';

import CodeEditor from './components/code-editor';
import Preview from './components/preview';

const App = () => {
  const [code, setCode] = useState('');
  const [input, setInput] = useState('');

  const onClick = async () => {
    const output = await bundle(input);

    setCode(output);
  };

  return (
    <div>
      <CodeEditor
        initialValue={"const test = 'a'"}
        onChange={(value) => setInput(value)}
      />
      <div>
        <button onClick={onClick}>Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
