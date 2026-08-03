// =====================================================
// CCDR Paraíso — interactividad
// =====================================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Header con sombra al hacer scroll ---------- */
  const header = document.getElementById('siteHeader');
  const progress = document.getElementById('scrollProgress');

  function onScroll(){
    const scrollTop = window.scrollY;
    header.classList.toggle('is-scrolled', scrollTop > 12);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progress.style.width = pct + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menú móvil (hamburguesa) ---------- */
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  function closeMobileNav(){
    navToggle.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.hidden = true;
  }

  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    mobileNav.hidden = !isOpen;
    mobileNav.classList.toggle('is-open', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 980) closeMobileNav();
  });

  /* ---------- Tabs de Horarios ---------- */
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-tab');

      tabButtons.forEach(b => {
        b.classList.remove('is-active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('is-active');
      btn.setAttribute('aria-selected', 'true');

      tabPanels.forEach(panel => {
    const isTarget = panel.id === `panel-${target}`;
    panel.classList.toggle('is-active', isTarget);
    panel.hidden = !isTarget;
  });
    });
  });

  /* ---------- Resaltar enlace activo del nav según sección visible ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

  function actualizarNavActivo() {
  const scrollPos = window.scrollY + window.innerHeight * 0.50;
  const alFinal = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;

  let seccionActual = sections[0];

  if (alFinal) {
    seccionActual = sections[sections.length - 1];
  } else {
    sections.forEach(section => {
      if (section.offsetTop <= scrollPos) {
        seccionActual = section;
      }
    });
  }

  const id = seccionActual.getAttribute('id');
  navLinks.forEach(link => {
    link.classList.toggle('is-current', link.getAttribute('href') === `#${id}`);
  });
}

window.addEventListener('scroll', actualizarNavActivo, { passive: true });
window.addEventListener('resize', actualizarNavActivo);
actualizarNavActivo();
});

/* =====================================================
  DISCIPLINAS
===================================================== */
const informacionDisciplinas = {
   ciclismo: {
       nombre: "🚴 Ciclismo",
       entrenador: "Alejandro Meza",
       contacto: "8981-5774"
   },
   boxeo: {
       nombre: "🥊 Boxeo",
       entrenador: "Deiber Romero",
       contacto: "8512-4396"
   },
   taekwondo: {
       nombre: "🥋 Taekwondo",
       entrenador: "Rodolfo Fallas<br>Andrés Molina",
       contacto: "8923-8332<br>8345-1594"
   },
   natacion: {
       nombre: "🏊 Natación",
       entrenador: "Francinny Fuentes",
       contacto: "6127-9869"
   },
   atletismo: {
       nombre: "🏃 Atletismo / paratletismo",
       entrenador: "Edgar Araya",
       contacto: "8755-0667"
   },
   futsala: {
       nombre: "⚽ Futsala",
       entrenador: "Ricardo Arguello<br>Ángelo Andrade",
       contacto: "8812-7220<br>8324-4744"
   },
   futbolf: {
       nombre: "⚽ Fútbol",
       entrenador: "Jhon Jairo Quiñones",
       contacto: "8976-2178"
   },
   baloncesto: {
       nombre: "🏀 Baloncesto",
       entrenador: "Melvin Cascante",
       contacto: "6100-0085"
   },
   voleibol: {
       nombre: "🏐 Voleibol",
       entrenador: "Edivaldo Bonilla",
       contacto: "8539-9512"
   },
   ajedrez: {
       nombre: "♟️ Ajedrez",
       entrenador: "Diego Bonilla",
       contacto: "8495-8383"
   },
   porrismo: {
       nombre: "📣 Porrismo",
       entrenador: "Marianyela Brenes",
       contacto: "7031-5275"
   }
};

const infoInicial = `
`;

const botones = document.querySelectorAll("[data-disciplina]");
const contenedor = document.getElementById("info-disciplina");
botones.forEach((boton)=>{
   boton.addEventListener("click",()=>{
       const disciplina = informacionDisciplinas[boton.dataset.disciplina];
       contenedor.innerHTML = `
<div class="disciplina-card">
<button class="disciplina-close" aria-label="Cerrar información">&times;</button>
<h2>${disciplina.nombre}</h2>
<br>
<h3>Entrenador(a)</h3>
<p>${disciplina.entrenador}</p>
<br>
<h3>Contacto</h3>
<p>${disciplina.contacto}</p>
</div>
       `;
       contenedor.scrollIntoView({
           behavior:"smooth",
           block:"start"
       });

       const cerrar = contenedor.querySelector(".disciplina-close");
       cerrar.addEventListener("click", ()=>{
           contenedor.innerHTML = infoInicial;
       });
   });
});

/* =====================================================
  PRESENCIA EN LAS COMUNIDADES
===================================================== */
const categoriasPresencia = {
  comites: {
    prefijo: "CCDR",
    comunidades: [
      { nombre: "Santiago",  correo: "ccdr.santiago.deportescr@gmail.com" },
      { nombre: "Orosi",     correo: "ccdrorosi@gmail.com" },
      { nombre: "La Laguna", correo: "ccdr.lalaguna.deportrecr@gmail.com" },
      { nombre: "La Puente", correo: "ccdr.lapuente.deporterec@gmail.com" },
      { nombre: "Urasca",    correo: "ccdr.urasca.deporterecr@gmail.com" },
      { nombre: "Birrisito", correo: "ccdr.birrisito.deporterecr@gmail.com" },
      { nombre: "La Joya",   correo: "subcomitedeportesbarriolajoya@gmail.com" },
      { nombre: "Cachí",     correo: "ccdr.cachi.deporterec@gmail.com" },
      { nombre: "Ajenjal",   correo: "ccdr.ajenjal.deporterecr@gmail.com" }
    ]
  },
  comisiones: {
    prefijo: "Comunidad de",
    comunidades: [
      { nombre: "San Miguel", correo: "ccdrsanmigueldeporterec@gmail.com" },
      { nombre: "Purisil",    correo: " ccdr.purisil.deporterecr@gmail.com" },
      { nombre: "Villa Mills", correo: "Sin correo" }
    ]
  },
  adi: {
    prefijo: "ADI",
    comunidades: [
      { nombre: "Palomo",      correo: "adipalomo@outlook.com" },
      { nombre: "Santa Lucía", correo: "adillanosdesantalucia@hotmail.com" },
      { nombre: "Río Macho",   correo: "Sin correo" },
      { nombre: "El Yas",      correo: "adielyas25@gmail.com" },
      { nombre: "La Flor",     correo: "asocia.laflor@gmail.com" }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const categoriaBtns = document.querySelectorAll('.categoria-btn');
  const contenedorComunidades = document.getElementById('presencia-comunidades');
  const contenedorInfoComunidad = document.getElementById('info-comunidad');

  function renderComunidades(categoriaKey){
    const categoria = categoriasPresencia[categoriaKey];
    contenedorComunidades.innerHTML = categoria.comunidades.map(c => `
      <button class="comunidad-chip" data-correo="${c.correo}">${categoria.prefijo} ${c.nombre}</button>
    `).join('');

    contenedorComunidades.querySelectorAll('.comunidad-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const nombreCompleto = chip.textContent.trim();
        const correo = chip.getAttribute('data-correo');

        contenedorInfoComunidad.innerHTML = `
          <div class="comunidad-card">
            <button class="comunidad-close" aria-label="Cerrar información">&times;</button>
            <h2>${nombreCompleto}</h2>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=${correo}" target="_blank" rel="noopener" class="comite-contacto">
              <i class="fa-solid fa-envelope"></i> ${correo}
            </a>
          </div>
        `;

        contenedorInfoComunidad.scrollIntoView({ behavior: "smooth", block: "start" });

        contenedorInfoComunidad.querySelector('.comunidad-close').addEventListener('click', () => {
          contenedorInfoComunidad.innerHTML = '';
        });
      });
    });
  }

  categoriaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      categoriaBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      contenedorInfoComunidad.innerHTML = '';
      renderComunidades(btn.dataset.categoria);
    });
  });

  // Carga inicial: Comités Comunales
  renderComunidades('comites');
});
const slides = document.querySelectorAll('.slide');
let current = 0;

setInterval(() => {

  slides[current].classList.remove('active');

  current++;

  if(current >= slides.length){
    current = 0;
  }

  slides[current].classList.add('active');

}, 5000);

/* =====================================================
  ACERCAMIENTO
===================================================== */
const contactosCCDR = [
  { label: "ccdr@muniparaiso.go.cr", link: "mailto:ccdr@muniparaiso.go.cr", icon: "fa-solid fa-envelope", clase: "" },
  { label: "Contáctanos: 2575-1124", link: "tel:+50625751124", icon: "fa-solid fa-phone", clase: "" },
  { label: "WhatsApp: 8347-9720", link: "https://wa.me/50683479720", icon: "fa-brands fa-whatsapp", clase: "whatsapp" }
];

const infoAcercamiento = {
  rsv: {
    nombre: "🤲 Programas para Responsabilidad Social y Voluntariado",
    descripcion: "El Parque la Expresión — Laguna Doña Anacleto es uno de los principales espacios donde el CCDR Paraíso recibe e impulsa iniciativas de responsabilidad social y voluntariado: jornadas ambientales, mantenimiento de zonas verdes, ferias comunitarias y actividades recreativas abiertas a grupos, empresas e instituciones que deseen aportar tiempo y trabajo al cantón.",
    contactos: contactosCCDR
  },
  comunal: {
    nombre: "🎓 Trabajo Comunal",
    descripcion: "Dirigido a estudiantes de universidades y colegios que deben cumplir horas de trabajo comunal estudiantil. El CCDR Paraíso coordina con centros educativos del cantón espacios de apoyo en proyectos deportivos y recreativos donde el estudiantado puede cumplir con este requisito académico.",
    contactos: contactosCCDR
  },
  pasantias: {
    nombre: "🧑‍💼 Pasantías y Práctica Profesional",
    descripcion: "Espacio dirigido a estudiantes de colegios técnicos que necesitan realizar su pasantía o práctica profesional supervisada. El CCDR Paraíso ofrece la posibilidad de desarrollar horas de pasantía o práctica profesional en áreas administrativas, deportivas y recreativas de la institución.",
    contactos: contactosCCDR
  },
  investigacion: {
    nombre: "🔬 Investigación",
    descripcion: "Apoyo a personas estudiantes que desarrollan Trabajos Finales de Graduación, procesos de Graduación Académica y proyectos de investigación en general relacionados con el deporte, la recreación y la gestión comunitaria en el cantón de Paraíso además en la parte ambiental flora y fauna del parque la Expresión.",
    contactos: contactosCCDR
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const botonesAcercamiento = document.querySelectorAll('[data-acercamiento]');
  const contenedorAcercamiento = document.getElementById('info-acercamiento');

  botonesAcercamiento.forEach(boton => {
    boton.addEventListener('click', () => {
      botonesAcercamiento.forEach(b => b.classList.remove('is-active'));
      boton.classList.add('is-active');

      const data = infoAcercamiento[boton.dataset.acercamiento];

      contenedorAcercamiento.innerHTML = `
        <div class="acercamiento-card">
          <button class="acercamiento-close" aria-label="Cerrar información">&times;</button>
          <h2>${data.nombre}</h2>
          <p class="acercamiento-desc">${data.descripcion}</p>
          <div class="acercamiento-contactos">
            ${data.contactos.map(c => `
              <a href="${c.link}" target="_blank" rel="noopener" class="acercamiento-contacto ${c.clase}">
                <i class="${c.icon}"></i> ${c.label}
              </a>
            `).join('')}
          </div>
        </div>
      `;

      contenedorAcercamiento.scrollIntoView({ behavior: "smooth", block: "start" });

      contenedorAcercamiento.querySelector('.acercamiento-close').addEventListener('click', () => {
        contenedorAcercamiento.innerHTML = '';
        boton.classList.remove('is-active');
      });
    });
  });
});

const menuLinks = document.querySelectorAll('.main-nav a, .mobile-nav a');

menuLinks.forEach(link => {
  link.addEventListener('click', () => {

    menuLinks.forEach(item => {
      item.classList.remove('is-current');
    });

    link.classList.add('is-current');
  });
});