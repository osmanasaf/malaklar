# MALAKLAR

İki kişilik bir grup sohbetinin kamuya açık dosyası. Denekler: **Sıla** ve **Okan**.
Tamamen ön yüz (HTML + CSS + JS). Derleme yok, bağımlılık yok, sunucu yok.

Depoda iki ayrı site var:

| | Adres | Ne |
|---|---|---|
| 🟡 **Malaklar** | `/` (ana sayfa) | Asit-neon tek sayfa: kadro kartları, malak dosyası, düello, söz duvarı, troll bölgesi |
| 🩻 **Anatomi Laboratuvarı** | `/anatomi/` | Röntgen/otopsi temalı tarama: katman soyma, organ etiketleri, biyometrik ölçüm, teşhis |

İkisi birbirine linkli — ana sayfada üstteki **🩻 LABORATUVAR** butonu, laboratuvarda sol alttaki **← MALAKLAR**.

---

## 🟡 Malaklar (ana sayfa)

`index.html`'i çift tıkla, çalışır.

- **KADRO** — iki büyük kart. Tıklayınca malak dosyası açılır: özet, metrik çubukları, komik özellikler, imzalı söz.
- **DÜELLO** — Sıla vs Okan, +/− oylarla kafa kafaya puan çubuğu.
- **SÖZ DUVARI** — ikisinin gerçek repertuvarı, büyükte sırayla döner.
- **TEHLİKELİ BÖLGE** — kaçan buton, malak çoğaltma, "gerçeği söyle" çıktısı.
- **Okan'ın baloncukları** — sayfada durmadan ağzından bir şey fırlar (AKIR, BOHOHOHOYT, DÖNER Mİ YESEK…). Üstteki mavi sayaç her baloncukta artar.
- **GRUBU DAĞIT** — tüm sayfayı sarsar.

### Metinleri değiştirmek

Her şey **`app.js`**'in en üstündeki `İÇERİK` bloğunda:

| Sabit | Ne |
|---|---|
| `MALAKLAR` | Denekler: lakap, özet, imzalı söz, komik özellikler, metrikler, düello puanı |
| `ALINTILAR` | Söz duvarı |
| `SAYACLAR` | Üstteki dört sayaç (birincisi Okan'ın baloncuk sayacı) |
| `GERCEKLER` | "GERÇEĞİ SÖYLE" çıktıları |
| `OKAN_BALONCUK` | Baloncuklarda çıkacak laflar |
| `SERIT_UST` / `SERIT_ALT` | Kayan şeritler |

### Fotoğraflar

Depoya şu iki dosyayı koy, **iki site birden** otomatik yakalar — kod değiştirmene gerek yok:

```
anatomi/assets/slay.jpg     ← Sıla
anatomi/assets/0k4n.jpg     ← Okan
```

- Uzantı fark etmez: `.jpg`, `.jpeg`, `.png`, `.webp` sırayla denenir.
- Ana sayfa kendi klasörünü de kullanabilir: `assets/sila.*`, `assets/okan.*` (varsa bunlar öncelikli).
- Foto yoksa site bozulmaz: kartta "sürükle bırak" yer tutucusu, laboratuvarda "GÖRSEL BEKLENİYOR" görünür.
- **En iyi sonuç:** kare-ish, yüzün ortada olduğu bir portre. Laboratuvar görseli kafa kapsülüne kırpar, röntgen efektini CSS uygular — önceden düzenlemene gerek yok.

Sadece kendi tarayıcında denemek istersen kartın boş yuvasına bir resim sürükleyip bırakabilirsin; o foto `localStorage`'da kalır, başkasına görünmez.

---

## 🩻 Anatomi Laboratuvarı

Kurulum, fotoğraf koyma ve özellik düzenleme talimatları kendi klasöründe:
**[`anatomi/README.md`](anatomi/README.md)**

Kısaca: fotoğraflar `anatomi/assets/slay.jpg` ve `anatomi/assets/0k4n.jpg` olarak konur
(yoksa yer tutucu görünür, site bozulmaz), şakalar `anatomi/js/data.js`'te durur.

---

## Yayınlamak

Statik site, her yerde çalışır. GitHub Pages için:
**Settings → Pages → Source: Deploy from a branch → `main` / `(root)`**

Yerelde sunucuyla denemek istersen:

```bash
npx serve .        # ya da: python3 -m http.server
```

---

Bu site tamamen şaka amaçlıdır. Tıbbi tavsiye değildir. Kediye bulaşmayın. 🐈‍⬛
