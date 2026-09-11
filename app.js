/* MALAKLAR — tek sayfa şaka sitesi
 *
 * ───────────────────────────────────────────────────────────────
 *  İÇERİK BURADA. Metinleri değiştirmek için sadece bu bloğu düzenle.
 * ───────────────────────────────────────────────────────────────
 */

const MALAKLAR = [
  {
    id: "sila",
    ad: "SILA",
    // Repoya bu adlardan biriyle foto koy, otomatik yakalanır (ilk bulunan kazanır)
    fotolar: ["assets/sila.jpg", "assets/sila.jpeg", "assets/sila.png", "assets/sila.webp",
              "anatomi/assets/slay.jpg", "anatomi/assets/slay.jpeg", "anatomi/assets/slay.png", "anatomi/assets/slay.webp"],
    unvan: "Kısmetse Olur",
    ozet: "Her plana “kısmetse olur” der, kısmet olmaz. Takvimde “izliyorum” yazan on dört etkinlik var, hiçbirine gidilmedi.",
    alinti: "Kısmetse olur, izliyorum.",
    rozet: "izliyor",
    temelPuan: 78,
    renk: "var(--acc2)",
    ozellikler: [
      "Her davete “kısmetse olur” der. Kısmet on dört etkinliktir hiç olmadı.",
      "Konuşmanın tam ortasında “scopeee changeee” diye bağırır, konu oracıkta kapanır.",
      "Küsmez, küsmediğini de kanıtlar: “karı gibi küsme” der, küsen hep karşı taraftır.",
      "Taksi uygulaması telefonunda duruyor. Yine de sokağın ortasında “taksici abiğğğ” diye bağırmayı tercih ediyor.",
      "“Bıktım bunlardan” der, ertesi gün aynı şeyi yapar, aynı cümleyi kurar.",
      "Tanıştığı herkese ilk üç dakikada “alevi misin sen?” diye sorar. Neden sorduğunu kimse bilmiyor."
    ],
    metrikler: [
      ["Kısmet oranı", 7],
      ["Scope change sıklığı", 96],
      ["“Bıktım” deme sıklığı", 91]
    ]
  },
  {
    id: "okan",
    ad: "OKAN",
    fotolar: ["assets/okan.jpg", "assets/okan.jpeg", "assets/okan.png", "assets/okan.webp",
              "anatomi/assets/0k4n.jpg", "anatomi/assets/0k4n.jpeg", "anatomi/assets/0k4n.png", "anatomi/assets/0k4n.webp",
              "anatomi/assets/okan.jpg", "anatomi/assets/okan.jpeg", "anatomi/assets/okan.png"],
    unvan: "Bugün Ne Yiyecez",
    ozet: "Günü “bugün ne yiyecez” ile açar, “çok pahalıymış la” ile kapatır. Arada bir yerde bir MR çektirmiştir.",
    alinti: "Bugün ne yiyecez?",
    rozet: "dönerci",
    temelPuan: 83,
    renk: "var(--acc3)",
    ozellikler: [
      "Saat 10.40'ta “bugün ne yiyecez” diye sorar. Kahvaltı masadadır, daha bitmemiştir.",
      "Gelen her öneriye “döner mi yesek” ile cevap verir. Şehir fark etmez, saat fark etmez, menü hiç fark etmez.",
      "Fiyatı görünce “çok pahalıymış la” der, sonra aynı şeyi ısmarlar.",
      "Cümlenin ortasına “şaaaaak diyee” sıkıştırır, ne anlattığı o noktada kaybolur.",
      "Hiçbir sebep yokken “bohohohoyt” diye bağırır. Ne zaman geleceği belli olmaz, herkes yerinden sıçrar.",
      "“Çok çalışmam lazımm” der ve doğruca baskete gider.",
      "“MR'm çekildi” der. Sonuç temizdir. İkna olmamıştır, tekrar çektirecektir.",
      "Sohbetin en sessiz anında “gözlerinin rengini biliyor musun” diye sorar, cevabı beklemez."
    ],
    metrikler: [
      ["“Ne yiyecez” sıklığı", 97],
      ["Dönere çıkma oranı", 89],
      ["“Çalışacağım” deyip çalışma", 4]
    ]
  }
];

/* Söz duvarı — ikisinin gerçek repertuvarı */
const ALINTILAR = [
  { metin: "Kısmetse olur, izliyorum.", kim: "Sıla" },
  { metin: "Bugün ne yiyecez?", kim: "Okan" },
  { metin: "Bıktım bunlardan.", kim: "Sıla" },
  { metin: "Döner mi yesek?", kim: "Okan" },
  { metin: "Karı gibi küsme.", kim: "Sıla" },
  { metin: "Çok pahalıymış la.", kim: "Okan" },
  { metin: "HoşLANMIYORUM.", kim: "Sıla" },
  { metin: "Şaaaaak diyee.", kim: "Okan" },
  { metin: "Taksici abiğğğ! Taksici abiğğğğ!", kim: "Sıla, sokağın ortasında" },
  { metin: "Bohohohoyt.", kim: "Okan" },
  { metin: "Evde kaldımmm.", kim: "Sıla" },
  { metin: "Basket.", kim: "Okan, tek kelimelik mazeret" },
  { metin: "Bunlardann bıktımmm.", kim: "Sıla, ikinci kez" },
  { metin: "Bugün kendimi bok gibi hissediyorum.", kim: "Okan" },
  { metin: "Alevi misin sen?", kim: "Sıla, tanışmanın 3. dakikası" },
  { metin: "Çok çalışmam lazımm.", kim: "Okan, baskete giderken" },
  { metin: "Scopeee changeee!", kim: "Sıla" },
  { metin: "MR'm çekildii.", kim: "Okan" },
  { metin: "Aşko bak şimdii.", kim: "Sıla" },
  { metin: "Gözlerinin rengini biliyor musun???", kim: "Okan" }
];

/* Üstteki sayaçlar. Birincisi Okan'ın baloncuk sayacı — her baloncukta artar. */
const SAYACLAR = [
  { id: "okan", etiket: "Okan bugün bir şey dedi", baslangic: 24817, tip: "baloncuk" },
  { etiket: "“Kısmetse olur” denen plan", baslangic: 1284, hiz: 0.4 },
  { etiket: "Sokakta bağırılan taksici abi", baslangic: 391, hiz: 0.25 },
  { etiket: "Reddedilen döner önerisi", baslangic: 88, hiz: 0.15 }
];

/* “GERÇEĞİ SÖYLE” çıktıları */
const GERCEKLER = [
  "Analiz tamamlandı: kısmet bu hafta da olmadı.",
  "Takvimde “izliyorum” yazan 14 etkinlik var. Katılım: 0.",
  "Okan bugün 6 kez “bugün ne yiyecez” dedi. Saat 11.",
  "Döner önerisi reddedildi. Okan yarın tekrar önerecek.",
  "Hesap geldi. “Çok pahalıymış la” sesi kayda alındı.",
  "MR sonucu temiz çıktı. İkna olan yok.",
  "Scope yine değişti. Kimseye haber verilmedi.",
  "Taksici abi duymadı. Daha yüksek sesle denemen gerekecek.",
  "Bu butonun hiçbir işlevi yok. Üçüncü kez bastın.",
  "“Çok çalışmam lazım” cümlesi kuruldu. Basket sahası doldu.",
  "Kimse küsmedi. Küsmediği 4 saattir anlatılıyor.",
  "Tebrikler, bugün en üretken işin buydu."
];

/* Kayan şeritler */
const SERIT_UST = "KISMETSE OLUR ★ BUGÜN NE YİYECEZ ★ DÖNER Mİ YESEK ★ SCOPEEE CHANGEEE ★ ÇOK PAHALIYMIŞ LA ★ TAKSİCİ ABİĞĞĞ ★ ŞAAAAK DİYEE ★ BIKTIM BUNLARDAN ★ ";
const SERIT_ALT = "BU SİTE KİMSEYE SORULMADAN YAPILDI ★ İTİRAZLAR GRUP SOHBETİNE ★ FOTOLAR HÂLÂ GELMEDİ ★ ";

/* Sayfada sürekli fırlayan baloncuklar — Okan'ın ağzından çıkanlar */
const OKAN_BALONCUK = [
  "ŞAAAAK DİYEE",
  "BOHOHOHOYT",
  "BUGÜN NE YİYECEZ?",
  "DÖNER Mİ YESEK?",
  "ÇOK PAHALIYMIŞ LA",
  "BASKET",
  "ÇOK ÇALIŞMAM LAZIMM",
  "MR'M ÇEKİLDİİ",
  "GÖZLERİNİN RENGİNİ BİLİYOR MUSUN???",
  "AKIR"
];

/* ═══════════════════════ buradan aşağısı mekanizma ═══════════════════════ */

const $ = (sel) => document.querySelector(sel);
const rastgele = (liste) => liste[Math.floor(Math.random() * liste.length)];

const durum = {
  sel: 0,
  oylar: {},
  sayacDegerleri: SAYACLAR.map((s) => s.baslangic)
};

/* ---------- hero başlığı: harf harf zıplama ---------- */
function basligiKur() {
  const kelime = "MALAKLAR";
  const renkler = { 1: "var(--acc)", 3: "var(--acc2)", 6: "var(--acc3)" };
  $("#devBaslik").innerHTML = kelime
    .split("")
    .map((h, i) => {
      const renk = renkler[i] ? `color:${renkler[i]};` : "";
      return `<span style="${renk}animation-delay:${(i * 0.08).toFixed(2)}s">${h}</span>`;
    })
    .join("");
}

/* ---------- kayan şeritler (iki kopya = kesintisiz döngü) ---------- */
function seritleriKur() {
  $("#seritUst").innerHTML = `<span>${SERIT_UST}</span><span>${SERIT_UST}</span>`;
  $("#seritAlt").innerHTML = `<span>${SERIT_ALT}</span><span>${SERIT_ALT}</span>`;
}

/* ---------- sayaçlar ---------- */
function sayaclariCiz() {
  $("#sayaclar").innerHTML = SAYACLAR.map((s, i) => `
    <div class="sayac${s.tip === "baloncuk" ? " sayac-okan" : ""}">
      <div class="sayac-deger" data-sayac="${i}">${durum.sayacDegerleri[i].toLocaleString("tr-TR")}</div>
      <div class="sayac-etiket">${s.etiket}</div>
    </div>`).join("");
}

function sayaciGuncelle(i) {
  const el = document.querySelector(`[data-sayac="${i}"]`);
  if (el) el.textContent = durum.sayacDegerleri[i].toLocaleString("tr-TR");
}

/* ---------- fotoğraf yuvası: sürükle-bırak, tarayıcıda kalır ---------- */
const FOTO_ANAHTAR = (id) => `malaklar.foto.${id}`;

function fotoOku(id) {
  try { return localStorage.getItem(FOTO_ANAHTAR(id)); } catch { return null; }
}
function fotoYaz(id, veri) {
  try { localStorage.setItem(FOTO_ANAHTAR(id), veri); } catch { /* kota dolu olabilir, önemsiz */ }
}

// Aday yolları sırayla dener, ilk yüklenen kazanır; hiçbiri yoksa null döner.
// Sonuç önbelleğe alınır — kart her yeniden çizildiğinde tekrar yoklanmasın.
const fotoOnbellek = new Map();
function ilkBulunanFoto(yollar) {
  const anahtar = (yollar || []).join("|");
  if (fotoOnbellek.has(anahtar)) return fotoOnbellek.get(anahtar);
  const sonuc = new Promise((cevapla) => {
    const liste = yollar ? yollar.slice() : [];
    const dene = () => {
      const yol = liste.shift();
      if (!yol) return cevapla(null);
      const im = new Image();
      im.onload = () => cevapla(yol);
      im.onerror = dene;
      im.src = yol;
    };
    dene();
  });
  fotoOnbellek.set(anahtar, sonuc);
  return sonuc;
}

function fotoYuvasiBagla(yuva, malak) {
  const goster = (veri) => {
    yuva.innerHTML = veri
      ? `<img src="${veri}" alt="${malak.ad}">`
      : `<span class="foto-bos">${malak.ad} fotosu<br>sürükle bırak</span>`;
  };

  // Öncelik: kullanıcının kendi sürüklediği foto > repodaki foto > yer tutucu
  const yerel = fotoOku(malak.id);
  goster(yerel);
  if (!yerel) ilkBulunanFoto(malak.fotolar).then((yol) => {
    if (yol && !fotoOku(malak.id)) goster(yol);
  });

  const dosyaOku = (dosya) => {
    if (!dosya || !dosya.type.startsWith("image/")) return;
    const okuyucu = new FileReader();
    okuyucu.onload = () => { fotoYaz(malak.id, okuyucu.result); goster(okuyucu.result); };
    okuyucu.readAsDataURL(dosya);
  };

  yuva.addEventListener("dragover", (e) => { e.preventDefault(); yuva.classList.add("suruklenen"); });
  yuva.addEventListener("dragleave", () => yuva.classList.remove("suruklenen"));
  yuva.addEventListener("drop", (e) => {
    e.preventDefault();
    e.stopPropagation();
    yuva.classList.remove("suruklenen");
    dosyaOku(e.dataTransfer.files[0]);
  });
}

/* ---------- kadro kartları ---------- */
function kadroyuCiz() {
  const izgara = $("#kadroIzgara");
  izgara.innerHTML = "";

  MALAKLAR.forEach((m, i) => {
    const kart = document.createElement("button");
    kart.type = "button";
    kart.className = "malak-kart" + (i === durum.sel ? " secili" : "");
    kart.style.transform = `rotate(${i % 2 === 0 ? -1.6 : 1.4}deg)`;
    kart.innerHTML = `
      <div class="foto-yuva"></div>
      <div class="kart-satir">
        <span class="kart-ad">${m.ad}</span>
        <span class="kart-no">#${String(i + 1).padStart(2, "0")}</span>
      </div>
      <div class="kart-unvan" style="color:${i === durum.sel ? "var(--acc)" : m.renk}">${m.unvan}</div>`;

    fotoYuvasiBagla(kart.querySelector(".foto-yuva"), m);
    kart.addEventListener("click", () => sec(i));
    izgara.appendChild(kart);
  });
}

function sec(i) {
  durum.sel = i;
  const dosya = $("#dosya");
  dosya.style.transform = "scale(0.955)";
  setTimeout(() => { dosya.style.transform = "scale(1)"; }, 60);
  kadroyuCiz();
  dosyayiCiz();
  if (MALAKLAR[i].id === "okan") baloncukPatlamasi(6);
}

/* ---------- dosya paneli ---------- */
function dosyayiCiz() {
  const m = MALAKLAR[durum.sel];
  $("#dosyaNo").textContent = "#" + String(durum.sel + 1).padStart(2, "0");
  $("#dosyaUnvan").textContent = m.unvan;
  $("#dosyaAd").textContent = m.ad;
  $("#dosyaOzet").textContent = m.ozet;
  $("#imzaliMetin").textContent = `“${m.alinti}”`;

  $("#ozellikler").innerHTML = m.ozellikler.map((metin, i) => `
    <div class="ozellik">
      <span class="ozellik-no">${i + 1}</span>
      <span class="ozellik-metin">${metin}</span>
    </div>`).join("");

  $("#metrikler").innerHTML = m.metrikler.map(([ad, val]) => `
    <div>
      <div class="metrik-basi"><span>${ad}</span><span class="metrik-deger">${val}</span></div>
      <div class="metrik-ray"><div class="metrik-dolgu"></div></div>
    </div>`).join("");

  // çubukları bir kare sonra doldur ki animasyon görünsün
  requestAnimationFrame(() => {
    document.querySelectorAll("#metrikler .metrik-dolgu").forEach((d, i) => {
      d.style.width = m.metrikler[i][1] + "%";
    });
  });
}

/* ---------- düello ---------- */
function puanlar() {
  return MALAKLAR.map((m) => ({
    ...m,
    puan: m.temelPuan + (durum.oylar[m.id] || 0)
  }));
}

function duelloyuCiz() {
  const [a, b] = puanlar();

  const kose = (m, hedef, onde) => {
    hedef.className = "duello-kose" + (onde ? " onde" : "");
    hedef.innerHTML = `
      <div class="duello-ad">${m.ad}</div>
      <div class="duello-rozet">${m.rozet}</div>
      <div class="duello-puan">${m.puan}</div>
      <div class="duello-oy">
        <button type="button" class="oy-btn oy-arti" data-oy="${m.id}" data-yon="1" aria-label="${m.ad} artı oy">+</button>
        <button type="button" class="oy-btn oy-eksi" data-oy="${m.id}" data-yon="-1" aria-label="${m.ad} eksi oy">−</button>
      </div>`;
  };

  kose(a, $("#duelloSol"), a.puan >= b.puan);
  kose(b, $("#duelloSag"), b.puan > a.puan);

  const toplam = Math.max(1, Math.abs(a.puan) + Math.abs(b.puan));
  const oran = Math.min(96, Math.max(4, (Math.abs(a.puan) / toplam) * 100));
  $("#duelloDolgu").style.width = oran.toFixed(1) + "%";

  const fark = a.puan - b.puan;
  $("#duelloDurum").textContent =
    fark === 0 ? "Berabere. İkisi de kazanamadı, ikisi de kaybetmedi."
    : fark > 0 ? `${a.ad} ${Math.abs(fark)} malak önde.`
    : `${b.ad} ${Math.abs(fark)} malak önde.`;
}

$("#duelloAlan").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-oy]");
  if (!btn) return;
  const id = btn.dataset.oy;
  durum.oylar[id] = (durum.oylar[id] || 0) + Number(btn.dataset.yon);
  duelloyuCiz();
  if (id === "okan") baloncukPatlamasi(3);
});

/* ---------- söz duvarı ---------- */
let sozIdx = 0;
let eklenenler = [];          // ortak duvardan / yerelden gelen sözler
let duvaraYaz = null;         // Firestore'a yazan fonksiyon; yoksa yerel mod
const KIM_AD = { sila: "Sıla", okan: "Okan" };

// Kullanıcı metni HTML'e basılmadan önce kaçışlanır.
const kacisli = (m) => String(m).replace(/[&<>"']/g, (c) =>
  ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const tumSozler = () => eklenenler.concat(ALINTILAR);

function sozleriCiz() {
  const eklenenKart = (a) => `
    <div class="soz-kart eklenen">
      <div class="soz-metin">“${kacisli(a.metin)}”</div>
      <div class="soz-kim">${kacisli(a.kim)}<span class="soz-rozet">DUVARDAN</span></div>
    </div>`;
  const sabitKart = (a) => `
    <div class="soz-kart">
      <div class="soz-metin">“${a.metin}”</div>
      <div class="soz-kim">${a.kim}</div>
    </div>`;
  $("#sozIzgara").innerHTML =
    eklenenler.map(eklenenKart).join("") + ALINTILAR.map(sabitKart).join("");
  anaSozuCiz();
}

function anaSozuCiz() {
  const liste = tumSozler();
  const a = liste[sozIdx % liste.length];
  $("#anaSozMetin").textContent = `“${a.metin}”`;
  $("#anaSozKim").textContent = "— " + a.kim;
}

/* ---------- ortak duvar: Firebase varsa ortak, yoksa yerel ---------- */
const YEREL_ANAHTAR = "malaklar.sozler";

function yerelOku() {
  try { return JSON.parse(localStorage.getItem(YEREL_ANAHTAR) || "[]"); } catch { return []; }
}
function yerelYaz(liste) {
  try { localStorage.setItem(YEREL_ANAHTAR, JSON.stringify(liste)); } catch { /* kota */ }
}

function durumYaz(metin, sinif) {
  const el = $("#sozDurum");
  el.textContent = metin;
  el.className = "soz-durum" + (sinif ? " " + sinif : "");
}

function yerelModaGec(sebep) {
  eklenenler = yerelOku();
  duvaraYaz = (metin, kim) => {
    const liste = [{ metin, kim: KIM_AD[kim] }].concat(yerelOku());
    yerelYaz(liste);
    eklenenler = liste;
    return Promise.resolve();
  };
  durumYaz(sebep || "ortak duvar kapalı — eklediğin söz sadece sende görünür", "kotu");
  sozleriCiz();
}

async function duvariBagla() {
  const cfg = window.MALAKLAR_FIREBASE;
  const kurulu = cfg && Object.values(cfg).every((v) => v && !String(v).includes("BURAYA"));
  if (!kurulu) { yerelModaGec(); return; }

  try {
    const s = "https://www.gstatic.com/firebasejs/12.19.0/";
    const [{ initializeApp }, fs] = await Promise.all([
      import(s + "firebase-app.js"),
      import(s + "firebase-firestore.js")
    ]);
    const db = fs.getFirestore(initializeApp(cfg));
    const kol = fs.collection(db, "sozler");

    fs.onSnapshot(
      fs.query(kol, fs.orderBy("zaman", "desc"), fs.limit(200)),
      (anlik) => {
        eklenenler = anlik.docs.map((d) => {
          const v = d.data();
          return { metin: v.metin, kim: KIM_AD[v.kim] || v.kim };
        });
        sozleriCiz();
        durumYaz(eklenenler.length
          ? `ortak duvar bağlı — ${eklenenler.length} söz asılı`
          : "ortak duvar bağlı — ilk sözü sen as", "iyi");
      },
      (hata) => {
        console.error("[malaklar] duvar dinlenemedi:", hata);
        yerelModaGec("duvar okunamadı (" + (hata.code || hata.message) + ") — sözün sadece sende görünür");
      }
    );

    duvaraYaz = (metin, kim) =>
      fs.addDoc(kol, { metin, kim, zaman: fs.serverTimestamp() });
  } catch (hata) {
    console.error("[malaklar] firebase yüklenemedi:", hata);
    yerelModaGec("firebase yüklenemedi (" + (hata.code || hata.message) + ") — sözün sadece sende görünür");
  }
}

/* ---------- ekleme formu ---------- */
let seciliKim = "sila";
let sonGonderim = 0;

document.querySelectorAll(".kim-btn").forEach((b) => {
  b.addEventListener("click", () => {
    seciliKim = b.dataset.kim;
    document.querySelectorAll(".kim-btn").forEach((d) => d.classList.toggle("secili", d === b));
  });
});

$("#sozForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const girdi = $("#sozMetin");
  const btn = $("#sozGonder");
  const metin = girdi.value.trim().slice(0, 200);
  if (!metin) return;

  if (Date.now() - sonGonderim < 4000) { durumYaz("biraz yavaş. dört saniye bekle.", "kotu"); return; }
  if (!duvaraYaz) { durumYaz("duvar hazır değil, bir saniye", "kotu"); return; }

  btn.disabled = true;
  durumYaz("asılıyor…");
  try {
    await duvaraYaz(metin, seciliKim);
    sonGonderim = Date.now();
    girdi.value = "";
    sozIdx = 0;
    sozleriCiz();
    durumYaz("asıldı. geri alınamaz.", "iyi");
    if (seciliKim === "okan") baloncukPatlamasi(4);
  } catch (hata) {
    console.error("[malaklar] söz gönderilemedi:", hata);
    durumYaz("gitmedi: " + (hata.code || hata.message), "kotu");
  } finally {
    btn.disabled = false;
  }
});

/* ---------- imleç takibi ---------- */
(function imlecKur() {
  const kutu = $("#imlec");
  const parcalar = Array.from(kutu.children);
  let kare = null;

  window.addEventListener("mousemove", (e) => {
    if (kare) return;
    kare = requestAnimationFrame(() => {
      kare = null;
      kutu.classList.add("acik");
      parcalar.forEach((p) => { p.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`; });
    });
  }, { passive: true });
})();

/* ---------- GRUBU DAĞIT: tüm sayfayı sars ---------- */
$("#btnDagit").addEventListener("click", () => {
  const hedef = $("#sarsilan");
  const bas = performance.now();
  const sure = 720;
  const adim = (t) => {
    const gecen = t - bas;
    if (gecen > sure) { hedef.style.transform = "translate(0,0)"; return; }
    const g = 1 - gecen / sure;
    const x = (Math.random() - 0.5) * 26 * g;
    const y = (Math.random() - 0.5) * 26 * g;
    hedef.style.transform = `translate(${x.toFixed(2)}px, ${y.toFixed(2)}px)`;
    requestAnimationFrame(adim);
  };
  requestAnimationFrame(adim);
  baloncukPatlamasi(8);
});

/* ---------- Okan'ın baloncukları ---------- */
function baloncukCikar() {
  const katman = $("#baloncukKatman");
  const b = document.createElement("div");
  b.className = "baloncuk " + rastgele(["", "", "pembe", "acc"]);
  b.textContent = rastgele(OKAN_BALONCUK);
  b.style.left = (4 + Math.random() * 62).toFixed(1) + "%";
  b.style.top = (18 + Math.random() * 66).toFixed(1) + "%";
  b.style.setProperty("--kayma", ((Math.random() - 0.5) * 90).toFixed(0) + "px");
  b.style.setProperty("--don", ((Math.random() - 0.5) * 26).toFixed(0) + "deg");
  katman.appendChild(b);
  b.addEventListener("animationend", () => b.remove());

  durum.sayacDegerleri[0] += 1;
  sayaciGuncelle(0);
}

function baloncukPatlamasi(adet) {
  for (let i = 0; i < adet; i++) setTimeout(baloncukCikar, i * 110);
}

/* ---------- tehlikeli bölge ---------- */
const trollYaz = (metin) => { $("#trollMetin").textContent = metin; };

$("#btnKac").addEventListener("mouseenter", () => {
  const x = (Math.random() - 0.5) * 320;
  const y = (Math.random() - 0.5) * 190;
  $("#btnKac").style.transform = `translate(${x}px, ${y}px)`;
  trollYaz("Kaçtı. Sen de peşine düştün. Kim malak?");
});
$("#btnKac").addEventListener("click", () => trollYaz("Yakaladın. Ödül yok. Hiç olmadı."));

let klonlar = 0;
$("#btnCogalt").addEventListener("click", () => {
  if (klonlar >= 36) { trollYaz("Yeter. 36 malak yeterince malak."); return; }
  const katman = $("#klonKatman");
  for (let i = 0; i < 4; i++) {
    const k = document.createElement("div");
    k.className = "klon";
    k.textContent = "O_O";
    k.style.left = (6 + Math.random() * 86).toFixed(1) + "%";
    k.style.top = (38 + Math.random() * 50).toFixed(1) + "%";
    katman.appendChild(k);
    klonlar++;
  }
  trollYaz("Malak sayısı arttı. Zeka sabit kaldı.");
});

$("#btnGercek").addEventListener("click", () => trollYaz(rastgele(GERCEKLER)));

$("#btnTemizle").addEventListener("click", () => {
  $("#klonKatman").innerHTML = "";
  klonlar = 0;
  $("#btnKac").style.transform = "translate(0,0)";
  trollYaz("Toparlandı. Yine dağıtacaksın.");
});

/* ---------- başlat ---------- */
basligiKur();
seritleriKur();
sayaclariCiz();
kadroyuCiz();
dosyayiCiz();
duelloyuCiz();
sozleriCiz();
trollYaz("Hazır. Bir şeye bas, ne olacağını ikimiz de biliyoruz.");
duvariBagla();

// sayaçlar sürekli artsın
setInterval(() => {
  SAYACLAR.forEach((s, i) => {
    if (s.tip === "baloncuk") return;          // o sayaç baloncuklarla artıyor
    if (Math.random() < s.hiz) {
      durum.sayacDegerleri[i] += 1;
      sayaciGuncelle(i);
    }
  });
}, 1400);

// söz duvarı dönsün
setInterval(() => {
  sozIdx = (sozIdx + 1) % tumSozler().length;
  anaSozuCiz();
}, 4200);

// Okan arka planda durmadan konuşsun
setInterval(baloncukCikar, 2600);
setTimeout(() => baloncukPatlamasi(2), 900);
