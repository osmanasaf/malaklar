/* ══════════════════════════════════════════════════════════════
   MALAK ANATOMİ LABORATUVARI — motor
   ══════════════════════════════════════════════════════════════ */
(() => {
"use strict";

const $  = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const el = {
  boot:    $("#boot"),     bootLog: $("#bootLog"), bootBar: $("#bootBar"),
  select:  $("#select"),   cards:   $("#cards"),
  lab:     $("#lab"),      stage:   $("#stage"),   wires:   $("#wires"),
  colL:    $("#colLeft"),  colR:    $("#colRight"),
  capsule: $("#capsule"),  skeleton:$("#skeleton"),hotspots:$("#hotspots"),
  chip:    $("#labChip"),  name:    $("#labName"), sub:     $("#labSub"),
  phaseTxt:$("#phaseTxt"), progTxt: $("#progTxt"), progBar: $("#progBar"),
  stats:   $("#stats"),    verdict: $("#verdict"), vPanel:  $("#verdictPanel"),
  stamp:   $("#stamp"),    bpm:     $("#bpm"),     sndBtn:  $("#sndBtn"),
  closeBtn:$("#closeBtn"), dlBtn:   $("#dlBtn"),   otherBtn:$("#otherBtn"),
  dlWrap:  $("#dlWrap"),   dlBar:   $("#dlBar"),   dlTxt:   $("#dlTxt"),
  statsPanel: $(".stats-panel")
};

let timers = [];
let current = null;
let bpmTimer = null;
const later = (fn, ms) => timers.push(setTimeout(fn, ms));
const clearTimers = () => { timers.forEach(clearTimeout); timers = []; };

/* ═══════ SES (dosyasız, WebAudio ile üretiliyor) ═══════ */
const Snd = {
  ctx: null, on: true,
  boot(){ if (!this.ctx){ try { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e){ this.on = false; } }
          if (this.ctx && this.ctx.state === "suspended") this.ctx.resume(); },
  tone(freq, dur = .12, type = "sine", vol = .12, slideTo = null){
    if (!this.on || !this.ctx) return;
    const t = this.ctx.currentTime, o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + .012);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(this.ctx.destination); o.start(t); o.stop(t + dur + .02);
  },
  noise(dur = .3, vol = .12, freq = 700){
    if (!this.on || !this.ctx) return;
    const t = this.ctx.currentTime, len = Math.floor(this.ctx.sampleRate * dur);
    const buf = this.ctx.createBuffer(1, len, this.ctx.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const src = this.ctx.createBufferSource(); src.buffer = buf;
    const f = this.ctx.createBiquadFilter(); f.type = "lowpass"; f.frequency.value = freq;
    const g = this.ctx.createGain(); g.gain.value = vol;
    src.connect(f).connect(g).connect(this.ctx.destination); src.start(t);
  },
  blip(){ this.tone(880 + Math.random() * 220, .07, "square", .05); },
  scan(){ this.tone(1400, 1.4, "sine", .07, 220); },
  thunk(){ this.noise(.45, .16, 420); this.tone(70, .4, "sine", .16); },
  chime(){ this.tone(660, .16, "triangle", .1); later(() => this.tone(990, .3, "triangle", .1), 130); },
  type(){ this.tone(1200 + Math.random() * 500, .02, "square", .022); }
};
el.sndBtn.addEventListener("click", () => {
  Snd.on = !Snd.on; Snd.boot();
  el.sndBtn.textContent = Snd.on ? "🔊" : "🔇";
  el.sndBtn.setAttribute("aria-pressed", String(Snd.on));
  if (Snd.on) Snd.blip();
});

/* ═══════ ARKA PLAN TOZU ═══════ */
(function dust(){
  const c = $("#dust"); if (!c || REDUCED) return;
  const ctx = c.getContext("2d");
  let w, h, parts = [];
  const size = () => {
    const dpr = Math.min(devicePixelRatio || 1, 2);
    w = c.width = innerWidth * dpr; h = c.height = innerHeight * dpr;
    c.style.width = innerWidth + "px"; c.style.height = innerHeight + "px";
    parts = Array.from({ length: Math.round(innerWidth / 16) }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      r: (Math.random() * 1.5 + .4) * dpr,
      vy: -(Math.random() * .28 + .06) * dpr,
      vx: (Math.random() - .5) * .16 * dpr,
      a: Math.random() * .5 + .12
    }));
  };
  size(); addEventListener("resize", size);
  (function loop(){
    ctx.clearRect(0, 0, w, h);
    for (const p of parts){
      p.y += p.vy; p.x += p.vx;
      if (p.y < -10){ p.y = h + 10; p.x = Math.random() * w; }
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 7);
      ctx.fillStyle = `rgba(140,225,255,${p.a})`; ctx.fill();
    }
    requestAnimationFrame(loop);
  })();
})();

/* ═══════ AÇILIŞ TERMİNALİ ═══════ */
(function bootSeq(){
  const lines = window.BOOT_LINES || [];
  let li = 0, ci = 0, killed = false;
  const finish = () => {
    if (killed) return; killed = true;
    el.boot.classList.add("done");
    later(() => { el.boot.style.display = "none"; }, 600);
  };
  el.boot.addEventListener("click", () => { Snd.boot(); finish(); });
  addEventListener("keydown", e => { if (!killed && (e.key === "Enter" || e.key === " ")) finish(); }, { once:true });

  const step = () => {
    if (killed) return;
    if (li >= lines.length){ later(finish, 480); return; }
    const line = lines[li];
    if (ci <= line.length){
      const shown = lines.slice(0, li).join("\n") + (li ? "\n" : "") + line.slice(0, ci);
      el.bootLog.innerHTML = shown
        .replace(/\[ TAMAM \]/g, '<span class="ok">[ TAMAM ]</span>')
        .replace(/\[ YOK  \]/g, '<span class="no">[ YOK  ]</span>');
      if (ci % 3 === 0) Snd.type();
      ci++;
      el.bootBar.style.width = Math.round(((li + ci / (line.length + 1)) / lines.length) * 100) + "%";
      setTimeout(step, REDUCED ? 0 : 11);
    } else { li++; ci = 0; setTimeout(step, REDUCED ? 0 : 95); }
  };
  setTimeout(step, REDUCED ? 0 : 320);
})();

/* ═══════ GÖRSEL YÜKLEME (jpg→jpeg→png→webp→yedek) ═══════ */
function resolvePhoto(ch, cb){
  if (ch._src) return cb(ch._src);
  const list = [...ch.photos, ch.placeholder];
  let i = 0;
  const probe = new Image();
  probe.onload  = () => { ch._src = list[i]; cb(ch._src); };
  probe.onerror = () => { if (++i < list.length) probe.src = list[i]; else cb(ch.placeholder); };
  probe.src = list[0];
}

/* ═══════ DENEK KARTLARI ═══════ */
function buildCards(){
  window.MALAKLAR.forEach((ch, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "card"; b.style.setProperty("--c", ch.accent);
    b.innerHTML = `
      <div class="card-photo">
        <span class="card-tag">${ch.code}</span>
        <img alt="${ch.name}" src="${ch.placeholder}">
        <span class="card-ret"></span>
      </div>
      <div class="card-body">
        <h2 class="card-name">${ch.name}</h2>
        <p class="card-real">denek · ${ch.real}</p>
        <p class="card-line">${ch.tagline}</p>
        <div class="card-cta"><span>TARAMAYI BAŞLAT</span><span class="arrow">➜</span></div>
      </div>`;
    const img = $("img", b);
    if (ch.odak) b.style.setProperty("--odak-kart", ch.odak);
    resolvePhoto(ch, src => { img.src = src; });
    b.addEventListener("mouseenter", () => Snd.blip());
    b.addEventListener("click", () => {
      Snd.boot(); Snd.thunk();
      $$(".card").forEach(c => c.classList.add(c === b ? "picked" : "dropped"));
      later(() => openLab(ch), 420);
    });
    el.cards.appendChild(b);
    b.style.animationDelay = (-i * 3) + "s";
  });
}

/* ═══════ İSKELET ÇİZİM HAZIRLIĞI ═══════ */
function primeSkeleton(){
  $$("path", el.skeleton).forEach(p => {
    const len = Math.ceil(p.getTotalLength ? p.getTotalLength() : 400) + 4;
    p.style.setProperty("--len", len);
  });
}

/* ═══════ LABORATUVARI AÇ ═══════ */
function openLab(ch){
  clearTimers();
  current = ch;

  document.documentElement.style.setProperty("--acc",  ch.accent);
  document.documentElement.style.setProperty("--acc2", ch.accent2);

  el.select.classList.add("hide");
  el.lab.hidden = false;
  el.lab.dataset.phase = "prep";
  window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });

  /* başlık */
  el.chip.textContent = ch.code;
  el.name.textContent = ch.name;
  el.sub.textContent  = `denek · ${ch.real} · ${ch.species}`;

  /* görseller */
  el.capsule.style.setProperty("--odak", ch.odak || "center 22%");
  resolvePhoto(ch, src => $$(".layer img", el.capsule).forEach(i => { i.src = src; }));

  /* temizlik */
  el.colL.innerHTML = ""; el.colR.innerHTML = "";
  el.hotspots.innerHTML = ""; el.wires.innerHTML = "";
  el.stats.innerHTML = ""; el.verdict.textContent = "";
  el.stamp.classList.remove("in");
  el.skeleton.classList.remove("drawn");
  el.statsPanel.classList.remove("in"); el.vPanel.classList.remove("in");
  el.dlWrap.hidden = true; el.dlBar.style.width = "0"; el.dlTxt.className = "dl-txt";
  el.progBar.style.width = "0"; el.progTxt.textContent = "%0";
  primeSkeleton();

  /* etiketler + hotspotlar (gizli olarak hazırlanıyor) */
  ch.traits.forEach((t, i) => {
    const tag = document.createElement("div");
    tag.className = "tag" + (t.error ? " is-error" : "") + (t.wound ? " is-wound" : "");
    tag.dataset.idx = i;
    tag.innerHTML = `
      <div class="tag-head">
        <span class="tag-idx">${i + 1}</span>
        <span class="tag-organ">${t.organ}</span>
      </div>
      <p class="tag-latin">${t.latin}</p>
      <p class="tag-text">${t.text}</p>
      <p class="tag-note">${t.note}</p>
      <div class="tag-meter"><i></i></div>`;
    (t.side === "left" ? el.colL : el.colR).appendChild(tag);

    const hot = document.createElement("span");
    hot.className = "hot" + (t.error ? " err" : "");
    hot.style.left = t.x + "%"; hot.style.top = t.y + "%";
    hot.dataset.idx = i;
    el.hotspots.appendChild(hot);

    tag.addEventListener("mouseenter", () => { hot.classList.add("big"); Snd.blip(); });
    tag.addEventListener("mouseleave", () => hot.classList.remove("big"));
  });

  /* istatistikler */
  ch.stats.forEach(s => {
    const row = document.createElement("div");
    row.className = "stat-row" + (s.value > 100 ? " over" : "") + (s.value <= 12 ? " low" : "");
    row.innerHTML = `
      <span class="stat-label">${s.label}</span>
      <span class="stat-val" data-v="${s.value}">%0</span>
      <span class="stat-track"><i class="stat-fill" style="--w:${Math.min(s.value,100)}%"></i></span>`;
    el.stats.appendChild(row);
  });
  el.verdict.textContent = ch.verdict;

  /* nabız */
  clearInterval(bpmTimer);
  bpmTimer = setInterval(() => {
    el.bpm.textContent = 68 + Math.floor(Math.random() * 26);
  }, 900);

  runSequence(ch);
}

/* ═══════ TARAMA KOREOGRAFİSİ ═══════ */
function setPhase(p, label){
  el.lab.dataset.phase = p;
  el.phaseTxt.textContent = label;
}
function animProgress(to, ms){
  const from = parseFloat(el.progBar.style.width) || 0, t0 = performance.now();
  const tick = now => {
    const k = Math.min(1, (now - t0) / ms);
    const v = from + (to - from) * (1 - Math.pow(1 - k, 3));
    el.progBar.style.width = v + "%";
    el.progTxt.textContent = "%" + Math.round(v);
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

function runSequence(ch){
  const S = REDUCED ? .18 : 1;   // hareket azaltma modunda hızlı geç

  later(() => {
    setPhase("scan", "TARANIYOR"); animProgress(34, 1500 * S);
    el.skeleton.classList.add("drawn");   // iskelet tarama sırasında çizilir
    Snd.scan();
  }, 220 * S);

  later(() => {
    setPhase("explode", "KATMANLARA AYRILIYOR"); animProgress(64, 1700 * S);
    Snd.thunk();
  }, 1800 * S);

  later(() => { setPhase("assemble", "BİRLEŞTİRİLİYOR"); animProgress(82, 800 * S); Snd.tone(300, .3, "sine", .1, 600); }, 3700 * S);

  later(() => {
    setPhase("reveal", "BULGULAR YAZILIYOR"); animProgress(100, 1600 * S);

    /* hotspot + etiketleri sırayla aç */
    ch.traits.forEach((t, i) => {
      later(() => {
        $(`.hot[data-idx="${i}"]`, el.hotspots)?.classList.add("in");
        const tag = $(`.tag[data-idx="${i}"]`);
        if (tag){
          tag.classList.add("in");
          const meter = $(".tag-meter i", tag);
          later(() => { if (meter) meter.style.width = Math.min(t.level ?? 80, 100) + "%"; }, 240);
        }
        t.error ? Snd.tone(180, .35, "sawtooth", .1, 90) : Snd.blip();
        drawWires();
      }, i * 480 * S);
    });

    const after = ch.traits.length * 480 * S;

    later(() => {
      el.statsPanel.classList.add("in");
      $$(".stat-fill", el.stats).forEach((f, i) =>
        later(() => {
          f.style.width = f.style.getPropertyValue("--w");
          const val = f.closest(".stat-row").querySelector(".stat-val");
          countTo(val, +val.dataset.v, 1100 * S);
          Snd.tone(520 + i * 90, .06, "square", .04);
        }, i * 130 * S));
    }, after + 260 * S);

    later(() => {
      el.vPanel.classList.add("in");
      setPhase("done", "TAMAMLANDI");
      el.stamp.classList.add("in");
      Snd.chime();
      drawWires();
    }, after + 900 * S);
  }, 4600 * S);
}

function countTo(node, target, ms){
  const t0 = performance.now();
  const tick = now => {
    const k = Math.min(1, (now - t0) / ms);
    node.textContent = "%" + Math.round(target * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/* ═══════ BAĞLANTI TELLERİ ═══════ */
function drawWires(){
  if (!current || el.lab.hidden) return;
  if (innerWidth <= 900){ el.wires.innerHTML = ""; return; }

  const sb = el.stage.getBoundingClientRect();
  el.wires.setAttribute("viewBox", `0 0 ${sb.width} ${sb.height}`);
  el.wires.innerHTML = "";

  $$(".tag.in").forEach(tag => {
    const i   = tag.dataset.idx;
    const hot = $(`.hot[data-idx="${i}"]`, el.hotspots);
    if (!hot) return;
    const tb = tag.getBoundingClientRect(), hb = hot.getBoundingClientRect();
    const left = tag.closest(".col-left");
    const sx = (left ? tb.right : tb.left) - sb.left;
    const sy = tb.top + tb.height / 2 - sb.top;
    const hx = hb.left + hb.width / 2 - sb.left;
    const hy = hb.top  + hb.height / 2 - sb.top;
    const mx = sx + (left ? 22 : -22);

    const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    dot.setAttribute("cx", sx); dot.setAttribute("cy", sy); dot.setAttribute("r", 2.6);

    const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
    line.setAttribute("points", `${sx},${sy} ${mx},${sy} ${hx},${hy}`);
    const len = Math.abs(mx - sx) + Math.hypot(hx - mx, hy - sy) + 4;
    line.style.strokeDasharray = len; line.style.strokeDashoffset = len;
    line.animate([{ strokeDashoffset: len }, { strokeDashoffset: 0 }],
                 { duration: REDUCED ? 1 : 520, easing: "ease-out", fill: "forwards" });

    el.wires.append(line, dot);
  });
}
let wireRaf;
addEventListener("resize", () => { cancelAnimationFrame(wireRaf); wireRaf = requestAnimationFrame(drawWires); });

/* ═══════ KAPAT / GERİ ═══════ */
function closeLab(){
  clearTimers(); clearInterval(bpmTimer);
  el.lab.hidden = true; el.lab.dataset.phase = "prep";
  el.select.classList.remove("hide");
  $$(".card").forEach(c => c.classList.remove("picked", "dropped"));
  document.documentElement.style.setProperty("--acc",  "#37e6ff");
  document.documentElement.style.setProperty("--acc2", "#a9f3ff");
  current = null;
  Snd.tone(420, .12, "sine", .08, 200);
  window.scrollTo({ top: 0, behavior: REDUCED ? "auto" : "smooth" });
}
el.closeBtn.addEventListener("click", closeLab);
el.otherBtn.addEventListener("click", closeLab);
addEventListener("keydown", e => { if (e.key === "Escape" && !el.lab.hidden) closeLab(); });

/* ═══════ SAHTE RAPOR İNDİRME (şaka) ═══════ */
const DL_STEPS = [
  [18,  "kemik verileri toplanıyor..."],
  [37,  "utanç verici anılar taranıyor..."],
  [58,  "sansür uygulanıyor..."],
  [76,  "PDF derleniyor..."],
  [91,  "avukatlara danışılıyor..."],
  [99,  "son kontrol..."]
];
el.dlBtn.addEventListener("click", () => {
  el.dlBtn.disabled = true;
  el.dlWrap.hidden = false;
  el.dlTxt.className = "dl-txt";
  let i = 0;
  const next = () => {
    if (i < DL_STEPS.length){
      const [p, txt] = DL_STEPS[i++];
      el.dlBar.style.width = p + "%";
      el.dlTxt.textContent = txt;
      Snd.tone(600 + i * 60, .05, "square", .04);
      later(next, 620);
    } else {
      el.dlTxt.className = "dl-txt joke";
      el.dlTxt.textContent = "şaka lan, rapor yok 😹 sen zaten biliyordun";
      Snd.tone(420, .5, "sawtooth", .1, 90);
      confetti();
      later(() => { el.dlBtn.disabled = false; }, 900);
    }
  };
  next();
});

function confetti(){
  if (REDUCED) return;
  const colors = [current?.accent || "#37e6ff", "#ffd04d", "#ff4d4d", "#6affc0", "#ffffff"];
  const r = el.dlBtn.getBoundingClientRect();
  for (let i = 0; i < 46; i++){
    const d = document.createElement("i");
    d.className = "confetti";
    d.style.background = colors[i % colors.length];
    d.style.left = (r.left + r.width / 2) + "px";
    d.style.top  = (r.top  + r.height / 2) + "px";
    document.body.appendChild(d);
    const ang = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 260;
    d.animate([
      { transform: "translate(-50%,-50%) rotate(0deg)", opacity: 1 },
      { transform: `translate(${Math.cos(ang)*dist - 50}%, ${Math.sin(ang)*dist + 380}%) rotate(${Math.random()*900-450}deg)`, opacity: 0 }
    ], { duration: 1300 + Math.random() * 900, easing: "cubic-bezier(.2,.7,.4,1)", fill: "forwards" })
     .onfinish = () => d.remove();
  }
}

/* ═══════ BAŞLAT ═══════ */
buildCards();
primeSkeleton();
document.addEventListener("pointerdown", () => Snd.boot(), { once: true });
})();
