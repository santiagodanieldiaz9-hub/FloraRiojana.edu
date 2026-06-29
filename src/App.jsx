import React, { useState, useEffect } from 'react';
import {
  Leaf,
  Sun,
  CloudRain,
  Sprout,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  TreePine,
  Settings2,
  MonitorSmartphone
} from 'lucide-react';

const FloraApp = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [revealedUses, setRevealedUses] = useState({});
  const [selectedTree, setSelectedTree] = useState('Algarrobo Blanco');
  const [simSpecies, setSimSpecies] = useState('Algarrobo Blanco');
  const [simRain, setSimRain] = useState(300);
  const [simSoil, setSimSoil] = useState('Arenoso-Pedregoso');
  const [simHealth, setSimHealth] = useState({ status: 'Excelente', percentage: 100, message: '' });

  const totalSlides = 7;

  const nextSlide = () => setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  const prevSlide = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));

  const treeUses = [
    { name: 'Algarrobo', use: 'Elaboración de harina, patay, arrope y bebida tradicional de aloja.' },
    { name: 'Chañar', use: 'Consumo de frutos dulces, elaboración de arrope y medicina tradicional para la tos.' },
    { name: 'Mistol', use: 'Consumo de frutos frescos, elaboración de arrope y sucedáneo del café.' },
    { name: 'Quebracho Blanco', use: 'Madera de alta resistencia, producción de carbón y uso medicinal de la corteza.' },
    { name: 'Espinillo', use: 'Uso en perfumería (flores), postes para cercos y refugio clave para la fauna.' },
    { name: 'Tala', use: 'Frutos comestibles para aves y humanos, madera para mangos de herramientas.' }
  ];

  const toggleUse = (index) => {
    setRevealedUses((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  useEffect(() => {
    let health = 100;
    let status = 'Excelente';
    let message = '';

    if (simSpecies === 'Algarrobo Blanco') {
      if (simSoil === 'Arenoso-Pedregoso') {
        health = simRain >= 200 && simRain <= 600 ? 100 : simRain < 200 ? 70 : 80;
      } else if (simSoil === 'Arcilloso-Salino') {
        health = 60;
      } else {
        health = 40;
      }

      if (health === 100) {
        message = 'El Algarrobo Blanco se adapta óptimamente a suelos arenosos profundos y precipitaciones de 300mm usando raíces de gran profundidad.';
      } else if (health >= 60) {
        message = 'Sobrevive bien, pero el sustrato salino o la falta extrema de agua ralentizan su crecimiento.';
      } else {
        message = 'Peligro: El suelo exótico retiene demasiada humedad, lo que puede causar asfixia radicular en esta especie xerófila.';
      }
    }

    if (simSpecies === 'Quebracho Blanco') {
      health = simSoil === 'Arcilloso-Salino' || simSoil === 'Arenoso-Pedregoso' ? 90 : 50;
      if (simRain > 700) health -= 20;
      if (health >= 80) {
        message = 'Condiciones ideales. Desarrolla su madera ultra dura gracias al crecimiento lento en suelos pobres y clima seco.';
      } else {
        message = 'Exceso de humedad o suelo inadecuado. Es propenso a enfermedades fúngicas en estas condiciones.';
      }
    }

    if (simSpecies === 'Espinillo') {
      health = 95;
      if (simRain < 150) health = 80;
      message = 'Especie pionera y muy resistente. Se adapta a casi cualquier suelo y soporta sequías extremas, preparando el terreno para otras especies.';
    }

    if (health >= 90) status = 'Excelente';
    else if (health >= 60) status = 'Moderada';
    else status = 'Crítica';

    setSimHealth({ status, percentage: health, message });
  }, [simSpecies, simRain, simSoil]);

  const renderSlide = () => {
    switch (currentSlide) {
      case 0:
        return (
          <div className="flex flex-col items-center justify-center h-full text-center space-y-8 animate-fade-in">
            <div className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full font-semibold text-sm mb-4">
              PROYECTO INTEGRADO - 4TO AÑO
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-900 tracking-tight">
              Flora Autóctona <br />
              <span className="text-emerald-600">de La Rioja</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Un recorrido interactivo y tecnológico por las especies vegetales más resilientes de nuestra región. Aprende sobre sus adaptaciones únicas y ayúdanos a valorar nuestro monte nativo.
            </p>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-green-100 max-w-2xl text-left mt-8">
              <h3 className="text-xl font-bold text-green-800 mb-3 flex items-center">
                <Leaf className="w-5 h-5 mr-2" /> Conceptos Fundamentales
              </h3>
              <p className="text-gray-700 italic border-l-4 border-green-500 pl-4">
                "Los árboles autóctonos son aquellas especies vegetales originarias de una determinada región naturalmente adaptadas a sus condiciones climáticas y ambientales."
              </p>
            </div>
            <button
              onClick={nextSlide}
              className="mt-8 px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg transition-transform transform hover:scale-105 shadow-lg flex items-center"
            >
              Comenzar Exploración <ChevronRight className="ml-2" />
            </button>
          </div>
        );

      case 1:
        return (
          <div className="flex flex-col h-full justify-center space-y-8 animate-fade-in px-4 md:px-12">
            <h2 className="text-4xl font-bold text-green-900 border-b-2 border-green-200 pb-4">El Monte Riojano</h2>
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  La Rioja se ubica en una región semiárida caracterizada por inviernos secos y veranos extremadamente cálidos. La vegetación autóctona ha desarrollado adaptaciones físicas extraordinarias.
                </p>
                <ul className="space-y-4">
                  {[
                    { icon: CloudRain, text: 'Optimizar cada gota de agua de lluvia.' },
                    { icon: Sun, text: 'Soportar la alta radiación solar.' },
                    { icon: Sprout, text: 'Nutrir y fijar los suelos áridos de montaña y llanura.' }
                  ].map((item, i) => (
                    <li key={i} className="flex items-center bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                      <div className="bg-green-100 p-3 rounded-full mr-4 text-green-600">
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className="text-gray-800 font-medium">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-200 to-emerald-100 rounded-2xl p-8 flex items-center justify-center h-full min-h-[300px] shadow-inner relative overflow-hidden">
                <TreePine className="w-48 h-48 text-green-800 opacity-20 absolute -bottom-10 -right-10" />
                <Leaf className="w-32 h-32 text-green-700 opacity-40 animate-pulse" />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="flex flex-col h-full justify-start space-y-6 animate-fade-in px-4 md:px-8">
            <div className="text-center mb-4">
              <h2 className="text-3xl font-bold text-green-900 mb-2">Observar y Completar el Cuadro</h2>
              <p className="text-gray-600">
                Utiliza esta herramienta digital interactiva para evaluar tu conocimiento. Haz clic en <strong className="text-green-700">Revelar Uso</strong> para conocer el valor tradicional de cada especie.
              </p>
            </div>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-200">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-green-800 text-white">
                    <th className="p-4 font-semibold">Árbol Autóctono</th>
                    <th className="p-4 font-semibold text-center">¿Lo conocen?</th>
                    <th className="p-4 font-semibold">Uso Tradicional Registrado</th>
                  </tr>
                </thead>
                <tbody>
                  {treeUses.map((tree, idx) => (
                    <tr key={idx} className="border-b hover:bg-green-50 transition-colors">
                      <td className="p-4 font-bold text-gray-800 flex items-center">
                        <Leaf className="w-4 h-4 mr-2 text-green-600" /> {tree.name}
                      </td>
                      <td className="p-4 text-center">
                        <select className="bg-gray-100 border border-gray-300 text-gray-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2">
                          <option>No sé</option>
                          <option>Sí, lo conozco</option>
                          <option>Lo he visto</option>
                        </select>
                      </td>
                      <td className="p-4">
                        {revealedUses[idx] ? (
                          <span className="text-green-800 font-medium animate-fade-in flex items-center">
                            <CheckCircle2 className="w-4 h-4 mr-2 text-green-600" />
                            {tree.use}
                          </span>
                        ) : (
                          <button
                            onClick={() => toggleUse(idx)}
                            className="bg-emerald-100 text-emerald-800 hover:bg-emerald-200 px-4 py-2 rounded-md font-medium text-sm transition-colors"
                          >
                            Revelar Uso
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="flex flex-col h-full animate-fade-in">
            <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Explorador Botánico de Especies</h2>
            <div className="flex flex-col md:flex-row gap-6 h-full">
              <div className="md:w-1/3 bg-white rounded-xl shadow-sm border border-green-100 p-4 flex flex-col gap-2 overflow-y-auto">
                <p className="text-sm text-gray-500 mb-2 font-medium">Haz clic en los árboles para investigar:</p>
                {['Algarrobo Blanco', 'Chañar', 'Mistol', 'Quebracho Blanco', 'Espinillo', 'Tala'].map((tree) => (
                  <button
                    key={tree}
                    onClick={() => setSelectedTree(tree)}
                    className={`text-left px-4 py-3 rounded-lg font-semibold transition-all ${
                      selectedTree === tree ? 'bg-green-600 text-white shadow-md' : 'bg-gray-50 text-gray-700 hover:bg-green-100'
                    }`}
                  >
                    {tree}
                  </button>
                ))}
              </div>
              <div className="md:w-2/3 bg-white rounded-xl shadow-md border border-green-200 p-6 md:p-8 relative overflow-hidden">
                {selectedTree === 'Algarrobo Blanco' ? (
                  <div className="space-y-6 animate-fade-in relative z-10">
                    <div>
                      <h3 className="text-3xl font-extrabold text-green-800">{selectedTree}</h3>
                      <p className="text-emerald-600 font-mono italic">Prosopis alba</p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-green-50 p-4 rounded-lg">
                        <strong className="text-green-900 block mb-1">Características:</strong>
                        <p className="text-gray-700">Árbol de copa aparasolada de hasta 12m de altura. Posee hojas bipinnadas y espinas axilares cónicas. Desarrolla chauchas dulces altamente nutritivas.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <strong className="text-green-900 block mb-1">Distribución Geográfica:</strong>
                        <p className="text-gray-700">Ampliamente distribuido en el Chaco Seco y llanuras riojanas, adaptado a suelos arenosos profundos.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <strong className="text-green-900 block mb-1">Beneficios Ambientales:</strong>
                        <p className="text-gray-700">Excelente fijador de nitrógeno en el suelo. Proporciona sombra fresca reduciendo la temperatura del suelo y cobijando biodiversidad.</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <strong className="text-green-900 block mb-1">Usos Tecnológicos / Locales:</strong>
                        <p className="text-gray-700">Maderas finas de alta estabilidad, producción artesanal de harina sin gluten y biomasa sostenible.</p>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-100">
                        <strong className="text-red-900 block mb-1">Amenazas de Conservación:</strong>
                        <p className="text-gray-700">Deforestación por expansión ganadera, tala selectiva histórica y sobrepastoreo que daña los brotes jóvenes.</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 space-y-4 animate-fade-in">
                    <TreePine className="w-16 h-16 text-gray-300" />
                    <p className="text-xl font-medium text-gray-600">Datos de <span className="font-bold text-green-700">{selectedTree}</span></p>
                    <p>En desarrollo para la versión final del proyecto.</p>
                    <button onClick={() => setSelectedTree('Algarrobo Blanco')} className="text-green-600 underline">Volver a Algarrobo Blanco</button>
                  </div>
                )}
                <Leaf className="absolute -bottom-8 -right-8 w-64 h-64 text-green-50 opacity-50 z-0 pointer-events-none" />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="flex flex-col h-full justify-center items-center text-center space-y-8 animate-fade-in px-4">
            <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center border-4 border-green-500 mb-4 shadow-lg">
              <span className="text-4xl font-extrabold text-green-700">100%</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-800">Sostenibilidad Posible</h2>
            <h3 className="text-2xl text-green-700 font-medium">¿Es posible utilizar los recursos naturales sin dañarlos?</h3>
            <div className="bg-white p-8 rounded-2xl shadow-xl text-left max-w-3xl border-t-8 border-green-500 relative">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Leaf className="w-24 h-24 text-green-900" />
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-6">Nuestra Justificación Científica:</h4>
              <p className="text-gray-600 mb-6 font-medium">Sí, es totalmente posible mediante el concepto de Desarrollo Sustentable y el manejo forestal planificado:</p>
              <ul className="space-y-6">
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-800">Tasa de Extracción Equivalente:</strong>
                    <p className="text-gray-600 mt-1">Cosechar frutos (como la algarroba para harina) o recolectar ramas secas sin talar el árbol vivo mantiene el ecosistema intacto.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-800">Reforestación Activa obligatoria:</strong>
                    <p className="text-gray-600 mt-1">Por cada recurso maderero extraído bajo licencia, se deben plantar especies autóctonas equivalentes que garanticen la regeneración natural.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-green-500 mr-3 flex-shrink-0 mt-1" />
                  <div>
                    <strong className="text-gray-800">Protección legal comunitaria:</strong>
                    <p className="text-gray-600 mt-1">Leyes de bosque nativo que protegen el monte contra el desmonte indiscriminado de la agricultura industrial.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="flex flex-col h-full justify-center space-y-8 animate-fade-in px-4 md:px-12">
            <h2 className="text-4xl font-bold text-indigo-900 border-b-2 border-indigo-200 pb-4">Propuesta Tecnológica Integrada</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg shadow-sm">
              <h3 className="text-xl font-bold text-red-800 mb-2">Situación Problemática</h3>
              <p className="text-gray-800 font-medium italic mb-3">"¿Cómo podemos promover el cuidado y la valoración de árboles autóctonos en nuestra comunidad de forma innovadora?"</p>
              <p className="text-gray-700">Los folletos tradicionales de papel suelen desecharse rápidamente y no generan interés en las nuevas generaciones. Se requiere una herramienta interactiva, lúdica y digital que permita experimentar con el ecosistema de forma directa.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:border-indigo-300 transition-colors">
                <MonitorSmartphone className="w-16 h-16 text-indigo-500 mb-4" />
                <h4 className="text-lg font-bold text-gray-800 mb-2">1. Formato Web Multiplataforma</h4>
                <p className="text-gray-600">Un folleto interactivo que corre en celulares y computadoras del colegio sin descargar aplicaciones pesadas.</p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center text-center hover:border-indigo-300 transition-colors">
                <Settings2 className="w-16 h-16 text-indigo-500 mb-4" />
                <h4 className="text-lg font-bold text-gray-800 mb-2">2. Visualización y Simulación</h4>
                <p className="text-gray-600">Permite a los estudiantes simular factores ambientales reales de La Rioja (lluvia y suelo) y visualizar la salud arbórea.</p>
              </div>
            </div>
          </div>
        );

      case 6:
        return (
          <div className="flex flex-col h-full animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-teal-900">Prototipo de Simulador Ecológico</h2>
              <p className="text-gray-600 mt-2">Ajusta las condiciones ambientales de La Rioja para simular el impacto inmediato en el modelo biológico del árbol.</p>
            </div>
            <div className="flex flex-col lg:flex-row gap-8 h-full bg-white rounded-2xl shadow-xl p-6 border border-teal-100">
              <div className="lg:w-1/2 space-y-6 bg-gray-50 p-6 rounded-xl border border-gray-200">
                <h3 className="font-bold text-gray-800 flex items-center border-b pb-2">
                  <Settings2 className="w-5 h-5 mr-2 text-teal-600" /> Panel de Parámetros
                </h3>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Especie Seleccionada</label>
                  <select
                    value={simSpecies}
                    onChange={(e) => setSimSpecies(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                  >
                    <option value="Algarrobo Blanco">Algarrobo Blanco (Xerófilo Resistente)</option>
                    <option value="Quebracho Blanco">Quebracho Blanco (Madera Ultra Dura)</option>
                    <option value="Espinillo">Espinillo (Pionero en sequía)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                    <span>Precipitación Anual</span>
                    <span className="text-teal-600">{simRain} mm</span>
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="1000"
                    step="50"
                    value={simRain}
                    onChange={(e) => setSimRain(parseInt(e.target.value, 10))}
                    className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-teal-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>Sequía (50mm)</span>
                    <span>Inundación (1000mm)</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Tipo de Sustrato / Suelo</label>
                  <select
                    value={simSoil}
                    onChange={(e) => setSimSoil(e.target.value)}
                    className="w-full p-3 bg-white border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 shadow-sm"
                  >
                    <option value="Arenoso-Pedregoso">Arenoso-Pedregoso (Típico del Monte)</option>
                    <option value="Arcilloso-Salino">Arcilloso-Salino (Retiene Agua)</option>
                    <option value="Suelo Orgánico">Suelo Orgánico Importado (Exótico)</option>
                  </select>
                </div>
              </div>
              <div className="lg:w-1/2 flex flex-col justify-center items-center p-6 bg-gradient-to-b from-teal-50 to-white rounded-xl border border-teal-100 text-center relative overflow-hidden">
                <div className="relative w-48 h-48 mb-6">
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke={simHealth.percentage >= 90 ? '#10b981' : simHealth.percentage >= 60 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="8"
                      strokeDasharray={`${simHealth.percentage * 2.82} 282`}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <TreePine className={`w-12 h-12 ${simHealth.percentage >= 90 ? 'text-green-500' : simHealth.percentage >= 60 ? 'text-yellow-500' : 'text-red-500'} transition-colors duration-500`} />
                    <span className="text-2xl font-bold text-gray-800">{simHealth.percentage}%</span>
                  </div>
                </div>
                <h4 className="text-2xl font-extrabold text-gray-800 mb-2">
                  Salud: <span className={simHealth.percentage >= 90 ? 'text-green-600' : simHealth.percentage >= 60 ? 'text-yellow-600' : 'text-red-600'}>{simHealth.status}</span>
                </h4>
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mt-4 w-full">
                  <p className="text-gray-700 italic font-medium">"{simHealth.message}"</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 font-sans text-gray-800 flex flex-col">
      <header className="bg-white shadow-sm border-b border-stone-200 px-6 py-4 flex justify-between items-center z-20 relative">
        <div className="flex items-center space-x-2 text-green-800">
          <Leaf className="w-6 h-6" />
          <span className="font-bold text-lg tracking-tight">FloraRiojana.edu</span>
        </div>
        <div className="text-sm font-medium text-stone-500 bg-stone-100 px-4 py-1 rounded-full">Proyecto Integrado</div>
      </header>
      <main className="flex-grow flex items-center justify-center p-4 md:p-8">
        <div className="bg-white/80 backdrop-blur-sm w-full max-w-6xl h-[80vh] min-h-[600px] rounded-3xl shadow-2xl border border-stone-200/50 flex flex-col relative overflow-hidden">
          <div className="flex-grow p-6 md:p-10 overflow-y-auto">{renderSlide()}</div>
          <div className="bg-white border-t border-stone-100 p-4 px-8 flex justify-between items-center">
            <button
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentSlide === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-green-700 hover:bg-green-50'
              }`}
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Anterior
            </button>
            <div className="flex flex-col items-center">
              <div className="flex space-x-2 mb-2">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentSlide === idx ? 'bg-green-600 w-6' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-400 font-semibold tracking-wider uppercase">Presentación de Proyecto • Diapositiva {currentSlide + 1} de {totalSlides}</span>
            </div>
            <button
              onClick={nextSlide}
              disabled={currentSlide === totalSlides - 1}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors ${
                currentSlide === totalSlides - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-green-700 hover:bg-green-50'
              }`}
            >
              Siguiente <ChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </main>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
      ` }} />
    </div>
  );
};

export default FloraApp;
