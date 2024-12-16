import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { compressImage } from '../../utils/imageUtils';

interface ImageCaptureProps {
  onImageCapture: (imageData: string) => void;
  onError: (error: string) => void;
}

export function ImageCapture({ onImageCapture, onError }: ImageCaptureProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const compressedImage = await compressImage(file);
      onImageCapture(compressedImage);
    } catch (error) {
      onError('Failed to process image');
    }
  };

  return (
    <div className="flex gap-4">
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        type="file"
        ref={cameraInputRef}
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />
      
      <button
        type="button"
        onClick={() => cameraInputRef.current?.click()}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Camera size={20} />
        Take Photo
      </button>
      
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <Upload size={20} />
        Upload Photo
      </button>
    </div>
  );
}