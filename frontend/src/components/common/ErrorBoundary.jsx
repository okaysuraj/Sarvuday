import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (this.state.failed) return <main className="max-w-xl mx-auto p-8" role="alert"><h1 className="text-2xl font-semibold">This page could not load</h1><p className="my-4">Reload the app to try again. Your saved records remain in your account.</p><button className="btn-primary" onClick={() => window.location.reload()}>Reload app</button></main>;
    return this.props.children;
  }
}
