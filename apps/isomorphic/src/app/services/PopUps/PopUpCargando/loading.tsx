'use client';
import React from 'react';
import ajax from '@public/ajax-loader.gif'
import Image from 'next/image'; 


interface LoadingOverlayProps {
  show: boolean;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ show }) => {
  if (!show) return null;

 
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-1 rounded-xl shadow-xl flex flex-col items-center gap-1">
        <div className="relative w-20 h-20">
          <Image
            src="/ajax-loader.gif" // desde public/
            alt="Cargando"
            fill
            priority
            sizes="100px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );

};

export default LoadingOverlay;
