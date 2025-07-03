import { useContext, useEffect, useState } from 'react';
import { CameraContext } from './CameraContext';

export default function Ajustes() {
  const [devices, setDevices] = useState([]);
  const { selectedDeviceId, setSelectedDeviceId } = useContext(CameraContext);

  useEffect(() => {
    async function getDevices() {
      try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = allDevices.filter(device => device.kind === 'videoinput');
        setDevices(videoInputs);
        if (videoInputs[0] && !selectedDeviceId) {
          setSelectedDeviceId(videoInputs[0].deviceId);
        }
        console.log('Câmeras disponíveis:', videoInputs);
      } catch (err) {
        console.error('Erro ao listar dispositivos:', err);
      }
    }

    getDevices();
  }, [selectedDeviceId, setSelectedDeviceId]);

  return (
    <section style={{ textAlign: 'center' }}>
      <h1>Escolher câmera</h1>
      <select
        value={selectedDeviceId}
        onChange={e => setSelectedDeviceId(e.target.value)}
        style={{ padding: '0.5rem', fontSize: '1rem' }}
      >
        {devices.map(device => (
          <option key={device.deviceId} value={device.deviceId}>
            {device.label || `Câmera ${device.deviceId}`}
          </option>
        ))}
      </select>
    </section>
  );
}
