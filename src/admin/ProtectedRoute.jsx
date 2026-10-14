import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken, me } from '../lib/api';

export default function ProtectedRoute({ children }) {
  const [status, setStatus] = useState('checking');
  const location = useLocation();

  useEffect(() => {
    let cancelled = false;
    const token = getToken();
    if (!token) {
      setStatus('denied');
      return;
    }
    me()
      .then(() => { if (!cancelled) setStatus('authed'); })
      .catch(() => { if (!cancelled) setStatus('denied'); });
    return () => { cancelled = true; };
  }, []);

  if (status === 'checking') {
    return (
      <div className="min-h-screen bg-[#0a0e17] text-white flex items-center justify-center">
        <div className="text-slate-400">Verifying session…</div>
      </div>
    );
  }
  if (status === 'denied') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }
  return children;
}