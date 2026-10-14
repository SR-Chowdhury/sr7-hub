import { useEffect, useState } from 'react';
import { profile } from '../lib/api';

const EMPTY = {
  username: '',
  profileUrl: '',
  tagline: '',
  responseTime: '',
  memberSince: '',
  location: '',
};

const inputCls =
  'w-full px-3 py-2 bg-[#0a0e17] border border-white/10 rounded focus:border-emerald-400 outline-none text-sm';

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs text-slate-400 mb-1">{label}</label>
      {children}
    </div>
  );
}

export default function ProfileEditor() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    profile.get()
      .then((p) => setForm({ ...EMPTY, ...p }))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  const set = (k) => (e) => {
    setSaved(false);
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    setSaved(false);
    try {
      await profile.update(form);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6 text-slate-400">Loading…</div>;

  return (
    <div className="p-6 max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Fiverr Profile</h1>
      <p className="text-sm text-slate-400 mb-6">Singleton — one profile shown on the public Fiverr page.</p>

      {error && (
        <div className="mb-4 text-sm bg-red-500/10 text-red-400 border border-red-500/20 rounded px-3 py-2">
          {error}
        </div>
      )}
      {saved && (
        <div className="mb-4 text-sm bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded px-3 py-2">
          Saved.
        </div>
      )}

      <form onSubmit={submit} className="space-y-4">
        <Field label="Username">
          <input value={form.username} onChange={set('username')} className={inputCls} placeholder="@sr7sec" />
        </Field>
        <Field label="Profile URL">
          <input value={form.profileUrl} onChange={set('profileUrl')} className={inputCls} placeholder="https://www.fiverr.com/sr7sec" />
        </Field>
        <Field label="Tagline">
          <input value={form.tagline} onChange={set('tagline')} className={inputCls} />
        </Field>
        <div className="grid grid-cols-3 gap-4">
          <Field label="Response Time">
            <input value={form.responseTime} onChange={set('responseTime')} className={inputCls} />
          </Field>
          <Field label="Member Since">
            <input value={form.memberSince} onChange={set('memberSince')} className={inputCls} />
          </Field>
          <Field label="Location">
            <input value={form.location} onChange={set('location')} className={inputCls} />
          </Field>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={saving}
            className="bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-black font-semibold px-5 py-2 rounded">
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
        </div>
      </form>
    </div>
  );
}