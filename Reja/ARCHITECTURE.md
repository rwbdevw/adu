# 🏗️ ADU Sertifikat Generatori - Arxitektura Rejasi

Loyiha hozirgi kunda juda ham ko'plab yangi funksiyalar bilan boyidi:
- PDF / ZIP yuklash
- Telegram Feedback integratsiyasi
- Drag and drop matn siljitish
- Dark mode
- Mahalliy fon yuklash, LocalStorage ma'lumot saqlash
- Ommaviy tahrirlash (Excel batch)
- Va boshqalar.

Bularning barchasi `index.html` va `style.css` ichviga qamalib qolgan. Oldin bu bitta oddiy 1 sahifali instrument edi, endi esa u to'laqonli Web Ilovaga (SaaS) aylandi.
Kodni o'qilishini, xatoni tez topishni va arxitekturani mustahkamlashni ta'minlash uchun dasturni Mantiqan Bo'laklarga Tushirish vaqti keldi!

## 📦 Papkalar Strukturasi (Taklif)

Quyidagi tuzilmani izchil barpo etib, har bir xususiyatni o'ziga joylaymiz.

```text
/
├── index.html          # Asosiy oyna (Faqatgina skelet HTML qoladi)
├── verify.html         # Tasdiqlash oynasi qoladi
├── netlify.toml        # Netlify Nastroykalari (Tayyor)
├── netlify/
│   └── functions/
│       └── feedback.js # Telegram uchun backend API
├── assets/
│   ├── css/
│   │   ├── variables.css # Rang va Root elementlar (Light/Dark themes)
│   │   ├── layout.css    # Sidebar va Navbar dizaynlari
│   │   ├── components.css# Tugmalar, Inputlar, Va boshqalar
│   │   ├── certificate.css # Template(klassik/zamonaviy) dizaynlari
│   │   └── toast.css     # Bildirishnomalar dizayni
│   └── img/
│       ├── adu-logo.png
│       └── dummy_bg.png
├── js/
│   ├── core/
│   │   ├── dom.js        # HTML elementlarni kuzatish va render funksiyalari (updateTemplate)
│   │   ├── storage.js    # LocalStorage dagi ma'lumotlarni yozish/olish
│   │   └── drag.js       # Drag and Drop matn ko'chirish mantiqi
│   ├── features/
│   │   ├── export.js     # PDF, Print va ZIP yuklash (html2canvas & jsPDF)
│   │   ├── xlsx.js       # Excel fayl bilan ishlash
│   │   ├── feedback.js   # Telegram botiga jo'natish xizmati
│   │   └── theme.js      # Dark/Light rejim almashtirgich
│   ├── utils/
│   │   ├── i18n.js       # Tarjimalar bazasi va Til almashtirish
│   │   └── toast.js      # 'showToast' bildirishnomalari
│   └── main.js           # Barcha ishlarni ulash (Boshqaruvchi - Entry Point)
└── Reja/
    ├── ARCHITECTURE.md   # [Hozirgi Fayl]
    └── ...               # Eskirgan rejalar
```

## 🛠 Refaktoring Bosqichlari (Tasklar)

*   [x] **Bosqich 1:** Papkalar skeletini qurish (`js/`, `assets/css/`).
*   [x] **Bosqich 2:** CSS xajmini maydalash. Barcha CSS-larga `index.html` ga alohida ulash.
*   [x] **Bosqich 3:** Tarjima (`i18n`) ma'lumotlar omborini aniq ajratib olish va `i18n.js` ga o'tkazish.
*   [x] **Bosqich 4:** Drag-drop, LocalStorage, Export logikalarini o'ziga xos modullarga ko'chirish.
*   [x] **Bosqich 5:** Eski `index.html` dan barcha eski `script` teglarni olib tashlab, oxirida ularni toza import qilish.

**Xavfsiz Zona Qo'llanmasi (Safe Zone):**
O'zgarishlarni har doim yangi shoxga (Branch) olib yoki Github ga ketma-ket mayda majburiyatlar (`commit`) qilgan holda bajaramiz.
Dastlab faqatgina CSS-larni ko'chiramiz, keyin JS ni. Shu asnoda funksional o'lmaydi.
