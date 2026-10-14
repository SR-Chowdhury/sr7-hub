import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearToken } from '../lib/api';

const nav = [
  { to: '/admin/labs', label: 'Labs' },
  { to: '/admin/machines', label: 'HTB Machines' },
  { to: '/admin/walkthroughs', label: 'VulnHub' },
  { to: '/admin/audits', label: 'WP Audits' },
  { to: '/admin/profile', label: 'Fiverr Profile' },
  { to: '/admin/gigs', label: 'Fiverr Gigs' },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    clearToken();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-white flex">
      <aside className="w-56 border-r border-white/10 bg-[#0d1220] p-4 flex flex-col">
        <Link to="/admin/labs" className="block text-lg font-bold mb-6 hover:opacity-80 transition">
            <span className="text-emerald-400">SR7</span> Admin
        </Link>
        <nav className="flex-1 space-y-1">
          {nav.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded text-sm transition ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400'
                    : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              {n.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={logout}
          className="mt-4 text-sm text-slate-400 hover:text-red-400 text-left px-3 py-2"
        >
          Sign out
        </button>
      </aside>
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}