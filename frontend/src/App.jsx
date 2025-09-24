import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./index.css";


const estadosConMunicipios = {
 "Amazonas": ["Alto Orinoco", "Atabapo", "Atures", "Autana", "Manapiare", "Maroa", "Río Negro"],
  "Anzoátegui": ["Anaco", "Aragua", "Diego Bautista Urbaneja", "Fernando de Peñalver", "Francisco del Carmen Carvajal", "General Sir Arthur McGregor", "Guanta", "Independencia", "José Gregorio Monagas", "Juan Antonio Sotillo", "Juan Manuel Cajigal", "Libertad", "Manuel Ezequiel Bruzual", "Pedro María Freites", "Píritu", "San José de Guanipa", "San Juan de Capistrano", "Santa Ana", "Simón Bolívar", "Simón Rodríguez"],
  "Apure": ["Achaguas", "Biruaca", "Muñoz", "Páez", "Pedro Camejo", "Rómulo Gallegos", "San Fernando"],
  "Aragua": ["Bolívar", "Camatagua", "Francisco Linares Alcántara", "Girardot", "José Ángel Lamas", "José Félix Ribas", "José Rafael Revenga", "Libertador", "Mario Briceño Iragorry", "Ocumare de la Costa de Oro", "San Casimiro", "San Sebastián", "Santiago Mariño", "Santos Michelena", "Sucre", "Tovar", "Urdaneta", "Zamora"],
  "Barinas": ["Alberto Arvelo Torrealba", "Andrés Eloy Blanco", "Antonio José de Sucre", "Arismendi", "Barinas", "Bolívar", "Cruz Paredes", "Ezequiel Zamora", "Obispos", "Pedraza", "Rojas", "Sosa"],
  "Bolívar": ["Caroní", "Cedeño", "El Callao", "Gran Sabana", "Heres", "Piar", "Angostura", "Roscio", "Sifontes", "Sucre"],
  "Carabobo": ["Bejuma", "Carlos Arvelo", "Diego Ibarra", "Guacara", "Juan José Mora", "Libertador", "Los Guayos", "Miranda", "Montalbán", "Naguanagua", "Puerto Cabello", "San Diego", "San Joaquín", "Valencia"],
  "Cojedes": ["Anzoátegui", "Falcón", "Girardot", "Lima Blanco", "Pao de San Juan Bautista", "Ricaurte", "Rómulo Gallegos", "San Carlos", "Tinaco"],
  "Delta Amacuro": ["Antonio Díaz", "Casacoima", "Pedernales", "Tucupita"],
  "Distrito Capital": ["Libertador"],
  "Falcón": ["Acosta", "Bolívar", "Buchivacoa", "Cacique Manaure", "Carirubana", "Colina", "Dabajuro", "Democracia", "Falcón", "Federación", "Jacura", "Los Taques", "Mauroa", "Miranda", "Monseñor Iturriza", "Palmasola", "Petit", "Píritu", "San Francisco", "Silva", "Sucre", "Tocópero", "Unión", "Urumaco", "Zamora"],
  "Guárico": ["Camaguán", "Chaguaramas", "El Socorro", "Francisco de Miranda", "José Félix Ribas", "José Tadeo Monagas", "Juan Germán Roscio", "Julián Mellado", "Las Mercedes", "Leonardo Infante", "Ortiz", "San Gerónimo de Guayabal", "San José de Guaribe", "Santa María de Ipire", "Zaraza"],
  "Lara": ["Andrés Eloy Blanco", "Crespo", "Iribarren", "Jiménez", "Morán", "Palavecino", "Simón Planas", "Torres", "Urdaneta"],
  "Mérida": ["Alberto Adriani", "Andrés Bello", "Antonio Pinto Salinas", "Aricagua", "Arzobispo Chacón", "Campo Elías", "Caracciolo Parra Olmedo", "Cardenal Quintero", "Guaraque", "Julio César Salas", "Justo Briceño", "Libertador", "Miranda", "Obispo Ramos de Lora", "Padre Noguera", "Pueblo Llano", "Rangel", "Rivas Dávila", "Santos Marquina", "Sucre", "Tovar", "Tulio Febres Cordero", "Zea"],
  "Miranda": ["Acevedo", "Andrés Bello", "Baruta", "Brión", "Buroz", "Carrizal", "Chacao", "Cristóbal Rojas", "El Hatillo", "Guaicaipuro", "Independencia", "Lander", "Los Salias", "Páez", "Paz Castillo", "Pedro Gual", "Plaza", "Simón Bolívar", "Sucre", "Urdaneta", "Zamora"],
  "Monagas": ["Acosta", "Aguasay", "Bolívar", "Caripe", "Cedeño", "Ezequiel Zamora", "Libertador", "Maturín", "Piar", "Punceres", "Santa Bárbara", "Sotillo", "Uracoa"],
  "Nueva Esparta": ["Antolín del Campo", "Arismendi", "Díaz", "García", "Gómez", "Maneiro", "Marcano", "Mariño", "Península de Macanao", "Tubores", "Villalba"],
  "Portuguesa": ["Agua Blanca", "Araure", "Esteller", "Guanare", "Guanarito", "Monseñor José Vicente de Unda", "Ospino", "Páez", "Papelón", "San Genaro de Boconoito", "San Rafael de Onoto", "Santa Rosalía", "Sucre", "Turén"],
  "Sucre": ["Andrés Eloy Blanco", "Andrés Mata", "Arismendi", "Benítez", "Bermúdez", "Bolívar", "Cajigal", "Cruz Salmerón Acosta", "Libertador", "Mariño", "Mejía", "Montes", "Ribero", "Sucre", "Valdez"],
  "Táchira": ["Andrés Bello", "Antonio Rómulo Costa", "Ayacucho", "Bolívar", "Cárdenas", "Córdoba", "Fernández Feo", "Francisco de Miranda", "García de Hevia", "Guásimos", "Independencia", "Jáuregui", "José María Vargas", "Junín", "Libertad", "Libertador", "Lobatera", "Michelena", "Panamericano", "Pedro María Ureña", "Rafael Urdaneta", "Samuel Darío Maldonado", "San Cristóbal", "Seboruco", "Simón Rodríguez", "Sucre", "Torbes", "Uribante"],
  "Trujillo": ["Andrés Bello", "Boconó", "Bolívar", "Candelaria", "Carache", "Escuque", "José Felipe Márquez Cañizales", "Juan Vicente Campo Elías", "La Ceiba", "Miranda", "Monte Carmelo", "Motatán", "Pampán", "Pampanito", "Rafael Rangel", "San Rafael de Carvajal", "Sucre", "Trujillo", "Urdaneta", "Valera"],
  "La Guaira": ["Vargas"],
  "Yaracuy": ["Arístides Bastidas", "Bolívar", "Bruzual", "Cocorote", "Independencia", "José Antonio Páez", "La Trinidad", "Manuel Monge", "Nirgua", "Peña", "San Felipe", "Sucre", "Urachiche", "Veroes"],
  "Zulia": ["Almirante Padilla", "Baralt", "Cabimas", "Catatumbo", "Colón", "Francisco Javier Pulgar", "Jesús Enrique Lossada", "Jesús María Semprún", "La Cañada de Urdaneta", "Lagunillas", "Machiques de Perijá", "Mara", "Maracaibo", "Miranda", "Rosario de Perijá", "San Francisco", "Santa Rita", "Simón Bolívar", "Sucre", "Valmore Rodríguez"]
};

const opcionesDesplegables = {
  Género: ["Masculino", "Femenino", "Otro"],
  "Nivel Estudio": ["Primaria", "Secundaria", "Técnico", "Universitario", "Postgrado"],
  "Tipo Sangre": ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  "Sabe Nadar": ["Sí", "No"]
};

function App() {
  const [estadoSeleccionado, setEstadoSeleccionado] = useState("");
  const [municipioSeleccionado, setMunicipioSeleccionado] = useState("");
  const [municipiosDisponibles, setMunicipiosDisponibles] = useState([]);
  const [formData, setFormData] = useState({});
  const [registros, setRegistros] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [resultados, setResultados] = useState([]);

  const campos = [
    "Nombre", "Cédula", "Género", "Edad", "Nivel Estudio", "Sabe Nadar",
    "Fecha Nacimiento", "Fecha Ingreso", "Enfermedad", "Alergias", "Tipo Sangre",
    "Talla Camisa", "Talla Pantalón", "Talla Calzado", "Talla Gorra",
    "Estado", "Municipio", "Organización"
  ];
 useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.ping();
    }
  }, []);
  
  useEffect(() => {
    setMunicipiosDisponibles(estadosConMunicipios[estadoSeleccionado] || []);
    setMunicipioSeleccionado("");
  }, [estadoSeleccionado]);

  const handleEstadoChange = (e) => {
    const estado = e.target.value;
    setEstadoSeleccionado(estado);
    setFormData({ ...formData, Estado: estado });
  };

  const handleMunicipioChange = (e) => {
    const municipio = e.target.value;
    setMunicipioSeleccionado(municipio);
    setFormData({ ...formData, Municipio: municipio });
  };

  const handleInputChange = (e) => {
    const label = e.target.name;
    setFormData({ ...formData, [label]: e.target.value });
  };

  const guardarRegistro = (e) => {
    e.preventDefault();
    const nuevoRegistro = { ...formData, Estado: estadoSeleccionado, Municipio: municipioSeleccionado };
    setRegistros([...registros, nuevoRegistro]);
    setFormData({});
    setEstadoSeleccionado("");
    setMunicipioSeleccionado("");
  };

  const eliminarRegistro = (index) => {
    const nuevos = [...registros];
    nuevos.splice(index, 1);
    setRegistros(nuevos);
  };

  const buscar = () => {
    const term = busqueda.trim().toLowerCase();
    const filtro = registros.filter(
      (r) => r["Cédula"]?.toLowerCase() === term || r["Organización"]?.toLowerCase() === term
    );
    setResultados(filtro);
  };

  const exportarExcel = () => {
    const ws = XLSX.utils.json_to_sheet(registros);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Voluntarios");
    XLSX.writeFile(wb, "voluntarios.xlsx");
  };

 const exportarPDF = () => {
  if (registros.length === 0) {
    alert("No hay datos para exportar.");
    return;
  }

  const doc = new jsPDF();
  doc.text("Listado de Voluntarios", 10, 10);

  autoTable(doc, {
    head: [campos],
    body: registros.map((reg) => campos.map((c) => reg[c] || "")),
    startY: 20,
    styles: { fontSize: 8 }
  });

  doc.save("voluntarios.pdf");
  alert("PDF exportado exitosamente.");
};

  const importarExcel = (e) => {
    const archivo = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      const data = new Uint8Array(evt.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const hoja = workbook.Sheets[workbook.SheetNames[0]];
      const datos = XLSX.utils.sheet_to_json(hoja);
      setRegistros((prev) => [...prev, ...datos]);
    };
    reader.readAsArrayBuffer(archivo);
  };

  const botonBase = "px-6 py-2 font-semibold rounded-xl shadow-lg transition duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none";

  return (
    <div className="bg-gradient-to-b from-orange-50 to-orange-100 min-h-screen p-4 transition-all duration-700 ease-in-out">
      <div className="text-center mb-6 animate-fade-in">
        <img
          src="/logo.png"
          alt="Protección Civil Logo"
          className="mx-auto w-24 mb-3 drop-shadow-md"
        />
        <h1 className="text-4xl font-extrabold text-orange-800 tracking-wide shadow-sm">
          Plataforma de control de Voluntarios - PC Táchira
        </h1>
      </div>

      <form onSubmit={guardarRegistro} className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in-up">
        {campos.filter(label => label !== "Estado" && label !== "Municipio").map((label) => (
          <div key={label}>
            <label className="block text-gray-700 font-semibold mb-1">{label}</label>
            {opcionesDesplegables[label] ? (
              <select
                name={label}
                value={formData[label] || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              >
                <option value="">Seleccione</option>
                {opcionesDesplegables[label].map((opcion) => (
                  <option key={opcion} value={opcion}>{opcion}</option>
                ))}
              </select>
            ) : label.includes("Fecha") ? (
              <input
                type="date"
                name={label}
                value={formData[label] || ""}
                onChange={handleInputChange}
                className="w-full p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            ) : (
              <input
                type="text"
                name={label}
                value={formData[label] || ""}
                onChange={handleInputChange}
                placeholder={label}
                className="w-full p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            )}
          </div>
        ))}

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Estado</label>
          <select
            value={estadoSeleccionado}
            onChange={handleEstadoChange}
            className="w-full p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="">Seleccione</option>
            {Object.keys(estadosConMunicipios).map((estado) => (
              <option key={estado} value={estado}>{estado}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Municipio</label>
          <select
            value={municipioSeleccionado}
            onChange={handleMunicipioChange}
            className="w-full p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            disabled={!estadoSeleccionado}
          >
            <option value="">Seleccione</option>
            {municipiosDisponibles.map((municipio) => (
              <option key={municipio} value={municipio}>{municipio}</option>
            ))}
          </select>
        </div>

        <div className="col-span-2 flex flex-wrap justify-center gap-4 mt-6">
          <button type="submit" className={`${botonBase} bg-orange-600 text-white hover:bg-orange-700`}>
            Guardar
          </button>
          <button type="button" onClick={buscar} className={`${botonBase} bg-blue-600 text-white hover:bg-blue-700`}>
            Buscar
          </button>
          <input
            type="text"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Buscar por Cédula u Organización"
            className="w-full md:w-auto p-2 border border-orange-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button onClick={exportarExcel} type="button" className={`${botonBase} bg-green-600 text-white hover:bg-green-700`}>
            Exportar Excel
          </button>
          <button onClick={exportarPDF} type="button" className={`${botonBase} bg-red-600 text-white hover:bg-red-700`}>
            Exportar PDF
          </button>
          <label className={`${botonBase} bg-purple-600 text-white hover:bg-purple-700 cursor-pointer`}>
            Importar Excel
            <input type="file" accept=".xlsx,.xls" className="hidden" onChange={importarExcel} />
          </label>
        </div>
      </form>

      {registros.length > 0 && (
        <div className="max-w-6xl mx-auto mt-10 bg-white p-6 rounded-lg shadow-xl animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-5 text-orange-800">Voluntarios Registrados</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-orange-400 text-sm">
              <thead className="bg-orange-100 text-orange-800">
                <tr>
                  {campos.map((campo) => (
                    <th key={campo} className="border border-orange-400 p-2">{campo}</th>
                  ))}
                  <th className="border border-orange-400 p-2">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {registros.map((registro, index) => (
                  <tr key={index} className="hover:bg-orange-50">
                    {campos.map((campo) => (
                      <td key={campo} className="border border-orange-400 p-2">{registro[campo] || "-"}</td>
                    ))}
                    <td className="border border-orange-400 p-2">
                      <button onClick={() => eliminarRegistro(index)} className="text-red-600 hover:underline">Eliminar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <footer className="mt-10 text-center text-sm text-white bg-orange-700 py-4 rounded-lg shadow-lg">
        Desarrollado por: 
        <p>Stefano Abate (+58 424-7582675, stefanoabate2002@gmail.com)</p> 
        <p>Miguel Leon (+58 424-7237813, miguel_leon_1987@hotmail.com)</p>
        <p>Instituto Universitario Politecnico Santiago Mariño</p>
      </footer>
    </div>
  );
}

export default App;