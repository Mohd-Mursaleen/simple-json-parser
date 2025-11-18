"use client";
import { useState } from 'react';

const sampleJSON = `{
  "name": "Amit",
  "age": 30,
  "skills": ["Python", "React", "Node.js"],
  "isDeveloper": true
}`;

export default function Home() {
  const [jsonInput, setJsonInput] = useState(sampleJSON);
  const [parsedJson, setParsedJson] = useState(null);
  const [error, setError] = useState('');

  const handleParse = () => {
    try {
      const result = JSON.parse(jsonInput);
      setParsedJson(result);
      setError('');
    } catch (e) {
      setParsedJson(null);
      setError('Invalid JSON!');
    }
  };

  return (
    <main>
      <h1>Simple JSON Parser</h1>
      <textarea
        rows={8}
        value={jsonInput}
        onChange={e => setJsonInput(e.target.value)}
        spellCheck={false}
        autoFocus
      />
      <div>
        <button onClick={handleParse}>Parse JSON</button>
      </div>
      {error && <div className="error">{error}</div>}
      {parsedJson && (
        <>
          <div style={{ margin: "1em 0 .4em 0", fontWeight: "bold" }}>Parsed Result:</div>
          <pre>{JSON.stringify(parsedJson, null, 2)}</pre>
        </>
      )}
      <div style={{ marginTop: "2.5em", color: "#7a7a7a", fontSize: "0.93em" }}>
        Try editing the example JSON above, or paste your own.
      </div>
    </main>
  );
}
