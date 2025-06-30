import { useEffect, useState } from 'react';

export default function Ajustes() {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState('');

  useEffect(() => {
    async function getDevices() {
      try {
        const allDevices = await navigator.mediaDevices.enumerateDevices();
        const videoInputs = allDevices.filter(device => device.kind === 'videoinput');
        setDevices(videoInputs);
        if (videoInputs[0]) setSelectedDevice(videoInputs[0].deviceId);
      } catch (err) {
        console.error('Erro ao listar dispositivos:', err);
      }
    }

    getDevices();
  }, []);

  return (
    <section>
      <h1>Escolher câmera</h1>
      {devices.length > 0 ? (
        <select
          value={selectedDevice}
          onChange={e => setSelectedDevice(e.target.value)}
        >
          {devices.map(device => (
            <option key={device.deviceId} value={device.deviceId}>
              {device.label || `Câmera ${device.deviceId}`}
            </option>
          ))}
        </select>
      ) : (
        <p>Nenhum dispositivo de câmera encontrado.</p>
      )}
    </section>
  );
}