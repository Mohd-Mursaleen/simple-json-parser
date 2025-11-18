import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { data, format = 'html' } = body;

    if (!data) {
      return NextResponse.json(
        { error: 'No data provided' },
        { status: 400 }
      );
    }

    // Validate JSON if it's a string
    let parsedData = data;
    if (typeof data === 'string') {
      try {
        parsedData = JSON.parse(data);
      } catch (e) {
        return NextResponse.json(
          { error: 'Invalid JSON format' },
          { status: 400 }
        );
      }
    }

    // Return based on format
    if (format === 'html') {
      const html = generateHTML(parsedData);
      return NextResponse.json({ 
        success: true,
        html,
        stats: getStats(parsedData)
      });
    }

    // Default: return structured data
    return NextResponse.json({
      success: true,
      data: parsedData,
      stats: getStats(parsedData)
    });

  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}

function generateHTML(data: any, level: number = 1): string {
  if (data === null || data === undefined) {
    return '<span class="json-null">null</span>';
  }

  const dataType = typeof data;

  // Primitives
  if (dataType === 'string') {
    return `<span class="json-string">${escapeHtml(data)}</span>`;
  }
  if (dataType === 'number') {
    return `<span class="json-number">${data}</span>`;
  }
  if (dataType === 'boolean') {
    return `<span class="json-boolean">${data}</span>`;
  }

  // Array
  if (Array.isArray(data)) {
    if (data.length === 0) {
      return '<span class="json-empty">[]</span>';
    }

    const allPrimitives = data.every(item => typeof item !== 'object' || item === null);
    
    if (allPrimitives && data.length <= 5) {
      const items = data.map(item => generateHTML(item, level)).join(', ');
      return `<span class="json-array-inline">[${items}]</span>`;
    }

    const items = data.map((item, i) => `
      <div class="array-item">
        <span class="array-index">${i}.</span>
        ${generateHTML(item, level + 1)}
      </div>
    `).join('');

    return `
      <div class="json-array">
        <details>
          <summary>Array (${data.length} items)</summary>
          <div class="json-array-content">${items}</div>
        </details>
      </div>
    `;
  }

  // Object
  if (dataType === 'object') {
    const keys = Object.keys(data);
    
    if (keys.length === 0) {
      return '<span class="json-empty">{}</span>';
    }

    const properties = keys.map(key => {
      const value = data[key];
      const isComplex = typeof value === 'object' && value !== null;
      
      return `
        <div class="json-property">
          <div class="property-wrapper">
            <span class="property-key">${formatTitle(key)}:</span>
            ${isComplex 
              ? generateHTML(value, level + 1)
              : `<span class="property-value">${generateHTML(value, level + 1)}</span>`
            }
          </div>
        </div>
      `;
    }).join('');

    const headingTag = `h${Math.min(level + 1, 6)}`;
    
    return `
      <div class="json-object level-${level}">
        <details>
          <summary>
            <${headingTag} class="json-object-title">Object (${keys.length} properties)</${headingTag}>
          </summary>
          <div class="json-object-content">${properties}</div>
        </details>
      </div>
    `;
  }

  return String(data);
}

function getStats(data: any, depth: number = 0): any {
  const stats = {
    type: Array.isArray(data) ? 'Array' : typeof data,
    totalKeys: 0,
    maxDepth: depth,
    arrayCount: 0,
  };

  if (typeof data === 'object' && data !== null) {
    if (Array.isArray(data)) {
      stats.arrayCount = 1;
      data.forEach((item) => {
        const childStats = getStats(item, depth + 1);
        stats.totalKeys += childStats.totalKeys;
        stats.maxDepth = Math.max(stats.maxDepth, childStats.maxDepth);
        stats.arrayCount += childStats.arrayCount;
      });
    } else {
      const keys = Object.keys(data);
      stats.totalKeys = keys.length;
      keys.forEach((key) => {
        const childStats = getStats(data[key], depth + 1);
        stats.totalKeys += childStats.totalKeys;
        stats.maxDepth = Math.max(stats.maxDepth, childStats.maxDepth);
        stats.arrayCount += childStats.arrayCount;
      });
    }
  }

  return stats;
}

function formatTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
