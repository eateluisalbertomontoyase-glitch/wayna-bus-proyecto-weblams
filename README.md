# 🚌 Sistema Web de Cobro Diferenciado y Pronóstico de Ingresos — Wayna Bus El Alto

**Universidad Privada "Franz Tamayo" · Facultad de Ingeniería · Carrera de Ingeniería de Sistemas**

---

## 📋 Descripción del Proyecto

Landing page interactiva del proyecto académico para el desarrollo de un **sistema web de cobro diferenciado y pronóstico de ingresos** para el servicio de transporte municipal **Wayna Bus de la ciudad de El Alto, Bolivia**.

El sistema busca centralizar el registro de cobros, administrar categorías y tarifas diferenciadas, generar reportes de recaudación y estimar ingresos futuros mediante análisis de datos históricos.

---

## 🏗️ Estructura del Proyecto

```
wayna-bus-landing/
├── index.html              # Página principal (landing page)
├── .gitignore              # Archivos ignorados por Git
├── README.md               # Este archivo
└── assets/
    ├── css/
    │   └── style.css       # Estilos principales
    ├── js/
    │   └── main.js         # Lógica e interactividad
    ├── img/                # Imágenes y recursos gráficos
    └── fonts/              # Fuentes locales (si aplica)
```

---

## 📚 Capítulos del Proyecto

### Capítulo I — Marco Introductorio
- Introducción al problema de gestión de cobros en Wayna Bus
- Planteamiento del problema y pregunta esencial
- Objetivos general y específicos

### Capítulo II — Marco Teórico
- Clasificación del sistema (transaccional + apoyo a decisiones)
- Metodologías ágiles (Scrum)
- UML — Diagramas de Casos de Uso
- Ingeniería de Requisitos
- Modelado de Datos Lógico (DER)
- Glosario técnico y Reglas de Negocio

### Capítulo III — Marco de Desarrollo
- Requisitos Funcionales (RF-01 a RF-10)
- Requisitos No Funcionales (RNF-01, RNF-02)
- Priorización MoSCoW
- Matriz de Trazabilidad (RTM)
- Diagramas de Casos de Uso (10 diagramas)
- Escenario de Éxito — CU-RF05 Registrar Cobro
- Modelado de Datos — DER Lógico (11 entidades)
- Diccionario de Datos
- Arquitectura por Capas (4 capas)
- Wireframes del sistema

---

## 🛠️ Stack Tecnológico del Sistema

| Capa | Tecnología |
|------|-----------|
| Frontend | Django Templates, Bootstrap 5, HTML5, CSS3, JavaScript |
| Backend | Python 3, Django 5, Django REST Framework |
| Autenticación | JWT / Sesión |
| Reportes | ReportLab / WeasyPrint (PDF), OpenPyXL (Excel) |
| Análisis predictivo | Pandas, NumPy, Scikit-learn (Regresión Lineal) |
| Base de Datos | PostgreSQL |

---

## 👥 Roles del Sistema

| Rol | Permisos |
|-----|---------|
| **Administrador** | Gestión de usuarios, roles, tarifas, categorías, reportes, alertas |
| **Operador** | Registro de cobros, consulta de historial, verificación de transacciones |

---

## 🗄️ Entidades del Modelo de Datos

1. `Rol` — Roles de acceso al sistema
2. `Usuario` — Usuarios del sistema
3. `CategoriaPasajero` — Tipos de pasajeros con tarifa diferenciada
4. `Tarifa` — Montos por categoría y vigencia
5. `Ruta` — Recorridos del servicio Wayna Bus
6. `Turno` — Turnos operativos
7. `Cobro` — Transacciones de cobro registradas
8. `Reporte` — Reportes de recaudación generados
9. `PronosticoIngreso` — Estimaciones de ingresos futuros
10. `AlertaIngreso` — Alertas por ingresos por debajo del umbral
11. `ExportacionReporte` — Control de exportaciones PDF/Excel

---

## 👨‍🎓 Información Académica

| Campo | Detalle |
|-------|---------|
| **Estudiante** | Luis Alberto Montoya Serrano |
| **Docente** | Ing. Canqui Llusco Javier Elvis |
| **Semestre** | 5° Semestre |
| **Materia** | Ingeniería de Sistemas |
| **Universidad** | Universidad Privada "Franz Tamayo" |
| **Ciudad** | El Alto, Bolivia |
| **Año** | 2026 |

---

## 🚀 Cómo usar esta Landing Page

1. Clonar o descargar el repositorio
2. Abrir `index.html` directamente en un navegador moderno (Chrome, Firefox, Edge)
3. No requiere servidor ni dependencias externas

---

## 📄 Licencia

Proyecto académico — Universidad Privada "Franz Tamayo" — 2026. Todos los derechos reservados.