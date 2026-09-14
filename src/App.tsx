import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [projectCategory, setProjectCategory] = useState<'todos' | 'personales' | 'academicos'>('todos');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');
  const location = useLocation();

  const navItems = [
    { id: 'inicio', path: '/', label: 'Inicio' },
    { id: 'sobre-mi', path: '/sobre-mi', label: 'Sobre mí' },
    { id: 'educacion', path: '/educacion', label: 'Educación' },
    { id: 'skills', path: '/skills', label: 'Skills' },
    { id: 'proyectos', path: '/proyectos', label: 'Proyectos' },
    { id: 'contacto', path: '/contacto', label: 'Contacto' },
  ];

  const navegarA = (id: string, path: string, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveSection(id);
    if (window.location.pathname !== path) {
      window.history.pushState(null, '', path);
    }
    const element = document.getElementById(id) || document.getElementById(id === 'inicio' ? 'home' : id === 'proyectos' ? 'works' : id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else if (id === 'inicio') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    let targetId = '';
    if (path === '/' || path === '/inicio' || path === '/home') targetId = 'inicio';
    else if (path === '/sobre-mi') targetId = 'sobre-mi';
    else if (path === '/educacion') targetId = 'educacion';
    else if (path === '/skills') targetId = 'skills';
    else if (path === '/proyectos' || path === '/works') targetId = 'proyectos';
    else if (path === '/contacto') targetId = 'contacto';

    if (targetId) {
      setActiveSection(targetId);
      const timer = setTimeout(() => {
        const element = document.getElementById(targetId) || document.getElementById(targetId === 'inicio' ? 'home' : targetId === 'proyectos' ? 'works' : targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        } else if (targetId === 'inicio') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'inicio', path: '/' },
        { id: 'sobre-mi', path: '/sobre-mi' },
        { id: 'educacion', path: '/educacion' },
        { id: 'skills', path: '/skills' },
        { id: 'proyectos', path: '/proyectos' },
        { id: 'contacto', path: '/contacto' },
      ];

      for (const section of sections) {
        const element = document.getElementById(section.id) || (section.id === 'inicio' ? document.getElementById('home') : section.id === 'proyectos' ? document.getElementById('works') : null);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 220) {
            setActiveSection(section.id);
            if (window.location.pathname !== section.path && !window.location.pathname.startsWith('/proyectos/')) {
              window.history.replaceState(null, '', section.path);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const enviarMensaje = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    setFormStatus('success');
    form.reset();
    setTimeout(() => setFormStatus('idle'), 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#f8fafc] text-slate-800 font-['Inter'] antialiased selection:bg-indigo-600 selection:text-white overflow-x-hidden">
      
      {/* Vibrant Ambient Glow Meshes (Glassmorphism & Depth) */}
      <div className="fixed top-[-10rem] left-[-10rem] w-[45rem] h-[45rem] bg-gradient-to-tr from-indigo-300/40 via-blue-200/35 to-sky-200/30 rounded-full blur-[140px] pointer-events-none -z-10 animate-pulse duration-1000"></div>
      <div className="fixed top-[30%] right-[-12rem] w-[45rem] h-[45rem] bg-gradient-to-br from-violet-200/35 via-fuchsia-100/30 to-teal-100/35 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-8rem] left-[15%] w-[50rem] h-[50rem] bg-gradient-to-tl from-emerald-200/30 via-sky-200/35 to-indigo-100/40 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Floating Pill Navigation */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <nav className="flex items-center gap-2 md:gap-3 px-4 py-2.5 bg-white/80 backdrop-blur-2xl border border-white/90 rounded-full shadow-xl shadow-indigo-950/[0.04]">
          <button
            type="button"
            onClick={(e) => navegarA('inicio', '/', e)}
            className="flex items-center gap-2.5 pl-2 pr-2 py-1 text-sm font-black tracking-tight text-slate-900 uppercase hover:opacity-80 transition-opacity"
          >
            <img src="/logo.png" alt="Franco Loza" className="w-6 h-6 object-contain rounded-md" />
            <span>FRANCO LOZA</span>
          </button>

          <div className="hidden md:flex items-center gap-1 border-l border-slate-200/80 pl-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={(e) => navegarA(item.id, item.path, e)}
                className={`px-4 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md shadow-indigo-500/25'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={(e) => navegarA('contacto', '/contacto', e)}
            className="ml-1 px-5 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold rounded-full shadow-md shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all duration-200"
          >
            Hablemos
          </button>
        </nav>
      </header>

      {/* Main Expansive Container */}
      <main className="max-w-7xl mx-auto px-6 md:px-12 pt-36 pb-28 space-y-36 md:space-y-48">

        {/* HERO SECTION */}
        <section id="inicio" className="pt-6 md:pt-12 scroll-mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            
            {/* Left Column: Intro */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-indigo-100 shadow-sm shadow-indigo-100">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-900">
                  Analista Universitario de Sistemas • Full Stack Developer
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tight text-slate-900 leading-[1.02]">
                  Franco <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">Loza</span>
                </h1>
                <p className="text-xl sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-2xl">
                  Analista Universitario de Sistemas y desarrollador apasionado por crear arquitecturas escalables, sistemas ERP y experiencias digitales de alto impacto.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={(e) => navegarA('proyectos', '/proyectos', e)}
                  className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-bold rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2.5"
                >
                  <span>Explorar Proyectos</span>
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => navegarA('contacto', '/contacto', e)}
                  className="px-8 py-4 bg-white/80 hover:bg-white text-slate-800 text-sm font-bold rounded-2xl border border-slate-200/90 backdrop-blur-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                >
                  Contactar
                </button>
              </div>

              {/* Social Links with Color Hover */}
              <div className="flex items-center gap-3.5 pt-4 text-slate-600">
                <a
                  href="https://www.linkedin.com/in/francoloza/"
                  target="_blank"
                  rel="noreferrer"
                  title="LinkedIn"
                  className="p-3 bg-white/90 border border-slate-200/80 rounded-2xl hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 hover:scale-110 transition-all duration-200 shadow-xs"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                </a>
                <a
                  href="https://github.com/Franco-Loza"
                  target="_blank"
                  rel="noreferrer"
                  title="GitHub"
                  className="p-3 bg-white/90 border border-slate-200/80 rounded-2xl hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50/50 hover:scale-110 transition-all duration-200 shadow-xs"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
                <a
                  href="https://instagram.com/francolozaok"
                  target="_blank"
                  rel="noreferrer"
                  title="Instagram"
                  className="p-3 bg-white/90 border border-slate-200/80 rounded-2xl hover:text-pink-600 hover:border-pink-300 hover:bg-pink-50/50 hover:scale-110 transition-all duration-200 shadow-xs"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://facebook.com/lozafranco"
                  target="_blank"
                  rel="noreferrer"
                  title="Facebook"
                  className="p-3 bg-white/90 border border-slate-200/80 rounded-2xl hover:text-blue-700 hover:border-blue-300 hover:bg-blue-50/50 hover:scale-110 transition-all duration-200 shadow-xs"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/5493482405489"
                  target="_blank"
                  rel="noreferrer"
                  title="WhatsApp"
                  className="p-3 bg-white/90 border border-slate-200/80 rounded-2xl hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50/50 hover:scale-110 transition-all duration-200 shadow-xs"
                >
                  <svg className="w-5 h-5 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.88-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.347-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Right Column: Imposing Floating Profile Card */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative group w-full max-w-md">
                
                {/* Glow backdrop with vivid gradients */}
                <div className="absolute -inset-2 bg-gradient-to-tr from-indigo-500/20 via-blue-500/20 to-teal-400/20 rounded-3xl blur-2xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Main Glass Card */}
                <div className="relative bg-white/85 backdrop-blur-2xl border border-white/95 rounded-3xl p-5 shadow-2xl shadow-indigo-950/[0.06] overflow-hidden">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-slate-100 relative">
                    <img
                      src="/perfil.png"
                      alt="Franco Loza"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-60"></div>
                  </div>

                  <div className="mt-5 px-2 flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ubicación</p>
                      <p className="text-base font-bold text-slate-800">Santa Fe, Argentina</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Educación</p>
                      <p className="text-base font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">UTN FRSF</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* SOBRE MÍ SECTION */}
        <section id="sobre-mi" className="scroll-mt-28">
          <div className="bg-white/70 backdrop-blur-2xl border border-white/95 rounded-3xl p-8 sm:p-14 md:p-16 shadow-xl shadow-indigo-950/[0.03] space-y-12">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200/70 pb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Conoceme</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
                  Perfil Profesional
                </h2>
              </div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                [ VISIÓN Y ENFOQUE ]
              </p>
            </div>

            <p className="text-xl sm:text-2xl text-slate-700 font-normal leading-relaxed max-w-5xl">
              Oriundo de Reconquista y radicado en Santa Fe Capital. Como <strong className="text-slate-900 font-bold">Analista Universitario de Sistemas</strong> y estudiante avanzado de <strong className="text-slate-900 font-bold">Ingeniería en Sistemas de Información</strong>, consolidé una visión madura sobre cómo diseñar soluciones tecnológicas. No busco solo escribir código, sino comprender las estructuras que lo sostienen para garantizar coherencia y escalabilidad.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
              <div className="p-8 sm:p-10 bg-gradient-to-br from-white/90 to-indigo-50/30 backdrop-blur-md rounded-3xl border border-indigo-100/80 shadow-sm hover:border-indigo-300 hover:shadow-xl hover:shadow-indigo-500/[0.05] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">code_blocks</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Criterio Técnico</h4>
                <p className="text-base text-slate-600 leading-relaxed">
                  Trabajo principalmente con Java, C++, Python y bases de datos SQL/NoSQL. Desarrollo con un enfoque analítico, priorizando siempre entregar un código claro, mantenible y bien fundamentado frente a desafíos complejos.
                </p>
              </div>

              <div className="p-8 sm:p-10 bg-gradient-to-br from-white/90 to-blue-50/30 backdrop-blur-md rounded-3xl border border-blue-100/80 shadow-sm hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/[0.05] transition-all duration-300 group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-xs">
                  <span className="material-symbols-outlined text-2xl">groups</span>
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Sinergia y Liderazgo</h4>
                <p className="text-base text-slate-600 leading-relaxed">
                  Concibo la ingeniería como un esfuerzo colectivo. Disfruto tanto asumiendo el liderazgo para guiar la arquitectura técnica de un proyecto, como ayudando al equipo a destrabar problemas específicos.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* EDUCACIÓN SECTION */}
        <section id="educacion" className="scroll-mt-28">
          <div className="space-y-10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Trayectoria</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
                Educación
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* UTN - Ingeniería */}
              <div className="p-10 bg-white/75 backdrop-blur-2xl rounded-3xl border border-indigo-100 shadow-md hover:shadow-2xl hover:shadow-indigo-500/[0.08] hover:border-indigo-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100/50 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform"></div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-full">
                      En curso
                    </span>
                    <span className="text-xs font-bold text-slate-400 tracking-wider">2021 — ACT</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                    Ingeniería en Sistemas de Información
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Universidad Tecnológica Nacional (UTN)
                  </p>
                </div>
                <div className="mt-10 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-indigo-500">location_on</span>
                  Santa Fe, Santa Fe
                </div>
              </div>

              {/* UTN - Analista */}
              <div className="p-10 bg-white/75 backdrop-blur-2xl rounded-3xl border border-emerald-100 shadow-md hover:shadow-2xl hover:shadow-emerald-500/[0.08] hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100/50 rounded-full blur-2xl -z-10 group-hover:scale-150 transition-transform"></div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold rounded-full">
                      Graduado
                    </span>
                    <span className="text-xs font-bold text-slate-400 tracking-wider">2021 — 2025</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                    Analista Universitario de Sistemas
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Universidad Tecnológica Nacional (UTN)
                  </p>
                </div>
                <div className="mt-10 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-emerald-500">location_on</span>
                  Santa Fe, Santa Fe
                </div>
              </div>

              {/* Instituto Reconquista */}
              <div className="p-10 bg-white/60 backdrop-blur-2xl rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-slate-300 transition-all duration-300 flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="px-3.5 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">
                      Secundario
                    </span>
                    <span className="text-xs font-bold text-slate-400 tracking-wider">2016 — 2020</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 leading-snug">
                    Bachillerato en Economía y Administración
                  </h3>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    EESOPI N°8113 - "Instituto Reconquista"
                  </p>
                </div>
                <div className="mt-10 pt-5 border-t border-slate-100 text-xs font-semibold text-slate-500 flex items-center gap-2">
                  <span className="material-symbols-outlined text-base text-slate-400">location_on</span>
                  Reconquista, Santa Fe
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="scroll-mt-28">
          <div className="space-y-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Tecnologías</span>
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
                Stack Tecnológico
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Frontend */}
              <div className="p-8 sm:p-10 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/95 shadow-md space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-600 border-l-2 border-indigo-600 pl-3">
                  Frontend
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
                  {[
                    { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
                    { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
                    { name: 'JS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
                    { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
                    { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
                    { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angularjs/angularjs-original.svg' },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="p-3.5 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <img src={tech.icon} alt={tech.name} className="w-9 h-9 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-slate-700 group-hover:text-indigo-600">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="p-8 sm:p-10 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/95 shadow-md space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-blue-600 border-l-2 border-blue-600 pl-3">
                  Backend
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
                    { name: 'Spring', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg' },
                    { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg' },
                    { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg' },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="p-3.5 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-blue-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <img src={tech.icon} alt={tech.name} className="w-9 h-9 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-slate-700 group-hover:text-blue-600">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="p-8 sm:p-10 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/95 shadow-md space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-emerald-600 border-l-2 border-emerald-600 pl-3">
                  Bases de Datos
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
                    { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg' },
                    { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg' },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="p-3.5 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-emerald-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <img src={tech.icon} alt={tech.name} className="w-9 h-9 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-slate-700 group-hover:text-emerald-600">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className="p-8 sm:p-10 bg-white/70 backdrop-blur-2xl rounded-3xl border border-white/95 shadow-md space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-widest text-violet-600 border-l-2 border-violet-600 pl-3">
                  DevOps & Herramientas
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg' },
                    { name: 'Maven', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/maven/maven-original.svg' },
                    { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
                    { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
                  ].map((tech) => (
                    <div
                      key={tech.name}
                      className="p-3.5 bg-white border border-slate-200/80 rounded-2xl flex flex-col items-center justify-center gap-2 hover:border-violet-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                    >
                      <img src={tech.icon} alt={tech.name} className="w-9 h-9 group-hover:scale-110 transition-transform" />
                      <span className="text-[11px] font-bold text-slate-700 group-hover:text-violet-600">{tech.name}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* PROYECTOS SECTION */}
        <section id="proyectos" className="scroll-mt-28">
          <div className="space-y-10">
            
            {/* Header & Filter Controls */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Portafolio</span>
                <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
                  Proyectos Destacados
                </h2>
                <p className="text-slate-500 text-sm mt-2 max-w-xl">
                  Distinción entre proyectos personales orientados a productos reales y proyectos académicos universitarios.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 p-1.5 bg-white/90 backdrop-blur-xl border border-slate-200/90 rounded-2xl shadow-sm self-start md:self-auto">
                <button
                  type="button"
                  onClick={() => setProjectCategory('todos')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    projectCategory === 'todos'
                      ? 'bg-slate-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  <span>Todos</span>
                </button>
                <button
                  type="button"
                  onClick={() => setProjectCategory('personales')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    projectCategory === 'personales'
                      ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                      : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
                  }`}
                >
                  <span>🚀 Personales</span>
                  <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-black ${
                    projectCategory === 'personales' ? 'bg-white/20 text-white' : 'bg-indigo-100 text-indigo-700'
                  }`}>
                    1
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setProjectCategory('academicos')}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    projectCategory === 'academicos'
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/25'
                      : 'text-slate-600 hover:text-blue-600 hover:bg-blue-50/50'
                  }`}
                >
                  <span>🎓 Académicos</span>
                  <span className={`px-1.5 py-0.5 text-[10px] rounded-full font-black ${
                    projectCategory === 'academicos' ? 'bg-white/20 text-white' : 'bg-blue-100 text-blue-700'
                  }`}>
                    En carga
                  </span>
                </button>
              </div>
            </div>

            {/* Grid of Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* PERSONAL PROJECT: MotorHub */}
              {(projectCategory === 'todos' || projectCategory === 'personales') && (
                <div className="lg:col-span-8 p-8 sm:p-12 bg-gradient-to-br from-white/95 via-white/90 to-indigo-50/40 backdrop-blur-2xl border border-indigo-100 rounded-3xl shadow-xl shadow-indigo-950/[0.04] hover:shadow-2xl hover:shadow-indigo-500/[0.08] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden">
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                          🚀 Proyecto Personal
                        </span>
                        <span className="px-3 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200/80 text-xs font-bold rounded-full">
                          SaaS • ERP & CRM
                        </span>
                      </div>
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">2026 • Producción</span>
                    </div>

                    <div>
                      <h3 className="text-3xl sm:text-4xl font-black text-slate-900 group-hover:text-indigo-600 transition-colors">
                        MotorHub
                      </h3>
                      <p className="text-sm font-bold text-indigo-600 uppercase tracking-wider mt-1">
                        Showroom Multirrubro & ERP Integral para Concesionarias
                      </p>
                    </div>

                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                      Plataforma SaaS integral orientada a concesionarias y agencias multirrubro. Combina showroom interactivo con cotizaciones del dólar en vivo, peritaje técnico de usados, auditoría financiera y sincronización en tiempo real con Mercado Libre.
                    </p>
                  </div>

                  <div className="space-y-6 pt-8 mt-8 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-2">
                      {['Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'PostgreSQL', 'Prisma', 'Mercado Libre API'].map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3.5 pt-1">
                      <Link
                        to="/proyectos/motorhub"
                        className="px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all flex items-center gap-2"
                      >
                        <span>Ver Caso de Estudio Completo</span>
                        <span className="material-symbols-outlined text-base">arrow_forward</span>
                      </Link>
                      <a
                        href="https://motorhub-concesionaria.vercel.app/"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3.5 bg-white border border-slate-200 hover:border-indigo-300 text-slate-700 hover:text-indigo-600 text-sm font-bold rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center gap-1.5"
                      >
                        <span>Demo en Vivo</span>
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                      </a>
                      <a
                        href="https://github.com/Franco-Loza/motorhub-concesionaria"
                        target="_blank"
                        rel="noreferrer"
                        className="px-5 py-3.5 bg-white border border-slate-200 hover:border-slate-900 text-slate-700 hover:text-slate-900 text-sm font-bold rounded-2xl shadow-xs hover:shadow-md transition-all flex items-center gap-2"
                        title="Ver Repositorio en GitHub"
                      >
                        <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* ACADEMIC PROJECT SECTION / CARD */}
              {(projectCategory === 'todos' || projectCategory === 'academicos') && (
                <div className={`${projectCategory === 'academicos' ? 'lg:col-span-12' : 'lg:col-span-4'} p-8 sm:p-10 bg-gradient-to-br from-white/95 via-white/90 to-blue-50/40 backdrop-blur-2xl border border-blue-100 rounded-3xl shadow-xl shadow-blue-950/[0.04] hover:shadow-2xl hover:shadow-blue-500/[0.08] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}>
                  <div className="space-y-5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white text-xs font-black rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                        🎓 Proyecto Académico
                      </span>
                      <span className="px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200/80 text-[11px] font-bold rounded-full">
                        Universidad / Cátedra
                      </span>
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">
                        Trabajos de Cátedra & TFI
                      </h4>
                      <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mt-1">
                        Sistemas Distribuidos • Algoritmos & Bases de Datos
                      </p>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed">
                      Desarrollos de software aplicados durante la carrera universitaria, incluyendo arquitecturas en capas, persistencia de datos relacional y algoritmos de optimización.
                    </p>

                    <div className="p-4 bg-blue-50/70 border border-blue-100/90 rounded-2xl text-xs font-medium text-blue-900 flex items-start gap-3">
                      <span className="material-symbols-outlined text-blue-600 text-base mt-0.5">folder_zip</span>
                      <span>
                        <strong className="font-bold text-blue-950">En preparación para cargar:</strong> Los repositorios de GitHub, esquemas de BD y documentación técnica se integrarán en esta sección.
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                    <div className="flex flex-wrap items-center gap-1.5">
                      {['Java', 'Spring Boot', 'C++', 'PostgreSQL', 'MySQL', 'POO & UML'].map((tech) => (
                        <span key={tech} className="px-2.5 py-1 bg-white border border-slate-200 rounded-lg text-[11px] font-bold text-slate-700">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="text-xs font-bold text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                      <span>Próxima carga de proyectos hoy</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Upcoming Slot Card (if in personal mode) */}
              {projectCategory === 'personales' && (
                <div className="lg:col-span-4 p-8 sm:p-12 bg-white/50 backdrop-blur-xl border-2 border-dashed border-slate-300 rounded-3xl flex flex-col items-center justify-center text-center group hover:border-indigo-400 hover:bg-white/80 transition-all duration-300 min-h-[360px]">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-50 to-blue-50 border border-indigo-100 text-indigo-600 shadow-sm flex items-center justify-center group-hover:scale-110 transition-all duration-300 mb-5">
                    <span className="material-symbols-outlined text-3xl">add</span>
                  </div>
                  <h4 className="text-xl font-bold text-slate-800">Próximos Proyectos Personales</h4>
                  <p className="text-sm text-slate-500 max-w-xs mt-2">Nuevos desarrollos de microservicios y plataformas SaaS en desarrollo.</p>
                </div>
              )}

            </div>
          </div>
        </section>

        {/* CONTACTO SECTION */}
        <section id="contacto" className="scroll-mt-28">
          <div className="bg-gradient-to-br from-white/90 via-white/85 to-indigo-50/30 backdrop-blur-2xl border border-white/95 rounded-3xl p-8 sm:p-14 md:p-16 shadow-2xl shadow-indigo-950/[0.04]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Mensaje directo</span>
                  <h2 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mt-1">
                    Conectemos
                  </h2>
                </div>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  Si tenés un proyecto en mente, estás buscando sumar un perfil técnico a tu equipo, o simplemente querés charlar sobre tecnología, dejame tu mensaje.
                </p>

                <div className="pt-4 space-y-4">
                  <div className="flex items-center gap-3 text-base font-semibold text-slate-700">
                    <span className="material-symbols-outlined text-indigo-600 text-2xl">mail</span>
                    <span>Franco Loza</span>
                  </div>
                  <div className="flex items-center gap-3 text-base font-semibold text-slate-700">
                    <span className="material-symbols-outlined text-indigo-600 text-2xl">location_on</span>
                    <span>Santa Fe, Argentina</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <form onSubmit={enviarMensaje} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label htmlFor="nombre" className="text-xs font-bold text-slate-700">Nombre</label>
                      <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        required
                        placeholder="Tu nombre"
                        className="w-full px-5 py-4 bg-white/90 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-xs font-bold text-slate-700">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="tu@email.com"
                        className="w-full px-5 py-4 bg-white/90 border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="mensaje" className="text-xs font-bold text-slate-700">Mensaje</label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      rows={5}
                      required
                      placeholder="Escribí tu mensaje acá..."
                      className="w-full px-5 py-4 bg-white/90 border border-slate-200 rounded-2xl text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all shadow-2xs"
                    ></textarea>
                  </div>

                  {formStatus === 'success' && (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl flex items-center gap-2">
                      <span className="material-symbols-outlined text-base text-emerald-600">check_circle</span>
                      ¡Mensaje enviado con éxito!
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-bold text-sm rounded-2xl shadow-xl shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all duration-200 flex justify-center items-center gap-2"
                  >
                    <span>Enviar Mensaje</span>
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white/50 backdrop-blur-xl py-14 px-6 text-center text-xs text-slate-500 space-y-5">
        <div className="flex flex-col items-center gap-2">
          <img src="/logo.png" alt="Franco Loza" className="w-8 h-8 object-contain hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
          <span className="font-bold text-slate-800 text-xs tracking-wider uppercase">Franco Loza</span>
        </div>
        <div className="flex justify-center items-center gap-8 font-semibold">
          <a href="https://www.linkedin.com/in/francoloza/" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">LinkedIn</a>
          <a href="https://github.com/Franco-Loza" target="_blank" rel="noreferrer" className="hover:text-indigo-600 transition-colors">GitHub</a>
          <a href="https://instagram.com/francolozaok" target="_blank" rel="noreferrer" className="hover:text-pink-600 transition-colors">Instagram</a>
          <a href="https://facebook.com/lozafranco" target="_blank" rel="noreferrer" className="hover:text-blue-600 transition-colors">Facebook</a>
          <a href="https://wa.me/5493482405489" target="_blank" rel="noreferrer" className="hover:text-emerald-600 transition-colors">WhatsApp</a>
        </div>
        <p className="tracking-wider uppercase font-bold text-[11px] text-slate-400">
          © {new Date().getFullYear()} FRANCO LOZA. TODOS LOS DERECHOS RESERVADOS.
        </p>
      </footer>

    </div>
  );
}

export default App;
