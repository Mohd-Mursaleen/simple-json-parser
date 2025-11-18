/**
 * Utility functions for JSON parsing and formatting
 */

export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch {
    return false;
  }
}

export function formatJsonString(json: any, indent: number = 2): string {
  return JSON.stringify(json, null, indent);
}

export function getDataType(value: any): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

export function getObjectSize(obj: any): number {
  if (Array.isArray(obj)) return obj.length;
  if (typeof obj === 'object' && obj !== null) {
    return Object.keys(obj).length;
  }
  return 0;
}

export function formatTitle(str: string): string {
  return str
    .replace(/([A-Z])/g, ' $1')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

export function truncateString(str: string, maxLength: number = 100): string {
  if (str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
}

export function isComplexObject(value: any): boolean {
  if (typeof value !== 'object' || value === null) return false;
  if (Array.isArray(value)) return value.length > 5 || value.some(isComplexObject);
  return Object.keys(value).length > 3;
}
