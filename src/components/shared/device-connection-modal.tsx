import React from 'react';

interface DeviceConnectionModalProps {
  isOpen: boolean;
  onConnect: () => void;
  onClose: () => void;
}

export const DeviceConnectionModal: React.FC<DeviceConnectionModalProps> = ({ isOpen, onConnect, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-xl shadow p-6 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">Connect Device</h2>
        <p className="text-sm text-gray-600">Pair your SmartHeal device to enable sessions.</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onClose} className="px-4 py-2 rounded-lg border border-gray-200 text-gray-700">Cancel</button>
          <button onClick={onConnect} className="px-4 py-2 rounded-lg bg-blue-600 text-white">Connect</button>
        </div>
      </div>
    </div>
  );
};

export default DeviceConnectionModal;
