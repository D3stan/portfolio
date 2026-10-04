export default function PageLoader({ text = 'Loading...' }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="text-center">
        {/* Animated spinner with brutalist design */}
        <div 
          className="inline-block border-4 rounded-full w-16 h-16 animate-spin"
          style={{ 
            borderColor: 'var(--border)',
            borderTopColor: 'var(--accent)'
          }}
        ></div>
        <p className="mt-4 font-mono font-bold text-lg" style={{ color: 'var(--fg)' }}>{text}</p>
      </div>
    </div>
  );
}
