export default function ApiDocs() {
  return (
    <div style={{ maxWidth: '800px', margin: '2rem auto', padding: '2rem', background: 'white', borderRadius: '12px' }}>
      <h1>JSON Parser API Documentation</h1>
      
      <section style={{ marginTop: '2rem' }}>
        <h2>Endpoint</h2>
        <code style={{ background: '#f1f5f9', padding: '0.5rem 1rem', borderRadius: '6px', display: 'block' }}>
          POST /api/parse
        </code>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Request Body</h2>
        <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
{`{
  "data": <JSON_DATA> | "<JSON_STRING>",
  "format": "html" | "json"  // optional, default: "html"
}`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Response</h2>
        <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
{`{
  "success": true,
  "html": "<formatted_html>",  // if format=html
  "data": {...},               // if format=json
  "stats": {
    "type": "object",
    "totalKeys": 42,
    "maxDepth": 5,
    "arrayCount": 3
  }
}`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Example Usage (n8n)</h2>
        <h3>HTTP Request Node Configuration:</h3>
        <ul>
          <li><strong>Method:</strong> POST</li>
          <li><strong>URL:</strong> https://your-domain.com/api/parse</li>
          <li><strong>Body:</strong> JSON</li>
        </ul>
        
        <h3>Request Body:</h3>
        <pre style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
{`{
  "data": {{ $json }},
  "format": "html"
}`}
        </pre>
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Example with cURL</h2>
        <pre style={{ background: '#1e293b', color: '#e2e8f0', padding: '1rem', borderRadius: '8px', overflow: 'auto' }}>
{`curl -X POST http://localhost:3000/api/parse \\
  -H "Content-Type: application/json" \\
  -d '{
    "data": {"name": "John", "age": 30},
    "format": "html"
  }'`}
        </pre>
      </section>
    </div>
  );
}
