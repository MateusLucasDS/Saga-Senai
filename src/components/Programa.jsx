import { useContext, useEffect, useRef, useState } from 'react';
import { CameraContext } from './CameraContext';

export default function Programa() {
  const { selectedDeviceId } = useContext(CameraContext);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let currentStream;

    async function startCamera() {
      if (!selectedDeviceId) return;

      try {
        // Encerra stream anterior
        if (videoRef.current?.srcObject) {
          videoRef.current.srcObject.getTracks().forEach(track => track.stop());
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: selectedDeviceId } },
        });

        currentStream = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Erro ao acessar a câmera:", err);
      }
    }

    startCamera();

    return () => {
      if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [selectedDeviceId]);

  const capturarImagem = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;

    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0);

    const imagemBase64 = canvas.toDataURL('image/jpeg');
    await enviarParaOCR(imagemBase64);
  };

  const enviarParaOCR = async (base64) => {
    setLoading(true);
    try {
      const blob = await (await fetch(base64)).blob();
      const formData = new FormData();
      formData.append('upload', blob);

      const resposta = await fetch(
        'https://api.platerecognizer.com/v1/plate-reader/?region=br&topn=1&camera_id=frontend-camera&recognize_vehicle=true',
        {
          method: 'POST',
          headers: {
            Authorization: 'Token 59f9d25a57f4c68e73ba7d5e0ca2245ac981dcfc',
          },
          body: formData,
        }
      );

      const dados = await resposta.json();
      const placa = dados?.results?.[0]?.plate;
      setResultado(placa || 'Nenhuma placa reconhecida');
    } catch (err) {
      console.error('Erro na API OCR:', err);
      setResultado('Erro na leitura');
    }
    setLoading(false);
  };

  return (
    <section style={{ textAlign: 'center' }}>
      <h1>Leitor de Placas</h1>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: '100%', maxWidth: '600px', borderRadius: '8px', marginBottom: '1rem', background: '#000' }}
      />
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      <br />
      <button onClick={capturarImagem} disabled={loading}>
        {loading ? 'Processando...' : 'Capturar e Ler Placa'}
      </button>
      {resultado && (
        <p style={{ marginTop: '1rem', fontSize: '1.2rem' }}>
          🔎 Resultado: <strong>{resultado}</strong>
        </p>
      )}
    </section>
  );
}
