import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { login } from '../lib/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/admin/labs';

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex items-center justify-center p-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-[#0d1220] border border-white/10 rounded-xl p-6">
        <h1 className="text-xl font-bold mb-1">
          <span className="text-emerald-400">SR7</span> Admin
        </h1>
        <p className="text-sm text-slate-400 mb-6">Sign in to manage your content.</p>

        {error && (
          <div className="mb-4 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded px-3 py-2">
            {error}
          </div>
        )}

        <label className="block text-xs text-slate-400 mb-1">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 px-3 py-2 bg-[#0a0e17] border border-white/10 rounded focus:border-emerald-400 outline-none"
        />

        <label className="block text-xs text-slate-400 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-6 px-3 py-2 bg-[#0a0e17] border border-white/10 rounded focus:border-emerald-400 outline-none"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold py-2 rounded transition"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </div>
  );
}