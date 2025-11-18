"use client";
import { useState } from 'react';
import { JsonRenderer } from './JsonRenderer';
import { JsonStats } from './JsonStats';

export function JsonParser() {
  const [jsonInput, setJsonInput] = useState('');
  const [parsedData, setParsedData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleParse = () => {
    setIsLoading(true);
    setError('');
    
    try {
      const result = JSON.parse(jsonInput);
      setParsedData(result);
    } catch (e) {
      setParsedData(null);
      setError(e instanceof Error ? e.message : 'Invalid JSON format');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadSample = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/complete-results.json');
      const data = await response.json();
      setJsonInput(JSON.stringify(data, null, 2));
      setParsedData(data);
      setError('');
    } catch (e) {
      setError('Failed to load sample data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setJsonInput('');
    setParsedData(null);
    setError('');
  };

  return (
    <div className="json-parser-container">
      <div className="parser-header">
        <h1>JSON Data Visualizer</h1>
        <p className="subtitle">Transform complex JSON into readable, structured content</p>
      </div>

      <div className="input-section">
        <div className="input-header">
          <label htmlFor="json-input">JSON Input</label>
          <div className="button-group">
            <button onClick={handleLoadSample} className="btn-secondary">
              Load Sample Data
            </button>
            <button onClick={handleClear} className="btn-secondary">
              Clear
            </button>
          </div>
        </div>
        
        <textarea
          id="json-input"
          rows={10}
          value={jsonInput}
          onChange={(e) => setJsonInput(e.target.value)}
          placeholder="Paste your JSON data here..."
          spellCheck={false}
        />
        
        <button 
          onClick={handleParse} 
          className="btn-primary"
          disabled={!jsonInput.trim() || isLoading}
        >
          {isLoading ? 'Processing...' : 'Parse & Visualize'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          <strong>Error:</strong> {error}
        </div>
      )}

      {parsedData && (
        <div className="output-section">
          <div className="output-header">
            <h2>Parsed Result</h2>
            <span className="data-type">
              {Array.isArray(parsedData) ? 'Array' : typeof parsedData}
            </span>
          </div>
          
          <JsonStats data={parsedData} />
          
          <div className="json-output">
            <JsonRenderer data={parsedData} level={1} />
          </div>
        </div>
      )}
    </div>
  );
}
