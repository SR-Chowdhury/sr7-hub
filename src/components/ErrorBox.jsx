export default function ErrorBox({ error }) {
  return (
    <div className="max-w-2xl mx-auto my-8 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg p-4 text-sm">
      <div className="font-semibold mb-1">Couldn't load content</div>
      <div className="text-red-400/80">{error?.message || 'Unknown error'}</div>
      <div className="text-xs text-red-400/60 mt-2">
        Is the backend running on http://localhost:5000?
      </div>
    </div>
  );
}