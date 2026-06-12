document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");

  if (hamburger && mainNav) {
    hamburger.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
    const subItems = document.querySelectorAll(".nav-item.has-sub");

    subItems.forEach(item => {
    const link = item.querySelector(".nav-link");

    link.addEventListener("click", (e) => {
    if (window.innerWidth <= 860) {
      e.preventDefault();

      subItems.forEach(other => {
        if (other !== item) other.classList.remove("open");
      });

      item.classList.toggle("open");
    }
  });
});

    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth <= 860) {
          mainNav.classList.remove("open");
        }
      });
    });
  }
  

  const onScroll = () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (progressBar) progressBar.style.width = `${scrolled}%`;

    if (navbar) {
      navbar.classList.toggle("scrolled", scrollTop > 20);
    }

    updateChapterTabs();
  };

  window.addEventListener("scroll", onScroll);
  onScroll();

  const revealItems = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.15 });

  revealItems.forEach(item => revealObserver.observe(item));

  const statNumbers = document.querySelectorAll(".stat-num");
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target || "0", 10);
      let current = 0;
      const step = Math.max(1, Math.ceil(target / 30));

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = current;
      }, 35);

      statsObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(num => statsObserver.observe(num));

  function updateChapterTabs() {
    const sections = [
      { id: "cap1", tab: document.querySelector('.chapter-tabs a[href="#cap1"]') },
      { id: "cap2", tab: document.querySelector('.chapter-tabs a[href="#cap2"]') },
      { id: "cap3", tab: document.querySelector('.chapter-tabs a[href="#cap3"]') }
    ];

    let current = sections[0];
    sections.forEach(section => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 180) {
        current = section;
      }
    });

    sections.forEach(section => section.tab?.classList.remove("active"));
    current.tab?.classList.add("active");
  }

  const reqTabButtons = document.querySelectorAll(".req-tab-btn");
  const reqTabContents = document.querySelectorAll(".req-tab-content");

  reqTabButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const tab = btn.dataset.tab;
      reqTabButtons.forEach(b => b.classList.remove("active"));
      reqTabContents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(`tab-${tab}`)?.classList.add("active");
    });
  });

  const glossarySearch = document.getElementById("glossarySearch");
  const glossaryItems = document.querySelectorAll(".gloss-item");

  if (glossarySearch) {
    glossarySearch.addEventListener("input", e => {
      const term = e.target.value.toLowerCase().trim();

      glossaryItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        item.classList.toggle("hidden", !text.includes(term));
      });
    });
  }

  const rtmButtons = document.querySelectorAll(".rtm-btn");
  const rtmRows = document.querySelectorAll(".rtm-row");

  rtmButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const oe = btn.dataset.oe;

      rtmButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      rtmRows.forEach(row => {
        row.classList.toggle("hidden", !(oe === "all" || row.dataset.oe === oe));
      });
    });
  });

  const derData = {
    Rol: {
      descripcion: "Define los permisos y el nivel de acceso dentro del sistema.",
      atributos: ["idrol (PK)", "nombre", "descripcion", "estado"],
      relaciones: ["1 Rol puede estar asociado a muchos Usuario"]
    },
    Usuario: {
      descripcion: "Representa a los usuarios autenticados del sistema.",
      atributos: ["idusuario (PK)", "nombre", "apellido", "usuario", "password", "estado", "idrol (FK)"],
      relaciones: ["Muchos Usuario pertenecen a 1 Rol", "1 Usuario registra muchos Cobro"]
    },
    CategoriaPasajero: {
      descripcion: "Gestiona los tipos de pasajeros que poseen tarifas diferenciadas.",
      atributos: ["idcategoria (PK)", "nombre", "descripcion", "estado"],
      relaciones: ["1 CategoriaPasajero puede tener muchas Tarifa", "1 CategoriaPasajero puede aparecer en muchos Cobro"]
    },
    Tarifa: {
      descripcion: "Almacena los valores tarifarios vigentes por categoría.",
      atributos: ["idtarifa (PK)", "monto", "vigencia_inicio", "vigencia_fin", "estado", "idcategoria (FK)"],
      relaciones: ["Muchas Tarifa pertenecen a 1 CategoriaPasajero", "1 Tarifa puede ser usada en muchos Cobro"]
    },
    Ruta: {
      descripcion: "Recorrido del servicio Wayna Bus.",
      atributos: ["idruta (PK)", "nombre", "descripcion", "estado"],
      relaciones: ["1 Ruta se relaciona con muchos Cobro y Reporte"]
    },
    Turno: {
      descripcion: "Periodo operativo del servicio.",
      atributos: ["idturno (PK)", "nombre", "hora_inicio", "hora_fin", "estado"],
      relaciones: ["1 Turno se relaciona con muchos Cobro y Reporte"]
    },
    Cobro: {
      descripcion: "Registro transaccional principal del sistema.",
      atributos: ["idcobro (PK)", "fecha", "monto", "idruta (FK)", "idturno (FK)", "idtarifa (FK)", "idcategoria (FK)", "idusuario (FK)"],
      relaciones: ["Pertenece a Ruta, Turno, Tarifa, CategoriaPasajero y Usuario", "Sirve como base para Reporte y PronosticoIngreso"]
    },
    Reporte: {
      descripcion: "Consolidación de cobros por periodo.",
      atributos: ["idreporte (PK)", "tipo_periodo", "fecha_inicio", "fecha_fin", "total", "idruta (FK)", "idturno (FK)"],
      relaciones: ["Se genera a partir de Cobro", "Puede relacionarse con ExportacionReporte y AlertaIngreso"]
    },
    PronosticoIngreso: {
      descripcion: "Predicción basada en datos históricos.",
      atributos: ["idpronostico (PK)", "periodo", "valor_proyectado", "modelo", "fecha_generacion"],
      relaciones: ["Se alimenta de datos históricos de Cobro"]
    },
    AlertaIngreso: {
      descripcion: "Notificación cuando la recaudación está por debajo del umbral esperado.",
      atributos: ["idalerta (PK)", "tipo", "mensaje", "umbral", "estado", "idreporte (FK)"],
      relaciones: ["Muchas AlertaIngreso pueden depender de 1 Reporte"]
    },
    ExportacionReporte: {
      descripcion: "Historial de archivos exportados desde reportes.",
      atributos: ["idexportacion (PK)", "formato", "fecha_exportacion", "ruta_archivo", "idreporte (FK)"],
      relaciones: ["Muchas ExportacionReporte pertenecen a 1 Reporte"]
    }
  };

  const derButtons = document.querySelectorAll(".der-btn");
  const derPanel = document.getElementById("derPanel");

  function renderEntity(entityName) {
    if (!derPanel || !derData[entityName]) return;
    const entity = derData[entityName];

    derPanel.innerHTML = `
      <h4>${entityName}</h4>
      <p>${entity.descripcion}</p>
      <p><strong>Atributos:</strong></p>
      <ul>
        ${entity.atributos.map(attr => `<li>${attr}</li>`).join("")}
      </ul>
      <p style="margin-top:14px;"><strong>Relaciones:</strong></p>
      <ul>
        ${entity.relaciones.map(rel => `<li>${rel}</li>`).join("")}
      </ul>
    `;
  }

  if (derButtons.length && derPanel) {
    derButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        derButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderEntity(btn.dataset.entity);
      });
    });

    renderEntity("Rol");
  }

  const ucButtons = document.querySelectorAll(".uc-btn");
  const ucPanels = document.querySelectorAll(".uc-panel");

  ucButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.uc;
      ucButtons.forEach(b => b.classList.remove("active"));
      ucPanels.forEach(panel => panel.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });

  const wfButtons = document.querySelectorAll(".wf-btn");
  const wfPanels = document.querySelectorAll(".wf-panel");

  wfButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.wf;
      wfButtons.forEach(b => b.classList.remove("active"));
      wfPanels.forEach(panel => panel.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(target)?.classList.add("active");
    });
  });
});