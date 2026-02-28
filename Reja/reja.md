# 🚀 ADU Sertifikat Generatori V3.0 - Mukammal Rivojlanish Rejasi

Bu hujjat orqali biz platformani qadamma-qadam super darajaga yetkazamiz. Barcha rejalar bosqichlarga bo'lingan bo'lib, har birini to'liq tekshirib (test qilib) o'tgachgina keyingisiga o'tiladi. O'zgarishlar ehtiyotkorlik bilan xavfsizlik ("Safe Zona") qoidalariga rioya qilgan holda qilinadi.

---

### BARCHA QADAMLAR RO'YXATI VA STATUSI

#### 🎯 BOSQICH 1: "SAQLASH VA EKSPORT" 
Hujjatlar logikasini yo'qotib qo'ymaslik va ishlash rejimini professional saqlash mexanizmi.

- [x] **1.1. Draft (Qoralama) Saqlash (.adu format):** O'nlab sertifikatlarni ishlash jarayonini bitta `Sertifikatlar.adu` fayliga jamlab saqlash, va uni yana xuddi shunday yuklash kodi.
- [x] **1.2. ZIP Rasm Formatida Saqlash:** Hozirgi kabi PDF emas, balki "100 ta sertifikatni" o'z ismi bilan nomlangan bitta zip arxividagi JPG yoki PNG rasmlar sifatida ommaviy yuklab olish kodi.

#### 🎨 BOSQICH 2: "VIZUAL SOZLAMALAR VA DIZAYN (UI/UX)"
Endi faqat matn yozadigan mexanizm emas, uni ko'zga ko'rinmas fotoshopga aylantirish.

- [x] **2.1. Maxsus Orqa Fon (Custom Background):** Hozirgi "Rang tanlash" bo'limi ostiga, o'zining mutlaqo bo'sh shablon rasmini (Gradient qog'oz emas balkim ramkali suratni) orqa fonga qo'ya oluvchi "Upload Image" imkoniyati.
- [x] **2.2. Ajoyib Shriftlar (Typography):** Maxsus `select` panel qo'shib, Google Fonts orqali shablon matnlarini (ayniqsa *Ism va familiya* larni) `Great Vibes`, `Montserrat`, `Playfair Display` kabi kalligrafik shriftlarda yoziladigan qilish.
- [x] **2.3. Hujjat Formati:** Eniga (Landscape) turgan sertifikat bilan birga "Bo'yiga uzun (Portrait/A4 Vertical)" sifatidagi zamonaviy shablon dizayn opsiyasini qo'shish.

#### ⚙️ BOSQICH 3: "AQLLI BOSHQARUV (SMART ENGINE)"
Sertifikatdagi qo'shimcha nosozliklarni bartaraf qiladigan funksiyalar.

- [ ] **3.1. Avto-Shrift (Smart Resizing):** Qabul qiluvchining ism familiyasi haddan tashqari uzun bo'lib ketsa, u dizayn chegarasidan chiqib ketmasligi uchun shriftini vizual darajada o'zi mo'ljallab kichraytiradigan (Auto-fit) funksiyasini yozish.
- [ ] **3.2. Erkin Surish (Drag & Drop):** Muhr, Imzo, Maxsus yozuv va QR-Kod elementlarini bevosita vizual sahnadan turib chekkalaridan ushlab bemalol harakatlantirib (x/y koordinatlarda) erkin joylash imkoniyatlari qo'shilishi (Absolute position control).

#### 🛡️ BOSQICH 4: "XAVFSIZLIK VA XALQARO DOIRA"
Sertifikatlar faqat rasm emas, haqiqiy ekanligini isbotlash.

- [ ] **4.1. Ochiq Tasdiqlash Tizimi (Verify Page):** (Web asosida mo'ljallangan.) QR kod skaner qilinganida hozirgidek oddiy matn emas, balki qandaydir tizimdagi manzilni ochib u yerdan chindan ham sertifikat original ekanligini (HTML sahifa o'laroq) chiqaruvchi logikaga yo'naltirish yechimi (Buni tashqi base bilan bog'lash variantlari muhokamasi).

---

### ✨ JORIY JARAYON: Biz nima qilyapmiz?

*Biz hozir **3.1 bosqichiga (Smart Resizing)** yetib keldik va u ustida ishlaymiz.* 

