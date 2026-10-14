import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getLab, createLab, updateLab } from '../lib/api';

const EMPTY = {
  labNumber: '',
  title: '',
  category: '',
  difficulty: 'Apprentice',
  summary: '',
  criteria: [],
  payload: '',
  steps: [],
  whyItWorks: '',
  remediation: '',
  notes: '',
  url: '',
  tags: [],
  solved: false,
  order: 0,
  published: true,
};

const toLines = (arr) => (Array.isArray(arr) ? arr.join('\n') : '');
const fromLines = (str) =>
  String(str).split('\n').map((s) => s.trim()).filter(Boolean);

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

export default function LabForm({ isNew = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [criteriaText, setCriteriaText] = useState('');
  const [stepsText, setStepsText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    getLab(id)
      .then((lab) => {
        setForm({ ...EMPTY, ...lab });
        setCriteriaText(toLines(lab.criteria));
        setStepsText(toLines(lab.steps));
        setTagsText(toLines(lab.tags));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const setBool = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.checked }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        criteria: fromLines(criteriaText),
        steps: fromLines(stepsText),
        tags: fromLines(tagsText),
        order: Number(form.order) || 0,
      };
      if (isNew) {
        const created = await createLab(payload);
        navigate(`/admin/labs/${created.id}`, { replace: true });
      } else {
        await updateLab(id, payload);
        navigate('/admin/labs');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-400">Loading…</div>;

  return (
    <div className="p-6 max-w-3xl">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Lab' : 'Edit Lab'}</h1>

      {error && (
        <div className="mb-4 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <Field label="Lab Number">
            <input value={form.labNumber} onChange={set('labNumber')} className={inputCls} placeholder="LAB 01" />
          </Field>
          <Field label="Category" className="col-span-2">
            <input value={form.category} onChange={set('category')} className={inputCls} placeholder="SQL Injection" required />
          </Field>
        </div>

        <Field label="Title">
          <input value={form.title} onChange={set('title')} className={inputCls} required />
        </Field>

        <div className="grid grid-cols-2 gap-4">
          <Field label="Difficulty">
            <select value={form.difficulty} onChange={set('difficulty')} className={inputCls}>
              <option>Apprentice</option>
              <option>Practitioner</option>
              <option>Expert</option>
            </select>
          </Field>
          <Field label="Order">
            <input type="number" value={form.order} onChange={set('order')} className={inputCls} />
          </Field>
        </div>

        <Field label="Summary">
          <textarea value={form.summary} onChange={set('summary')} rows={2} className={inputCls} />
        </Field>

        <Field label="Criteria (one per line)">
          <textarea value={criteriaText} onChange={(e) => setCriteriaText(e.target.value)} rows={3} className={inputCls} />
        </Field>

        <Field label="Payload">
          <input value={form.payload} onChange={set('payload')} className={`${inputCls} font-mono`} />
        </Field>

        <Field label="Steps (one per line)">
          <textarea value={stepsText} onChange={(e) => setStepsText(e.target.value)} rows={5} className={inputCls} />
        </Field>

        <Field label="Why it works">
          <textarea value={form.whyItWorks} onChange={set('whyItWorks')} rows={3} className={inputCls} />
        </Field>

        <Field label="Remediation">
          <textarea value={form.remediation} onChange={set('remediation')} rows={3} className={inputCls} />
        </Field>

        <Field label="Notes">
          <textarea value={form.notes} onChange={set('notes')} rows={3} className={inputCls} />
        </Field>

        <Field label="Tags (one per line)">
          <textarea value={tagsText} onChange={(e) => setTagsText(e.target.value)} rows={2} className={inputCls} />
        </Field>

        <Field label="URL">
          <input value={form.url} onChange={set('url')} className={inputCls} />
        </Field>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.solved} onChange={setBool('solved')} />
            Solved
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={setBool('published')} />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={saving}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold px-5 py-2 rounded"
          >
            {saving ? 'Saving…' : isNew ? 'Create Lab' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/labs')}
            className="px-5 py-2 rounded border border-white/10 text-slate-300 hover:bg-white/5"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}