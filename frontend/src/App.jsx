import { Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PageLoader from './components/common/PageLoader';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';
import { dashboardRoutes, publicRoutes } from './routes';

// Dashboard authentication belongs to the parent; individual pages add role checks.
function renderRoutes(definitions) {
  return definitions.map(({ path, index, Page, redirect, roles, children }) => {
    const page = redirect ? <Navigate to={redirect} replace /> : <Page />;
    return (
      <Route
        key={path || 'index'}
        path={path}
        index={index}
        element={roles ? <ProtectedRoute allowedRoles={roles}>{page}</ProtectedRoute> : page}
      >
        {children && renderRoutes(children)}
      </Route>
    );
  });
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route element={<PublicLayout />}>{renderRoutes(publicRoutes)}</Route>
          <Route
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {renderRoutes(dashboardRoutes)}
          </Route>
          <Route
            path="*"
            element={
              <main className="max-w-xl mx-auto p-8">
                <h1 className="text-2xl font-semibold">Page not found</h1>
                <a className="inline-block underline mt-4" href="/">
                  Return home
                </a>
              </main>
            }
          />
        </Routes>
      </Suspense>
      <ToastContainer />
    </BrowserRouter>
  );
}
