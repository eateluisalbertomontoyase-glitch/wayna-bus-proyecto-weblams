document.addEventListener("DOMContentLoaded", () => {
  const navbar = document.getElementById("navbar");
  const progressBar = document.getElementById("progressBar");
  const hamburger = document.getElementById("hamburger");
  const mainNav = document.getElementById("mainNav");

  initAppNavigation();

  function initAppNavigation() {
    const body = document.body;
    const isModulePage = window.location.pathname.includes("/modulos/") || window.location.pathname.includes("\\modulos\\");
    const isSystemPage = body.classList.contains("sys-page");
    const isDocPage = body.classList.contains("doc-page") || window.location.pathname.endsWith("documentacion.html");
    const isHomePage = body.classList.contains("home-page") || (!isSystemPage && !isDocPage);
    const homeHref = isModulePage ? "../index.html" : "#hero";
    const systemHref = isModulePage ? "sistema.html" : "modulos/sistema.html";
    const docHref = isModulePage ? "documentacion.html" : "modulos/documentacion.html";

    body.classList.add("with-app-sidebar");

    if (!document.querySelector(".app-sidebar")) {
      document.body.insertAdjacentHTML("afterbegin", `
        <aside class="app-sidebar" id="appSidebar" aria-label="Navegacion principal">
          <button class="app-sidebar__toggle" id="sidebarToggle" type="button" aria-label="Mostrar u ocultar menu" aria-expanded="true">
            <span></span><span></span><span></span>
          </button>
          <a class="app-sidebar__brand" href="${homeHref}">
            <span class="logo-icon">WB</span>
            <span class="app-sidebar__brand-text">Wayna<strong>Bus</strong></span>
          </a>
          <nav class="app-sidebar__nav">
            <a class="app-sidebar__link ${isHomePage ? "active" : ""}" href="${homeHref}"><span class="nav-icon">🏠</span><span>INICIO</span></a>
            <div class="app-sidebar__item has-sub">
              <a class="app-sidebar__link ${isSystemPage ? "active" : ""}" href="${systemHref}" aria-haspopup="true" aria-expanded="false"><span class="nav-icon">💻</span><span>SISTEMA</span></a>
              <div class="app-sidebar__flyout">
                <a href="${systemHref}#registro-cobro">Registro de Cobro</a>
                <a href="${systemHref}#reportes">Reportes</a>
                <a href="${systemHref}#pronostico">Pronóstico</a>
                <a href="${systemHref}#modulos">Tarifas</a>
                <a href="${systemHref}#modulos">Categorías</a>
              </div>
            </div>
            <div class="app-sidebar__item has-sub">
              <a class="app-sidebar__link ${isDocPage ? "active" : ""}" href="${docHref}" aria-haspopup="true" aria-expanded="false"><span class="nav-icon">📚</span><span>DOCUMENTACIÓN</span></a>
              <div class="app-sidebar__flyout">
                <a href="${docHref}#cap1">Cap. I</a>
                <a href="${docHref}#cap2">Cap. II</a>
                <a href="${docHref}#cap3">Cap. III</a>
              </div>
            </div>
          </nav>
        </aside>
      `);
    }

    if (isSystemPage && !document.querySelector(".system-context-nav")) {
      document.querySelector(".app-sidebar")?.insertAdjacentHTML("afterend", `
        <nav class="context-topbar system-context-nav" aria-label="Navegacion del sistema">
          <ul class="context-menu">
            <li class="context-item"><a href="#registro-cobro">Registro de Cobro</a></li>
            <li class="context-item"><a href="#reportes">Reportes</a></li>
            <li class="context-item"><a href="#pronostico">Pron&oacute;stico</a></li>
            <li class="context-item"><a href="#modulos">Tarifas</a></li>
            <li class="context-item"><a href="#modulos">Categor&iacute;as</a></li>
          </ul>
        </nav>
      `);
    }

const sidebarToggle = document.getElementById("sidebarToggle");
if (sidebarToggle) {
  sidebarToggle.addEventListener("click", event => {
    event.preventDefault();
    event.stopPropagation();

    body.classList.toggle("sidebar-collapsed");

    const expanded = !body.classList.contains("sidebar-collapsed");
    sidebarToggle.setAttribute("aria-expanded", String(expanded));
  });
}
document.addEventListener("click", event => {
  const clickedInsideSidebar = event.target.closest(".app-sidebar");

  if (!clickedInsideSidebar && !body.classList.contains("sidebar-collapsed")) {
    body.classList.add("sidebar-collapsed");
    sidebarToggle?.setAttribute("aria-expanded", "false");
  }
});

    const sidebarFlyouts = document.querySelectorAll(".app-sidebar__item.has-sub");
    if (sidebarFlyouts.length) {
      const isTouchLike = window.matchMedia("(pointer: coarse)").matches || window.matchMedia("(hover: none)").matches;
      const closeDelay = 180;
      const closeTimers = new Map();

      const setFlyoutState = (item, isOpen) => {
        item.classList.toggle("open", isOpen);
        item.querySelector(".app-sidebar__link[aria-haspopup='true']")?.setAttribute("aria-expanded", String(isOpen));
      };

      const clearFlyoutTimer = item => {
        const timer = closeTimers.get(item);
        if (timer) {
          window.clearTimeout(timer);
          closeTimers.delete(item);
        }
      };

      const closeOtherFlyouts = currentItem => {
        sidebarFlyouts.forEach(item => {
          if (item !== currentItem) {
            clearFlyoutTimer(item);
            setFlyoutState(item, false);
          }
        });
      };

      const scheduleClose = item => {
        clearFlyoutTimer(item);
        closeTimers.set(item, window.setTimeout(() => {
          if (!item.matches(":hover") && !item.matches(":focus-within")) {
            setFlyoutState(item, false);
          }
        }, closeDelay));
      };

      sidebarFlyouts.forEach(item => {
        const trigger = item.querySelector(".app-sidebar__link[aria-haspopup='true']");
        if (!trigger) return;

        trigger.setAttribute("aria-expanded", "false");

        item.addEventListener("mouseenter", () => {
          if (isTouchLike) return;
          closeOtherFlyouts(item);
          clearFlyoutTimer(item);
          setFlyoutState(item, true);
        });

        item.addEventListener("mouseleave", () => {
          if (isTouchLike) return;
          scheduleClose(item);
        });

        item.addEventListener("focusin", () => {
          closeOtherFlyouts(item);
          clearFlyoutTimer(item);
          setFlyoutState(item, true);
        });

        item.addEventListener("focusout", () => {
          scheduleClose(item);
        });

        trigger.addEventListener("click", event => {
          if (!isTouchLike) return;

          if (!item.classList.contains("open")) {
            event.preventDefault();
            closeOtherFlyouts(item);
            setFlyoutState(item, true);
          }
        });
      });
    }

    const docMenu = document.querySelector(".doc-context-nav .context-menu");
    if (docMenu) {
      const docSubItems = docMenu.querySelectorAll(".context-item.has-sub");
      const closeTimers = new Map();
      const closeDelay = 180;

      const setOpenState = (item, isOpen) => {
        item.classList.toggle("open", isOpen);
        item.querySelector(":scope > a")?.setAttribute("aria-expanded", String(isOpen));
      };

      const clearTimer = item => {
        const timer = closeTimers.get(item);
        if (timer) {
          window.clearTimeout(timer);
          closeTimers.delete(item);
        }
      };

      const closeOthers = currentItem => {
        docSubItems.forEach(item => {
          if (item !== currentItem) {
            clearTimer(item);
            setOpenState(item, false);
          }
        });
      };

      const scheduleClose = item => {
        clearTimer(item);
        closeTimers.set(item, window.setTimeout(() => {
          if (!item.matches(":hover") && !item.matches(":focus-within")) {
            setOpenState(item, false);
          }
        }, closeDelay));
      };

      docSubItems.forEach(item => {
        const trigger = item.querySelector(":scope > a");
        const dropdown = item.querySelector(":scope > .context-dropdown");
        if (!trigger) return;

        trigger.setAttribute("aria-haspopup", "true");
        trigger.setAttribute("aria-expanded", "false");

        const openItem = () => {
          closeOthers(item);
          clearTimer(item);
          setOpenState(item, true);

          if (dropdown) {
            dropdown.style.left = "";
            dropdown.style.right = "0";

            const dropdownWidth = Math.min(320, Math.max(280, Math.round(window.innerWidth - 32)));
            const menuRect = docMenu.getBoundingClientRect();
            if (menuRect.width < dropdownWidth + 24) {
              dropdown.style.left = "0";
              dropdown.style.right = "auto";
            }
          }
        };

        const closeItem = () => scheduleClose(item);

        item.addEventListener("mouseenter", openItem);
        item.addEventListener("mouseleave", closeItem);
        item.addEventListener("focusin", openItem);
        item.addEventListener("focusout", closeItem);

        item.querySelectorAll(":scope > .context-dropdown a").forEach(dropdownLink => {
          dropdownLink.addEventListener("mouseenter", () => {
            dropdownLink.classList.add("is-hovered");
          });

          dropdownLink.addEventListener("mouseleave", () => {
            dropdownLink.classList.remove("is-hovered");
          });
        });

        trigger.addEventListener("click", event => {
          if (window.innerWidth > 860) return;
          event.preventDefault();

          if (!item.classList.contains("open")) {
            closeOthers(item);
            setOpenState(item, true);
          } else {
            setOpenState(item, false);
          }
        });
      });
    }
  }

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
          e.stopImmediatePropagation();

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
          const isDropdownToggle = link.classList.contains("nav-link") && link.closest(".has-sub");
          if (isDropdownToggle) return;
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

document.addEventListener("DOMContentLoaded", () => {
  const wbRevealItems = document.querySelectorAll(".wb-reveal");

  if (wbRevealItems.length) {
    const wbRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    }, { threshold: 0.14 });

    wbRevealItems.forEach(item => wbRevealObserver.observe(item));
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", event => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      const offset = 92;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top,
        behavior: "smooth"
      });

      const mainNav = document.getElementById("mainNav");
      if (mainNav && window.innerWidth <= 900) {
        mainNav.classList.remove("open");
      }
    });
  });

  const cobroForm = document.getElementById("sysCobroForm");
  const fechaCobro = document.getElementById("fechaCobro");
  const categoriaCobro = document.getElementById("categoriaCobro");
  const tarifaCobro = document.getElementById("tarifaCobro");
  const cantidadCobro = document.getElementById("cantidadCobro");
  const montoCobro = document.getElementById("montoCobro");
  const cobroMensaje = document.getElementById("sysCobroMensaje");

  const formatMoney = value => Number(value || 0).toFixed(2);

  function updateCobroTotal() {
    if (!categoriaCobro || !tarifaCobro || !cantidadCobro || !montoCobro) return;

    const selectedOption = categoriaCobro.options[categoriaCobro.selectedIndex];
    const tarifa = Number(selectedOption?.dataset.tarifa || 0);
    const cantidad = Math.max(0, Number(cantidadCobro.value || 0));
    const montoTotal = tarifa * cantidad;

    tarifaCobro.value = formatMoney(tarifa);
    montoCobro.value = formatMoney(montoTotal);
  }

  if (cobroForm) {
    if (fechaCobro && !fechaCobro.value) {
      fechaCobro.valueAsDate = new Date();
    }

    updateCobroTotal();

    categoriaCobro?.addEventListener("change", updateCobroTotal);
    cantidadCobro?.addEventListener("input", updateCobroTotal);

    cobroForm.addEventListener("reset", () => {
      window.setTimeout(() => {
        if (fechaCobro) fechaCobro.valueAsDate = new Date();
        updateCobroTotal();
        if (cobroMensaje) {
          cobroMensaje.textContent = "Formulario limpio. Listo para registrar una nueva transaccion.";
        }
      }, 0);
    });

    cobroForm.addEventListener("submit", event => {
      event.preventDefault();
      updateCobroTotal();

      if (cobroMensaje) {
        cobroMensaje.textContent = `Cobro preparado: Bs ${montoCobro.value} para ${cantidadCobro.value || 0} pasajero(s).`;
      }
    });
  }
});

