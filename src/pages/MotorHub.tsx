import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ArchitectureItem {
  layer: string;
  technologies: string;
  justification: string;
}

interface CaseStudySection {
  id: number;
  badge: string;
  route: string;
  title: string;
  description: string;
  technicalChallenge: string;
  image: string;
  alt: string;
  tags: string[];
  isPdf?: boolean;
  pdfUrl?: string;
}

const architectureData: ArchitectureItem[] = [
  {
    layer: 'Frontend Framework',
    technologies: 'Next.js 16 (App Router) + React 19',
    justification: 'Renderizado híbrido (SSR + Server Components) para máxima velocidad y SEO.',
  },
  {
    layer: 'Lenguaje',
    technologies: 'TypeScript 5 (Strict Mode)',
    justification: 'Tipado estático integral en toda la app para eliminar errores en tiempo de compilación.',
  },
  {
    layer: 'Diseño y UI',
    technologies: 'Tailwind CSS 4 + Lucide Icons',
    justification: 'Arquitectura de estilos ultra liviana con diseño responsivo móvil y desktop.',
  },
  {
    layer: 'Base de Datos',
    technologies: 'PostgreSQL alojado en Supabase',
    justification: 'Motor relacional robusto con transacciones ACID y alta concurrencia.',
  },
  {
    layer: 'ORM & Modelado',
    technologies: 'Prisma ORM + Connection Pooling',
    justification: 'Modelado polimórfico con pgbouncer para alto rendimiento Serverless.',
  },
  {
    layer: 'Autenticación',
    technologies: 'JWT (JSON Web Tokens) + Bcrypt.js',
    justification: 'Sesiones seguras HTTP-Only con control de acceso granular basado en roles (RBAC).',
  },
  {
    layer: 'Multimedia & CDN',
    technologies: 'Cloudinary API',
    justification: 'Optimización automática de imágenes, compresión webp y entrega global CDN.',
  },
  {
    layer: 'APIs Externas',
    technologies: 'Mercado Libre API (OAuth 2.0 VIS)',
    justification: 'Sincronización bidireccional de stock, precios y categorías oficiales MLA.',
  },
  {
    layer: 'Despliegue',
    technologies: 'Vercel Serverless Platform',
    justification: 'Infraestructura distribuida con tolerancia a fallos y despliegues CI/CD.',
  },
];

const sectionsData: CaseStudySection[] = [
  {
    id: 1,
    badge: 'Módulo 01 • Showroom & Finanzas en Vivo',
    route: '/',
    title: 'Showroom Digital Inmersivo & Ticker de Divisas en Tiempo Real',
    description:
      'Experiencia inmersiva diseñada bajo estética Dark Luxury con contrastes esmeralda. Dispone de un carrusel dinámico de unidades destacadas, selector rápido de rubros comerciales y un widget financiero en vivo que consume cotizaciones en tiempo real (Dólar Blue, Oficial y MEP) con conversión automática de precios en ARS y USD orientada a maximizar la conversión de visitantes en prospectos.',
    technicalChallenge:
      'Renderizado del servidor con tolerancia a fallos (SSR / Server Components) y arquitectura de caché reactivo con revalidación periódica para APIs financieras externas.',
    image: '/projects/motorhub/1-showroom.png',
    alt: 'Showroom Digital Inmersivo & Cotizador de Divisas en Vivo',
    tags: ['Next.js 16', 'React 19', 'Live Currency APIs', 'Tailwind CSS 4', 'Dark Luxury UX'],
  },
  {
    id: 2,
    badge: 'Módulo 02 • Búsqueda & Catálogo',
    route: '/catalogo',
    title: 'Motor de Búsqueda y Filtrado Facetado Multivariable',
    description:
      'Catálogo global equipado con un motor de búsqueda reactivo. Permite a los usuarios combinar múltiples filtros en simultáneo: categoría (Autos, Motos, Camiones, Lanchas, Motorhomes), rango de precios con sliders, kilometraje, tipo de combustible, tipo de transmisión, tracción, año y ordenamientos avanzados sin recarga de página.',
    technicalChallenge:
      'Sincronización bidireccional del estado de los filtros con los URL Search Params del navegador, permitiendo compartir enlaces directos con filtros preaplicados.',
    image: '/projects/motorhub/2-catalogo-filtros.png',
    alt: 'Catálogo con Filtrado Facetado Multivariable',
    tags: ['URL Search Params', 'Faceted Search', 'Dynamic Filtering', 'Performance'],
  },
  {
    id: 3,
    badge: 'Módulo 03 • Detalle de Unidad',
    route: '/catalogo/[id]',
    title: 'Ficha Técnica Polimórfica por Rubro con Peritaje Integral',
    description:
      'Detalle de unidad con renderizado condicional de especificaciones técnicas según el rubro inspeccionado: cilindrada y potencia en motos; capacidad de carga y configuración de ejes en camiones; eslora, manga, calado y horas de motor en embarcaciones; camas y equipamiento en motorhomes. Incluye galería fotográfica HD con lightbox, badge de peritaje y contacto directo vía WhatsApp.',
    technicalChallenge:
      'Modelado de datos polimórfico en PostgreSQL mediante relaciones 1-a-1 tipadas en Prisma ORM.',
    image: '/projects/motorhub/3-ficha-tecnica.png',
    alt: 'Ficha Técnica Polimórfica por Rubro con Peritaje',
    tags: ['Prisma ORM', 'Polymorphic Schema', 'Cloudinary CDN', 'Image Gallery'],
  },
  {
    id: 4,
    badge: 'Módulo 04 • Sales Enablement',
    route: '/catalogo/[id] (Imprimir Ficha / Folleto A4)',
    title: 'Generador Automático de Folletos Técnicos A4 para Salón de Ventas',
    description:
      'Herramienta diseñada para el equipo comercial en salón que permite generar en un solo clic una ficha técnica formal en hoja A4 lista para imprimir o exportar a PDF. Incluye membrete oficial de MotorHub, fotografías principales, cuadro de peritaje, código QR con enlace directo a la publicación web y datos de contacto de la sucursal.',
    technicalChallenge:
      'Utilización de reglas CSS @media print avanzadas para renderizar una maqueta gráfica vectorizada sin alterar el diseño web responsive.',
    image: '/projects/motorhub/4-folleto-a4.pdf',
    alt: 'Generador Automático de Folletos Técnicos A4 para Salón',
    tags: ['CSS Print Engine', 'PDF Generation', 'QR Code Integration', 'Sales Enablement'],
    isPdf: true,
    pdfUrl: '/projects/motorhub/4-folleto-a4.pdf',
  },
  {
    id: 5,
    badge: 'Módulo 05 • Benchmark & Decisión',
    route: '/comparador',
    title: 'Comparador Técnico Multivehículo con Persistencia de Estado',
    description:
      'Módulo interactivo que permite seleccionar vehículos desde cualquier parte del catálogo mediante una barra flotante persistente y contrastar en una matriz comparativa especificaciones técnicas, motorización, consumos, dimensiones, equipamiento y precios para facilitar la decisión de compra del cliente.',
    technicalChallenge:
      'Manejo global del estado mediante React Context API y localStorage para conservar los vehículos seleccionados durante toda la navegación.',
    image: '/projects/motorhub/5-comparador.png',
    alt: 'Comparador Técnico Multivehículo con Persistencia',
    tags: ['React Context API', 'LocalStorage Persistence', 'Data Matrix', 'UX Design'],
  },
  {
    id: 6,
    badge: 'Módulo 06 • Tasaciones & Leads',
    route: '/tasa-tu-usado',
    title: 'Asistente Interactivo de Tasación y Recepción de Usados',
    description:
      'Asistente paso a paso (Wizard) que digitaliza la toma de vehículos usados como parte de pago. El cliente detalla estado mecánico, cubiertas, pintura, historial de mantenimiento y adjunta fotografías. El sistema genera una tasación preliminar automatizada y despacha la solicitud directo al panel administrativo y al WhatsApp de ventas.',
    technicalChallenge:
      'Subida asíncrona de múltiples fotografías a Cloudinary con compresión en el cliente y validación de tipos MIME.',
    image: '/projects/motorhub/6-tasa-tu-usado.png',
    alt: 'Asistente Interactivo de Tasación de Usados',
    tags: ['Multi-step Form', 'File Upload', 'Cloudinary API', 'Lead Generation'],
  },
  {
    id: 7,
    badge: 'Módulo 07 • ERP & Business Intelligence',
    route: '/panel/inicio',
    title: 'Dashboard Ejecutivo de Métricas Comerciales y Control Financiero',
    description:
      'Centro de control directivo con analíticas en tiempo real para la toma de decisiones estratégicas. Proporciona visualización de facturación mensual consolidada, ticket promedio, margen neto de rentabilidad, tasa de conversión de consultas, rotación de stock por categoría y marcas de mayor demanda.',
    technicalChallenge:
      'Agregaciones SQL de alto rendimiento mediante Prisma para calcular métricas de facturación y rentabilidad sin degradar la latencia.',
    image: '/projects/motorhub/7-dashboard-kpis.png',
    alt: 'Dashboard Ejecutivo de Métricas y Finanzas',
    tags: ['Business Intelligence', 'Data Analytics', 'Financial Metrics', 'SQL Aggregations'],
  },
  {
    id: 8,
    badge: 'Módulo 08 • Inventario & Costeo',
    route: '/panel/stock',
    title: 'Gestión de Stock Multirrubro con Desglose de Gastos de Taller',
    description:
      'Módulo integral de inventario donde cada unidad cuenta con una matriz de costeo avanzada: precio de compra inicial + desglose de gastos posteriores (reparaciones mecánicas, chapa y pintura, estética, repuestos, gestoría). Permite al administrador conocer el margen neto exacto en USD y porcentaje antes de autorizar una venta.',
    technicalChallenge:
      'CRUD relacional completo con soporte para subida masiva de imágenes y actualización dinámica de estados (DISPONIBLE, RESERVADO, VENDIDO).',
    image: '/projects/motorhub/8-gestion-stock.png',
    alt: 'Gestión de Stock con Desglose de Gastos y Margen Neto',
    tags: ['Inventory Management', 'Cost Accounting', 'Margin Analysis', 'CRUD Relacional'],
  },
  {
    id: 9,
    badge: 'Módulo 09 • Integraciones Oficiales',
    route: '/panel/mercadolibre',
    title: 'Sincronización Multicanal Automatizada con Mercado Libre API (VIS)',
    description:
      'Integración nativa con la API de Mercado Libre Vehículos (VIS) bajo protocolo OAuth 2.0. Permite publicar, sincronizar, pausar y republicar unidades con un solo clic. El sistema mapea automáticamente las categorías oficiales de Mercado Libre Argentina (MLA1743, MLA1763, MLA1744, MLA1785) y sincroniza precios y fotos en segundos.',
    technicalChallenge:
      'Implementación del flujo de autorización OAuth 2.0 con refresco automático de tokens (refresh_token) y mapeo de atributos específicos por categoría.',
    image: '/projects/motorhub/9-mercadolibre.png',
    alt: 'Sincronización Multicanal con Mercado Libre API',
    tags: ['OAuth 2.0', 'Mercado Libre API', 'Multichannel Sync', 'Background Workers'],
  },
  {
    id: 10,
    badge: 'Módulo 10 • Ventas & Facturación POS',
    route: '/panel/ventas/nueva',
    title: 'Punto de Venta Comercial y Generador de Boletos de Compraventa',
    description:
      'Módulo de liquidación de operaciones comerciales con selección de unidad, asignación del vendedor responsable, comisiones, formas de pago (efectivo, transferencia, permuta, crédito prendario). Al concretar la venta, cambia automáticamente el estado del vehículo y genera el Boleto Oficial de Compraventa con validez legal y membrete institucional.',
    technicalChallenge:
      'Transacciones atómicas de base de datos (prisma.$transaction) que garantizan que el stock, la venta y el registro de auditoría se actualicen en un solo bloque seguro.',
    image: '/projects/motorhub/10-punto-de-venta.png',
    alt: 'Punto de Venta Comercial y Boleto de Compraventa',
    tags: ['Atomic Transactions', 'Point of Sale (POS)', 'Legal Documents', 'Financial ERP'],
  },
  {
    id: 11,
    badge: 'Módulo 11 • Ciberseguridad & Compliance',
    route: '/panel/auditoria y /panel/empleados',
    title: 'Auditoría Forense y Control de Acceso Basado en Roles (RBAC)',
    description:
      'Sistema de seguridad con doble capa de protección: matriz de roles (DUENO con acceso irrestricto a finanzas y auditoría vs EMPLEADO con acceso puramente comercial). Módulo de auditoría inmutable que registra cada acción crítica (creación/edición de vehículos, ventas, logins) almacenando usuario, dirección IP de origen, entidad afectada y timestamp exacto.',
    technicalChallenge:
      'Middleware perimetral de seguridad con verificación de tokens JWT e interceptor de auditoría no bloqueante.',
    image: '/projects/motorhub/11-auditoria-rbac.png',
    alt: 'Auditoría Forense y Control de Accesos RBAC',
    tags: ['Cybersecurity', 'RBAC', 'Audit Logging', 'JWT Authentication', 'Security Forensics'],
  },
];

export default function MotorHubCaseStudy() {
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Keyboard navigation & zoom
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (modalIndex === null) return;
      if (e.key === 'Escape') {
        closeModal();
      } else if (e.key === 'ArrowRight') {
        goToNextImage();
      } else if (e.key === 'ArrowLeft') {
        goToPrevImage();
      } else if (e.key === '+' || e.key === '=') {
        zoomIn();
      } else if (e.key === '-') {
        zoomOut();
      } else if (e.key === '0') {
        resetZoom();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalIndex, zoomScale]);

  const openModal = (index: number) => {
    setModalIndex(index);
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setModalIndex(null);
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.35, 3.5));
  };

  const zoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.35, 0.8);
      if (next <= 1) setPan({ x: 0, y: 0 });
      return next;
    });
  };

  const resetZoom = () => {
    setZoomScale(1);
    setPan({ x: 0, y: 0 });
  };

  const goToNextImage = () => {
    if (modalIndex === null) return;
    const nextIndex = (modalIndex + 1) % sectionsData.length;
    // Skip PDF if next
    if (sectionsData[nextIndex].isPdf) {
      setModalIndex((nextIndex + 1) % sectionsData.length);
    } else {
      setModalIndex(nextIndex);
    }
    resetZoom();
  };

  const goToPrevImage = () => {
    if (modalIndex === null) return;
    const prevIndex = (modalIndex - 1 + sectionsData.length) % sectionsData.length;
    // Skip PDF if prev
    if (sectionsData[prevIndex].isPdf) {
      setModalIndex((prevIndex - 1 + sectionsData.length) % sectionsData.length);
    } else {
      setModalIndex(prevIndex);
    }
    resetZoom();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || zoomScale <= 1) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      zoomIn();
    } else {
      zoomOut();
    }
  };

  const activeSection = modalIndex !== null ? sectionsData[modalIndex] : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Inter'] antialiased selection:bg-indigo-600 selection:text-white relative overflow-x-hidden">
      
      {/* Background ambient lighting with depth */}
      <div className="fixed top-[-10rem] right-[-10rem] w-[45rem] h-[45rem] bg-gradient-to-tr from-indigo-300/35 via-blue-200/30 to-sky-200/25 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed top-[35%] left-[-12rem] w-[45rem] h-[45rem] bg-gradient-to-br from-violet-200/30 via-fuchsia-100/25 to-teal-100/30 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-8rem] right-[10%] w-[50rem] h-[50rem] bg-gradient-to-tl from-emerald-200/25 via-sky-200/30 to-indigo-100/35 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Floating navigation bar */}
      <header className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
        <nav className="flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-2xl border border-white/90 rounded-full shadow-xl shadow-indigo-950/[0.04]">
          <Link
            to="/proyectos"
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 py-1 px-3 rounded-full hover:bg-slate-100/80 transition-all"
          >
            <img src="/logo.png" alt="Franco Loza" className="w-5 h-5 object-contain rounded-sm" />
            <span className="material-symbols-outlined text-base text-indigo-600">arrow_back</span>
            Volver al Portfolio
          </Link>
          <span className="h-4 w-px bg-slate-200"></span>
          <a
            href="https://github.com/Franco-Loza/motorhub-concesionaria"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-sm transition-all duration-200"
            title="Ver Repositorio en GitHub"
          >
            <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>GitHub</span>
          </a>
          <a
            href="https://motorhub-concesionaria.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold rounded-full shadow-md shadow-indigo-500/25 transition-all duration-200"
          >
            <span>Ver Demo en Vivo</span>
            <span className="material-symbols-outlined text-sm">open_in_new</span>
          </a>
        </nav>
      </header>

      {/* Main Expansive Container */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-28 space-y-28 md:space-y-36">
        
        {/* HERO SECTION */}
        <section className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-200/80 text-indigo-700 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
              <span>Caso de Estudio Enterprise • SaaS Automotor & ERP</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.04]">
              MotorHub <span className="bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 bg-clip-text text-transparent">—</span> SaaS Integral para Concesionarias
            </h1>

            <p className="text-sm font-bold text-indigo-600 uppercase tracking-widest">
              Desarrollado y Diseñado por Franco Loza • Analista de Sistemas & Full Stack Developer
            </p>

            <p className="text-xl sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-4xl pt-2">
              Plataforma SaaS integral para concesionarias oficiales y agencias multirrubro (Autos, Motos, Camiones, Embarcaciones y Motorhomes). Combina un Showroom de Alta Gama orientado a la conversión con un potente ERP/CRM administrativo de control financiero, auditoría y sincronización en 1 clic con Mercado Libre.
            </p>
          </div>

          {/* Key Links Card */}
          <div className="p-8 sm:p-10 bg-gradient-to-br from-white/95 to-indigo-50/30 backdrop-blur-2xl border border-indigo-100 rounded-3xl shadow-lg shadow-indigo-950/[0.03] space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Rol</p>
                <p className="text-base font-bold text-slate-800 mt-1">Full Stack Developer</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modelo</p>
                <p className="text-base font-bold text-slate-800 mt-1">SaaS B2B • ERP</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Integraciones</p>
                <p className="text-base font-bold text-slate-800 mt-1">Mercado Libre API</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Demo</p>
                <a
                  href="https://motorhub-concesionaria.vercel.app/"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-bold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>En Vivo</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Repositorio</p>
                <a
                  href="https://github.com/Franco-Loza/motorhub-concesionaria"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-bold text-slate-800 hover:text-indigo-600 hover:underline inline-flex items-center gap-1.5 mt-1"
                >
                  <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-2 tracking-wider">Stack:</span>
              {['Next.js 16', 'React 19', 'TypeScript 5', 'Tailwind CSS 4', 'PostgreSQL (Supabase)', 'Prisma ORM', 'Mercado Libre API (VIS)', 'Cloudinary'].map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-700 shadow-2xs"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>
          </div>
        </section>

        {/* 1. VISIÓN EJECUTIVA & DIAGNÓSTICO DEL NEGOCIO */}
        <section className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">01. Diagnóstico & Visión</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Visión Ejecutiva & Diagnóstico del Negocio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* El Problema */}
            <div className="p-8 sm:p-10 bg-gradient-to-br from-white/95 to-rose-50/20 backdrop-blur-xl border border-rose-100/80 rounded-3xl shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-2xl">warning</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">El Problema en el Mercado</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                Las concesionarias y agencias multirrubro (autos, camionetas, camiones, embarcaciones y motorhomes) enfrentan graves ineficiencias operativas:
              </p>
              <ul className="space-y-3.5 text-sm text-slate-600 pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-lg leading-none">•</span>
                  <span><strong>Falta de visibilidad financiera real:</strong> Desconocimiento del margen neto exacto tras deducir gastos de taller, estética, pintura, repuestos y gestoría.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-lg leading-none">•</span>
                  <span><strong>Carga manual duplicada de stock:</strong> Horas invertidas publicando por separado en su web propia y en Mercado Libre.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-lg leading-none">•</span>
                  <span><strong>Experiencia de usuario obsoleta:</strong> Sitios lentos, sin cotización de dólar en vivo y sin herramientas de permuta o comparativa.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-rose-500 font-bold text-lg leading-none">•</span>
                  <span><strong>Pérdida de trazabilidad:</strong> Sin auditoría interna sobre modificaciones de precios, eliminaciones de stock y ventas.</span>
                </li>
              </ul>
            </div>

            {/* La Solución */}
            <div className="p-8 sm:p-10 bg-gradient-to-br from-white/95 to-emerald-50/20 backdrop-blur-xl border border-emerald-100/80 rounded-3xl shadow-md space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shadow-xs">
                <span className="material-symbols-outlined text-2xl">verified</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900">La Solución Desarrollada</h3>
              <p className="text-base text-slate-600 leading-relaxed">
                MotorHub resuelve integralmente este ecosistema unificando en una sola plataforma:
              </p>
              <ul className="space-y-3.5 text-sm text-slate-600 pt-2">
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold text-lg leading-none">•</span>
                  <span><strong>Showroom Público de Alta Conversión:</strong> Diseño Luxury, cotizador de divisas en vivo, comparador y generador de folletos A4.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold text-lg leading-none">•</span>
                  <span><strong>ERP / CRM Administrativo de Alto Rendimiento:</strong> Control de márgenes netos, punto de venta oficial, CRM de consultas y auditoría forense.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold text-lg leading-none">•</span>
                  <span><strong>Integración Oficial con Mercado Libre API (VIS):</strong> Sincronización multicanal automatizada en 1 solo clic.</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 2. ARQUITECTURA DE SOFTWARE & STACK TECNOLÓGICO */}
        <section className="space-y-8">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">02. Ingeniería de Software</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Arquitectura de Software & Justificación Técnica
            </h2>
          </div>

          <div className="bg-white/80 backdrop-blur-2xl border border-white/95 rounded-3xl overflow-hidden shadow-md">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-xs uppercase tracking-wider text-slate-500 font-bold">
                    <th className="py-4 px-6">Capa</th>
                    <th className="py-4 px-6">Tecnologías Implementadas</th>
                    <th className="py-4 px-6">Justificación Técnica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {architectureData.map((item) => (
                    <tr key={item.layer} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-4 px-6 font-bold text-slate-900 whitespace-nowrap">{item.layer}</td>
                      <td className="py-4 px-6 text-indigo-600 font-bold whitespace-nowrap">{item.technologies}</td>
                      <td className="py-4 px-6 text-slate-600 leading-relaxed">{item.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 3. DESGLOSE MÓDULO POR MÓDULO (11 SECCIONES) */}
        <section className="space-y-16">
          <div className="border-b border-slate-200 pb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">03. Módulos y Funcionalidades</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              Desglose Módulo por Módulo (11 Secciones)
            </h2>
            <p className="text-base text-slate-500 mt-1">
              Análisis funcional y resolución de retos técnicos en cada componente de la plataforma. Hacé clic en cualquier imagen para abrir el <strong>visor con zoom interactivo</strong>.
            </p>
          </div>

          <div className="space-y-16">
            {sectionsData.map((section, index) => (
              <div
                key={section.id}
                className="bg-white/80 backdrop-blur-2xl border border-white/95 rounded-3xl p-6 sm:p-12 shadow-xl shadow-indigo-950/[0.03] space-y-7 hover:border-indigo-200 transition-all duration-300 group"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-3.5 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold rounded-full uppercase tracking-wider">
                        {section.badge}
                      </span>
                      <span className="text-xs font-mono text-slate-400">Ruta: {section.route}</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 pt-1 group-hover:text-indigo-600 transition-colors">
                      {section.title}
                    </h3>
                  </div>
                  <span className="text-4xl font-black text-slate-200 group-hover:text-indigo-200 transition-colors">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
                  {section.description}
                </p>

                {/* Technical Challenge Box */}
                <div className="p-5 sm:p-6 bg-slate-900 text-white rounded-2xl space-y-1.5 shadow-md">
                  <p className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm">settings_suggest</span>
                    Reto Técnico Resuelto:
                  </p>
                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
                    {section.technicalChallenge}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {section.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Media Container: PDF or Image */}
                {section.isPdf ? (
                  <div className="space-y-4 pt-2">
                    <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-gradient-to-r from-indigo-50/80 to-blue-50/80 backdrop-blur-md rounded-2xl border border-indigo-200/80 shadow-xs">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-indigo-900">
                        <span className="material-symbols-outlined text-indigo-600 text-xl">picture_as_pdf</span>
                        <span>Documento Oficial A4 (Visualizador Interactivo de Salón)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <a
                          href={section.pdfUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-md shadow-indigo-500/20"
                        >
                          <span>Abrir en Pestaña Nueva</span>
                          <span className="material-symbols-outlined text-xs">open_in_new</span>
                        </a>
                        <a
                          href={section.pdfUrl}
                          download="Folleto-MotorHub-A4.pdf"
                          className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-2xs"
                        >
                          <span>Descargar PDF</span>
                          <span className="material-symbols-outlined text-xs">download</span>
                        </a>
                      </div>
                    </div>

                    <div className="w-full h-[660px] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-lg relative">
                      <iframe
                        src={`${section.pdfUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                        title={section.title}
                        className="w-full h-full border-0"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 pt-2">
                    {/* Top Action Bar for Image */}
                    <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-500">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm text-indigo-600">visibility</span>
                        Vista previa de módulo
                      </span>
                      <button
                        onClick={() => openModal(index)}
                        className="text-indigo-600 hover:text-indigo-800 flex items-center gap-1 hover:underline cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-sm">zoom_in</span>
                        Ampliar con Zoom Interactivo
                      </button>
                    </div>

                    {/* Image Container: Full Width & Natural Height without harsh cropping */}
                    <div
                      className="relative rounded-2xl overflow-hidden bg-slate-950 border border-slate-200/90 shadow-lg group/img cursor-pointer transition-all duration-300 hover:shadow-2xl hover:border-indigo-300"
                      onClick={() => openModal(index)}
                    >
                      <img
                        src={section.image}
                        alt={section.alt}
                        className="w-full h-auto object-contain transition-transform duration-500 group-hover/img:scale-[1.01]"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.img-fallback')) {
                            const fallbackDiv = document.createElement('div');
                            fallbackDiv.className =
                              'img-fallback p-14 flex flex-col items-center justify-center text-center text-slate-400 min-h-[320px] space-y-3';
                            fallbackDiv.innerHTML = `
                              <span class="material-symbols-outlined text-4xl text-slate-500">image</span>
                              <p class="text-base font-bold text-slate-300">${section.title}</p>
                              <p class="text-xs text-slate-500 font-mono">Guardar captura en: ${section.image}</p>
                            `;
                            parent.appendChild(fallbackDiv);
                          }
                        }}
                      />
                      <div className="absolute inset-0 bg-indigo-950/0 group-hover/img:bg-indigo-950/20 transition-all flex items-center justify-center">
                        <div className="opacity-0 group-hover/img:opacity-100 transition-all transform scale-90 group-hover/img:scale-100 bg-white/95 text-slate-900 px-5 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 shadow-2xl">
                          <span className="material-symbols-outlined text-base text-indigo-600">zoom_in</span>
                          <span>Clic para abrir visor con Zoom y Navegación</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Footer */}
        <section className="p-10 sm:p-16 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
              ¿Querés explorar MotorHub en vivo?
            </h3>
            <p className="text-slate-300 text-base max-w-lg">
              Podés navegar el showroom público y comprobar la velocidad de carga y cotizaciones en tiempo real.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://motorhub-concesionaria.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-2"
            >
              <span>Abrir Demo en Vercel</span>
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
            <a
              href="https://github.com/Franco-Loza/motorhub-concesionaria"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-2xl backdrop-blur-md border border-white/15 transition-all flex items-center gap-2.5"
            >
              <svg className="w-4 h-4 fill-currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              <span>GitHub Repo</span>
            </a>
            <Link
              to="/"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-2xl backdrop-blur-md border border-white/15 transition-all"
            >
              Volver al Inicio
            </Link>
          </div>
        </section>

      </main>

      {/* ADVANCED FULLSCREEN ZOOM & LIGHTBOX VIEWER */}
      {modalIndex !== null && activeSection && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-xl flex flex-col select-none animate-fadeIn"
          onClick={closeModal}
        >
          {/* Top Control Bar */}
          <div
            className="flex items-center justify-between px-6 py-4 bg-slate-900/80 border-b border-slate-800 text-white relative z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-indigo-600 text-white text-xs font-bold rounded-full">
                0{modalIndex + 1} / {sectionsData.length}
              </span>
              <h4 className="text-sm font-bold text-white hidden sm:block truncate max-w-md">
                {activeSection.title}
              </h4>
            </div>

            {/* Center: Zoom Controls */}
            <div className="flex items-center gap-2 bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-700 shadow-md">
              <button
                onClick={zoomOut}
                title="Alejar (-)"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-lg">zoom_out</span>
              </button>
              
              <span className="text-xs font-mono font-bold px-2 text-indigo-300">
                {Math.round(zoomScale * 100)}%
              </span>

              <button
                onClick={zoomIn}
                title="Acercar (+)"
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-slate-700 text-slate-200 hover:text-white transition-colors"
              >
                <span className="material-symbols-outlined text-lg">zoom_in</span>
              </button>

              <div className="w-px h-4 bg-slate-700 mx-1"></div>

              <button
                onClick={resetZoom}
                title="Resetear Zoom (0)"
                className="px-2.5 py-1 text-xs font-bold rounded-full hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              >
                100%
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-2">
              <a
                href={activeSection.image}
                target="_blank"
                rel="noreferrer"
                title="Abrir imagen original en nueva pestaña"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">open_in_new</span>
                <span>Original</span>
              </a>

              <button
                onClick={closeModal}
                title="Cerrar (Esc)"
                className="flex items-center gap-1 px-3.5 py-1.5 rounded-full bg-rose-600/80 hover:bg-rose-600 text-white text-xs font-bold transition-all shadow-md"
              >
                <span className="material-symbols-outlined text-base">close</span>
                <span>Cerrar</span>
              </button>
            </div>
          </div>

          {/* Main Zoomable Image Canvas */}
          <div
            ref={containerRef}
            className={`flex-1 relative overflow-hidden flex items-center justify-center p-4 sm:p-8 ${
              zoomScale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={handleWheel}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToPrevImage();
              }}
              title="Imagen Anterior (←)"
              className="absolute left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white flex items-center justify-center border border-slate-700 shadow-2xl transition-all hover:scale-110"
            >
              <span className="material-symbols-outlined text-2xl">chevron_left</span>
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goToNextImage();
              }}
              title="Siguiente Imagen (→)"
              className="absolute right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-indigo-600 text-white flex items-center justify-center border border-slate-700 shadow-2xl transition-all hover:scale-110"
            >
              <span className="material-symbols-outlined text-2xl">chevron_right</span>
            </button>

            {/* Zooming Image */}
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomScale})`,
                transition: isDragging ? 'none' : 'transform 0.15s ease-out',
              }}
              className="max-w-full max-h-full flex items-center justify-center"
            >
              <img
                src={activeSection.image}
                alt={activeSection.alt}
                draggable={false}
                className="max-w-[92vw] max-h-[78vh] object-contain rounded-xl shadow-2xl border border-slate-800 select-none"
              />
            </div>
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="px-6 py-3 bg-slate-900/80 border-t border-slate-800 text-center text-xs text-slate-400 flex items-center justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="hidden md:block">
              💡 Tip: Usá la rueda del ratón o los botones <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">+</kbd> y <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">-</kbd> para hacer zoom y arrastrá para navegar.
            </span>
            <span className="font-semibold text-slate-200 mx-auto md:mx-0">
              {activeSection.title}
            </span>
            <span className="hidden sm:block text-slate-500 font-mono">
              Navegar con flechas ← →
            </span>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="border-t border-slate-200/80 bg-white/50 backdrop-blur-md py-14 px-6 text-center text-xs text-slate-500 space-y-4">
        <p className="tracking-wider uppercase font-bold text-[11px] text-slate-400">
          © {new Date().getFullYear()} FRANCO LOZA • MOTORHUB CASO DE ESTUDIO
        </p>
      </footer>

    </div>
  );
}
