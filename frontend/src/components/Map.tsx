import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMapEvents, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEntityStore } from '../store/useEntityStore';

const getStatusColors = (status: string) => {
  switch (status) {
    case 'Aktif': return { bg: 'bg-emerald-500', hex: '#10b981' };
    case 'Perbaikan': return { bg: 'bg-amber-500', hex: '#f59e0b' };
    case 'Mati': return { bg: 'bg-rose-500', hex: '#f43f5e' };
    default: return { bg: 'bg-cyan-500', hex: '#06b6d4' };
  }
};

const createRadarIcon = (status: string) => {
  const colors = getStatusColors(status);
  return L.divIcon({
    className: 'bg-transparent border-none',
    html: `<div class="relative flex h-6 w-6 items-center justify-center">
             <span class="animate-ping absolute inline-flex h-full w-full rounded-full ${colors.bg} opacity-40"></span>
             <span class="relative inline-flex rounded-full h-3 w-3 ${colors.bg}" style="box-shadow: 0 0 12px ${colors.hex}, 0 0 24px ${colors.hex};"></span>
           </div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

function MapInteraction() {
  const { setDraftCoordinates } = useEntityStore();
  useMapEvents({
    click(e) {
      setDraftCoordinates({ latitude: e.latlng.lat, longitude: e.latlng.lng });
    },
  });
  return null;
}

export default function Map() {
  const { entities, fetchEntities, selectedEntity, setSelectedEntity, draftCoordinates } = useEntityStore();
  const center: [number, number] = [-6.917464, 107.619123];

  useEffect(() => {
    fetchEntities();
  }, [fetchEntities]);

return (
    <div className="w-full h-screen relative z-0 bg-gray-950">
      <MapContainer center={center} zoom={14} className="w-full h-full cursor-crosshair" zoomControl={false}>
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        
        {/* Pindahkan kontrol zoom ke kanan bawah agar tidak tertumpuk header */}
        <ZoomControl position="bottomright" />
        
        <MapInteraction />

        {entities.map((entity) => (
          <Marker
            key={entity.id}
            position={[entity.latitude, entity.longitude]}
            icon={createRadarIcon(entity.status)}
            eventHandlers={{
              click: () => setSelectedEntity(entity),
            }}
          />
        ))}

        {selectedEntity && (
          <Circle
            center={[selectedEntity.latitude, selectedEntity.longitude]}
            radius={600}
            pathOptions={{ 
              color: getStatusColors(selectedEntity.status).hex, 
              fillColor: getStatusColors(selectedEntity.status).hex, 
              fillOpacity: 0.05,
              weight: 1,
              dashArray: '5 5'
            }}
          />
        )}

        {draftCoordinates && (
          <Circle
            center={[draftCoordinates.latitude, draftCoordinates.longitude]}
            radius={40}
            pathOptions={{ color: '#22d3ee', fillColor: '#0891b2', fillOpacity: 0.9, weight: 0 }}
          />
        )}
      </MapContainer>
    </div>
  );
}