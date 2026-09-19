import axios from 'axios';
import { useEntityStore } from '../store/useEntityStore';

interface EntityDetailProps {
  onEdit: () => void;
}

export default function EntityDetail({ onEdit }: EntityDetailProps) {
  const { selectedEntity, setSelectedEntity, fetchEntities, showToast } = useEntityStore();

  if (!selectedEntity) return null;

  const handleDelete = async () => {
    if (!confirm('Apakah kamu yakin ingin menghapus entitas ini?')) return;
    try {
      await axios.delete(`https://mapapi.portofoliorifky.my.id/api/entities/${selectedEntity.id}`);
      await fetchEntities();
      setSelectedEntity(null);
      showToast('Entitas berhasil dihapus.', 'success');
    } catch (error) {
      showToast('Gagal menghapus entitas. Coba lagi.', 'error');
    }
  };

  return (
    <aside className="fixed md:absolute inset-x-4 bottom-4 md:bottom-auto md:inset-x-auto md:top-24 md:right-8 z-40 w-auto md:w-96 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl text-white transition-all">
      <div className="flex justify-between items-start mb-6 border-b border-gray-700/50 pb-4">
        <div>
          <span className="inline-block text-[10px] font-mono tracking-widest text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/30 mb-2">
            ID: {String(selectedEntity.id).padStart(4, '0')}
          </span>
          <h2 className="text-xl font-bold text-gray-50 tracking-tight leading-tight">{selectedEntity.name}</h2>
        </div>
        <button onClick={() => setSelectedEntity(null)} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/80 rounded-full transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div className="space-y-4 text-sm mb-8">
        <div className="flex justify-between items-center bg-gray-800/30 p-3 rounded-xl border border-gray-700/30">
          <span className="text-gray-400 font-medium">Tipe Entitas</span>
          <span className="font-semibold text-gray-200">{selectedEntity.type}</span>
        </div>
        <div className="flex justify-between items-center bg-gray-800/30 p-3 rounded-xl border border-gray-700/30">
          <span className="text-gray-400 font-medium">Status</span>
          <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
            selectedEntity.status === 'Aktif' ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/50' : 
            selectedEntity.status === 'Perbaikan' ? 'bg-amber-950/40 text-amber-400 border-amber-800/50' : 
            'bg-rose-950/40 text-rose-400 border-rose-800/50'
          }`}>
            {selectedEntity.status}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 bg-gray-800/30 p-4 rounded-xl border border-gray-700/30 font-mono text-[11px]">
          <div>
            <span className="text-gray-500 block mb-1">LATITUDE</span>
            <span className="text-gray-300 text-sm">{selectedEntity.latitude.toFixed(6)}</span>
          </div>
          <div>
            <span className="text-gray-500 block mb-1">LONGITUDE</span>
            <span className="text-gray-300 text-sm">{selectedEntity.longitude.toFixed(6)}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onEdit} className="flex-1 flex items-center justify-center gap-2 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-400 py-2.5 rounded-xl text-sm font-semibold transition-all border border-cyan-800/50 hover:border-cyan-700/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Data
        </button>
        <button onClick={handleDelete} className="flex-1 flex items-center justify-center gap-2 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 py-2.5 rounded-xl text-sm font-semibold transition-all border border-rose-800/50 hover:border-rose-700/80">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Hapus
        </button>
      </div>
    </aside>
  );
}