const fs = require('fs');
let html = fs.readFileSync('/home/darkdev/adu/index.html', 'utf8');

// HTML Adjustments
html = html.replace('<h3 class="group-title">🏢 Visual Sozlamalar</h3>', '<h3 class="group-title" id="ui-gVisual">🏢 Visual Sozlamalar</h3>');
html = html.replace('<h3 class="group-title">📝 Shaxsiy Ma\'lumot</h3>', '<h3 class="group-title" id="ui-gPersonal">📝 Shaxsiy Ma\'lumot</h3>');
html = html.replace('<h3 class="group-title">✍️ Tasdiq Qismi</h3>', '<h3 class="group-title" id="ui-gConfirm">✍️ Tasdiq Qismi</h3>');
html = html.replace('<h3 class="group-title" style="color: #166534;">📊 Ommaviy Yaratish</h3>', '<h3 class="group-title" style="color: #166534;" id="ui-gBatch">📊 Ommaviy Yaratish</h3>');

html = html.replace('<label for="sealUpload" class="file-upload-label" id="lbl-seal">📂 Muhr (.png)</label>', '<label for="sealUpload" class="file-upload-label" id="lbl-seal"><span id="ui-lblSeal">📂 Muhr (.png)</span></label>');
html = html.replace('<label for="sigUpload" class="file-upload-label" id="lbl-sig">📂 Imzo (.png)</label>', '<label for="sigUpload" class="file-upload-label" id="lbl-sig"><span id="ui-lblSig">📂 Imzo (.png)</span></label>');

html = html.replace(
    /<label for="excelUpload" class="file-upload-label" id="lbl-batch">\s*<svg[^>]*>.*?<\/svg>\s*Excel \(\.xlsx\) faylini tanlang\s*<\/label>/,
    `<label for="excelUpload" class="file-upload-label" id="lbl-batch">
                                <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                <span id="ui-lblExcel">Excel (.xlsx) faylini tanlang</span>
                            </label>`
);

html = html.replace('<p class="batch-hint">Baza ustunlari: Ism, Sana, Reg, Matn, Rektor bo\'lishi shart.</p>', '<p class="batch-hint" id="ui-batchHint">Baza ustunlari: Ism, Sana, Reg, Matn, Rektor bo\'lishi shart.</p>');

// Translation replacements
html = html.replace(
    /"PDF qilib saqlash", clear: "Keshni Tozalash \/ Reset" \}/g,
    `"PDF qilib saqlash", clear: "Keshni Tozalash / Reset", gVisual: "🏢 Visual Sozlamalar", gPersonal: "📝 Shaxsiy Ma'lumot", gConfirm: "✍️ Tasdiq Qismi", gBatch: "📊 Ommaviy Yaratish", lblSeal: "📂 Muhr (.png)", lblSig: "📂 Imzo (.png)", lblExcel: "Excel (.xlsx) faylini tanlang", batchHint: "Baza ustunlari: Ism, Sana, Reg, Matn, Rektor bo'lishi shart." }`
);

html = html.replace(
    /"Сохранить в PDF", clear: "Очистить \/ Сброс" \}/g,
    `"Сохранить в PDF", clear: "Очистить / Сброс", gVisual: "🏢 Визуальные Настройки", gPersonal: "📝 Личные Данные", gConfirm: "✍️ Часть Утверждения", gBatch: "📊 Массовое Создание", lblSeal: "📂 Печать (.png)", lblSig: "📂 Подпись (.png)", lblExcel: "Выберите файл Excel (.xlsx)", batchHint: "Столбцы: Ism, Sana, Reg, Matn, Rektor обязательны." }`
);

html = html.replace(
    /"Save as PDF", clear: "Clear Cache \/ Reset" \}/g,
    `"Save as PDF", clear: "Clear Cache / Reset", gVisual: "🏢 Visual Settings", gPersonal: "📝 Personal Info", gConfirm: "✍️ Approval Section", gBatch: "📊 Batch Generation", lblSeal: "📂 Seal (.png)", lblSig: "📂 Signature (.png)", lblExcel: "Select Excel (.xlsx) file", batchHint: "Required columns: Ism, Sana, Reg, Matn, Rektor." }`
);

// Add to changeLanguage JS
const translationAssignStr = `            document.getElementById('ui-uniName').innerText = ui.uniName;

            document.getElementById('ui-gVisual').innerText = ui.gVisual;
            document.getElementById('ui-gPersonal').innerText = ui.gPersonal;
            document.getElementById('ui-gConfirm').innerText = ui.gConfirm;
            document.getElementById('ui-gBatch').innerText = ui.gBatch;
            document.getElementById('ui-batchHint').innerText = ui.batchHint;
            
            if(document.getElementById('ui-lblSeal')) document.getElementById('ui-lblSeal').innerText = ui.lblSeal;
            if(document.getElementById('ui-lblSig')) document.getElementById('ui-lblSig').innerText = ui.lblSig;
            if(document.getElementById('ui-lblExcel')) document.getElementById('ui-lblExcel').innerText = ui.lblExcel;
`;
html = html.replace("            document.getElementById('ui-uniName').innerText = ui.uniName;", translationAssignStr);

fs.writeFileSync('/home/darkdev/adu/index.html', html);
console.log('Done replacement.');
