/* ══════════════════════════════════════════════════════════════
   DENEK VERİTABANI
   Yeni denek eklemek için bu listeye bir kayıt daha ekle.
   x / y  → hotspot'un spesimen kutusu içindeki konumu (%)
   side   → etiket hangi sütunda duracak ("left" | "right")
   ══════════════════════════════════════════════════════════════ */
window.MALAKLAR = [
  {
    key: "slay",
    name: "SLAY",
    real: "Sıla",
    code: "SLY-001",
    accent: "#ff2d95",
    accent2: "#ff9ad1",
    photos: ["assets/slay.jpg", "assets/slay.jpeg", "assets/slay.png", "assets/slay.webp"],
    placeholder: "assets/placeholder-slay.svg",
    tagline: "tek başına halleder, sorma",
    species: "Homo Bağımsızikus",
    traits: [
      {
        organ: "GURUR BEZİ",
        latin: "Glandula egoica",
        side: "left", x: 23, y: 60,
        text: "Asla yardım isteyemem ve kabul edemem.",
        note: "Dolabı tek başına 4. kata taşıdı. Asansör çalışıyordu.",
        level: 99
      },
      {
        organ: "SOKAK HAYVANI MERKEZİ",
        latin: "Cor felinum",
        side: "left", x: 44, y: 47,
        text: "Sokak hayvanlarına bayılırım.",
        note: "300 metre çapındaki her kediyi tanıyor, hepsine isim vermiş.",
        level: 100
      },
      {
        organ: "SAVAŞ YARASI #1",
        latin: "Cicatrix felis",
        side: "right", x: 75, y: 55,
        text: "1 tane kediden dayak yedim.",
        note: "Rakip: 2.4 kg. Skor: 1-0. Rövanş talebi reddedildi.",
        level: 76,
        wound: true
      },
      {
        organ: "KAHKAHA KORTEKSİ",
        latin: "Cortex okanensis",
        side: "right", x: 50, y: 17,
        text: "Okan'ın her söylediğine kahkaha krizine girerim.",
        note: "Okan 'su' dedi. Ölçülen gülme süresi: 11 dakika 40 saniye.",
        level: 100
      }
    ],
    stats: [
      { label: "İnatçılık",               value: 99  },
      { label: "Yardım kabul etme",       value: 0   },
      { label: "Kedi karşısında güç",     value: 4   },
      { label: "Sokak hayvanı radarı",    value: 96  },
      { label: "Okan'a gülme kapasitesi", value: 240 }
    ],
    verdict: "Kronik Bağımsızlık Sendromu tespit edildi. Hastanın bağışıklık sistemi 'yardım' kelimesini virüs olarak tanıyor. Tedavi mevcut değil; zaten hasta tedaviyi de reddetti. Kedilerden uzak durması önerilir."
  },

  {
    key: "okan",
    name: "0K4N",
    real: "Okan",
    code: "0KN-404",
    accent: "#45ff9f",
    accent2: "#b6ffd8",
    photos: ["assets/0k4n.jpg", "assets/0k4n.jpeg", "assets/0k4n.png", "assets/0k4n.webp",
             "assets/okan.jpg", "assets/okan.jpeg", "assets/okan.png"],
    placeholder: "assets/placeholder-okan.svg",
    tagline: "kelimeleri kendi üretir, kaynak göstermez",
    species: "Homo Uydurmensis",
    traits: [
      {
        organ: "BASKET MOTOR KORTEKSİ",
        latin: "Area basketballis",
        side: "left", x: 77, y: 59,
        text: "Basket oynamayı severim.",
        note: "İsabet oranı %12. Öz güven oranı %340. Aradaki fark: pota.",
        level: 61
      },
      {
        organ: "KELİME ÜRETİM FABRİKASI",
        latin: "Fabrica verborum",
        side: "left", x: 50, y: 30,
        text: "Götten kelime uydurup herkese yayarım.",
        note: "Üretim: 47 kelime. TDK'da kayıtlı olan: 0. Yayılma hızı: grip.",
        level: 100
      },
      {
        organ: "ARIZALI GÖRÜŞ MODÜLÜ",
        latin: "Modulus obsoletus",
        side: "right", x: 50, y: 15,
        text: "Kadınların cinselliğini yaşamasını doğru bulmuyorum.",
        note: "⚠ SİSTEM HATASI: 1923 model sürücü bulundu. Güncelleme 47 kez reddedildi. Yeniden başlatma önerilir.",
        level: 3,
        error: true
      }
    ],
    stats: [
      { label: "Uydurma kelime üretimi",  value: 100 },
      { label: "Basket isabeti",          value: 12  },
      { label: "Öz güven",                value: 340 },
      { label: "Fikirlerin güncelliği",   value: 3   },
      { label: "Ses yüksekliği",          value: 91  }
    ],
    verdict: "Konuşma merkezi ile düşünme merkezi arasındaki kablo kopuk. Ağız, beynin onayını beklemeden yayın yapıyor. Görüş modülü fabrika ayarlarına döndürülmeli. Öneri: fişi çek, 100 yıl bekle, tekrar tak."
  }
];

/* Açılış terminali satırları */
window.BOOT_LINES = [
  "> MALAK-OS v2.6 başlatılıyor",
  "> anatomi çekirdeği yükleniyor ............ [ TAMAM ]",
  "> x-ray modülü kalibre ediliyor ........... [ TAMAM ]",
  "> kemik veritabanı bağlanıyor ............. [ TAMAM ]",
  "> etik kurul onayı aranıyor ............... [ YOK  ]",
  "> yine de devam ediliyor .................. [ TAMAM ]",
  "> denek veritabanı taranıyor .............. 2 kayıt",
  "> sistem hazır."
];
