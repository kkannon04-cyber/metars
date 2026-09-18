/* =====================================================================
   ✏️  ZONA EDITABLE — AQUÍ PUEDES CAMBIAR TODOS LOS TEXTOS Y FOTOS
   ---------------------------------------------------------------------
   - Cambia solo lo que está entre comillas "…".
   - Si un texto lleva comillas dentro, usa comillas simples: 'así'.
   - No borres las comas del final de cada línea.
   ===================================================================== */

const CONFIG = {

  /* 1 · Pantalla inicial */
  intro: {
    nombre: "Isabella...",
    linea1: "Hay algo especial esperándote.",
    linea2: "Pero tendrás que descubrirlo.",
    pista: "🎁 Toca para abrir",
    boton: "Abrir regalo",
  },

  /* 2 · Sobre */
  sobre: {
    pista: "Hay algo dentro...",
    para: "Para Isabella 💗",
    de: "De Cristian",
    inicialSello: "I",
    boton: "Abrir carta",
  },

  /* 3 · Carta */
  carta: {
    titulo: "Feliz cumpleaños, Isabella",
    subtitulo: "17 años ✨",
    saludo: "Querida hermana:",

    /* ============================================================
       [MENSAJE PERSONAL DE CRISTIAN PARA ISABELLA]
       ------------------------------------------------------------
       ⚠️ Este es un TEXTO DE DEMOSTRACIÓN. Reemplázalo por tu
       propio mensaje. Cada "…" es un párrafo. Puedes añadir o
       quitar párrafos (cada uno entre comillas y con coma al final).
       ============================================================ */
    parrafos: [
      "Hoy cumples 17 años y quise regalarte algo un poco diferente: no solo un mensaje, sino un pequeño lugar hecho solo para ti, para que lo abrieras con calma.",
      "Verte crecer ha sido uno de los regalos más bonitos que me ha dado la vida. Cada año te conviertes en una persona más fuerte, más auténtica y más tú, y no sabes lo orgulloso que me siento de ser tu hermano.",
      "Deseo que este nuevo año te traiga todo lo que sueñas: momentos que te hagan reír, personas que te cuiden bonito y la valentía para seguir siendo exactamente quien eres.",
      "Pase lo que pase, siempre vas a tener a alguien de tu lado. Ese alguien soy yo.",
    ],
    /* ====================== FIN DEL MENSAJE ===================== */

    despedida: "Con cariño, tu hermano",
    firma: "Cristian",
    pistaSaltar: "Toca la carta para leerla completa",
    botonSeguir: "Continuar",
    velocidadEscritura: 30, // milisegundos por letra (más alto = más lento)
  },

  /* 4 · Transición */
  transicion: {
    linea1: "Pero una carta no sería suficiente...",
    linea2: "Hay algunos recuerdos que quiero compartir contigo.",
  },

  /* 5 · Recuerdos
     - "archivo": nombre de la foto dentro de la carpeta img/
     - "texto":   frase corta escrita a mano debajo de la foto (puede quedar "")
     - "nota":    mensaje más largo que aparece al tocar la foto (puede quedar "")
     - "enfoque": qué parte de la foto se ve en el marco ("center", "top", "50% 30%"…)
     Las dos últimas fotos se muestran con los botones de "descubrir". */
  recuerdos: {
    etiqueta: "Para ti",
    titulo: "Recuerdos",
    subtitulo: "Toca cada foto: hay una nota para ti.",
    fotos: [
      {
        archivo: "img/foto1.jpg",
        texto: "Mi niña, desde siempre",
        nota: "Puedes cumplir 17, 30 o 50 años: para mí siempre vas a ser esta niña. Así es ser tu hermano mayor, y no pienso dejar de verte así.",
        enfoque: "50% 35%",
      },
      {
        archivo: "img/foto2.jpg",
        texto: "Tu hermano mayor, siempre",
        nota: "Pase el tiempo que pase, yo siempre voy a estar un paso adelante cuidándote. Ese lugar en tu vida no lo cambio por nada.",
        enfoque: "50% 50%",
      },
      {
        archivo: "img/foto3.jpg",
        texto: "Siempre veré tu inocencia",
        nota: "Aunque crezcas, aunque cambies, aunque estemos peleados, yo siempre voy a ver en ti esa inocencia que te hace única.",
        enfoque: "50% 40%",
      },
      {
        archivo: "img/foto4.jpg",
        texto: "Aunque peleemos, te quiero",
        nota: "Podemos discutir, sacarnos de quicio y dejar de hablarnos un rato, pero nada de eso cambia lo que siento por ti. Eres mi hermanita.",
        enfoque: "50% 30%",
      },
      {
        archivo: "img/foto5.jpg",
        texto: "Tú y mamá, mi mundo entero",
        nota: "Tú y mi mamá son el centro de mi mundo. El día que ustedes no estén, yo simplemente nunca volveré a ser el mismo.",
        enfoque: "50% 60%",
      },
    ],
    descubrir: [
      { texto: "¿Quieres ver otro recuerdo?", boton: "Ver recuerdo" },
      { texto: "Uno más...", boton: "Descubrir" },
    ],
    alTerminar: { texto: "Gracias por ver estos recuerdos conmigo.", boton: "Continuar" },
  },

  /* 6 · Sorpresa final */
  final: {
    nombre: "Isabella...",
    linea1: "¿Pensabas que ya había terminado?",
    linea2: "Pues todavía falta algo.",
    boton: "✨ Descubrir",
    numeroFondo: "17",
    titulo: "Feliz cumpleaños, Isabella ❤️",
    mensaje: "Espero que estos 17 estén llenos de momentos increíbles.",
    despedida: "Con cariño,",
    firma: "Cristian",
    repetir: "Volver a abrir el regalo",
  },
};

/* =====================================================================
   FIN DE LA ZONA EDITABLE — a partir de aquí está la lógica de la página
   ===================================================================== */

(() => {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wait = (ms) => new Promise((r) => setTimeout(r, reducedMotion ? Math.min(ms, 250) : ms));

  /* ---------- Textos ---------- */

  const getText = (path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), CONFIG);

  $$("[data-text]").forEach((el) => {
    const value = getText(el.dataset.text);
    if (typeof value === "string") el.textContent = value;
  });

  /* ---------- Escenas ---------- */

  let current = $("#intro");

  function go(id) {
    const next = document.getElementById(id);
    if (!next || next === current) return wait(0);
    current.classList.remove("is-active");
    next.scrollTop = 0;
    next.classList.add("is-active");
    current = next;
    return wait(1000);
  }

  const show = (el) => el && el.classList.add("is-in");
  const hide = (el) => el && el.classList.remove("is-in");

  /* ---------- Música ---------- */

  const music = $("#music");
  const musicBtn = $("#musicToggle");
  let musicOk = true;

  music.addEventListener("error", () => {
    musicOk = false;
    musicBtn.hidden = true;
  });

  function fadeVolume(to, ms = 1800) {
    const from = music.volume;
    const start = performance.now();
    const step = (now) => {
      const t = Math.max(0, Math.min(1, (now - start) / ms));
      music.volume = Math.max(0, Math.min(1, from + (to - from) * t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function startMusic() {
    if (!musicOk) return;
    music.volume = 0;
    const p = music.play();
    if (p && p.then) {
      p.then(() => {
        musicBtn.hidden = false;
        requestAnimationFrame(() => musicBtn.classList.add("is-shown"));
        fadeVolume(0.7);
      }).catch(() => {
        musicBtn.hidden = true;
      });
    }
  }

  function syncMusicButton() {
    const paused = music.paused;
    musicBtn.classList.toggle("is-paused", paused);
    musicBtn.setAttribute("aria-pressed", String(!paused));
    musicBtn.setAttribute("aria-label", paused ? "Reproducir música" : "Pausar música");
  }

  musicBtn.addEventListener("click", () => {
    if (music.paused) {
      music.play().catch(() => {});
    } else {
      music.pause();
    }
  });
  music.addEventListener("play", syncMusicButton);
  music.addEventListener("pause", syncMusicButton);

  /* =================================================================
     Partículas (lienzo superior): destellos, confeti y corazones
     ================================================================= */

  const fx = $("#fx");
  const ctx = fx.getContext("2d");
  const particles = [];
  let fxRunning = false;
  let dpr = 1;
  let W = 0;
  let H = 0;

  const PASTELS = ["#f6d6de", "#eebccb", "#d99fb3", "#c4afe0", "#e7def5", "#fce4d6", "#f1dfbc", "#ffffff"];
  const GOLDS = ["#fff6e4", "#f1dfbc", "#e6c893", "#ffffff"];

  function resizeCanvases() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    [fx, dust].forEach((c) => {
      c.width = Math.round(W * dpr);
      c.height = Math.round(H * dpr);
    });
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    dctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function drawStar(c, x, y, r) {
    c.beginPath();
    c.moveTo(x, y - r);
    c.quadraticCurveTo(x + r * 0.12, y - r * 0.12, x + r, y);
    c.quadraticCurveTo(x + r * 0.12, y + r * 0.12, x, y + r);
    c.quadraticCurveTo(x - r * 0.12, y + r * 0.12, x - r, y);
    c.quadraticCurveTo(x - r * 0.12, y - r * 0.12, x, y - r);
    c.fill();
  }

  function drawHeart(c, x, y, s) {
    c.beginPath();
    c.moveTo(x, y + s * 0.35);
    c.bezierCurveTo(x - s, y - s * 0.3, x - s * 0.45, y - s, x, y - s * 0.45);
    c.bezierCurveTo(x + s * 0.45, y - s, x + s, y - s * 0.3, x, y + s * 0.35);
    c.fill();
  }

  function spawn(opts) {
    particles.push(Object.assign({
      x: 0, y: 0, vx: 0, vy: 0,
      g: 0.12, drag: 0.985,
      size: 6, rot: Math.random() * Math.PI * 2, vr: (Math.random() - 0.5) * 0.25,
      life: 0, max: 160, type: "rect", color: "#fff",
      flip: Math.random() * Math.PI * 2, wob: Math.random() * 0.1 + 0.03,
    }, opts));
    if (!fxRunning) {
      fxRunning = true;
      lastT = performance.now();
      requestAnimationFrame(tick);
    }
  }

  let lastT = 0;

  function tick(now) {
    const dt = Math.min(2.5, (now - lastT) / 16.67);
    lastT = now;
    ctx.clearRect(0, 0, W, H);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.life += dt;
      p.vx *= Math.pow(p.drag, dt);
      p.vy = p.vy * Math.pow(p.drag, dt) + p.g * dt;
      p.x += p.vx * dt + (p.type === "rect" ? Math.sin(p.flip) * 0.6 : 0);
      p.y += p.vy * dt;
      p.rot += p.vr * dt;
      p.flip += p.wob * dt;

      const fade = Math.min(1, (p.max - p.life) / 40);
      if (p.life >= p.max || p.y > H + 40) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = Math.max(0, fade) * (p.alpha || 1);
      ctx.fillStyle = p.color;
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);

      if (p.type === "rect") {
        ctx.scale(1, Math.cos(p.flip));
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      } else if (p.type === "dot") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.type === "star") {
        const tw = 0.65 + Math.sin(p.life * 0.25) * 0.35;
        ctx.shadowColor = "rgba(255, 230, 200, .9)";
        ctx.shadowBlur = 8;
        drawStar(ctx, 0, 0, p.size * tw);
      } else if (p.type === "heart") {
        ctx.rotate(-p.rot * 0.8);
        drawHeart(ctx, 0, 0, p.size);
      }
      ctx.restore();
    }

    if (particles.length) {
      requestAnimationFrame(tick);
    } else {
      fxRunning = false;
      ctx.clearRect(0, 0, W, H);
    }
  }

  function burstAt(x, y) {
    const n = reducedMotion ? 16 : 70;
    for (let i = 0; i < n; i++) {
      const a = -Math.PI / 2 + (Math.random() - 0.5) * Math.PI * 1.3;
      const s = 3 + Math.random() * 7;
      const r = Math.random();
      spawn({
        x: x + (Math.random() - 0.5) * 30,
        y,
        vx: Math.cos(a) * s,
        vy: Math.sin(a) * s,
        g: 0.09,
        drag: 0.965,
        type: r < 0.45 ? "star" : r < 0.88 ? "dot" : "heart",
        size: r < 0.45 ? 4 + Math.random() * 5 : r < 0.88 ? 2 + Math.random() * 3 : 5 + Math.random() * 3,
        color: r < 0.88 ? GOLDS[(Math.random() * GOLDS.length) | 0] : "#eebccb",
        max: 90 + Math.random() * 60,
      });
    }
  }

  function confetti() {
    const base = reducedMotion ? 30 : 150;
    const cannons = [
      { x: 0, y: H * 0.85, dir: -1 },
      { x: W, y: H * 0.85, dir: 1 },
    ];
    cannons.forEach((c) => {
      for (let i = 0; i < base / 2; i++) {
        const a = c.dir < 0
          ? -Math.PI / 2 + 0.15 + Math.random() * 0.75
          : -Math.PI / 2 - 0.15 - Math.random() * 0.75;
        const s = 9 + Math.random() * 11;
        const r = Math.random();
        spawn({
          x: c.x, y: c.y,
          vx: Math.cos(a) * s, vy: Math.sin(a) * s * (H / 800 + 0.4),
          g: 0.16, drag: 0.975,
          type: r < 0.62 ? "rect" : r < 0.84 ? "dot" : r < 0.95 ? "star" : "heart",
          size: r < 0.62 ? 8 + Math.random() * 6 : 4 + Math.random() * 4,
          color: r < 0.84 ? PASTELS[(Math.random() * PASTELS.length) | 0] : r < 0.95 ? GOLDS[0] : "#e5a9bd",
          max: 240 + Math.random() * 120,
        });
      }
    });
    burstAt(W / 2, H * 0.5);
  }

  function gentleRain(duration) {
    if (reducedMotion) return;
    const end = performance.now() + duration;
    const drop = () => {
      if (performance.now() > end) return;
      const r = Math.random();
      spawn({
        x: Math.random() * W, y: -12,
        vx: (Math.random() - 0.5) * 0.6, vy: 0.6 + Math.random(),
        g: 0.012, drag: 0.995,
        type: r < 0.7 ? "rect" : r < 0.9 ? "star" : "heart",
        size: r < 0.7 ? 7 + Math.random() * 5 : 4 + Math.random() * 3,
        color: r < 0.7 ? PASTELS[(Math.random() * PASTELS.length) | 0] : r < 0.9 ? GOLDS[1] : "#eebccb",
        max: 600, alpha: 0.9,
      });
      setTimeout(drop, 140 + Math.random() * 160);
    };
    drop();
  }

  /* =================================================================
     Polvo brillante de fondo (lienzo inferior)
     ================================================================= */

  const dust = $("#dust");
  const dctx = dust.getContext("2d");
  const motes = [];

  function initDust() {
    motes.length = 0;
    const count = reducedMotion ? 0 : Math.round(Math.min(40, (W * H) / 26000));
    for (let i = 0; i < count; i++) {
      motes.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: 0.6 + Math.random() * 1.8,
        vy: -(0.08 + Math.random() * 0.22),
        vx: (Math.random() - 0.5) * 0.1,
        ph: Math.random() * Math.PI * 2,
        star: Math.random() < 0.18,
      });
    }
  }

  function dustLoop(now) {
    dctx.clearRect(0, 0, W, H);
    for (const m of motes) {
      m.y += m.vy;
      m.x += m.vx + Math.sin(now / 3000 + m.ph) * 0.08;
      if (m.y < -10) { m.y = H + 10; m.x = Math.random() * W; }
      const a = 0.35 + Math.sin(now / 900 + m.ph) * 0.3;
      dctx.globalAlpha = Math.max(0, a);
      dctx.fillStyle = m.star ? "#fff4e0" : "#ffffff";
      if (m.star) {
        drawStar(dctx, m.x, m.y, m.r * 3);
      } else {
        dctx.beginPath();
        dctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        dctx.fill();
      }
    }
    if (!document.hidden && motes.length) requestAnimationFrame(dustLoop);
  }

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && motes.length) requestAnimationFrame(dustLoop);
  });

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const hadDust = motes.length > 0;
      resizeCanvases();
      initDust();
      if (!hadDust && motes.length) requestAnimationFrame(dustLoop);
    }, 150);
  });

  resizeCanvases();
  initDust();
  if (motes.length) requestAnimationFrame(dustLoop);

  /* =================================================================
     1 · Intro y regalo
     ================================================================= */

  const gift = $("#gift");
  const giftStage = $("#giftStage");
  const introCta = $("#introCta");
  const openGiftBtn = $("#openGiftBtn");
  const [introName, introL1, introL2] = $$(".intro__text .reveal");
  let giftOpened = false;

  async function runIntro() {
    await wait(500);
    show(introName);
    await wait(1700);
    show(introL1);
    await wait(1500);
    show(introL2);
    await wait(900);
    show(giftStage);
    await wait(900);
    show(introCta);
  }

  async function openGift() {
    if (giftOpened) return;
    giftOpened = true;
    show(giftStage);
    openGiftBtn.disabled = true;
    startMusic();

    $(".gift-float").classList.add("is-still");
    gift.classList.add("is-bounce");
    introCta.classList.add("is-out");
    [introName, introL1, introL2].forEach((el) => el.classList.add("is-out"));
    await wait(420);

    gift.classList.remove("is-bounce");
    gift.classList.add("is-open");
    const r = gift.getBoundingClientRect();
    burstAt(r.left + r.width / 2, r.top + r.height * 0.35);
    await wait(500);
    burstAt(r.left + r.width / 2, r.top + r.height * 0.35);
    await wait(500);

    $("#veil").classList.add("is-flash");
    await wait(600);
    go("envelope");
    runEnvelope();
  }

  gift.addEventListener("click", openGift);
  openGiftBtn.addEventListener("click", openGift);

  /* =================================================================
     2 · Sobre
     ================================================================= */

  const env = $("#env");
  const envBtn = $("#openEnvBtn");
  const envHint = $("#envelope .eyebrow");
  let envOpened = false;

  async function runEnvelope() {
    await wait(700);
    show(env);
    await wait(900);
    show(envHint);
    await wait(500);
    show(envBtn);
  }

  async function openEnvelope() {
    if (envOpened || !env.classList.contains("is-in")) return;
    envOpened = true;
    envBtn.disabled = true;
    envHint.classList.add("is-out");
    envBtn.classList.add("is-out");
    env.classList.add("is-opening");
    await wait(2000);
    go("letter");
    runLetter();
  }

  env.addEventListener("click", openEnvelope);
  envBtn.addEventListener("click", openEnvelope);

  /* =================================================================
     3 · Carta con efecto de escritura
     ================================================================= */

  const letterScene = $("#letter");
  const paper = $("#paper");
  const body = $("#letterBody");
  const sign = $("#letterSign");
  const skipHint = $("#skipHint");
  const letterNext = $("#letterNext");
  let skipTyping = false;
  let userScrolling = false;
  let userScrollTimer;

  const pauseAfter = (ch) => (ch === "." || ch === "!" || ch === "?" ? 380 : ch === "," || ch === ";" || ch === ":" ? 180 : 0);

  function keepCaretVisible(caret) {
    if (userScrolling) return;
    const rect = caret.getBoundingClientRect();
    const limit = letterScene.clientHeight * 0.72;
    if (rect.bottom > limit) {
      letterScene.scrollBy({ top: rect.bottom - limit, behavior: "smooth" });
    }
  }

  ["touchstart", "wheel"].forEach((ev) =>
    letterScene.addEventListener(ev, () => {
      userScrolling = true;
      clearTimeout(userScrollTimer);
      userScrollTimer = setTimeout(() => (userScrolling = false), 2500);
    }, { passive: true })
  );

  async function typeParagraph(text, className) {
    const p = document.createElement("p");
    if (className) p.className = className;
    const span = document.createElement("span");
    const caret = document.createElement("span");
    caret.className = "caret";
    p.append(span, caret);
    body.appendChild(p);

    const speed = Math.max(8, Number(CONFIG.carta.velocidadEscritura) || 30);
    let i = 0;
    while (i < text.length) {
      if (skipTyping || reducedMotion) {
        span.textContent = text;
        break;
      }
      span.textContent += text[i];
      if (i % 12 === 0) keepCaretVisible(caret);
      await new Promise((r) => setTimeout(r, speed + pauseAfter(text[i]) + Math.random() * 18));
      i++;
    }
    caret.remove();
  }

  async function runLetter() {
    await wait(300);
    show(paper);
    await wait(1400);

    if (CONFIG.carta.saludo) await typeParagraph(CONFIG.carta.saludo, "salutation");
    for (const para of CONFIG.carta.parrafos) {
      await typeParagraph(para);
      if (!skipTyping) await wait(350);
    }

    skipHint.classList.add("is-hidden");
    show(sign);
    await wait(900);
    show(letterNext);
    if (!userScrolling) {
      letterNext.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "end" });
    }
  }

  paper.addEventListener("click", () => {
    skipTyping = true;
    skipHint.classList.add("is-hidden");
  });

  letterNext.addEventListener("click", async () => {
    letterNext.disabled = true;
    await go("interlude");
    runInterlude();
  });

  /* =================================================================
     4 · Transición a recuerdos
     ================================================================= */

  const interlude = $("#interlude");
  let interludeDone = false;

  async function runInterlude() {
    const [l1, l2] = $$(".interlude__line");
    show(l1);
    await wait(2600);
    show(l2);
    await wait(3600);
    leaveInterlude();
  }

  async function leaveInterlude() {
    if (interludeDone) return;
    interludeDone = true;
    $$(".interlude__line").forEach((el) => el.classList.add("is-out"));
    await wait(700);
    go("memories");
    runMemories();
  }

  interlude.addEventListener("click", () => {
    if ($(".interlude__line--big").classList.contains("is-in")) leaveInterlude();
  });

  /* =================================================================
     5 · Recuerdos (polaroids)
     ================================================================= */

  const memoriesScene = $("#memories");
  const grid = $("#polaroids");
  const discover = $("#discover");
  const discoverText = $("#discoverText");
  const discoverBtn = $("#discoverBtn");
  const photos = CONFIG.recuerdos.fotos;
  const extraSteps = Math.min(CONFIG.recuerdos.descubrir.length, Math.max(0, photos.length - 1));
  const initialCount = photos.length - extraSteps;
  const ROTATIONS = [-3.5, 2.8, -1.6, 3.4, -2.6, 1.8, -3, 2.2];
  const OFFSETS = [-14, 16, -8, 12, -12, 10];
  let step = 0;

  const placeholderHTML = (name) =>
    '<span class="photo-placeholder"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.2" aria-hidden="true"><rect x="3" y="6" width="18" height="14" rx="2"/><circle cx="12" cy="13" r="3.6"/><path d="M8.5 6l1.4-2h4.2l1.4 2"/></svg>' +
    name.replace(/[<>&"]/g, "") + "</span>";

  function buildPolaroids() {
    const isMobile = window.matchMedia("(max-width: 759px)").matches;
    photos.forEach((ph, i) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "polaroid";
      card.dataset.index = String(i);
      card.style.setProperty("--r", ROTATIONS[i % ROTATIONS.length] + "deg");
      if (isMobile) card.style.setProperty("--x", OFFSETS[i % OFFSETS.length] + "px");
      card.setAttribute("aria-label", "Ver foto " + (i + 1) + (ph.texto ? ": " + ph.texto : ""));
      if (i >= initialCount) card.hidden = true;

      const frame = document.createElement("span");
      frame.className = "polaroid__photo";
      const img = document.createElement("img");
      img.alt = ph.texto || "Recuerdo " + (i + 1);
      img.decoding = "async";
      img.loading = i < 2 ? "eager" : "lazy";
      img.style.objectPosition = ph.enfoque || "center";
      img.addEventListener("error", () => {
        ph.missing = true;
        frame.innerHTML = placeholderHTML(ph.archivo.split("/").pop());
      });
      img.src = ph.archivo;
      frame.appendChild(img);

      const cap = document.createElement("span");
      cap.className = "polaroid__caption";
      cap.textContent = ph.texto || "";

      card.append(frame, cap);
      card.addEventListener("click", () => openLightbox(i));
      grid.appendChild(card);
    });
  }

  const cardObserver = "IntersectionObserver" in window
    ? new IntersectionObserver((entries) => {
        let delay = 0;
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const el = e.target;
            setTimeout(() => el.classList.add("is-in"), delay);
            delay += 180;
            cardObserver.unobserve(el);
          }
        });
      }, { root: memoriesScene, threshold: 0.2 })
    : null;

  function observeCard(card) {
    if (cardObserver) cardObserver.observe(card);
    else card.classList.add("is-in");
  }

  function setDiscover(stepData) {
    discoverText.textContent = stepData.texto;
    discoverBtn.textContent = stepData.boton;
  }

  async function runMemories() {
    buildPolaroids();
    await wait(400);
    $$(".polaroid:not([hidden])", grid).forEach(observeCard);
    await wait(1600);
    setDiscover(extraSteps > 0 ? CONFIG.recuerdos.descubrir[0] : CONFIG.recuerdos.alTerminar);
    show(discover);
  }

  discoverBtn.addEventListener("click", async () => {
    if (discoverBtn.disabled) return;
    discoverBtn.disabled = true;

    if (step >= extraSteps) {
      await go("finale");
      runFinale();
      return;
    }

    hide(discover);
    const card = grid.children[initialCount + step];
    step++;
    await wait(450);
    card.hidden = false;
    card.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "center" });
    await wait(500);
    card.classList.add("is-in");
    await wait(1300);

    setDiscover(step < extraSteps ? CONFIG.recuerdos.descubrir[step] : CONFIG.recuerdos.alTerminar);
    show(discover);
    discoverBtn.disabled = false;
  });

  /* ---------- Visor ---------- */

  const lb = $("#lightbox");
  const lbMedia = $("#lbMedia");
  const lbCaption = $("#lbCaption");
  const lbNote = $("#lbNote");
  const lbNav = $(".lightbox__nav");
  let lbIndex = 0;
  let lastFocus = null;

  const visibleIndexes = () =>
    $$(".polaroid", grid).filter((c) => !c.hidden).map((c) => Number(c.dataset.index));

  function renderLightbox() {
    const ph = photos[lbIndex];
    if (ph.missing) {
      lbMedia.innerHTML = placeholderHTML(ph.archivo.split("/").pop());
    } else {
      lbMedia.innerHTML = "";
      const img = document.createElement("img");
      img.src = ph.archivo;
      img.alt = ph.texto || "Recuerdo " + (lbIndex + 1);
      lbMedia.appendChild(img);
    }
    lbCaption.textContent = ph.texto || "";
    lbNote.textContent = ph.nota || "";
    lbNote.hidden = !ph.nota;
    lbNav.hidden = visibleIndexes().length < 2;
  }

  function openLightbox(i) {
    lastFocus = document.activeElement;
    lbIndex = i;
    renderLightbox();
    lb.hidden = false;
    requestAnimationFrame(() => requestAnimationFrame(() => lb.classList.add("is-open")));
    $("#lbClose").focus({ preventScroll: true });
  }

  function closeLightbox() {
    lb.classList.remove("is-open");
    setTimeout(() => {
      lb.hidden = true;
      if (lastFocus) lastFocus.focus({ preventScroll: true });
    }, 420);
  }

  function moveLightbox(dir) {
    const list = visibleIndexes();
    const pos = list.indexOf(lbIndex);
    lbIndex = list[(pos + dir + list.length) % list.length];
    renderLightbox();
  }

  $("#lbClose").addEventListener("click", closeLightbox);
  $("#lbPrev").addEventListener("click", () => moveLightbox(-1));
  $("#lbNext").addEventListener("click", () => moveLightbox(1));
  lb.addEventListener("click", (e) => {
    if (e.target === lb) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (lb.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") moveLightbox(-1);
    if (e.key === "ArrowRight") moveLightbox(1);
  });

  let touchX = null;
  lb.addEventListener("touchstart", (e) => { touchX = e.touches[0].clientX; }, { passive: true });
  lb.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 50 && visibleIndexes().length > 1) moveLightbox(dx < 0 ? 1 : -1);
    touchX = null;
  });

  /* =================================================================
     6 · Sorpresa final
     ================================================================= */

  const prelude = $("#prelude");
  const surpriseBtn = $("#surpriseBtn");
  const finaleCard = $("#finaleCard");

  async function runFinale() {
    const [name, l1, l2] = $$(".reveal", prelude);
    await wait(400);
    show(name);
    await wait(1800);
    show(l1);
    await wait(2400);
    show(l2);
    await wait(1400);
    show(surpriseBtn);
  }

  surpriseBtn.addEventListener("click", async () => {
    if (surpriseBtn.disabled) return;
    surpriseBtn.disabled = true;
    prelude.classList.add("is-gone");
    confetti();
    await wait(700);
    finaleCard.classList.add("is-in");
    await wait(1200);
    gentleRain(9000);
    await wait(1800);
    burstAt(W / 2, H * 0.32);
  });

  $("#replayBtn").addEventListener("click", () => {
    window.location.reload();
  });

  /* ---------- Inicio ---------- */

  runIntro();
})();
