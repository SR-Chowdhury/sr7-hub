import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { listLabs, deleteLab } from '../lib/api';

export default function LabsList() {
  const [labs, setLabs] = useState([]);
  const [meta, setMeta] = useState({ total: 0, page: 1, pages: 1 });
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState('');
  const [qInput, setQInput] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [category, setCategory] = useState('');
  const [solved, setSolved] = useState('');
  const [page, setPage] = useState(1);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const res = await listLabs({ q, difficulty, category, solved, page, limit: 20 });
      setLabs(res.data);
      setMeta(res.meta);
    } finally {
      setLoading(false);
    }
  }, [q, difficulty, category, solved, page]);

  useEffect(() => { load(); }, [load]);

  useEffect(() => {
    const t = setTimeout(() => { setQ(qInput); setPage(1); }, 300);
    return () => clearTimeout(t);
  }, [qInput]);

  const onDelete = async (lab) => {
    if (!confirm(`Delete "${lab.title}"?`)) return;
    await deleteLab(lab.id);
    load();
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Labs <span className="text-slate-500 text-base">({meta.total})</span>
        </h1>
        <Link to="/admin/labs/new" className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold px-4 py-2 rounded">
          + New Lab
        </Link>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        <input
          value={qInput}
          onChange={(e) => setQInput(e.target.value)}
          placeholder="Search title, summary, notes…"
          className="flex-1 min-w-[200px] px-3 py-2 bg-[#0d1220] border border-white/10 rounded focus:border-emerald-400 outline-none"
        />
        <input
          value={category}
          onChange={(e) => { setCategory(e.target.value); setPage(1); }}
          placeholder="Category"
          className="w-40 px-3 py-2 bg-[#0d1220] border border-white/10 rounded focus:border-emerald-400 outline-none"
        />
        <select
          value={difficulty}
          onChange={(e) => { setDifficulty(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-[#0d1220] border border-white/10 rounded outline-none"
        >
          <option value="">All difficulties</option>
          <option>Apprentice</option>
          <option>Practitioner</option>
          <option>Expert</option>
        </select>
        <select
          value={solved}
          onChange={(e) => { setSolved(e.target.value); setPage(1); }}
          className="px-3 py-2 bg-[#0d1220] border border-white/10 rounded outline-none"
        >
          <option value="">All status</option>
          <option value="true">Solved</option>
          <option value="false">Unsolved</option>
        </select>
      </div>

      <div className="bg-[#0d1220] border border-white/10 rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/5 text-slate-400">
            <tr>
              <th className="text-left px-4 py-3 font-medium">#</th>
              <th className="text-left px-4 py-3 font-medium">Title</th>
              <th className="text-left px-4 py-3 font-medium">Category</th>
              <th className="text-left px-4 py-3 font-medium">Difficulty</th>
              <th className="text-left px-4 py-3 font-medium">Solved</th>
              <th className="text-right px-4 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td colSpan="6" className="px-4 py-8 text-center text-slate-500">Loading…</td></tr>
            )}
            {!loading && labs.length === 0 && (
              <tr><td colSpan="6" className="px-4 py-8 text-center text-slate-500">No labs found.</td></tr>
            )}
            {!loading && labs.map((lab) => (
              <tr key={lab.id} className="border-t border-white/5 hover:bg-white/[0.02]">
                <td className="px-4 py-3 text-slate-500">{lab.labNumber || '—'}</td>
                <td className="px-4 py-3">
                  <Link to={`/admin/labs/${lab.id}`} className="text-white hover:text-emerald-400">
                    {lab.title}
                  </Link>
                </td>
                <td className="px-4 py-3 text-slate-400">{lab.category}</td>
                <td className="px-4 py-3">
                  <span className="text-xs px-2 py-0.5 rounded bg-white/5">{lab.difficulty}</span>
                </td>
                <td className="px-4 py-3">
                  {lab.solved
                    ? <span className="text-emerald-400">✓</span>
                    : <span className="text-slate-600">—</span>}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link to={`/admin/labs/${lab.id}`} className="text-slate-400 hover:text-emerald-400 mr-3">Edit</Link>
                  <button onClick={() => onDelete(lab)} className="text-slate-400 hover:text-red-400">Delete</button>
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
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-3 py-1.5 bg-[#0d1220] border border-white/10 rounded disabled:opacity-30"
            >
              Prev
            </button>
            <button
              disabled={page >= meta.pages}
              onClick={() => setPage((p) => p + 1)}
              className="px-3 py-1.5 bg-[#0d1220] border border-white/10 rounded disabled:opacity-30"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}