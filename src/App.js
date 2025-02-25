import { useState, useEffect } from "react";
import { PDFDownloadLink, Document, Page } from "@react-pdf/renderer";
import CVDocument from "./CVPreview";
import Modal from "./Modal";



function App() {
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    correo: "",
    ciudad: "",
    presentacion: "",
  });

  const [experiencia, setExperiencia] = useState([{ 
    empresa: "", 
    fechaInicio: "", 
    fechaFin: "", 
    tareas: "" 
  }]);

// Agregar estos nuevos estados
const [educacion, setEducacion] = useState([{
  institucion: "",
  titulo: "",
  estado: ""
}]);

const [conocimientos, setConocimientos] = useState([""]);

const [imagen, setImagen] = useState(null);

  const [mostrarPreview, setMostrarPreview] = useState(false);

  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales((prev) => ({ ...prev, [name]: value }));
  };

  const handleExperienciaChange = (index, e) => {
    const { name, value } = e.target;
    const updatedExperiencia = [...experiencia];
    updatedExperiencia[index][name] = value;
    setExperiencia(updatedExperiencia);
  };

  

  const handleEducacionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducacion = [...educacion];
    updatedEducacion[index][name] = value;
    setEducacion(updatedEducacion);
  };

  const handleConocimientoChange = (index, e) => {
    const value = e.target.value;
    const updatedConocimientos = [...conocimientos];
    updatedConocimientos[index] = value;
    setConocimientos(updatedConocimientos);
  };

  const handleFileChange = (e) => {
    setImagen(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      const cleanedData = {
        datosPersonales: {
          nombre: datosPersonales.nombre.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''), // Limpiar caracteres no deseados
          apellido: datosPersonales.apellido.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''),
          celular: datosPersonales.celular.replace(/[^0-9]/g, ''), // Solo números
          correo: datosPersonales.correo,
          ciudad: datosPersonales.ciudad.replace(/[^a-zA-ZÀ-ÿ\s]/g, ''),
          presentacion: datosPersonales.presentacion,
        },
        experiencia,
        educacion,
        conocimientos,
        imagen,
      };
      
      // Guardar los datos limpios en localStorage o usarlos directamente
      localStorage.setItem("cvData", JSON.stringify(cleanedData));
    }
  };
  const addExperiencia = () => {
    if (experiencia.length < 3) {
      setExperiencia([...experiencia, { empresa: "", fechaInicio: "", fechaFin: "", tareas: "" }]);
    }
  };

  // Agregar estas dos funciones
  const addEducacion = () => {
    if (educacion.length < 3) {
      setEducacion([...educacion, { 
        institucion: "", 
        titulo: "", 
        estado: "" 
      }]);
    }
  };

  const addConocimiento = () => {
    if (conocimientos.length < 5) {
      setConocimientos([...conocimientos, ""]);
    }
  };

  const validarFormulario = () => {
    // Validación básica
    if (!datosPersonales.nombre || !datosPersonales.apellido || !datosPersonales.correo) {
      alert('Por favor, complete todos los campos obligatorios');
      return false;
    }
    return true;
  };


  const validateImage = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      alert('Por favor, sube una imagen en formato JPG, JPEG o PNG');
      return false;
    }
    return true;
  };

    return (
      <div className="min-h-screen bg-blue-50">
        <div className="container mx-auto px-4 py-8">
          {/* Sección de introducción */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h1 className="text-3xl font-bold text-blue-800 mb-4">TuCV - Generador Profesional de Currículum</h1>
            <p className="text-gray-600">
              Bienvenido a TuCV. Esta aplicación te ayudará a crear un CV profesional y elegante. 
              Tus datos personales no se almacenan y solo se utilizan para generar tu CV.
            </p>
          </div>
    
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6">
            {/* Datos Personales */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">Datos Personales</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Nombre</label>
                  <input
                    type="text"
                    name="nombre"
                    value={datosPersonales.nombre}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: Juan"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Apellido</label>
                  <input
                    type="text"
                    name="apellido"
                    value={datosPersonales.apellido}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: Pérez"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Celular</label>
                  <input
                    type="text"
                    name="celular"
                    value={datosPersonales.celular}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: +54 9 11 1234-5678"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Correo</label>
                  <input
                    type="email"
                    name="correo"
                    value={datosPersonales.correo}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: juan.perez@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 text-sm font-bold mb-2">Ciudad</label>
                  <input
                    type="text"
                    name="ciudad"
                    value={datosPersonales.ciudad}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: Buenos Aires"
                  />
                </div>
              </div>
            </div>
    
            {/* Experiencia Laboral */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">Experiencia Laboral</h2>
              {experiencia.map((exp, index) => (
                <div key={index} className="bg-blue-50 p-6 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Empresa</label>
                      <input
                        type="text"
                        name="empresa"
                        value={exp.empresa}
                        onChange={(e) => handleExperienciaChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Ej: Mercado Libre"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Tiempo</label>
                      <input
                        type="text"
                        name="tiempo"
                        value={exp.tiempo}
                        onChange={(e) => handleExperienciaChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Ej: Enero 2024 - Febrero 2024"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Tareas</label>
                    <textarea
                      name="tareas"
                      value={exp.tareas}
                      onChange={(e) => handleExperienciaChange(index, e)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      rows="3"
                      placeholder="Describe tus responsabilidades principales"
                    />
                  </div>
                </div>
              ))}
              {experiencia.length < 3 && (
                <button
                  type="button"
                  onClick={addExperiencia}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Agregar Experiencia
                </button>
              )}
            </div>
    
            {/* Educación */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">Educación</h2>
              {educacion.map((edu, index) => (
                <div key={index} className="bg-blue-50 p-6 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Institución</label>
                      <input
                        type="text"
                        name="institucion"
                        value={edu.institucion}
                        onChange={(e) => handleEducacionChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Ej: Universidad Nacional de La Plata"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Título</label>
                      <input
                        type="text"
                        name="titulo"
                        value={edu.titulo}
                        onChange={(e) => handleEducacionChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                        placeholder="Ej: Licenciatura en Administración"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-700 text-sm font-bold mb-2">Estado</label>
                      <select
                        name="estado"
                        value={edu.estado}
                        onChange={(e) => handleEducacionChange(index, e)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                      >
                        <option value="">Seleccionar</option>
                        <option value="finalizado">Finalizado</option>
                        <option value="en curso">En curso</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
              {educacion.length < 3 && (
                <button
                  type="button"
                  onClick={addEducacion}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Agregar Educación
                </button>
              )}
            </div>
    
            {/* Conocimientos */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">Conocimientos</h2>
              {conocimientos.map((conocimiento, index) => (
                <div key={index} className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Conocimiento {index + 1}
                  </label>
                  <input
                    type="text"
                    value={conocimiento}
                    onChange={(e) => handleConocimientoChange(index, e)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                    placeholder="Ej: Microsoft Office, Inglés Avanzado, etc."
                  />
                </div>
              ))}
              {conocimientos.length < 5 && (
                <button
                  type="button"
                  onClick={addConocimiento}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  + Agregar Conocimiento
                </button>
              )}
            </div>
    
            {/* Presentación */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">Presentación</h2>
              <textarea
                name="presentacion"
                value={datosPersonales.presentacion}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                rows="4"
                placeholder="Soy un profesional proactivo con experiencia en..."
                maxLength={300}
              />
            </div>
    
            {/* Imagen de perfil */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-blue-800 mb-6">Imagen de Perfil</h2>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
              <p className="text-sm text-gray-500 mt-2">
                Formatos aceptados: JPG, JPEG, PNG
              </p>
            </div>
    
            {/* Botón de envío */}
        <div className="text-center">
          <PDFDownloadLink
            document={
              <CVDocument 
                datos={{
                  datosPersonales,
                  experiencia,
                  educacion,
                  conocimientos,
                  imagen
                }}
              />
            }
            fileName="mi-cv-profesional.pdf"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold inline-block"
          >
            {({ blob, url, loading, error }) =>
              loading ? 'Generando PDF...' : 'Descargar CV'
            }
          </PDFDownloadLink>
        </div>
      </form>
    
          {/* Footer */}
          <footer className="bg-blue-800 text-white py-8 mt-16">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg font-semibold mb-2">Desarrollado por Catriel Cabrera</p>
              <p className="mb-2">📧 catrielcabrera97@gmail.com</p>
              <p>
                <a 
                  href="https://github.com/catriel458" 
                  className="text-blue-200 hover:text-white transition-colors"
                >
                  🐱 GitHub
                </a>
              </p>
            </div>
          </footer>
        </div>
      </div>
    );
  
}

export default App;
