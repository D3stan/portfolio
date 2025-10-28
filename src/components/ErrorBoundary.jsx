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
        <div className="min-h-screen flex items-center justify-center bg-white p-4">
          <div className="border-2 border-black bg-white shadow-[8px_8px_0_rgba(0,0,0,0.3)] p-8 max-w-md">
            <h1 className="text-2xl font-extrabold mb-4">Oops! Something went wrong</h1>
            <p className="mb-4 text-gray-700">
              We're sorry, but something unexpected happened. Please try refreshing the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="border-2 border-black bg-yellow-300 px-6 py-2 font-semibold shadow-[4px_4px_0_#000] hover:-translate-y-0.5 transition-transform"
            >
              Refresh Page
            </button>
            {import.meta.env.DEV && (
              <details className="mt-4">
                <summary className="cursor-pointer font-mono text-xs">Error Details</summary>
                <pre className="mt-2 text-xs overflow-auto bg-gray-100 p-2">
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
