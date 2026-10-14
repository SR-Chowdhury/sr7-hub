import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { audits } from '../lib/api';

const EMPTY = {
  title: '',
  client: '',
  category: '',
  environment: '',
  duration: '',
  summary: '',
  confidentialityNote: '',
  tools: [],
  scope: [],
  methodology: [],
  findingsSummary: { total: 0, critical: 0, high: 0, medium: 0, low: 0 },
  criticalFindings: [],
  remediation: [],
  beforeAfter: { before: { total: 0, critical: 0 }, after: { total: 0, critical: 0 } },
  recommendations: [],
  lessons: [],
  order: 0,
  published: true,
};

const toLines = (a) => (Array.isArray(a) ? a.join('\n') : '');
const fromLines = (s) => String(s).split('\n').map((x) => x.trim()).filter(Boolean);
const inputCls =
  'w-full px-3 py-2 bg-[#0a0e17] border border-white/10 rounded focus:border-emerald-400 outline-none text-sm';
const smallInput =
  'w-full px-2 py-1.5 bg-[#0a0e17] border border-white/10 rounded focus:border-emerald-400 outline-none text-xs';

function Field({ label, children, className = '' }) {
  return (
    <div className={className}>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

function SectionHeader({ title, onAdd, addLabel = '+ Add' }) {
  return (
    <div className="flex items-center justify-between mb-2">
      <label className="text-xs text-slate-400">{title}</label>
      {onAdd && (
        <button type="button" onClick={onAdd} className="text-xs text-emerald-400 hover:text-emerald-300">
          {addLabel}
        </button>
      )}
    </div>
  );
}

export default function AuditForm({ isNew = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [toolsText, setToolsText] = useState('');
  const [recsText, setRecsText] = useState('');
  const [lessonsText, setLessonsText] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    audits.get(id)
      .then((a) => {
        setForm({ ...EMPTY, ...a });
        setToolsText(toLines(a.tools));
        setRecsText(toLines(a.recommendations));
        setLessonsText(toLines(a.lessons));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setBool = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }));

  /* findingsSummary */
  const setCount = (k, v) =>
    setForm((f) => ({ ...f, findingsSummary: { ...f.findingsSummary, [k]: Number(v) || 0 } }));

  /* beforeAfter */
  const setBA = (side, k, v) =>
    setForm((f) => ({
      ...f,
      beforeAfter: { ...f.beforeAfter, [side]: { ...f.beforeAfter[side], [k]: Number(v) || 0 } },
    }));

  /* scope */
  const addScope = () => setForm((f) => ({ ...f, scope: [...f.scope, { label: '', value: '' }] }));
  const removeScope = (i) => setForm((f) => ({ ...f, scope: f.scope.filter((_, j) => j !== i) }));
  const setScope = (i, k, v) =>
    setForm((f) => ({ ...f, scope: f.scope.map((s, j) => (j === i ? { ...s, [k]: v } : s)) }));

  /* methodology */
  const addMeth = () => setForm((f) => ({ ...f, methodology: [...f.methodology, { step: '', tool: '', purpose: '' }] }));
  const removeMeth = (i) => setForm((f) => ({ ...f, methodology: f.methodology.filter((_, j) => j !== i) }));
  const setMeth = (i, k, v) =>
    setForm((f) => ({ ...f, methodology: f.methodology.map((m, j) => (j === i ? { ...m, [k]: v } : m)) }));

  /* findings */
  const addFinding = () =>
    setForm((f) => ({ ...f, criticalFindings: [...f.criticalFindings, { fid: '', title: '', severity: 'Critical', detail: '', fix: '' }] }));
  const removeFinding = (i) =>
    setForm((f) => ({ ...f, criticalFindings: f.criticalFindings.filter((_, j) => j !== i) }));
  const setFinding = (i, k, v) =>
    setForm((f) => ({ ...f, criticalFindings: f.criticalFindings.map((x, j) => (j === i ? { ...x, [k]: v } : x)) }));

  /* remediation */
  const addRem = () => setForm((f) => ({ ...f, remediation: [...f.remediation, { action: '', result: '' }] }));
  const removeRem = (i) => setForm((f) => ({ ...f, remediation: f.remediation.filter((_, j) => j !== i) }));
  const setRem = (i, k, v) =>
    setForm((f) => ({ ...f, remediation: f.remediation.map((r, j) => (j === i ? { ...r, [k]: v } : r)) }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        tools: fromLines(toolsText),
        recommendations: fromLines(recsText),
        lessons: fromLines(lessonsText),
        order: Number(form.order) || 0,
      };
      if (isNew) {
        const created = await audits.create(payload);
        navigate(`/admin/audits/${created.id}`, { replace: true });
      } else {
        await audits.update(id, payload);
        navigate('/admin/audits');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-400">Loading…</div>;

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Audit' : 'Edit Audit'}</h1>

      {error && (
        <div className="mb-4 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-5">
        <Field label="Title">
          <input value={form.title} onChange={set('title')} className={inputCls} required />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Client"><input value={form.client} onChange={set('client')} className={inputCls} /></Field>
          <Field label="Category"><input value={form.category} onChange={set('category')} className={inputCls} /></Field>
          <Field label="Duration"><input value={form.duration} onChange={set('duration')} className={inputCls} /></Field>
        </div>

        <Field label="Environment">
          <input value={form.environment} onChange={set('environment')} className={inputCls} />
        </Field>

        <Field label="Summary">
          <textarea value={form.summary} onChange={set('summary')} rows={3} className={inputCls} />
        </Field>

        <Field label="Confidentiality Note">
          <textarea value={form.confidentialityNote} onChange={set('confidentialityNote')} rows={2} className={inputCls} />
        </Field>

        <Field label="Tools (one per line)">
          <textarea value={toolsText} onChange={(e) => setToolsText(e.target.value)} rows={3} className={inputCls} />
        </Field>

        {/* Scope */}
        <div>
          <SectionHeader title="Scope" onAdd={addScope} addLabel="+ Add Row" />
          <div className="space-y-2">
            {form.scope.map((s, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={s.label} onChange={(e) => setScope(i, 'label', e.target.value)} placeholder="Label" className={`${smallInput} flex-1`} />
                <input value={s.value} onChange={(e) => setScope(i, 'value', e.target.value)} placeholder="Value" className={`${smallInput} flex-1`} />
                <button type="button" onClick={() => removeScope(i)} className="text-red-400 hover:text-red-300 text-sm px-1">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Methodology */}
        <div>
          <SectionHeader title="Methodology" onAdd={addMeth} addLabel="+ Add Step" />
          <div className="space-y-2">
            {form.methodology.map((m, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={m.step} onChange={(e) => setMeth(i, 'step', e.target.value)} placeholder="Step" className={`${smallInput} flex-1`} />
                <input value={m.tool} onChange={(e) => setMeth(i, 'tool', e.target.value)} placeholder="Tool" className={`${smallInput} flex-1`} />
                <input value={m.purpose} onChange={(e) => setMeth(i, 'purpose', e.target.value)} placeholder="Purpose" className={`${smallInput} flex-1`} />
                <button type="button" onClick={() => removeMeth(i)} className="text-red-400 hover:text-red-300 text-sm px-1">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Findings Summary */}
        <div>
          <label className="block text-xs text-slate-400 mb-2">Findings Summary</label>
          <div className="grid grid-cols-5 gap-2">
            {['total', 'critical', 'high', 'medium', 'low'].map((k) => (
              <div key={k}>
                <label className="block text-[10px] text-slate-500 uppercase mb-0.5">{k}</label>
                <input type="number" value={form.findingsSummary?.[k] ?? 0}
                  onChange={(e) => setCount(k, e.target.value)} className={smallInput} />
              </div>
            ))}
          </div>
        </div>

        {/* Critical Findings */}
        <div>
          <SectionHeader title="Critical Findings" onAdd={addFinding} addLabel="+ Add Finding" />
          <div className="space-y-2">
            {form.criticalFindings.map((f, i) => (
              <div key={i} className="bg-[#0d1220] border border-white/10 rounded p-3 space-y-2">
                <div className="flex gap-2">
                  <input value={f.fid} onChange={(e) => setFinding(i, 'fid', e.target.value)} placeholder="id (finding-1)" className={`${smallInput} w-32`} />
                  <input value={f.title} onChange={(e) => setFinding(i, 'title', e.target.value)} placeholder="Title" className={`${smallInput} flex-1`} />
                  <select value={f.severity} onChange={(e) => setFinding(i, 'severity', e.target.value)} className={`${smallInput} w-28`}>
                    <option>Critical</option><option>High</option><option>Medium</option><option>Low</option>
                  </select>
                  <button type="button" onClick={() => removeFinding(i)} className="text-red-400 hover:text-red-300 text-sm px-1">×</button>
                </div>
                <textarea value={f.detail} onChange={(e) => setFinding(i, 'detail', e.target.value)} placeholder="Detail" rows={2} className={smallInput} />
                <textarea value={f.fix} onChange={(e) => setFinding(i, 'fix', e.target.value)} placeholder="Fix" rows={2} className={smallInput} />
              </div>
            ))}
          </div>
        </div>

        {/* Remediation */}
        <div>
          <SectionHeader title="Remediation" onAdd={addRem} addLabel="+ Add Row" />
          <div className="space-y-2">
            {form.remediation.map((r, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input value={r.action} onChange={(e) => setRem(i, 'action', e.target.value)} placeholder="Action" className={`${smallInput} flex-1`} />
                <input value={r.result} onChange={(e) => setRem(i, 'result', e.target.value)} placeholder="Result" className={`${smallInput} flex-1`} />
                <button type="button" onClick={() => removeRem(i)} className="text-red-400 hover:text-red-300 text-sm px-1">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Before / After */}
        <div>
          <label className="block text-xs text-slate-400 mb-2">Before → After</label>
          <div className="grid grid-cols-4 gap-2">
            {['before', 'after'].map((side) => (
              <div key={side} className="col-span-2 grid grid-cols-2 gap-2">
                <div className="col-span-2 text-[10px] text-slate-500 uppercase">{side}</div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase mb-0.5">Total</label>
                  <input type="number" value={form.beforeAfter?.[side]?.total ?? 0}
                    onChange={(e) => setBA(side, 'total', e.target.value)} className={smallInput} />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 uppercase mb-0.5">Critical</label>
                  <input type="number" value={form.beforeAfter?.[side]?.critical ?? 0}
                    onChange={(e) => setBA(side, 'critical', e.target.value)} className={smallInput} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <Field label="Recommendations (one per line)">
          <textarea value={recsText} onChange={(e) => setRecsText(e.target.value)} rows={5} className={inputCls} />
        </Field>

        <Field label="Lessons (one per line)">
          <textarea value={lessonsText} onChange={(e) => setLessonsText(e.target.value)} rows={5} className={inputCls} />
        </Field>

        <div className="grid grid-cols-3 gap-4">
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
            {saving ? 'Saving…' : isNew ? 'Create Audit' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin/audits')}
            className="px-5 py-2 rounded border border-white/10 text-slate-300 hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}