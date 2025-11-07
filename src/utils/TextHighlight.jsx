/**
 * TextHighlight Utility
 * 
 * A simple utility for rendering text with highlighted keywords.
 * 
 * Usage in data.jsx:
 * 
 * import { parseHighlight } from '@/utils/TextHighlight';
 * 
 * bullets: [
 *   parseHighlight("Developed system using {{React}} and {{Node.js}}"),
 *   "Regular text without highlights",
 *   parseHighlight("Built with {{Docker}}, {{Kubernetes}}, and {{AWS}}")
 * ]
 * 
 * The {{keyword}} syntax will be automatically converted to highlighted text.
 */

/**
 * Highlight Component - wraps text to be highlighted
 * @param {React.ReactNode} children - The text to highlight
 * @param {string} className - Optional additional classes
 */
export function Highlight({ children, className = "" }) {
  return (
    <span 
      className={`font-semibold ${className}`}
      style={{ color: 'var(--accent)' }}
    >
      {children}
    </span>
  );
}

/**
 * Parse text with {{keyword}} syntax and convert to highlighted elements
 * @param {string} text - Text containing {{keyword}} markers
 * @returns {React.ReactNode} - Parsed text with Highlight components
 */
export function parseHighlight(text) {
  if (typeof text !== 'string') return text;
  
  // Split by {{...}} pattern
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  
  return (
    <>
      {parts.map((part, index) => {
        // Check if this part is a {{keyword}}
        if (part.startsWith('{{') && part.endsWith('}}')) {
          // Extract the keyword
          const keyword = part.slice(2, -2);
          return <Highlight key={index}>{keyword}</Highlight>;
        }
        // Regular text
        return part;
      })}
    </>
  );
}

/**
 * Alternative: Inline code-style highlight
 */
export function Code({ children, className = "" }) {
  return (
    <code 
      className={`font-mono text-sm px-1 py-0.5 rounded ${className}`}
      style={{ 
        backgroundColor: 'var(--accent-bg, rgba(var(--accent-rgb), 0.1))',
        color: 'var(--accent)'
      }}
    >
      {children}
    </code>
  );
}

export default parseHighlight;
