import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    // TODO: Send to error tracking service (e.g., Sentry)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div 
          className="min-h-screen flex items-center justify-center p-4"
          style={{ backgroundColor: 'var(--bg)' }}
        >
          <div 
            className="border-2 p-8 max-w-md"
            style={{ 
              borderColor: 'var(--border)',
              backgroundColor: 'var(--card)',
              boxShadow: 'var(--shadow-strong)'
            }}
          >
            <h1 
              className="text-2xl font-extrabold mb-4"
              style={{ color: 'var(--fg)' }}
            >
              Oops! Something went wrong
            </h1>
            <p 
              className="mb-4"
              style={{ color: 'var(--muted)' }}
            >
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="border-2 px-6 py-2 font-semibold hover:-translate-y-0.5 transition-transform"
              style={{
                borderColor: 'var(--border)',
                backgroundColor: 'var(--accent)',
                color: 'var(--fg)',
                boxShadow: '4px 4px 0 var(--border)'
              }}
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && (
              <details className="mt-4">
                <summary 
                  className="cursor-pointer font-mono text-xs"
                  style={{ color: 'var(--fg)' }}
                >
                  Error Details
                </summary>
                <pre 
                  className="mt-2 text-xs overflow-auto p-2 border"
                  style={{ 
                    backgroundColor: 'color-mix(in srgb, var(--muted) 10%, transparent)',
                    color: 'var(--fg)',
                    borderColor: 'var(--border)'
                  }}
                >
                  {this.state.error?.toString()}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
