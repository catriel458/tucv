import React from 'react';

const Modal = ({ isOpen, onClose, datos }) => {
  if (!isOpen || !datos) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-blue-800">Confirmar Datos</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6">
          <div className="space-y-6">
            {/* Datos Personales */}
            {datos.datosPersonales && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Datos Personales</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Nombre completo</p>
                    <p className="text-base text-gray-900">
                      {datos.datosPersonales.nombre} {datos.datosPersonales.apellido}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Celular</p>
                    <p className="text-base text-gray-900">{datos.datosPersonales.celular}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Correo</p>
                    <p className="text-base text-gray-900">{datos.datosPersonales.correo}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Ciudad</p>
                    <p className="text-base text-gray-900">{datos.datosPersonales.ciudad}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Experiencia */}
            {datos.experiencia && datos.experiencia.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Experiencia Laboral</h3>
                {datos.experiencia.map((exp, index) => (
                  <div key={index} className="mb-4 last:mb-0 bg-white p-3 rounded">
                    <p className="font-medium text-gray-900">{exp.empresa}</p>
                    <p className="text-sm text-gray-600">{exp.tiempo}</p>
                    <p className="text-sm text-gray-700 mt-1">{exp.tareas}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Educación */}
            {datos.educacion && datos.educacion.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Formación Académica</h3>
                {datos.educacion.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0 bg-white p-3 rounded">
                    <p className="font-medium text-gray-900">{edu.institucion}</p>
                    <p className="text-sm text-gray-700">{edu.titulo}</p>
                    <p className="text-sm text-gray-600">{edu.estado}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Conocimientos */}
            {datos.conocimientos && datos.conocimientos.length > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Conocimientos y Habilidades</h3>
                <div className="flex flex-wrap gap-2">
                  {datos.conocimientos.map((conocimiento, index) => (
                    <span key={index} className="bg-white px-3 py-1 rounded-full text-sm text-blue-800">
                      {conocimiento}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Presentación */}
            {datos.datosPersonales?.presentacion && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-800 mb-3">Presentación</h3>
                <p className="text-gray-700">{datos.datosPersonales.presentacion}</p>
              </div>
            )}
          </div>

          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={onClose}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-lg font-semibold"
            >
              Generar CV
            </button>
            <button
              onClick={onClose}
              className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors text-lg font-semibold"
            >
              Editar Datos
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;