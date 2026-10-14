import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { machines } from '../lib/api';

const EMPTY = {
  machineName: '',
  difficulty: 'Very Easy',
  os: 'Linux',
  summary: '',
  ports: [],
  tools: [],
  phases: [],
  userFlag: false,
  rootFlag: false,
  retired: true,
  url: '',
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

export default function MachineForm({ isNew = false }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [toolsText, setToolsText] = useState('');
  const [portsText, setPortsText] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isNew) return;
    machines.get(id)
      .then((m) => {
        setForm({ ...EMPTY, ...m });
        setToolsText(toLines(m.tools));
        setPortsText(toLines(m.ports));
        setTagsText(toLines(m.tags));
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const setBool = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.checked }));

  /* --- Phase / step editors --- */
  const addPhase = () =>
    setForm((f) => ({ ...f, phases: [...f.phases, { title: '', steps: [] }] }));
  const removePhase = (pi) =>
    setForm((f) => ({ ...f, phases: f.phases.filter((_, i) => i !== pi) }));
  const setPhaseTitle = (pi, value) =>
    setForm((f) => ({
      ...f,
      phases: f.phases.map((p, i) => (i === pi ? { ...p, title: value } : p)),
    }));
  const addStep = (pi) =>
    setForm((f) => ({
      ...f,
      phases: f.phases.map((p, i) =>
        i === pi ? { ...p, steps: [...p.steps, { text: '', command: '' }] } : p
      ),
    }));
  const removeStep = (pi, si) =>
    setForm((f) => ({
      ...f,
      phases: f.phases.map((p, i) =>
        i === pi ? { ...p, steps: p.steps.filter((_, j) => j !== si) } : p
      ),
    }));
  const setStep = (pi, si, key, value) =>
    setForm((f) => ({
      ...f,
      phases: f.phases.map((p, i) =>
        i === pi
          ? { ...p, steps: p.steps.map((s, j) => (j === si ? { ...s, [key]: value } : s)) }
          : p
      ),
    }));

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      const payload = {
        ...form,
        tools: fromLines(toolsText),
        ports: fromLines(portsText),
        tags: fromLines(tagsText),
        order: Number(form.order) || 0,
      };
      if (isNew) {
        const created = await machines.create(payload);
        navigate(`/admin/machines/${created.id}`, { replace: true });
      } else {
        await machines.update(id, payload);
        navigate('/admin/machines');
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
      <h1 className="text-2xl font-bold mb-6">{isNew ? 'New Machine' : 'Edit Machine'}</h1>

      {error && (
        <div className="mb-4 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded px-3 py-2">
          {error}
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <Field label="Machine Name">
          <input value={form.machineName} onChange={set('machineName')} className={inputCls} required />
        </Field>

        <div className="grid grid-cols-3 gap-4">
          <Field label="Difficulty">
            <select value={form.difficulty} onChange={set('difficulty')} className={inputCls}>
              <option>Very Easy</option>
              <option>Easy</option>
              <option>Medium</option>
              <option>Hard</option>
              <option>Insane</option>
            </select>
          </Field>
          <Field label="OS">
            <select value={form.os} onChange={set('os')} className={inputCls}>
              <option>Linux</option>
              <option>Windows</option>
              <option>FreeBSD</option>
              <option>Other</option>
            </select>
          </Field>
          <Field label="Order">
            <input type="number" value={form.order} onChange={set('order')} className={inputCls} />
          </Field>
        </div>

        <Field label="Summary">
          <textarea value={form.summary} onChange={set('summary')} rows={3} className={inputCls} />
        </Field>

        <Field label="Ports (one per line)">
          <textarea value={portsText} onChange={(e) => setPortsText(e.target.value)} rows={3} className={inputCls} />
        </Field>

        <Field label="Tools (one per line)">
          <textarea value={toolsText} onChange={(e) => setToolsText(e.target.value)} rows={3} className={inputCls} />
        </Field>

        <Field label="Tags (one per line)">
          <textarea value={tagsText} onChange={(e) => setTagsText(e.target.value)} rows={2} className={inputCls} />
        </Field>

        <Field label="URL">
          <input value={form.url} onChange={set('url')} className={inputCls} />
        </Field>

        {/* Phases */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs text-slate-400">Phases & Steps</label>
            <button type="button" onClick={addPhase}
              className="text-xs text-emerald-400 hover:text-emerald-300">+ Add Phase</button>
          </div>

          <div className="space-y-3">
            {form.phases.map((phase, pi) => (
              <div key={pi} className="bg-[#0d1220] border border-white/10 rounded p-3 space-y-2">
                <div className="flex gap-2 items-center">
                  <input
                    value={phase.title}
                    onChange={(e) => setPhaseTitle(pi, e.target.value)}
                    placeholder="Phase title"
                    className={`${inputCls} flex-1`}
                  />
                  <button type="button" onClick={() => removePhase(pi)}
                    className="text-red-400 hover:text-red-300 text-sm px-2">Remove</button>
                </div>

                {phase.steps.map((step, si) => (
                  <div key={si} className="flex gap-2 items-center pl-3">
                    <input
                      value={step.text}
                      onChange={(e) => setStep(pi, si, 'text', e.target.value)}
                      placeholder="Step text"
                      className={`${inputCls} flex-1`}
                    />
                    <input
                      value={step.command || ''}
                      onChange={(e) => setStep(pi, si, 'command', e.target.value)}
                      placeholder="command (optional)"
                      className={`${inputCls} flex-1 font-mono`}
                    />
                    <button type="button" onClick={() => removeStep(pi, si)}
                      className="text-red-400 hover:text-red-300 text-sm px-2">×</button>
                  </div>
                ))}
                <button type="button" onClick={() => addStep(pi)}
                  className="text-xs text-slate-400 hover:text-emerald-400 pl-3">+ Add Step</button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-6 pt-2">
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.userFlag} onChange={setBool('userFlag')} />
            User Flag
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.rootFlag} onChange={setBool('rootFlag')} />
            Root Flag
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.retired} onChange={setBool('retired')} />
            Retired
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={form.published} onChange={setBool('published')} />
            Published
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold px-5 py-2 rounded">
            {saving ? 'Saving…' : isNew ? 'Create Machine' : 'Save Changes'}
          </button>
          <button type="button" onClick={() => navigate('/admin/machines')}
            className="px-5 py-2 rounded border border-white/10 text-slate-300 hover:bg-white/5">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}