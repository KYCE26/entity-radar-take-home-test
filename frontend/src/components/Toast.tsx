import { useEntityStore } from '../store/useEntityStore';

export default function Toast() {
  const { toast, clearToast } = useEntityStore();

  if (!toast) return null;

  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 md:top-6 md:bottom-auto md:left-auto md:right-6 md:translate-x-0 z-50 animate-fade-in-up transition-all duration-300">
      <div className={`flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl backdrop-blur-md border ${isError ? 'bg-rose-950/90 border-rose-800/50 text-rose-100 shadow-rose-900/20' : 'bg-emerald-950/90 border-emerald-800/50 text-emerald-100 shadow-emerald-900/20'}`}>
        {isError ? (
          <svg className="w-5 h-5 shrink-0 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        ) : (
          <svg className="w-5 h-5 shrink-0 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        )}
        <span className="text-sm font-semibold tracking-wide">{toast.message}</span>
        <button onClick={clearToast} className={`ml-3 p-1 rounded-full transition-colors ${isError ? 'hover:bg-rose-900/50 text-rose-300' : 'hover:bg-emerald-900/50 text-emerald-300'}`}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}