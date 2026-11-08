import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  componentDidCatch(error, info) {
    console.error("ErrorBoundary:", error, info.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-center py-20">
          <p className="text-5xl mb-4">😢</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error!</h2>
          <p className="text-gray-500 mb-6">{this.state.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg cursor-pointer"
          >
            Reload the Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;