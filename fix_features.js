const fs = require('fs');
let html = fs.readFileSync('/home/darkdev/adu/index.html', 'utf8');

// Button translations and batch hints
html = html.replace(
    'batchHint: "Baza ustunlari: Ism, Sana, Reg, Matn, Rektor bo\'lishi shart." }',
    'batchHint: "Asosiy ustunlar: Ism, Sana, Reg, Matn, Rektor.\\n* Lavozim, Tashkilot kiritilmasa andozadagi olinadi.", btnAdd: "➕ Hujjat qo\'shish" }'
);
html = html.replace(
    'batchHint: "Столбцы: Ism, Sana, Reg, Matn, Rektor обязательны." }',
    'batchHint: "Основа: Ism, Sana, Reg, Matn, Rektor.\\n* Lavozim, Tashkilot опциональны.", btnAdd: "➕ Добавить документ" }'
);
html = html.replace(
    'batchHint: "Required columns: Ism, Sana, Reg, Matn, Rektor." }',
    'batchHint: "Required: Ism, Sana, Reg, Matn, Rektor.\\n* Lavozim, Tashkilot are optional/defaulted.", btnAdd: "➕ Add Document" }'
);


// Button add
html = html.replace(
    /<p class="batch-hint" id="ui-batchHint">.*?<\/p>\s*<\/div>\s*<\/div>/,
    `<p class="batch-hint" id="ui-batchHint">Asosiy ustunlar: Ism, Sana, Reg, Matn, Rektor.<br>* Lavozim, Tashkilot kiritilmasa andozadagi olinadi.</p>
                        <div style="margin-top: 15px; border-top: 1px dashed rgba(0,0,0,0.1); padding-top: 15px;">
                            <button class="btn btn-primary" onclick="addBlankCertificate()" id="ui-btn-addBatch" style="width: 100%; background: #0f172a; border:none; color: white;">➕ Hujjat qo'shish</button>
                        </div>
                    </div>
                </div>`
);

// Mappings for UI
html = html.replace(
    /if\(document\.getElementById\('ui-lblExcel'\)\) document\.getElementById\('ui-lblExcel'\)\.innerText = ui\.lblExcel;/,
    `if(document.getElementById('ui-lblExcel')) document.getElementById('ui-lblExcel').innerText = ui.lblExcel;
            if(document.getElementById('ui-btn-addBatch')) document.getElementById('ui-btn-addBatch').innerText = ui.btnAdd;`
);

// ContentEditable Replacements
html = html.replace(/<h1 class="university-name">/g, '<h1 class="university-name" contenteditable="true" spellcheck="false">');
html = html.replace(/<h2 class="certificate-title">/g, '<h2 class="certificate-title" contenteditable="true" spellcheck="false">');
html = html.replace(/<div class="intro-text">/g, '<div class="intro-text" contenteditable="true" spellcheck="false">');
html = html.replace(/<div class="recipient-name">/g, '<div class="recipient-name" contenteditable="true" spellcheck="false">');
html = html.replace(/<div class="reason-text">/g, '<div class="reason-text" contenteditable="true" spellcheck="false">');
html = html.replace(/<b>\$\{data\.reg\}<\/b>/g, '<b contenteditable="true" spellcheck="false">${data.reg}</b>');
html = html.replace(/<b>\$\{data\.date\}<\/b>/g, '<b contenteditable="true" spellcheck="false">${data.date}</b>');
html = html.replace(/<div class="signature-title">/g, '<div class="signature-title" contenteditable="true" spellcheck="false">');
html = html.replace(/<div style="font-weight:600; font-size:14px; margin-top:5px; color:#333;">\$\{data\.rector\}<\/div>/g, '<div class="rector-name" contenteditable="true" spellcheck="false" style="font-weight:600; font-size:14px; margin-top:5px; color:#333;">${data.rector}</div>');


// Logic Script
const logicScript = `
        function getLiveFormData() {
            const l = i18n[currentLang];
            return {
                uni: document.getElementById('uniName').value || l.uni,
                name: document.getElementById('recipientName').value || l.namePlaceholder,
                reason: document.getElementById('reasonText').value || "[Matn kiritilmagan...]",
                reg: document.getElementById('regNumber').value || "_______",
                date: document.getElementById('dateText').value || "26.02.2025",
                rectorTitle: document.getElementById('rectorTitle').value || l.types[document.getElementById('docType').value].role,
                rector: document.getElementById('rectorName').value || l.signerPlaceholder,
                template: document.getElementById('certTemplate').value || 'klassik'
            };
        }

        function addBlankCertificate() {
            const l = i18n[currentLang];
            if (!batchData) {
                // Avval ekrandagi bittani yozib qo'yamiz
                batchData = [ getLiveFormData() ];
            }
            
            // Va eng oxirgi nusxani kopiya qilib yana qoshamiz
            const newCert = { 
                ...batchData[batchData.length - 1],
                name: l.namePlaceholder,
                reg: "_______"
            };
            batchData.push(newCert);
            
            const container = document.getElementById('previewContainer');
            container.innerHTML = '';
            batchData.forEach(item => {
                container.appendChild(createCertificateElement(item));
            });
            updateScale();

            // Scroll to the bottom to see new certificate
            setTimeout(() => {
                document.getElementById('previewArea').scrollTo({ top: document.getElementById('previewArea').scrollHeight, behavior: 'smooth' });
            }, 100);
        }

        document.getElementById('previewContainer').addEventListener('input', function(e) {
            if (e.target.hasAttribute('contenteditable')) {
                const certDef = e.target.closest('.certificate');
                if (certDef) {
                    const uniTitle = certDef.querySelector('.university-name');
                    const uni = uniTitle ? uniTitle.innerText : 'Tashkilot';
                    const name = certDef.querySelector('.recipient-name')?.innerText || '';
                    const regBlock = certDef.querySelector('.date-block p:first-child b');
                    const reg = regBlock ? regBlock.innerText : '';
                    
                    const qrCanvas = certDef.querySelector('canvas');
                    if (qrCanvas) {
                        const l = i18n[currentLang];
                        const qrDataStr = \`Oliygoh: \$\{uni\}\\nEgasi: \$\{name\}\\n\$\{l.regLabel\}: \$\{reg\}\`;
                        new QRious({
                            element: qrCanvas,
                            value: qrDataStr,
                            size: 200,
                            level: 'M'
                        });
                    }
                }
            }
        });
`;
html = html.replace("window.onload = () => {", logicScript + "\n        window.onload = () => {");


fs.writeFileSync('/home/darkdev/adu/index.html', html);
console.log("Replaced html successfully");
