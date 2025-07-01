import { createContext, useState } from 'react';

export const CameraContext = createContext();

export function CameraProvider({ children }) {
  const [selectedDeviceId, setSelectedDeviceId] = useState('');

  return (
    <CameraContext.Provider value={{ selectedDeviceId, setSelectedDeviceId }}>
      {children}
    </CameraContext.Provider>
  );
}
