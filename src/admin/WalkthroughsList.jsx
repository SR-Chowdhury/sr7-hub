import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { walkthroughs } from '../lib/api';

export default function WalkthroughsList() {
  const [items, setItems] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [qInput, setQInput] = useState('');
  const [q, setQ] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await walkthroughs.list({ q, difficulty, page, limit: 20 });
      setItems(res.data);
      setMeta(res.meta);
    } finally {
      setLoading(false);
    }
  }, [q, difficulty, page]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const t = setTimeout(() => { setQ(qInput); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [qInput]);

  const onDelete = async (w) => {
    if (!confirm(`Delete "${w.machineName}"?`)) return;
    await walkthroughs.remove(w.id);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          VulnHub Walkthroughs <span className="text-slate-500 text-base">({meta.total})</span>
        </h1>
        <Link to="/admin/walkthroughs/new" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded">
          + New Walkthrough
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          placeholder="Search name, summary, notes…"
          className="flex-1 min-w-[200px] px-3 py-2 bg-[#0d1220] border border-white/10 rounded focus:border-emerald-400 outline-none"
        />
        <input
          value={difficulty}
          onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
          placeholder="Difficulty"
          className="w-48 px-3 py-2 bg-[#0d1220] border border-white/10 rounded focus:border-emerald-400 outline-none"
        />
      </div>

      <div className="bg-[#0d1220] border border-white/10 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="text-left px-4 py-3 font-medium">Machine</th>
              <th className="text-left px-4 py-3 font-medium">OS</th>
              <th className="text-left px-4 py-3 font-medium">Difficulty</th>
              <th className="text-left px-4 py-3 font-medium">Phases</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">Loading…</td></tr>}
            {!loading && items.length === 0 && <tr><td colSpan="5" className="px-4 py-8 text-center text-slate-500">No walkthroughs found.</td></tr>}
            {!loading && items.map((w) => (
              <tr key={w.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3">
                  <Link to={`/admin/walkthroughs/${w.id}`} className="text-white hover:text-emerald-400">{w.machineName}</Link>
                </td>
                <td className="px-4 py-3 text-slate-400">{w.os || '—'}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5">{w.difficulty || '—'}</span>
                </td>
                <td className="px-4 py-3 text-slate-400">{w.phases?.length ?? 0}</td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/walkthroughs/${w.id}`} className="text-slate-400 hover:text-emerald-400 mr-3">Edit</Link>
                  <button onClick={() => onDelete(w)} className="text-slate-400 hover:text-red-400">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {meta.pages > 1 && (
        <div className="flex items-center justify-between mt-4 text-sm">
          <div className="text-slate-500">Page {meta.page} of {meta.pages}</div>
          <div className="flex gap-2">
            <button disabled={page <= 1} onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 bg-[#0d1220] border border-white/10 rounded disabled:opacity-30">Prev</button>
            <button disabled={page >= meta.pages} onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 bg-[#0d1220] border border-white/10 rounded disabled:opacity-30">Next</button>
          </div>
        </div>
      )}
    </div>
  );
}