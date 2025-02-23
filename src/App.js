import { useState } from "react";

function App() {
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: "",
    apellido: "",
    celular: "",
    correo: "",
    ciudad: "",
  });
  const [experiencia, setExperiencia] = useState([{ empresa: "", tiempo: "", tareas: "" }]);
  const [educacion, setEducacion] = useState([{ institucion: "", titulo: "", estado: "" }]);
  const [conocimientos, setConocimientos] = useState(["", "", "", "", ""]);
  const [imagen, setImagen] = useState(null);

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
    const cvData = {
      datosPersonales,
      experiencia,
      educacion,
      conocimientos,
      imagen,
    };
    const jsonData = JSON.stringify(cvData);
    localStorage.setItem("cvData", jsonData);
    alert("CV guardado correctamente");
  };

  return (
    <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Formulario de CV</h2>
      <form onSubmit={handleSubmit}>
        {/* Datos Personales */}
        <div className="mb-4">
          <label className="block text-sm font-medium">Nombre</label>
          <input
            type="text"
            name="nombre"
            value={datosPersonales.nombre}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Apellido</label>
          <input
            type="text"
            name="apellido"
            value={datosPersonales.apellido}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Celular</label>
          <input
            type="text"
            name="celular"
            value={datosPersonales.celular}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Correo</label>
          <input
            type="email"
            name="correo"
            value={datosPersonales.correo}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Ciudad</label>
          <input
            type="text"
            name="ciudad"
            value={datosPersonales.ciudad}
            onChange={handleChange}
            className="mt-1 p-2 w-full border border-gray-300 rounded"
          />
        </div>

        {/* Experiencia Laboral */}
        <h3 className="text-xl font-semibold mt-8">Experiencia Laboral</h3>
        {experiencia.map((exp, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium">Empresa</label>
            <input
              type="text"
              name="empresa"
              value={exp.empresa}
              onChange={(e) => handleExperienciaChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium">Tiempo</label>
            <input
              type="text"
              name="tiempo"
              value={exp.tiempo}
              onChange={(e) => handleExperienciaChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium">Tareas</label>
            <textarea
              name="tareas"
              value={exp.tareas}
              onChange={(e) => handleExperienciaChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        ))}

        {/* Educación */}
        <h3 className="text-xl font-semibold mt-8">Educación</h3>
        {educacion.map((edu, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium">Institución</label>
            <input
              type="text"
              name="institucion"
              value={edu.institucion}
              onChange={(e) => handleEducacionChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium">Título</label>
            <input
              type="text"
              name="titulo"
              value={edu.titulo}
              onChange={(e) => handleEducacionChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
            <label className="block text-sm font-medium">Estado</label>
            <select
              name="estado"
              value={edu.estado}
              onChange={(e) => handleEducacionChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            >
              <option value="">Seleccionar</option>
              <option value="finalizado">Finalizado</option>
              <option value="en curso">En curso</option>
            </select>
          </div>
        ))}

        {/* Conocimientos */}
        <h3 className="text-xl font-semibold mt-8">Conocimientos</h3>
        {conocimientos.map((conocimiento, index) => (
          <div key={index} className="mb-4">
            <label className="block text-sm font-medium">Conocimiento {index + 1}</label>
            <input
              type="text"
              value={conocimiento}
              onChange={(e) => handleConocimientoChange(index, e)}
              className="mt-1 p-2 w-full border border-gray-300 rounded"
            />
          </div>
        ))}

        {/* Imagen de perfil */}
        <h3 className="text-xl font-semibold mt-8">Imagen de Perfil</h3>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mt-1 p-2 w-full border border-gray-300 rounded"
        />

        <div className="mt-8">
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
            Guardar CV
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;
