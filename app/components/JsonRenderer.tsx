"use client";
import { useState } from 'react';

interface JsonRendererProps {
  data: any;
  level?: number;
  title?: string;
}

export function JsonRenderer({ data, level = 1, title }: JsonRendererProps) {
  if (data === null || data === undefined) {
    return <span className="json-null">null</span>;
  }

  const dataType = typeof data;

  // Primitive types
  if (dataType === 'string') {
    return <span className="json-string">{data}</span>;
  }
  if (dataType === 'number') {
    return <span className="json-number">{data}</span>;
  }
  if (dataType === 'boolean') {
    return <span className="json-boolean">{data.toString()}</span>;
  }

  // Array type
  if (Array.isArray(data)) {
    return <ArrayRenderer data={data} level={level} />;
  }

  // Object type
  if (dataType === 'object') {
    return <ObjectRenderer data={data} level={level} title={title} />;
  }

  return <span>{String(data)}</span>;
}

function ObjectRenderer({ data, level, title }: { data: Record<string, any>; level: number; title?: string }) {
  const [isCollapsed, setIsCollapsed] = useState(level>3); // Start collapsed
  const keys = Object.keys(data);

  if (keys.length === 0) {
    return <span className="json-empty">{'{}'}</span>;
  }

  const headingLevel = Math.min(level + 1, 6);

  const renderHeading = () => {
    const headingContent = (
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="collapse-btn"
        aria-expanded={!isCollapsed}
      >
        <span className="collapse-icon">{isCollapsed ? '▶' : '▼'}</span>
        {formatTitle(title || '')}
      </button>
    );

    switch (headingLevel) {
      case 2: return <h2 className="json-object-title">{headingContent}</h2>;
      case 3: return <h3 className="json-object-title">{headingContent}</h3>;
      case 4: return <h4 className="json-object-title">{headingContent}</h4>;
      case 5: return <h5 className="json-object-title">{headingContent}</h5>;
      case 6: return <h6 className="json-object-title">{headingContent}</h6>;
      default: return <h2 className="json-object-title">{headingContent}</h2>;
    }
  };

  return (
    <div className={`json-object level-${level}`}>
      {title && renderHeading()}
      
      {!isCollapsed && (
        <div className="json-object-content">
          {keys.map((key) => (
            <div key={key} className="json-property">
              <PropertyRenderer 
                propertyKey={key} 
                value={data[key]} 
                level={level} 
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyRenderer({ propertyKey, value, level }: { propertyKey: string; value: any; level: number }) {
  const isComplex = typeof value === 'object' && value !== null;
  
  return (
    <div className="property-wrapper">
      <span className="property-key">{formatTitle(propertyKey)}:</span>
      {isComplex ? (
        <JsonRenderer data={value} level={level + 1} title={propertyKey} />
      ) : (
        <span className="property-value">
          <JsonRenderer data={value} level={level + 1} />
        </span>
      )}
    </div>
  );
}

function ArrayRenderer({ data, level }: { data: any[]; level: number }) {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed

  if (data.length === 0) {
    return <span className="json-empty">[]</span>;
  }

  // Check if array contains only primitives
  const allPrimitives = data.every(item => 
    typeof item !== 'object' || item === null
  );

  if (allPrimitives && data.length <= 5) {
    return (
      <span className="json-array-inline">
        [{data.map((item, i) => (
          <span key={i}>
            <JsonRenderer data={item} level={level} />
            {i < data.length - 1 && ', '}
          </span>
        ))}]
      </span>
    );
  }

  return (
    <div className="json-array">
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="array-toggle"
      >
        <span className="collapse-icon">{isCollapsed ? '▶' : '▼'}</span>
        Array ({data.length} items)
      </button>
      
      {!isCollapsed && (
        <div className="json-array-content">
          {data.map((item, index) => (
            <div key={index} className="array-item">
              <span className="array-index">{index}.</span>
              <JsonRenderer data={item} level={level + 1} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function formatTitle(str: string): string {
  // Convert camelCase or snake_case to Title Case
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}
