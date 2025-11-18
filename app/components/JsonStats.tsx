"use client";

interface JsonStatsProps {
  data: any;
}

export function JsonStats({ data }: JsonStatsProps) {
  const stats = analyzeJson(data);

  return (
    <div className="json-stats">
      <h3>Data Overview</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-label">Type</span>
          <span className="stat-value">{stats.type}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Total Keys</span>
          <span className="stat-value">{stats.totalKeys}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Max Depth</span>
          <span className="stat-value">{stats.maxDepth}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Arrays</span>
          <span className="stat-value">{stats.arrayCount}</span>
        </div>
      </div>
    </div>
  );
}

function analyzeJson(data: any, depth: number = 0): any {
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
        const childStats = analyzeJson(item, depth + 1);
        stats.totalKeys += childStats.totalKeys;
        stats.maxDepth = Math.max(stats.maxDepth, childStats.maxDepth);
        stats.arrayCount += childStats.arrayCount;
      });
    } else {
      const keys = Object.keys(data);
      stats.totalKeys = keys.length;
      keys.forEach((key) => {
        const childStats = analyzeJson(data[key], depth + 1);
        stats.totalKeys += childStats.totalKeys;
        stats.maxDepth = Math.max(stats.maxDepth, childStats.maxDepth);
        stats.arrayCount += childStats.arrayCount;
      });
    }
  }

  return stats;
}
