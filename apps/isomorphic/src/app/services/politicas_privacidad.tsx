// src/pages/PoliticaPrivacidad.tsx
import React from 'react';

const PoliticaPrivacidad: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Política de Privacidad</h1>
      <p className="mb-4">
        Tu privacidad es importante para nosotros. Esta política describe cómo recopilamos, usamos y protegemos tu información personal.
      </p>
      <h2 className="text-xl font-semibold mt-4">Información que recopilamos</h2>
      <p className="mb-2">Podemos recopilar información como nombre, correo electrónico, dirección IP, entre otros.</p>

      <h2 className="text-xl font-semibold mt-4">Cómo usamos tu información</h2>
      <p className="mb-2">Utilizamos tus datos para brindarte nuestros servicios y mejorar tu experiencia.</p>

      <h2 className="text-xl font-semibold mt-4">Tus derechos</h2>
      <p className="mb-2">Tienes derecho a acceder, modificar o eliminar tus datos personales.</p>

      <p className="mt-6 text-sm text-gray-500">Última actualización: 21 de mayo de 2025</p>
    </div>
  );
};

export default PoliticaPrivacidad;
