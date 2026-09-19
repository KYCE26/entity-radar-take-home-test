import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { useEntityStore, type Entity } from '../store/useEntityStore';
import axios from 'axios';

interface EntityFormProps {
  isOpen: boolean;
  onClose: () => void;
  entityToEdit?: Entity | null;
}

export default function EntityForm({ isOpen, onClose, entityToEdit }: EntityFormProps) {
  const { fetchEntities, draftCoordinates, setDraftCoordinates, showToast, setSelectedEntity } = useEntityStore();
  const [formData, setFormData] = useState({
    name: '', type: 'Perangkat IoT', status: 'Aktif', latitude: '', longitude: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (entityToEdit) {
      setFormData({
        name: entityToEdit.name, type: entityToEdit.type, status: entityToEdit.status,
        latitude: entityToEdit.latitude.toString(), longitude: entityToEdit.longitude.toString(),
      });
    } else {
      setFormData({ 
        name: '', type: 'Perangkat IoT', status: 'Aktif', 
        latitude: draftCoordinates ? draftCoordinates.latitude.toFixed(6) : '', 
        longitude: draftCoordinates ? draftCoordinates.longitude.toFixed(6) : '' 
      });
    }
  }, [entityToEdit, isOpen, draftCoordinates]);

  if (!isOpen) return null;

  const handleClose = () => {
    setDraftCoordinates(null);
    onClose();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const lat = parseFloat(formData.latitude);
    const lng = parseFloat(formData.longitude);

    if (!formData.name.trim()) {
      showToast('Nama entitas wajib diisi.', 'error');
      setIsSubmitting(false);
      return;
    }
    if (isNaN(lat) || lat < -90 || lat > 90 || isNaN(lng) || lng < -180 || lng > 180) {
      showToast('Titik koordinat geografis tidak valid.', 'error');
      setIsSubmitting(false);
      return;
    }

    try {
      const payload = { name: formData.name, type: formData.type, status: formData.status, latitude: lat, longitude: lng };
      if (entityToEdit) {
        await axios.put(`https://mapapi.portofoliorifky.my.id/api/entities/${entityToEdit.id}`, payload);
        showToast('Entitas berhasil diperbarui.', 'success');
        setSelectedEntity({ ...entityToEdit, ...payload });
      } else {
        await axios.post('https://mapapi.portofoliorifky.my.id/api/entities', payload);
        showToast('Entitas baru berhasil ditambahkan.', 'success');
      }
      await fetchEntities();
      handleClose();
    } catch (err: any) {
      showToast(err.response?.data?.error || 'Terjadi kesalahan sistem.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed md:absolute inset-x-4 bottom-4 md:bottom-auto md:inset-x-auto md:top-24 md:left-8 z-40 w-auto md:w-96 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-6 shadow-2xl transition-all">
      <div className="flex justify-between items-center mb-6 border-b border-gray-700/50 pb-4">
        <h2 className="text-xl font-bold text-gray-50 tracking-tight leading-tight">
          {entityToEdit ? 'Edit Entitas' : 'Tambah Entitas'}
        </h2>
        <button onClick={handleClose} className="p-2 text-gray-400 hover:text-white hover:bg-gray-800/80 rounded-full transition-all">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-2">Nama Entitas</label>
          <input type="text" className="w-full bg-gray-950/50 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-500 outline-none transition-all placeholder-gray-600" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Cth: Sensor Suhu Utara" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Tipe</label>
            <select className="w-full bg-gray-950/50 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-500 outline-none transition-all appearance-none" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
              <option value="Perangkat IoT">Perangkat IoT</option>
              <option value="Kendaraan">Kendaraan</option>
              <option value="Fasilitas">Fasilitas</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Status</label>
            <select className="w-full bg-gray-950/50 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-500 outline-none transition-all appearance-none" value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
              <option value="Aktif">Aktif</option>
              <option value="Perbaikan">Perbaikan</option>
              <option value="Mati">Mati</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Latitude</label>
            <input type="number" step="any" className="w-full bg-gray-950/50 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-500 outline-none transition-all font-mono" value={formData.latitude} onChange={(e) => setFormData({ ...formData, latitude: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Longitude</label>
            <input type="number" step="any" className="w-full bg-gray-950/50 border border-gray-700/50 rounded-xl px-4 py-3 text-sm text-white focus:ring-2 focus:ring-cyan-600/50 focus:border-cyan-500 outline-none transition-all font-mono" value={formData.longitude} onChange={(e) => setFormData({ ...formData, longitude: e.target.value })} />
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-white font-semibold py-3.5 px-4 rounded-xl text-sm transition-all disabled:opacity-50 shadow-lg shadow-cyan-900/20">
          {isSubmitting ? 'Memproses Data...' : 'Simpan Entitas'}
        </button>
      </form>
    </div>
  );
}