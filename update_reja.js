const fs = require('fs');
let text = fs.readFileSync('/home/darkdev/adu/reja.md', 'utf8');

text = text.replace(
    '- [ ] **1.1. Draft (Qoralama) Saqlash (.adu format):**',
    '- [x] **1.1. Draft (Qoralama) Saqlash (.adu format):**'
);
text = text.replace(
    '- [ ] **1.2. ZIP Rasm Formatida Saqlash:**',
    '- [x] **1.2. ZIP Rasm Formatida Saqlash:**'
);
text = text.replace(
    '- [ ] **2.1. Maxsus Orqa Fon (Custom Background):**',
    '- [x] **2.1. Maxsus Orqa Fon (Custom Background):**'
);
text = text.replace(
    '- [ ] **2.2. Ajoyib Shriftlar (Typography):**',
    '- [x] **2.2. Ajoyib Shriftlar (Typography):**'
);
text = text.replace(
    '- [ ] **2.3. Hujjat Formati:**',
    '- [x] **2.3. Hujjat Formati:**'
);

text = text.replace(
    '*Biz hozir eng boshidan, ya\'ni **1.1 bosqichidan (Draft/Qoralama Saqlash)** ish boshlaymiz.*',
    '*Biz hozir **3.1 bosqichiga (Smart Resizing)** yetib keldik va u ustida ishlaymiz.*'
);

fs.writeFileSync('/home/darkdev/adu/reja.md', text);
