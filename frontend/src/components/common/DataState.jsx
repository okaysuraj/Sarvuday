import { Link } from 'react-router-dom';

export function DataState({
  loading,
  error,
  retry,
  empty,
  emptyMessage = 'No records yet.',
  emptyAction,
  children,
}) {
  if (loading)
    return (
      <p role="status" className="py-12 text-on-surface-variant">
        Loading your records…
      </p>
    );
  if (error)
    return (
      <div role="alert" className="rounded-xl border border-red-200 bg-white p-6 space-y-4">
        <p>{error}</p>
        {retry && (
          <button onClick={retry} className="btn-primary">
            Try again
          </button>
        )}
      </div>
    );
  if (empty)
    return (
      <div role="status" className="rounded-xl border border-stone-200 bg-white p-6">
        <p>{emptyMessage}</p>
        {emptyAction && (
          <Link to={emptyAction.to} className="inline-block mt-3 underline">
            {emptyAction.label}
          </Link>
        )}
      </div>
    );
  return children;
}

export function PageHeading({ title, children }) {
  return (
    <header className="mb-8">
      <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
      {children && <p className="text-on-surface-variant mt-2 max-w-2xl">{children}</p>}
    </header>
  );
}

export function Metric({ label, value }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white p-6">
      <p className="text-sm text-on-surface-variant">{label}</p>
      <p className="text-2xl font-semibold mt-2">{value ?? 'Not recorded'}</p>
    </div>
  );
}
