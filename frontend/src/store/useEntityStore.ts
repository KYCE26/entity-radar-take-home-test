import { create } from 'zustand';
import axios from 'axios';

export interface Entity {
  id: number;
  name: string;
  type: string;
  status: string;
  latitude: number;
  longitude: number;
  created_at?: string;
  updated_at?: string;
}

interface ToastData {
  message: string;
  type: 'success' | 'error' | 'info';
}

interface EntityStore {
  entities: Entity[];
  selectedEntity: Entity | null;
  draftCoordinates: { latitude: number; longitude: number } | null;
  isLoading: boolean;
  toast: ToastData | null;
  fetchEntities: () => Promise<void>;
  setSelectedEntity: (entity: Entity | null) => void;
  setDraftCoordinates: (coords: { latitude: number; longitude: number } | null) => void;
  showToast: (message: string, type: 'success' | 'error' | 'info') => void;
  clearToast: () => void;
}

export const useEntityStore = create<EntityStore>((set) => ({
  entities: [],
  selectedEntity: null,
  draftCoordinates: null,
  isLoading: false,
  toast: null,
  fetchEntities: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get<Entity[]>('https://mapapi.portofoliorifky.my.id/api/entities');
      set({ entities: response.data, isLoading: false });
    } catch {
      set({ isLoading: false, toast: { message: 'Gagal mengambil data entitas dari server', type: 'error' } });
    }
  },
  setSelectedEntity: (entity) => set({ selectedEntity: entity }),
  setDraftCoordinates: (coords) => set({ draftCoordinates: coords }),
  showToast: (message, type) => {
    set({ toast: { message, type } });
    setTimeout(() => set({ toast: null }), 3500);
  },
  clearToast: () => set({ toast: null }),
}));