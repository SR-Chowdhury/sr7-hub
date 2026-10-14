import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { gigs } from '../lib/api';

const EMPTY = {
  title: '',
  price: 'TBD',
  delivery: 'TBD',
  status: 'placeholder',
  summary: '',
  deliverables: [],
  tags: [],
  order: 0,
  published: true,
};

const toLines = (a) => (Array.isArray(a) ? a.join('\n') : '');
const fromLines = (s) => String(s).split('\n').map((x) => x.trim()).filter(Boolean);
const inputCls =
  'w-full px-3 py-2 bg-[#0a0e17] border border-white/10 rounded focus:border-emerald-400 outline-none text-sm';

function Field({ label, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function GigForm({ isNew = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [delivText, setDelivText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    gigs.get(id)
      .then((g) => {
        setForm({ ...EMPTY, ...g });
        setDelivText(toLines(g.deliverables));
        setTagsText(toLines(g.tags));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setBool = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        deliverables: fromLines(delivText),
        tags: fromLines(tagsText),
        order: Number(form.order) || 0,
      };
      if (isNew) {
        const created = await gigs.create(payload);
        navigate(`/admin/gigs/${created.id}`, { replace: true });
      } else {
        await gigs.update(id, payload);
        navigate('/admin/gigs');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-400">Loading…</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Gig' : 'Edit Gig'}</h1>

      {error && (
        <div className="mb-4 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <Field label="Title">
          <input value={form.title} onChange={set('title')} className={inputCls} required />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Price">
            <input value={form.price} onChange={set('price')} className={inputCls} placeholder="Coming Soon" />
          </Field>
          <Field label="Delivery">
            <input value={form.delivery} onChange={set('delivery')} className={inputCls} placeholder="3 days" />
          </Field>
          <Field label="Status">
            <select value={form.status} onChange={set('status')} className={inputCls}>
              <option value="active">active</option>
              <option value="placeholder">placeholder</option>
              <option value="paused">paused</option>
            </select>
          </Field>
        </div>

        <Field label="Summary">
          <textarea value={form.summary} onChange={set('summary')} rows={4} className={inputCls} />
        </Field>

        <Field label="Deliverables (one per line)">
          <textarea value={delivText} onChange={(e) => setDelivText(e.target.value)} rows={6} className={inputCls} />
        </Field>

        <Field label="Tags (one per line)">
          <textarea value={tagsText} onChange={(e) => setTagsText(e.target.value)} rows={3} className={inputCls} />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Order">
            <input type="number" value={form.order} onChange={set('order')} className={inputCls} />
          </Field>
          <label className="flex items-end gap-2 text-sm pb-2">
            <input type="checkbox" checked={form.published} onChange={setBool('published')} />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold px-5 py-2 rounded">
            {saving ? 'Saving…' : isNew ? 'Create Gig' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin/gigs')}
            className="px-5 py-2 rounded border border-white/10 text-slate-300 hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}