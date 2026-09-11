# 🩻 MALAK ANATOMİ LABORATUVARI

Arkadaşları şakalamak için yapılmış, tamamen **ön yüz** (HTML + CSS + JS) bir şaka sitesi.
Derleme yok, bağımlılık yok, sunucu yok. `index.html`'i çift tıkla, çalışır.

## Nasıl çalışıyor?

1. Açılışta sahte bir sistem terminali kod akıtır (tıklayınca geçilir).
2. İki denek kartı gelir: **SLAY** ve **0K4N**.
3. Bir karta tıklayınca tam tarama başlar:
   - **TARANIYOR** — ışın yukarıdan aşağı süzülür, iskelet çizilir
   - **KATMANLARA AYRILIYOR** — fotoğraf deri / kas / sinir / röntgen katmanlarına ayrılır,
     katmanlar sırayla soyulup uçar, geriye röntgen kalır
   - **BİRLEŞTİRİLİYOR** → **BULGULAR YAZILIYOR** — organ noktaları yanar,
     etiketler tellerle o noktalara bağlanır, özellikler tek tek yazılır
4. Altta biyometrik ölçümler ve teşhis çıkar.
5. "RAPORU İNDİR" butonu şakadır, indirmez. 😹

`ESC` veya ✕ ile denek seçimine dönersin. Sağ üstteki 🔊 sesi açıp kapatır
(ses dosyası yok, sesler WebAudio ile anlık üretiliyor).

## ⚠️ Fotoğrafları koy

Depoda fotoğraf yok. Şu iki dosyayı `assets/` klasörüne at:

```
assets/slay.jpg     ← Sıla'nın fotoğrafı
assets/0k4n.jpg     ← Okan'ın fotoğrafı
```

- `.jpg` yoksa sırayla `.jpeg`, `.png`, `.webp` de denenir — uzantı ne olursa olsun çalışır.
- Fotoğraf bulunamazsa site bozulmaz; yerine "GÖRSEL BEKLENİYOR" yazan yer tutucu görünür.
- **En iyi sonuç için:** kare-ish, yüzün ortada olduğu bir vesikalık/portre kullan.
  Görsel kafa kapsülüne kırpılır (`object-position: center 22%`), gövdeyi iskelet tamamlar.
  Röntgen efekti CSS filtreleriyle uygulanır, fotoğrafı önceden düzenlemene gerek yok.

## Özellikleri / şakaları değiştirmek

Her şey tek dosyada: **`js/data.js`**. Başka yere dokunmana gerek yok.

```js
{
  organ: "GURUR BEZİ",          // etiket başlığı
  latin: "Glandula egoica",     // altındaki sahte latince
  side: "left",                 // etiket hangi sütunda: "left" | "right"
  x: 23, y: 60,                 // organ noktasının kutu içindeki yeri (%)
  text: "Asla yardım isteyemem ve kabul edemem.",
  note: "Dolabı tek başına 4. kata taşıdı. Asansör çalışıyordu.",
  level: 99,                    // etiketin altındaki ince çubuk
  error: true                   // (isteğe bağlı) kırmızı "SİSTEM HATASI" görünümü
}
```

Konum ipuçları (`x` / `y` yüzde olarak, kutunun sol üstünden):

| bölge | x | y |
|---|---|---|
| beyin / alın | 50 | 15 |
| ağız / çene | 50 | 30 |
| kalp | 44 | 47 |
| göğüs kafesi | 50 | 45 |
| sol el | 23 | 60 |
| sağ el | 77 | 59 |
| leğen kemiği | 50 | 66 |
| bacaklar | 45 | 82 |

Yeni denek eklemek istersen `window.MALAKLAR` dizisine aynı şekilde bir kayıt daha ekle —
kart, renk teması ve tarama ekranı otomatik oluşur. `accent` rengi tüm ekranı boyar.

## Yayınlamak

Statik site, her yerde çalışır. GitHub Pages için:
**Settings → Pages → Source: Deploy from a branch**, dalı ve `/ (root)` klasörünü seç.

Yerelde sunucuyla denemek istersen:

```bash
npx serve .        # ya da: python3 -m http.server
```

## Dosyalar

```
index.html                     iskelet SVG'si ve sayfa yapısı
css/style.css                  tüm görünüm + animasyonlar (faz tabanlı)
js/data.js                     DENEKLER VE ÖZELLİKLERİ — düzenleyeceğin yer burası
js/main.js                     tarama koreografisi, teller, ses, efektler
assets/placeholder-*.svg       fotoğraf yokken görünen yer tutucular
```

---

Bu site tamamen şaka amaçlıdır. Tıbbi tavsiye değildir. Kediye bulaşmayın. 🐈‍⬛
