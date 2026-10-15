export default function Loader({ label = 'Loading…' }) {
  return (
    <div className="flex-1 w-full flex items-center justify-center py-16 text-slate-400">
      <div className="animate-spin h-5 w-5 border-2 border-slate-600 border-t-emerald-400 rounded-full mr-3" />
      {label}
    </div>
  );
}