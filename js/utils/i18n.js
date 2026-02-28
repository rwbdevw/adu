// Data and Translation Logic
const i18n = {
    uz: { uni: "Andijon Davlat Universiteti", city: "Andijon shahri", regLabel: "Qayd raqami", dateLabel: "Sana", namePlaceholder: "[F.I.Sh.]", signerPlaceholder: "[Rektor F.I.Sh.]",
        ui: { title: "ADU Sertifikat Generatori", controlHeader: "Hujjat Sozlamalari", chooseFile: "📂 Fayl...", lang: "Til", color: "Asosiy rang", batch: "Excel Bazani Yuklash", docType: "Hujjat turi", template: "Andoza (Dizayn)", name: "Qabul qiluvchi (F.I.Sh)", reason: "Sabab / Matn", reg: "Qayd raqami", date: "Sana", seal: "Muhr Yuklash", sig: "Imzo Yuklash", rector: "Imzolovchi Ismi", rectorTitle: "Imzolovchi Lavozimi", uniName: "Muassasa nomi (Ixtiyoriy)", print: "Chop etish (Print)", download: "PDF qilib saqlash", clear: "Keshni Tozalash / Reset", gVisual: "🏢 Visual Sozlamalar", gPersonal: "📝 Shaxsiy Ma'lumot", gConfirm: "✍️ Tasdiq Qismi", gBatch: "📊 Ommaviy Yaratish", btnDraftSave: "💾 Qoralamani Saqlash (.adu)", btnDraftLoad: "📂 Qoralama Yuklash", zipDownload: "ZIP Rasm Qilib Saqlash", lblSeal: "📂 Muhr (.png)", lblSig: "📂 Imzo (.png)", lblLogo: "🖼 Logo (.png)", logo: "Tashkilot Logotipi (Ixtiyoriy)", lblExcel: "Excel (.xlsx) faylini tanlang", batchHint: "Asosiy ustunlar: Ism, Sana, Reg, Matn, Rektor.<br>* Lavozim, Tashkilot kiritilmasa andozadagi olinadi.<br>* <b style='color:var(--primary-color)'>Yangi:</b> Matnlarni sichqonchada (yoki ALT bosib) surib joyini o'zgartirishingiz mumkin.", btnAdd: "➕ Hujjat qo'shish", localBgBtn: "🖼 Shaxsiy fon", removeBgBtn: "🗑 O'chirish", feedbackTitle: "Taklif yoki Xato haqida xabar", feedbackDesc: "Tizimda xatolik topsangiz yoki taklifingiz bo'lsa yozing. To'g'ridan-to'g'ri Dastur Muallifiga (Telegram) yetib boradi.", feedbackPlaceholder: "Xabar matnini yozing...", btnSend: "✈️ Jo'natish", msgEmpty: "Iltimos, xabar matnini kiriting!", msgWait: "⏳ Jo'natilmoqda...", msgSuccess: "✅ Xabaringiz muvaffaqiyatli yuborildi! Kattakon Rahmat.", msgErrorFetch: "Tarmoq xatosi yoki sozlamalar kiritilmagan", msgError: "❌ Jo'natishda xatolik: " },
        types: { "Maqtov Yorlig'i": { title: "Maqtov Yorlig'i", intro: "Ushbu yorliq topshiriladi", role: "Rektor", reason: "[Fakultet nomi] fakulteti talabasi o‘quv jarayonlarida erishgan yuksak natijalari va namunali xulqi uchun." },
                 "Tashakkurnoma": { title: "Tashakkurnoma", intro: "Ushbu tashakkurnoma bildiriladi", role: "Rektor", reason: "[Kafedra nomi] xodimiga universitet nufuzini oshirishga qo‘shgan munosib hissasi uchun." },
                 "Sertifikat": { title: "Sertifikat", intro: "Ushbu sertifikat tasdiqlaydi", role: "Raisi", reason: "Universitetda o‘tkazilgan konferensiyada o‘zining ilmiy ma'ruzasi bilan faol ishtirok etganligini." } },
        templates: { "klassik": "Klassik (Rasmiy)", "zamonaviy": "Zamonaviy (Gradient)", "minimal": "Minimal (Toza)" }
    },
    ru: { uni: "Андижанский Государственный Университет", city: "город Андижан", regLabel: "Рег. номер", dateLabel: "Дата", namePlaceholder: "[Ф.И.О.]", signerPlaceholder: "[Ф.И.О. Ректора]",
        ui: { title: "Генератор Сертификатов АГУ", controlHeader: "Настройки документа", chooseFile: "📂 Файл...", lang: "Язык", color: "Основной цвет", batch: "Загрузить Excel", docType: "Тип документа", template: "Шаблон", name: "Ф.И.О получателя", reason: "Текст / Причина", reg: "Рег. номер", date: "Дата", seal: "Печать", sig: "Подпись", rector: "Подписант", rectorTitle: "Должность", uniName: "Организация (Опционально)", print: "Печать (Print)", download: "Сохранить в PDF", clear: "Очистить / Сброс", gVisual: "🏢 Визуальные Настройки", gPersonal: "📝 Личные Данные", gConfirm: "✍️ Часть Утверждения", gBatch: "📊 Массовое Создание", btnDraftSave: "💾 Сохранить Черновик (.adu)", btnDraftLoad: "📂 Загрузить Черновик", zipDownload: "Скачать как ZIP (Изображения)", lblSeal: "📂 Печать (.png)", lblSig: "📂 Подпись (.png)", lblLogo: "🖼 Логотип (.png)", logo: "Логотип Организации (Опция)", lblExcel: "Выберите файл Excel (.xlsx)", batchHint: "Основа: ФИО, Дата, Номер, Текст, Ректор.<br>* Должность, Организация опциональны.<br>* <b style='color:var(--primary-color)'>Новое:</b> Перемещайте текст мышью (зажав ALT).", btnAdd: "➕ Добавить документ", localBgBtn: "🖼 Личный фон", removeBgBtn: "🗑 Удалить", feedbackTitle: "Сообщить об ошибке / Предложение", feedbackDesc: "Напишите, если найдете ошибку или у вас есть предложение. Сообщение будет доставлено напрямую Разработчику (Telegram).", feedbackPlaceholder: "Текст сообщения...", btnSend: "✈️ Отправить", msgEmpty: "Пожалуйста, введите текст сообщения!", msgWait: "⏳ Отправка...", msgSuccess: "✅ Ваше сообщение успешно отправлено! Большое спасибо.", msgErrorFetch: "Ошибка сети или не настроено", msgError: "❌ Ошибка при отправке: " },
        types: { "Maqtov Yorlig'i": { title: "Похвальная грамота", intro: "Награждается", role: "Ректор", reason: "Студент [факультета] за высокие достижения в учебном процессе и образцовое поведение." },
                 "Tashakkurnoma": { title: "Благодарственное письмо", intro: "Выражается благодарность", role: "Ректор", reason: "Сотруднику [отдела] за достойный вклад в повышение престижа университета." },
                 "Sertifikat": { title: "Сертификат", intro: "Настоящий сертификат подтверждает", role: "Председатель", reason: "Активное участие в конференции со своим научным докладом." } },
        templates: { "klassik": "Классический (Офиц.)", "zamonaviy": "Современный", "minimal": "Минималистичный" }
    },
    en: { uni: "Andijan State University", city: "Andijan city", regLabel: "Reg. No", dateLabel: "Date", namePlaceholder: "[Full Name]", signerPlaceholder: "[Signer Name]",
        ui: { title: "ASU Certificate Generator", controlHeader: "Document Settings", chooseFile: "📂 File...", lang: "Language", color: "Main Color", batch: "Upload Excel Data", docType: "Doc Type", template: "Design Template", name: "Recipient Name", reason: "Reason Text", reg: "Reg. No", date: "Date", seal: "Upload Seal", sig: "Upload Sign", rector: "Signer Name", rectorTitle: "Signer Title", uniName: "Organization (Optional)", print: "Print Document", download: "Save as PDF", clear: "Clear Cache / Reset", gVisual: "🏢 Visual Settings", gPersonal: "📝 Personal Info", gConfirm: "✍️ Approval Section", gBatch: "📊 Batch Generation", btnDraftSave: "💾 Save Draft (.adu)", btnDraftLoad: "📂 Load Draft", zipDownload: "Download as ZIP (Images)", lblSeal: "📂 Seal (.png)", lblSig: "📂 Signature (.png)", lblLogo: "🖼 Logo (.png)", logo: "Organization Logo (Optional)", lblExcel: "Select Excel (.xlsx) file", batchHint: "Required: Name, Date, Reg, Reason, Signer.<br>* Title, Org are optional/defaulted.<br>* <b style='color:var(--primary-color)'>New:</b> Move texts freely by dragging (Hold ALT).", btnAdd: "➕ Add Document", localBgBtn: "🖼 Custom BG", removeBgBtn: "🗑 Remove", feedbackTitle: "Report a Bug or Suggestion", feedbackDesc: "Please report bugs or suggest ideas. Message goes directly to the Developer (Telegram).", feedbackPlaceholder: "Type your message...", btnSend: "✈️ Send", msgEmpty: "Please enter your message!", msgWait: "⏳ Sending...", msgSuccess: "✅ Your message has been sent! Thank you.", msgErrorFetch: "Network error or unconfigured", msgError: "❌ Failed to send: " },
        types: { "Maqtov Yorlig'i": { title: "Certificate of Merit", intro: "This certificate is awarded to", role: "Rector", reason: "Student of [faculty] for outstanding achievements in education and exemplary behavior." },
                 "Tashakkurnoma": { title: "Appreciation Letter", intro: "This letter is presented to", role: "Rector", reason: "Staff member for contribution to the university's prestige and development." },
                 "Sertifikat": { title: "Certificate", intro: "This is to certify that", role: "Chairman", reason: "Has actively participated in the conference with a scientific report." } },
        templates: { "klassik": "Classic (Official)", "zamonaviy": "Modern (Gradient)", "minimal": "Minimalist (Clean)" }
    }
};

let currentLang = localStorage.getItem('adu_v3_lang') || 'uz';

function changeLanguage() {
    currentLang = document.getElementById('lang').value;
    localStorage.setItem('adu_v3_lang', currentLang);
    const l = i18n[currentLang];
    const ui = l.ui;

    document.getElementById('ui-title').innerText = ui.title;
    document.getElementById('ui-control-title').innerText = ui.controlHeader;

    document.getElementById('ui-color').innerText = ui.color;
    document.getElementById('ui-batch').innerText = ui.batch;
    document.getElementById('ui-doc-type').innerText = ui.docType;
    document.getElementById('ui-name').innerText = ui.name;
    document.getElementById('ui-reason').innerText = ui.reason;
    document.getElementById('ui-reg').innerText = ui.reg;
    document.getElementById('ui-date').innerText = ui.date;
    document.getElementById('ui-seal').innerText = ui.seal;
    document.getElementById('ui-sig').innerText = ui.sig;
    document.getElementById('ui-rector').innerText = ui.rector;
    document.getElementById('ui-rectorTitle').innerText = ui.rectorTitle;
    document.getElementById('ui-uniName').innerText = ui.uniName;

    document.getElementById('ui-gVisual').innerText = ui.gVisual;
    document.getElementById('ui-gPersonal').innerText = ui.gPersonal;
    document.getElementById('ui-gConfirm').innerText = ui.gConfirm;
    document.getElementById('ui-gBatch').innerText = ui.gBatch;

    if(document.getElementById('ui-lblSeal')) document.getElementById('ui-lblSeal').innerText = ui.lblSeal;
    if(document.getElementById('ui-lblSig')) document.getElementById('ui-lblSig').innerText = ui.lblSig;
    if(document.getElementById('ui-lblLogo')) document.getElementById('ui-lblLogo').innerText = ui.lblLogo;
    if(document.getElementById('ui-logo')) document.getElementById('ui-logo').innerText = ui.logo;

    if(document.getElementById('ui-lblExcel')) document.getElementById('ui-lblExcel').innerText = ui.lblExcel;
    if(document.getElementById('ui-batchHint')) document.getElementById('ui-batchHint').innerHTML = ui.batchHint;
    if(document.getElementById('ui-btn-addBatch')) document.getElementById('ui-btn-addBatch').innerText = ui.btnAdd;
    if(document.getElementById('ui-btn-draftSave')) document.getElementById('ui-btn-draftSave').innerText = ui.btnDraftSave;
    if(document.getElementById('ui-btn-draftLoad')) document.getElementById('ui-btn-draftLoad').innerText = ui.btnDraftLoad;
    if(document.getElementById('ui-btn-zip')) document.getElementById('ui-btn-zip').innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> ` + ui.zipDownload;


    // Tugmalardagi iconlarni saqlab faqat matnni o'zgartirish uchun
    document.getElementById('ui-btn-print').innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path></svg> ` + ui.print;
    document.getElementById('ui-btn-download').innerHTML = `<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg> ` + ui.download;
    if(document.getElementById('ui-btn-clear')) document.getElementById('ui-btn-clear').innerText = ui.clear;
    if(document.getElementById('ui-template')) document.getElementById('ui-template').innerText = ui.template;

    const tSelect = document.getElementById('certTemplate');
    if(tSelect) {
        const cTemp = tSelect.value;
        tSelect.innerHTML = `<option value="klassik">${l.templates['klassik']}</option><option value="zamonaviy">${l.templates['zamonaviy']}</option><option value="minimal">${l.templates['minimal']}</option>`;
        if(cTemp) tSelect.value = cTemp;
    }

    const docSelect = document.getElementById('docType');
    if(docSelect) {
        const cType = docSelect.value;
        docSelect.innerHTML = Object.keys(l.types).map(k => `<option value="${k}">${l.types[k].title}</option>`).join('');
        if (l.types[cType]) docSelect.value = cType;
    }

    // Placeholders update
    const nameInput = document.getElementById('recipientName');
    const rectorInput = document.getElementById('rectorName');
    const uniInput = document.getElementById('uniName');

    if(nameInput) {
        // Agar qiymat eski dildan qolgan by default value bo'lsa, uni almashtirish
        for(let key in i18n) {
            if(nameInput.value === i18n[key].namePlaceholder) { nameInput.value = l.namePlaceholder; break; }
        }
        nameInput.placeholder = l.namePlaceholder;
    }

    if(rectorInput) {
        for(let key in i18n) {
            if(rectorInput.value === i18n[key].signerPlaceholder) { rectorInput.value = l.signerPlaceholder; break; }
        }
        rectorInput.placeholder = l.signerPlaceholder;
    }

    if(uniInput) {
        for(let key in i18n) {
            if(uniInput.value === i18n[key].uni) { uniInput.value = l.uni; break; }
        }
        uniInput.placeholder = l.uni;
    }

    // Update Feedback translations
    if(document.getElementById('lbl-feedback-title')) document.getElementById('lbl-feedback-title').innerText = l.ui.feedbackTitle;
    if(document.getElementById('lbl-feedback-desc')) document.getElementById('lbl-feedback-desc').innerText = l.ui.feedbackDesc;
    if(document.getElementById('feedback-text')) document.getElementById('feedback-text').placeholder = l.ui.feedbackPlaceholder;
    const btnFeed = document.getElementById('feedback-submit');
    if(btnFeed && btnFeed.innerHTML.includes('✈️')) btnFeed.innerHTML = l.ui.btnSend;

    if (typeof updateTemplate === 'function') {
        updateTemplate();
    }
}
