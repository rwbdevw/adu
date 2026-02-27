const fs = require('fs');
let html = fs.readFileSync('/home/darkdev/adu/index.html', 'utf8');

// 1. Add uniName to Visual Sozlamalar
html = html.replace(
    /<div class="form-row color-picker-wrapper">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
    `<div class="form-row color-picker-wrapper">
                            <label id="ui-color" class="color-picker-label">Asosiy rang</label>
                            <input type="color" id="primaryColor" value="#0f172a" oninput="updateColors()">
                        </div>
                    </div>
                    <div class="form-row" style="margin-top: 16px;">
                        <label id="ui-uniName">Muassasa / Tashkilot nomi</label>
                        <input type="text" id="uniName" placeholder="Tashkilot nomi..." oninput="updateSinglePreview()">
                    </div>
                </div>`
);

// 2. Add rectorTitle to Tasdiq Qismi
html = html.replace(
    /<h3 class="group-title">✍️ Tasdiq Qismi<\/h3>\s*<div class="form-row">\s*<label id="ui-rector">Imzolovchi Ismi<\/label>\s*<input type="text" id="rectorName" placeholder="Rektor yoki rahbar ismi\.\.\." oninput="updateSinglePreview\(\)">\s*<\/div>/,
    `<h3 class="group-title">✍️ Tasdiq Qismi</h3>
                    
                    <div class="form-grid-2">
                        <div class="form-row">
                            <label id="ui-rectorTitle">Imzolovchi Lavozimi</label>
                            <input type="text" id="rectorTitle" placeholder="Rektor, Rais..." oninput="updateSinglePreview()">
                        </div>
                        <div class="form-row">
                            <label id="ui-rector">Imzolovchi Ismi</label>
                            <input type="text" id="rectorName" placeholder="Rahbar ismi..." oninput="updateSinglePreview()">
                        </div>
                    </div>`
);

// 3. Update i18n
html = html.replace(
    /ui: { title: "ADU Sertifikat Generatori", controlHeader/g,
    `ui: { title: "ADU Sertifikat Generatori", controlHeader`
);
// Safely replace the UI line for uz
html = html.replace(/ui: \{ title: "ADU Sertifikat Generatori"[^\}]+ \},/g, match => {
    return match.replace('"Imzolovchi Ismi",', '"Imzolovchi Ismi", rectorTitle: "Imzolovchi Lavozimi", uniName: "Muassasa nomi (Ixtiyoriy)",');
});
// Safely replace the UI line for ru
html = html.replace(/ui: \{ title: "Генератор Сертификатов АГУ"[^\}]+ \},/g, match => {
    return match.replace('"Подписант",', '"Подписант", rectorTitle: "Должность", uniName: "Организация (Опционально)",');
});
// Safely replace the UI line for en
html = html.replace(/ui: \{ title: "ASU Certificate Generator"[^\}]+ \},/g, match => {
    return match.replace('"Signer Name",', '"Signer Name", rectorTitle: "Signer Title", uniName: "Organization (Optional)",');
});

// 4. Update changeLanguage() ui replacements
html = html.replace(
    /document\.getElementById\('ui-rector'\)\.innerText = ui\.rector;/g,
    `document.getElementById('ui-rector').innerText = ui.rector;
            document.getElementById('ui-rectorTitle').innerText = ui.rectorTitle;
            document.getElementById('ui-uniName').innerText = ui.uniName;`
);

// 5. UpdateTemplate defaults
const updateTempStr = `function updateTemplate() {
            const l = i18n[currentLang];
            const typeConfig = l.types[document.getElementById('docType').value];
            document.getElementById('reasonText').value = typeConfig.reason;
            
            const rInput = document.getElementById('rectorName');
            if (!rInput.value || rInput.value.includes('[')) rInput.value = l.signerPlaceholder;

            const tInput = document.getElementById('rectorTitle');
            let isDefTitle = !tInput.value;
            Object.values(i18n).forEach(lng => Object.values(lng.types).forEach(t => {
                if (tInput.value === t.role) isDefTitle = true;
            }));
            if (isDefTitle) tInput.value = typeConfig.role;

            const uInput = document.getElementById('uniName');
            let isDefUni = !uInput.value;
            Object.values(i18n).forEach(lng => {
                if (uInput.value === lng.uni) isDefUni = true;
            });
            if (isDefUni) uInput.value = l.uni;

            updateSinglePreview();
        }`;
html = html.replace(/function updateTemplate\(\) \{[\s\S]*?updateSinglePreview\(\);\s*\}/, updateTempStr);


// 6. dataObj in updateSinglePreview
html = html.replace(
    /name: document\.getElementById\('recipientName'\)\.value \|\| l\.namePlaceholder,/,
    `uni: document.getElementById('uniName').value,
                name: document.getElementById('recipientName').value || l.namePlaceholder,`
);
html = html.replace(
    /rector: document\.getElementById\('rectorName'\)\.value \|\| l\.signerPlaceholder,/,
    `rectorTitle: document.getElementById('rectorTitle').value || l.types[document.getElementById('docType').value].role,
                rector: document.getElementById('rectorName').value || l.signerPlaceholder,`
);
// localstorage inside updateSinglepreview
html = html.replace(
    /name: dataObj\.name, reason: dataObj\.reason, reg: dataObj\.reg, date: dataObj\.date, rector: dataObj\.rector/,
    `name: dataObj.name, reason: dataObj.reason, reg: dataObj.reg, date: dataObj.date, rector: dataObj.rector, rectorTitle: dataObj.rectorTitle, uni: dataObj.uni`
);


// 7. createCertificateElement DOM
html = html.replace(
    /<h1 class="university-name">\$\{l\.uni\}<\/h1>/,
    `${!data || data.uni !== '' ? `\${data.uni ? \`<h1 class="university-name">\${data.uni}</h1>\` : ''}` : ''}`
);
html = html.replace(
    /<div class="signature-title">\$\{typeOpts\.role\}<\/div>/,
    `<div class="signature-title">\${data.rectorTitle || typeOpts.role}</div>`
);
html = html.replace(
    /const qrDataStr = \`Oliygoh: \$\{l\.uni\}\\n/,
    `const qrDataStr = \`Oliygoh: \$\{data.uni || 'Tashkilot'}\\n`
);


// 8. handleExcel mapped object
html = html.replace(
    /name: row\.Ism \|\| row\.Name /,
    `uni: row.Tashkilot || row.Org || row.University !== undefined ? (row.Tashkilot || row.Org || row.University) : document.getElementById('uniName').value,
                    name: row.Ism || row.Name `
);
html = html.replace(
    /rector: row\.Rektor \|\| row\.Signer/,
    `rectorTitle: row.Lavozim || row.Title !== undefined ? (row.Lavozim || row.Title) : document.getElementById('rectorTitle').value,
                    rector: row.Rektor || row.Signer`
);

// 9. Window on load localstorage logic
html = html.replace(
    /if \(ls\.rector\) document\.getElementById\('rectorName'\)\.value = ls\.rector;/,
    `if (ls.rector) document.getElementById('rectorName').value = ls.rector;
                    if (ls.rectorTitle !== undefined) document.getElementById('rectorTitle').value = ls.rectorTitle;
                    if (ls.uni !== undefined) document.getElementById('uniName').value = ls.uni;`
);

fs.writeFileSync('/home/darkdev/adu/index.html', html);
console.log('Fixed functionality!');
