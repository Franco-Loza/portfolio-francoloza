import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ArchitectureItem {
  layer: string;
  technologies: string;
  justification: string;
}

interface ModuleImage {
  src: string;
  label: string;
  subTitle?: string;
}

interface CaseStudySection {
  id: number;
  badge: string;
  route: string;
  title: string;
  description: string;
  technicalChallenge: string;
  images: ModuleImage[];
  tags: string[];
}

const architectureData: ArchitectureItem[] = [
  {
    layer: 'Backend Framework',
    technologies: 'Java 21 + Spring Boot 3.5',
    justification: 'Arquitectura empresarial en capas, inyección de dependencias, transaccionalidad declarativa (@Transactional) y alto rendimiento.',
  },
  {
    layer: 'Arquitectura Backend',
    technologies: 'Arquitectura en Capas + Patrón Service (Gestores) + DTOs',
    justification: 'Separación estricta de responsabilidades (Controllers, Gestores/Services, Repositories, Entities y Mappers) aplicando principios SOLID.',
  },
  {
    layer: 'Persistencia & ORM',
    technologies: 'Spring Data JPA + Hibernate 6',
    justification: 'Mapeo objeto-relacional con herencia polimórfica (Persona, MedioDePago, subtipos de habitación) y consultas derivadas optimizadas.',
  },
  {
    layer: 'Base de Datos',
    technologies: 'PostgreSQL (Cloud Neon Engine)',
    justification: 'Motor relacional con integridad referencial, restricciones de unicidad, transacciones ACID y aislamiento multi-schema.',
  },
  {
    layer: 'Testing Backend',
    technologies: 'JUnit 5 + Mockito',
    justification: 'Batería de pruebas unitarias sobre los gestores del sistema (GestorFactura, GestorReserva, GestorPago, GestorHuesped, GestorConsumo, etc.).',
  },
  {
    layer: 'Documentación API',
    technologies: 'OpenAPI 3 / SpringDoc (Swagger UI)',
    justification: 'Especificación interactiva de todos los endpoints REST con esquemas de DTOs y respuestas HTTP normalizadas.',
  },
  {
    layer: 'Frontend Framework',
    technologies: 'Next.js 16 (App Router) + React 19',
    justification: 'Renderizado híbrido (SSR + Client Components) para transiciones fluidas, gestión reactiva de estado y rutas modulares.',
  },
  {
    layer: 'Estilos & UI',
    technologies: 'CSS Modules + Responsive Design',
    justification: 'Encapsulamiento de estilos por componente, layout adaptable con scroll contenido y modales de acción/alerta reutilizables.',
  },
  {
    layer: 'Validación de Formularios',
    technologies: 'Custom Validation Engine en tiempo real',
    justification: 'Validación condicional dinámica (CUIT vs Posición IVA, formato postal, mayoría de edad +18).',
  },
  {
    layer: 'Seguridad & Excepciones',
    technologies: 'Global Exception Handler + Security Layer',
    justification: 'Manejo centralizado de errores de negocio (CuitExistente, DniExistente, UsuarioExistente) con códigos HTTP semánticos.',
  },
];

const sectionsData: CaseStudySection[] = [
  {
    id: 1,
    badge: 'Módulo 01 • Autenticación & Seguridad',
    route: '/login',
    title: 'Autenticación de Operadores & Control de Sesión',
    description:
      'Pantalla de acceso seguro para el personal de recepción y administración. Implementa validación de credenciales en tiempo real, manejo de estados de carga y retroalimentación visual ante errores de autenticación, protegiendo las rutas operativas del sistema.',
    technicalChallenge:
      'Middleware de rutas protegidas (ProtectedRoute) en Next.js sincronizado con el contexto de sesión del usuario.',
    images: [{ src: '/projects/alpine/1-login.png', label: 'Login de Operadores' }],
    tags: ['Authentication', 'Next.js Protected Routes', 'Clean UI', 'State Management'],
  },
  {
    id: 2,
    badge: 'Módulo 02 • Registro & Políticas',
    route: '/registro',
    title: 'Registro de Personal con Políticas de Seguridad de Contraseñas',
    description:
      'Formulario de alta de nuevos operadores del hotel. Valida la complejidad de la clave mediante validadores custom (PasswordConstraintValidator), verificando longitud mínima, caracteres alfanuméricos y evitando la duplicación de nombres de usuario en la base de datos.',
    technicalChallenge:
      'Validación desacoplada de contraseñas mediante anotaciones personalizadas @ValidPassword y control de excepciones UsuarioExistenteException.',
    images: [{ src: '/projects/alpine/2-registro.png', label: 'Formulario de Registro' }],
    tags: ['Form Validation', 'Password Policy', 'Custom Validators', 'User Onboarding'],
  },
  {
    id: 3,
    badge: 'Módulo 03 • Panel de Control',
    route: '/dashboard',
    title: 'Dashboard Central de Operaciones & Navegación Modular',
    description:
      'Centro de control principal que organiza la operatoria hotelera en tres grandes áreas estratégicas: Gestión de Huéspedes, Recepción y Habitaciones, y Administración Contable. Permite a los recepcionistas acceder a cualquier caso de uso en 1 solo clic.',
    technicalChallenge:
      'Arquitectura modular basada en componentes UI reutilizables con transiciones ágiles.',
    images: [{ src: '/projects/alpine/3-dashboard.png', label: 'Dashboard Central' }],
    tags: ['Dashboard UI', 'Modular Architecture', 'Component Driven', 'UX Design'],
  },
  {
    id: 4,
    badge: 'Módulo 04 • Búsqueda de Huéspedes',
    route: '/huesped/buscar',
    title: 'Motor de Búsqueda de Huéspedes con Filtrado Multicriterio',
    description:
      'Motor de consulta ágil que permite localizar pasajeros combinando múltiples variables (Apellido, Nombres, Tipo de Documento y Número). Despliega los resultados en una grilla interactiva que permite consultar historial, modificar datos o derivar al alta rápida.',
    technicalChallenge:
      'Consultas dinámicas en Spring Data JPA insensibles a mayúsculas/minúsculas y optimizadas con DTOs ligeros.',
    images: [{ src: '/projects/alpine/4-buscar.png', label: 'Búsqueda Multicriterio' }],
    tags: ['Search Engine', 'JPA Specifications', 'Data Grid', 'DTO Pattern'],
  },
  {
    id: 5,
    badge: 'Módulo 05 • Alta & Validación Fiscal',
    route: '/huesped/darAlta',
    title: 'Formulario de Alta de Huéspedes con Reglas Fiscales en Tiempo Real',
    description:
      'Formulario de registro con validaciones en tiempo real: verificación estricta de mayoría de edad (+18 años), validación cruzada de obligatoriedad de CUIT según la Posición frente al IVA seleccionada, formato de código postal y normalización completa de domicilios.',
    technicalChallenge:
      'Motor de validación reactivo en el cliente con sincronización de excepciones del servidor (DniExistenteException, CuitExistenteException).',
    images: [{ src: '/projects/alpine/5-darAltaHuesped.png', label: 'Alta de Huésped' }],
    tags: ['Real-Time Validation', 'Fiscal Rules Engine', 'Custom Modals', 'Form Logic'],
  },
  {
    id: 6,
    badge: 'Módulo 06 • Responsables de Pago',
    route: '/nuevo-responsable',
    title: 'Registro de Personas Jurídicas y Terceros Responsables de Pago',
    description:
      'Módulo B2B para dar de alta empresas, agencias o entidades corporativas que asumen los costos de estadías y consumos. Almacena Razón Social, CUIT fiscal, teléfono y domicilio legal para la emisión directa de comprobantes corporativos (Factura A).',
    technicalChallenge:
      'Modelado de herencia polimórfica en JPA para desacoplar a los ocupantes físicos de la entidad ResponsableDePago.',
    images: [{ src: '/projects/alpine/6-darAltaResponsable.png', label: 'Alta de Persona Jurídica / Empresa' }],
    tags: ['JPA Polymorphism', 'B2B Invoicing', 'Corporate Billing', 'Entity Modeling'],
  },
  {
    id: 7,
    badge: 'Módulo 07 • Auditoría & Baja',
    route: '/huesped/darBaja',
    title: 'Módulo de Baja Controlada con Validación de Integridad Operativa',
    description:
      'Flujo de auditoría y desvinculación de registros. Permite localizar al huésped y solicita confirmación explícita mediante un modal de seguridad (ActionModal), validando preventivamente que el pasajero no tenga reservas activas o deudas pendientes.',
    technicalChallenge:
      'Verificación de integridad referencial previa en GestorHuesped para proteger el historial contable.',
    images: [
      { src: '/projects/alpine/7-darBaja.png', label: 'Paso 1: Localización y Ficha de Huésped' },
      { src: '/projects/alpine/7.1-darBaja.png', label: 'Paso 2: Modal de Confirmación y Advertencia' },
    ],
    tags: ['Data Integrity', 'Defensive Design', 'Action Modals', 'Audit Trail'],
  },
  {
    id: 8,
    badge: 'Módulo 08 • Motor de Reservas',
    route: '/reserva/nueva',
    title: 'Motor de Reservas con Matriz Interactiva de Calendario',
    description:
      'Asistente paso a paso (Wizard) para crear reservas. El operador define el rango de fechas y el sistema genera una grilla interactiva con todas las habitaciones del hotel, permitiendo seleccionar celdas disponibles (resaltadas en verde/azul), asignar el titular y persistir la reserva.',
    technicalChallenge:
      'Algoritmo en backend para cálculo de solapamiento de fechas y control de concurrencia para evitar overbooking.',
    images: [
      { src: '/projects/alpine/8-reserva.png', label: 'Paso 1: Selector de Rango de Fechas' },
      { src: '/projects/alpine/8.1-reserva.png', label: 'Paso 2: Matriz Interactiva de Celdas' },
    ],
    tags: ['Booking Wizard', 'Availability Matrix', 'Interactive Grid', 'Concurrency Control'],
  },
  {
    id: 9,
    badge: 'Módulo 09 • Check-in Inmediato',
    route: '/reserva/ocupar',
    title: 'Check-in Inmediato y Registro Multihuésped de Pasajeros',
    description:
      'Flujo de ingreso directo para pasajeros sin reserva previa. Tras seleccionar la habitación y fecha de salida, permite cargar dinámicamente a todos los ocupantes con validación de capacidad máxima, creando una Estadia activa vinculada al folio de la habitación.',
    technicalChallenge:
      'Manejo de estado dinámico complejo en React para validar en tiempo real que la cantidad de ocupantes no exceda la capacidad del tipo de habitación.',
    images: [
      { src: '/projects/alpine/9-ocupar.png', label: 'Paso 1: Fechas y Selección de Habitación' },
      { src: '/projects/alpine/9.1-ocupar.png', label: 'Paso 2: Carga Dinámica de Ocupantes (+DNI)' },
    ],
    tags: ['Check-in Engine', 'Multi-Occupant Management', 'Dynamic Forms', 'Stay Lifecycle'],
  },
  {
    id: 10,
    badge: 'Módulo 10 • Situación Operativa',
    route: '/reserva/mostrar',
    title: 'Mapa Visual de Estado de Habitaciones & Cancelación',
    description:
      'Tablero visual que representa en tiempo real la situación operativa del hotel mediante una matriz codificada por símbolos y colores: (+) Disponible, (R) Reservada, (O) Ocupada, (M) Mantenimiento y (L) Limpieza. Permite además seleccionar reservas activas para su cancelación o liberación inmediata.',
    technicalChallenge:
      'Sincronización de estados entre las entidades Habitacion, Reserva y Estadia con actualización visual optimizada.',
    images: [{ src: '/projects/alpine/10-mostrarHabitaciones.png', label: 'Mapa Codificado de Habitaciones' }],
    tags: ['Room Status Map', 'Color-Coded Dashboard', 'Visual Management', 'Booking Cancellation'],
  },
  {
    id: 11,
    badge: 'Módulo 11 • Frigobar & Servicios',
    route: '/consumos/cargar',
    title: 'Módulo de Imputación de Consumos y Servicios al Folio de Habitación',
    description:
      'Permite al personal del hotel cargar consumos adicionales (frigobar, cafetería, lavandería, room service) directamente a una habitación con estadía activa. Los consumos se totalizan automáticamente para ser liquidados al momento del Check-out.',
    technicalChallenge:
      'Relación @ManyToOne entre Consumo y Estadia con validación de estado para impedir consumos en habitaciones ya desocupadas.',
    images: [{ src: '/projects/alpine/11-cargar.png', label: 'Imputación de Consumos' }],
    tags: ['Room Service Billing', 'Itemized Folio', 'JPA Relations', 'POS Operations'],
  },
  {
    id: 12,
    badge: 'Módulo 12 • Facturación Fiscal',
    route: '/facturacion',
    title: 'Motor de Facturación Fiscal y Liquidación de Check-out',
    description:
      'Proceso integral de cierre de estadía y emisión de comprobantes. Consolida las noches de alojamiento con el desglose de consumos de bar, permite designar al responsable fiscal y emite automáticamente la Factura (A o B) discriminando el IVA correspondiente con estado PENDIENTE_PAGO.',
    technicalChallenge:
      'Motor de cálculo contable de alta precisión en GestorFactura con discriminación impositiva según la personería jurídica del pagador.',
    images: [
      { src: '/projects/alpine/12-facturacion.png', label: 'Paso 1: Selección de Habitación a Liquidar' },
      { src: '/projects/alpine/12.1-facturacion.png', label: 'Paso 2: Grilla de Consumos y Noches' },
      { src: '/projects/alpine/12.2-facturacion.png', label: 'Paso 3: Comprobante Formal Emitido' },
    ],
    tags: ['Invoicing Engine', 'Check-out Settlement', 'Tax Calculation', 'Financial Accounting'],
  },
  {
    id: 13,
    badge: 'Módulo 13 • Notas de Crédito',
    route: '/facturacion/nota-credito',
    title: 'Módulo de Emisión de Notas de Crédito & Rectificación Contable',
    description:
      'Herramienta contable para la anulación o rectificación de facturas emitidas por error. Valida el estado del comprobante original, emite la Nota de Crédito vinculada con numeración oficial y actualiza el balance de la cuenta para mantener la consistencia fiscal.',
    technicalChallenge:
      'Transaccionalidad atómica (@Transactional) en Spring Boot para garantizar que la anulación de la factura y la creación de la nota de crédito se ejecuten en un único bloque seguro.',
    images: [
      { src: '/projects/alpine/13-notaCredito.png', label: 'Paso 1: Búsqueda de Factura a Anular' },
      { src: '/projects/alpine/13.1-notaCredito.png', label: 'Paso 2: Detalle de Rectificación y Motivo' },
      { src: '/projects/alpine/13.2-notaCredito.png', label: 'Paso 3: Nota de Crédito Formal Generada' },
    ],
    tags: ['Credit Notes', 'Accounting Rectification', 'Atomic Transactions', 'Audit Compliance'],
  },
  {
    id: 14,
    badge: 'Módulo 14 • Cobranzas & Caja',
    route: '/pagos',
    title: 'Centro de Cobranzas Multimedio & Conciliación de Caja',
    description:
      'Punto de venta y gestión de cobranzas que liquida facturas pendientes mediante múltiples medios de pago: Efectivo (con cálculo automático de vuelto), Tarjeta de Débito/Crédito (con selección de red y autorización) o Cheque (con registro de banco, plaza y vencimiento), cambiando el estado de la factura a PAGADA.',
    technicalChallenge:
      'Modelo polimórfico en JPA (MedioDePago -> Efectivo, Debito, Credito, Cheque) gestionado de forma desacoplada en GestorPago.',
    images: [
      { src: '/projects/alpine/14-pago.png', label: 'Paso 1: Facturas Pendientes de Cobro' },
      { src: '/projects/alpine/14.1-pago.png', label: 'Paso 2: Formulario de Imputación de Pago' },
      { src: '/projects/alpine/14.2-pago.png', label: 'Paso 3: Recibo de Cobro Liquidado' },
    ],
    tags: ['POS Cash Register', 'Polymorphic Payments', 'Financial Settlement', 'Multi-Payment Methods'],
  },
];

export default function AlpineCaseStudy() {
  const [selectedImageIndexMap, setSelectedImageIndexMap] = useState<{ [key: number]: number }>({});
  const [modalData, setModalData] = useState<{ sectionId: number; imageIndex: number } | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const openModal = (sectionId: number, imageIndex: number) => {
    setModalData({ sectionId, imageIndex });
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const closeModal = () => {
    setModalData(null);
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleZoomIn = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomLevel((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanOffset({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanOffset({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!modalData) return;
      if (e.key === 'Escape') closeModal();
      if (e.key === '+' || e.key === '=') handleZoomIn();
      if (e.key === '-') handleZoomOut();
      if (e.key === '0') handleResetZoom();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalData, zoomLevel]);

  const activeSection = modalData ? sectionsData.find((s) => s.id === modalData.sectionId) : null;
  const activeImage = activeSection && modalData ? activeSection.images[modalData.imageIndex] : null;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-800 font-['Inter'] antialiased selection:bg-blue-600 selection:text-white">
      
      {/* Background ambient lighting with depth */}
      <div className="fixed top-[-10rem] right-[-10rem] w-[45rem] h-[45rem] bg-gradient-to-tr from-blue-300/35 via-cyan-200/30 to-sky-200/25 rounded-full blur-[150px] pointer-events-none -z-10"></div>
      <div className="fixed top-[35%] left-[-12rem] w-[45rem] h-[45rem] bg-gradient-to-br from-indigo-200/30 via-sky-100/25 to-teal-100/30 rounded-full blur-[160px] pointer-events-none -z-10"></div>
      <div className="fixed bottom-[-8rem] right-[10%] w-[50rem] h-[50rem] bg-gradient-to-tl from-emerald-200/25 via-blue-200/30 to-indigo-100/35 rounded-full blur-[160px] pointer-events-none -z-10"></div>

      {/* Floating navigation bar */}
      <header className="fixed top-6 left-0 right-0 z-40 flex justify-center px-4">
        <nav className="flex items-center gap-2.5 px-4 py-2 bg-white/80 backdrop-blur-2xl border border-white/90 rounded-full shadow-xl shadow-blue-950/[0.04]">
          <Link
            to="/proyectos"
            className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-slate-900 py-1 px-3 rounded-full hover:bg-slate-100/80 transition-all"
          >
            <img src="/logo.png" alt="Franco Loza" className="w-5 h-5 object-contain rounded-sm" />
            <span className="material-symbols-outlined text-base text-blue-600">arrow_back</span>
            Volver al Portfolio
          </Link>
          <span className="h-4 w-px bg-slate-200"></span>
          <a
            href="https://github.com/FranciscoSoltermann/Gestion-hotelera-Alpine"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-full shadow-sm transition-all duration-200"
            title="Backend Repo en Java / Spring Boot"
          >
            <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Backend</span>
          </a>
          <a
            href="https://github.com/FranciscoSoltermann/FrontEnd-Alpine"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold rounded-full shadow-2xs transition-all duration-200 border border-slate-200/80"
            title="Frontend Repo en Next.js / React"
          >
            <svg className="w-3.5 h-3.5 fill-currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            <span>Frontend</span>
          </a>
        </nav>
      </header>

      {/* Main Expansive Container */}
      <main className="max-w-6xl mx-auto px-6 md:px-12 pt-36 pb-28 space-y-28 md:space-y-36">
        
        {/* HERO SECTION */}
        <section className="space-y-8">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200/80 text-blue-700 text-xs font-bold uppercase tracking-wider shadow-xs">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
              <span>Caso de Estudio Académico • PMS Hotelero & Facturación Fiscal</span>
            </div>
            
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black text-slate-900 tracking-tight leading-[1.04]">
              ALPINE <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">—</span> Sistema Integral de Gestión Hotelera
            </h1>

            <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">
              Desarrollado y Diseñado en Equipo Académico • Franco Loza & Colaboradores | Full Stack Developer
            </p>

            <p className="text-xl sm:text-2xl text-slate-600 font-normal leading-relaxed max-w-4xl pt-2">
              Plataforma PMS (Property Management System) integral de gestión hotelera, recepción y facturación fiscal multimoneda. Diseñada para automatizar el ciclo de vida completo de huéspedes, asignación inteligente de habitaciones, liquidación de consumos y emisión formal de comprobantes fiscales.
            </p>
          </div>

          {/* Key Links Card */}
          <div className="p-8 sm:p-10 bg-gradient-to-br from-white/95 to-blue-50/30 backdrop-blur-2xl border border-blue-100 rounded-3xl shadow-lg shadow-blue-950/[0.03] space-y-8">
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-6">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Tipo</p>
                <p className="text-base font-bold text-slate-800 mt-1">Proyecto Académico</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Modelo</p>
                <p className="text-base font-bold text-slate-800 mt-1">PMS Hotelero</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Backend</p>
                <a
                  href="https://github.com/FranciscoSoltermann/Gestion-hotelera-Alpine"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-bold text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>Java / Spring</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Frontend</p>
                <a
                  href="https://github.com/FranciscoSoltermann/FrontEnd-Alpine"
                  target="_blank"
                  rel="noreferrer"
                  className="text-base font-bold text-indigo-600 hover:text-indigo-800 hover:underline inline-flex items-center gap-1 mt-1"
                >
                  <span>Next.js / React</span>
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Base de Datos</p>
                <p className="text-base font-bold text-slate-800 mt-1">PostgreSQL (Neon)</p>
              </div>
            </div>

            <div className="pt-5 border-t border-slate-100 flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase mr-2 tracking-wider">Stack:</span>
              {['Java 21', 'Spring Boot 3.5', 'Spring Data JPA', 'PostgreSQL (Neon)', 'Hibernate 6', 'JUnit 5 & Mockito', 'OpenAPI / Swagger', 'Next.js 16', 'React 19'].map(
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

        {/* SECTION 1: BUSINESS DIAGNOSIS */}
        <section className="space-y-12">
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Diagnóstico Estratégico</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              1. Visión Ejecutiva & Diagnóstico del Negocio
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* The Problem */}
            <div className="p-8 sm:p-10 bg-white/70 backdrop-blur-2xl rounded-3xl border border-red-100 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-red-50 text-red-600 rounded-2xl">
                  <span className="material-symbols-outlined text-2xl">warning</span>
                </span>
                <h3 className="text-xl font-bold text-slate-900">El Problema</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-500 text-base mt-0.5">close</span>
                  <span><strong>Desfase en disponibilidad:</strong> Conflictos de sobreventa (overbooking), falta de visibilidad del estado de limpieza y demoras en Check-in inmediatos versus reservas anticipadas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-500 text-base mt-0.5">close</span>
                  <span><strong>Carga manual propensa a errores:</strong> Dificultad para registrar ocupantes adicionales, validar consistencia fiscal (DNI vs. CUIT e IVA) y auditar bajas con reservas activas.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-500 text-base mt-0.5">close</span>
                  <span><strong>Facturación rígida y desvinculada:</strong> Dificultad para liquidar estadías combinando consumos de bar/frigobar, discriminación de IVA (Facturas A y B) y cobros multimedio.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-red-500 text-base mt-0.5">close</span>
                  <span><strong>Pérdida de trazabilidad en caja:</strong> Descontrol en facturas pendientes, cheques diferidos y falta de anulación formal mediante Notas de Crédito.</span>
                </li>
              </ul>
            </div>

            {/* The Solution */}
            <div className="p-8 sm:p-10 bg-white/70 backdrop-blur-2xl rounded-3xl border border-emerald-100 shadow-md space-y-6">
              <div className="flex items-center gap-3">
                <span className="p-2.5 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <span className="material-symbols-outlined text-2xl">check_circle</span>
                </span>
                <h3 className="text-xl font-bold text-slate-900">La Solución Desarrollada</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check</span>
                  <span><strong>Recepción & Motor Visual:</strong> Matriz interactiva de calendario para asignación de habitaciones y estados en vivo (Disponible, Ocupada, Reservada, Mantenimiento, Limpieza).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check</span>
                  <span><strong>Gestión Desacoplada de Huéspedes:</strong> Módulo para Personas Físicas y Jurídicas con validación estricta de normativas fiscales (+18 años, CUIT obligatorio).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check</span>
                  <span><strong>Facturación Fiscal & Consumos:</strong> Emisión automática de comprobantes A/B, folios de bar y liquidación multimedio (Efectivo, Débito, Crédito, Cheque).</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="material-symbols-outlined text-emerald-600 text-base mt-0.5">check</span>
                  <span><strong>Arquitectura Empresarial en Java 21:</strong> Backend modular con Spring Boot 3.5, principios SOLID, Gestores/Services, DTOs y frontend reactivo en Next.js.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 2: ARCHITECTURE TABLE */}
        <section className="space-y-12">
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Fundamentos Técnicos</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              2. Arquitectura de Software & Stack Tecnológico
            </h2>
          </div>

          <div className="overflow-x-auto bg-white/70 backdrop-blur-2xl border border-white/95 rounded-3xl shadow-lg">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/50">
                  <th className="py-5 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">Capa</th>
                  <th className="py-5 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">Tecnologías Implementadas</th>
                  <th className="py-5 px-6 font-bold text-slate-900 uppercase text-xs tracking-wider">Justificación Técnica</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {architectureData.map((item, i) => (
                  <tr key={i} className="hover:bg-blue-50/30 transition-colors">
                    <td className="py-4 px-6 font-bold text-slate-800 whitespace-nowrap">{item.layer}</td>
                    <td className="py-4 px-6 font-semibold text-blue-700">{item.technologies}</td>
                    <td className="py-4 px-6 text-slate-600 leading-relaxed">{item.justification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 3: 14 MODULES DETAILED SHOWCASE */}
        <section className="space-y-16">
          <div className="border-b border-slate-200/80 pb-6">
            <span className="text-xs font-bold uppercase tracking-widest text-blue-600">Casos de Uso & Pantallas</span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-1">
              3. Desglose Módulo por Módulo (14 Módulos)
            </h2>
          </div>

          <div className="space-y-24">
            {sectionsData.map((section) => {
              const currentImgIdx = selectedImageIndexMap[section.id] || 0;
              const currentImg = section.images[currentImgIdx] || section.images[0];

              return (
                <div
                  key={section.id}
                  className="p-8 sm:p-12 bg-gradient-to-br from-white/90 via-white/85 to-blue-50/30 backdrop-blur-2xl border border-white/90 rounded-3xl shadow-xl shadow-blue-950/[0.03] space-y-8"
                >
                  {/* Module Header */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="px-3.5 py-1.5 bg-blue-50 border border-blue-200/80 text-blue-700 text-xs font-black rounded-full uppercase tracking-wider">
                          {section.badge}
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                          {section.route}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                      {section.title}
                    </h3>

                    <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                      {section.description}
                    </p>
                  </div>

                  {/* Technical Challenge Alert */}
                  <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-2xl text-xs sm:text-sm text-blue-950 flex items-start gap-3">
                    <span className="material-symbols-outlined text-blue-600 text-lg mt-0.5">psychology</span>
                    <div>
                      <strong className="font-bold">Reto técnico resuelto: </strong>
                      <span>{section.technicalChallenge}</span>
                    </div>
                  </div>

                  {/* Multi-Image Tab Selector if module has more than 1 image */}
                  {section.images.length > 1 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs font-bold text-slate-400 uppercase mr-2 tracking-wider">Vistas del Flujo:</span>
                      {section.images.map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setSelectedImageIndexMap((prev) => ({ ...prev, [section.id]: idx }))}
                          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                            currentImgIdx === idx
                              ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                              : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
                          }`}
                        >
                          <span>{img.label}</span>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Image Display Card with Zoom trigger */}
                  <div className="space-y-3">
                    <div
                      className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-950/5 shadow-md cursor-pointer hover:border-blue-400 transition-all duration-300"
                      onClick={() => openModal(section.id, currentImgIdx)}
                    >
                      <img
                        src={currentImg.src}
                        alt={currentImg.label}
                        className="w-full h-auto object-contain max-h-[550px] mx-auto group-hover:scale-[1.01] transition-transform duration-300"
                        onError={(e) => {
                          // Fallback placeholder if image not yet copied
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent && !parent.querySelector('.placeholder-fallback')) {
                            const div = document.createElement('div');
                            div.className = 'placeholder-fallback p-12 text-center text-slate-400 space-y-2';
                            div.innerHTML = `<span class="material-symbols-outlined text-4xl text-blue-500">image</span><p class="text-sm font-bold text-slate-700">${currentImg.label}</p><p class="text-xs text-slate-400">Ubicación requerida: ${currentImg.src}</p>`;
                            parent.appendChild(div);
                          }
                        }}
                      />
                      
                      {/* Zoom hint overlay */}
                      <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <div className="px-5 py-2.5 bg-white/95 text-slate-900 text-xs font-bold rounded-full shadow-lg flex items-center gap-2">
                          <span className="material-symbols-outlined text-base text-blue-600">zoom_in</span>
                          <span>Clic para abrir visor con Zoom y Navegación</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-500 px-1">
                      <span className="font-semibold text-slate-700">{currentImg.label}</span>
                      <span className="font-mono text-slate-400">{currentImg.src}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-2">
                    {section.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Call to Action Footer */}
        <section className="p-10 sm:p-16 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-3xl sm:text-4xl font-bold tracking-tight">
              ¿Querés explorar el código de ALPINE?
            </h3>
            <p className="text-slate-300 text-base max-w-lg">
              Podés revisar el repositorio del Backend en Spring Boot y el Frontend en Next.js en GitHub.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/FranciscoSoltermann/Gestion-hotelera-Alpine"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-bold rounded-2xl shadow-lg shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              <span>Backend en GitHub</span>
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
            <a
              href="https://github.com/FranciscoSoltermann/FrontEnd-Alpine"
              target="_blank"
              rel="noreferrer"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-2xl backdrop-blur-md border border-white/15 transition-all flex items-center gap-2.5"
            >
              <span>Frontend en GitHub</span>
              <span className="material-symbols-outlined text-base">open_in_new</span>
            </a>
            <Link
              to="/proyectos"
              className="px-7 py-4 bg-white/10 hover:bg-white/20 text-white text-sm font-bold rounded-2xl backdrop-blur-md border border-white/15 transition-all"
            >
              Volver a Proyectos
            </Link>
          </div>
        </section>

      </main>

      {/* ADVANCED FULLSCREEN ZOOM & LIGHTBOX VIEWER */}
      {modalData && activeSection && activeImage && (
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
              <span className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                {activeSection.badge}
              </span>
              <span className="font-bold text-sm text-slate-200 hidden sm:inline">
                {activeImage.label}
              </span>
            </div>

            {/* Zoom Controls & Close */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleZoomOut}
                disabled={zoomLevel <= 1}
                className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white transition-all"
                title="Alejar (-)"
              >
                <span className="material-symbols-outlined text-base">zoom_out</span>
              </button>

              <span className="text-xs font-mono font-bold px-2 text-slate-300">
                {Math.round(zoomLevel * 100)}%
              </span>

              <button
                type="button"
                onClick={handleZoomIn}
                disabled={zoomLevel >= 4}
                className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 rounded-lg text-white transition-all"
                title="Acercar (+)"
              >
                <span className="material-symbols-outlined text-base">zoom_in</span>
              </button>

              <button
                type="button"
                onClick={handleResetZoom}
                className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-all text-xs font-bold"
                title="Reiniciar (0)"
              >
                100%
              </button>

              <span className="h-4 w-px bg-slate-700 mx-1"></span>

              <button
                type="button"
                onClick={closeModal}
                className="p-2 bg-red-600 hover:bg-red-700 rounded-lg text-white transition-all"
                title="Cerrar (Esc)"
              >
                <span className="material-symbols-outlined text-base">close</span>
              </button>
            </div>
          </div>

          {/* Center Image Canvas with Pan & Zoom */}
          <div
            className={`flex-1 overflow-hidden relative flex items-center justify-center ${
              zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onWheel={(e) => {
              if (e.deltaY < 0) handleZoomIn();
              else handleZoomOut();
            }}
          >
            <img
              src={activeImage.src}
              alt={activeImage.label}
              className="max-h-[85vh] max-w-[90vw] object-contain transition-transform duration-100 ease-out select-none shadow-2xl rounded-lg"
              style={{
                transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
              }}
              draggable={false}
            />
          </div>

          {/* Bottom Info Bar */}
          <div
            className="py-3 px-6 bg-slate-900/80 border-t border-slate-800 text-center text-xs text-slate-400"
            onClick={(e) => e.stopPropagation()}
          >
            <span>Usa la rueda del mouse o los botones para hacer zoom • Arrastra con el mouse cuando tengas zoom aplicado</span>
          </div>
        </div>
      )}

    </div>
  );
}
