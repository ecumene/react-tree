import React from 'react';
import './App.css';
import data from './test_data.json';
import useTree from './hooks/useTree';
import ReactJson from 'react-json-view';

function App() {
  const flattened = useTree(data);
  return (
    <div className="App">
      <header className="App-header">
        <ReactJson src={data} collapsed theme="monokai" />
        <div className="nodes">
          {flattened.map(({ id, value: { name, color } }) => (
            <span>
              <div
                style={{ backgroundColor: `#${color}` }}
                className="circle"
              />
              <code>{`${id} ${name}`}</code>
            </span>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
