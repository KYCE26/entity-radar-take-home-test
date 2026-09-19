import { useState, useEffect } from 'react';
import Map from './components/Map';
import EntityDetail from './components/EntityDetail';
import EntityForm from './components/EntityForm';
import Toast from './components/Toast';
import { useEntityStore } from './store/useEntityStore';

export default function App() {
  const { isLoading, draftCoordinates, setDraftCoordinates, selectedEntity, setSelectedEntity } = useEntityStore();
  
  // State untuk mengontrol visibilitas form secara eksplisit
  const [isFormOpen, setIsFormOpen] = useState(false);
  // State untuk membedakan mode form ('create' atau 'edit')
  const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

  // Menangani saat peta diklik (untuk mendapatkan koordinat baru)
  useEffect(() => {
    if (draftCoordinates) {
      // Jika pengguna mengklik peta, bersihkan pilihan entitas (tutup panel detail)
      setSelectedEntity(null);
      // Buka form dalam mode 'create' (tambah)
      setFormMode('create');
      setIsFormOpen(true);
    }
  }, [draftCoordinates, setSelectedEntity]);

  // Menangani saat pengguna mengklik tombol "Edit Data" di panel EntityDetail
  const handleEditClick = () => {
    // Pastikan form terbuka dalam mode 'edit'
    setFormMode('edit');
    setIsFormOpen(true);
    // Bersihkan titik kuning sementara (draft) jika ada
    setDraftCoordinates(null);
  };

  // Menangani saat pengguna menekan tombol silang (Tutup) di panel EntityDetail
  // Kita pastikan jika detail ditutup, form edit juga ikut tertutup
  useEffect(() => {
    if (!selectedEntity && formMode === 'edit') {
      setIsFormOpen(false);
    }
  }, [selectedEntity, formMode]);

  return (
    <div className="bg-gray-950 min-h-screen text-white relative overflow-hidden font-sans">
      <header className="absolute top-4 left-4 right-4 md:left-8 md:right-8 z-40 bg-gray-900/90 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-4 md:px-6 flex justify-between items-center shadow-2xl transition-all">
        <div className="flex items-center gap-5">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-cyan-400 leading-tight">Entity Radar</h1>
            <p className="text-[10px] font-mono text-gray-400 uppercase tracking-widest mt-0.5">Tactical Dashboard</p>
          </div>
          {isLoading && (
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-cyan-950/40 border border-cyan-800/50 rounded-full">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
              <span className="text-[10px] text-cyan-300 font-mono uppercase tracking-wider">Syncing</span>
            </div>
          )}
        </div>
        
        <button
          onClick={() => {
            setSelectedEntity(null);
            setDraftCoordinates(null);
            setFormMode('create');
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 bg-cyan-600/90 hover:bg-cyan-500 active:bg-cyan-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg shadow-cyan-900/20 border border-cyan-500/50 hover:border-cyan-400"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          <span className="hidden md:inline">Tambah Titik</span>
        </button>
      </header>

      <main>
        <Map />
        
        <EntityDetail onEdit={handleEditClick} />
        
        <EntityForm 
          isOpen={isFormOpen} 
          // Form hanya akan menerima data entitas JIKA mode-nya adalah 'edit'
          entityToEdit={formMode === 'edit' ? selectedEntity : null}
          onClose={() => {
            setIsFormOpen(false);
            setDraftCoordinates(null);
            // Kembali ke mode default
            setFormMode('create');
          }} 
        />
        
        <Toast />
      </main>
    </div>
  );
}