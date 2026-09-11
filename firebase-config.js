/* ═══════════════════════════════════════════════════════════════
   ORTAK SÖZ DUVARI AYARLARI
   ═══════════════════════════════════════════════════════════════

   Buradaki bilgiler dolmadan site yine çalışır — sadece eklenen sözler
   ortak duvara gitmez, ekleyenin kendi tarayıcısında kalır.

   Doldurmak için (ücretsiz, ~10 dakika):

   1. https://console.firebase.google.com → "Create a project"
      Adı ne olursa olsun (ör. malaklar). Analytics'e gerek yok, kapat.

   2. Sol menü → Build → Firestore Database → "Create database"
      Konum: europe-west3 (veya sana yakın biri). Mod: "Start in production mode".

   3. Firestore → Rules sekmesi → içindekini sil, şunu yapıştır → Publish:

      rules_version = '2';
      service cloud.firestore {
        match /databases/{database}/documents {
          match /sozler/{id} {
            allow read: if true;
            allow create: if request.resource.data.keys().hasOnly(['metin','kim','zaman'])
                          && request.resource.data.metin is string
                          && request.resource.data.metin.size() > 0
                          && request.resource.data.metin.size() <= 200
                          && request.resource.data.kim in ['sila','okan']
                          && request.resource.data.zaman == request.time;
            allow update, delete: if false;
          }
        }
      }

      (Bu kurallar: herkes okuyabilir, herkes söz ekleyebilir, ama kimse
       silemez/değiştiremez. Silmek istediğini Firebase konsolundan silersin.)

   4. Proje ayarları (⚙ → Project settings) → aşağıda "Your apps" →
      </> (Web) simgesine bas → uygulamaya bir ad ver → Register app.
      Ekranda çıkan `firebaseConfig = { ... }` bloğunu aşağıya kopyala.

   5. Aynı sayfada Authentication'a gerek YOK, atla.

   Not: buradaki apiKey gizli bir şifre değildir, herkese açık olması
   normaldir — güvenlik yukarıdaki Rules ile sağlanır.
   ═══════════════════════════════════════════════════════════════ */

window.MALAKLAR_FIREBASE = {
  apiKey: "BURAYA_YAPISTIR",
  authDomain: "BURAYA_YAPISTIR",
  projectId: "BURAYA_YAPISTIR",
  storageBucket: "BURAYA_YAPISTIR",
  messagingSenderId: "BURAYA_YAPISTIR",
  appId: "BURAYA_YAPISTIR"
};
