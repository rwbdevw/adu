# ADU Generator - Xatoliklarni tuzatish va UI/UX yaxshilash rejasi

Ushbu hujjatda ADU gvohnoma generatorining dizayn va mantiqidagi xatoliklarni to'g'irlash bo'yicha qadamlar belgilangan.

## 1. Asosiy vizual xatoliklar (Bugs)
- [ ] **QR Kod joylashuvi:** QR kod tasviri "Qayd raqami", "Sana" va "Andijon shahri" matnlarining ustiga chiqib ketgan. Bu qismning CSS yoki HTML tuzilishini qayta ko'rib chiqib, ularni yonma-yon yoki ustma-ust (lekin xalaqit bermaydigan qilib) joylashtirish.

## 2. Dizayn va UI/UX (Foydalanuvchi interfeysi) kamchiliklari
- [ ] **Standart fayl yuklash elementlari (File Inputs):** `input type="file"` elementlari (Excel yuklash, Muhr, Imzo) brauzerning standart ko'rinishida qolib ketgan. Ularni ilovaning zamonaviy dizayniga moslashtirish (masalan, yashirin input va chiroyli dizayn qilingan button/label orqali).
- [ ] **Zichlik va masofalar (Spacing/Padding/Margin):** Chap tomondagi kiritish formalarida qismlar orasidagi masofalarni (margin-bottom) oshirish. Elementlar nafas olishi kerak.
- [ ] **Sertifikat matni markazlashuvi:** Sertifikat ichidagi matn (`Matn / Sabab` qismi) vertikal ravishda markazda emas (biroz yuqoriga chiqib ketgan). Matn yoziladigan blokning joylashuvini sozlasi.
- [ ] **Tugmalar joylashuvi:** Eng pastdagi "PDF ga saqlash" va "Tozalash" tugmalariga biroz bo'sh joy (margin) qo'shish, ekran chetiga juda taqalib qolishining oldini olish.
- [ ] **Til muvozanati (Localization):** Fayl yuklash elementlaridagi "Choose File" va "No file chosen" kabi inglizcha matnlarni o'zbek tiliga o'girsh yoki to'liq qamrab oluvchi o'zbekcha yozuvli maxsus UI element yaratish.

## Ishni bajarish tartibi:
1. `index.html` va unga tegishli CSS fayllarini o'rganib chiqish.
2. CSS orqali yuqoridagi dizayn o'zgarishlarini amalga oshirish.
3. Brauzerda tekshirib ko'rish (masofaviy tarzda yordamchi orqali).
