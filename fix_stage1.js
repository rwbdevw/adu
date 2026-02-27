const fs = require('fs');
let html = fs.readFileSync('/home/darkdev/adu/index.html', 'utf8');

// Include JSZip library
if (!html.includes('jszip')) {
    html = html.replace('<!-- External Libraries -->', '<!-- External Libraries -->\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>\n    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>');
}

// Update i18n
html = html.replace(
    'gBatch: "📊 Ommaviy Yaratish"',
    'gBatch: "📊 Ommaviy Yaratish", btnDraftSave: "💾 Qoralamani Saqlash (.adu)", btnDraftLoad: "📂 Qoralama Yuklash", zipDownload: "ZIP Rasm Qilib Saqlash"'
);
html = html.replace(
    'gBatch: "📊 Массовое Создание"',
    'gBatch: "📊 Массовое Создание", btnDraftSave: "💾 Сохранить Черновик (.adu)", btnDraftLoad: "📂 Загрузить Черновик", zipDownload: "Скачать как ZIP (Изображения)"'
);
html = html.replace(
    'gBatch: "📊 Batch Generation"',
    'gBatch: "📊 Batch Generation", btnDraftSave: "💾 Save Draft (.adu)", btnDraftLoad: "📂 Load Draft", zipDownload: "Download as ZIP (Images)"'
);

// Add UI Buttons
const uiAdditions = `
            <div class="sidebar-footer" style="padding: 10px 20px 0; border-top: none;">
                <div class="form-grid-2" style="margin-bottom: 10px;">
                    <button class="btn btn-secondary" onclick="saveDraft()" id="ui-btn-draftSave" style="margin:0; font-size:12px; padding: 10px;">💾 Qoralamani Saqlash (.adu)</button>
                    <div class="file-upload-wrapper" style="margin:0;">
                        <label for="draftUpload" class="btn btn-secondary" id="ui-btn-draftLoad" style="margin:0; font-size:12px; padding: 10px; width: 100%; text-align: center; display: block;">📂 Qoralama Yuklash</label>
                        <input type="file" id="draftUpload" accept=".adu" onchange="loadDraft(event)" style="display: none;">
                    </div>
                </div>
            </div>
`;
html = html.replace('<div class="sidebar-footer">', uiAdditions + '            <div class="sidebar-footer">');

const zipButton = `
                <button class="btn btn-primary" onclick="downloadZIP()" id="ui-btn-zip" style="background: #15803d; border: none;">
                    <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    ZIP Rasm Qilib Saqlash
                </button>
`;
html = html.replace('PDF qilib saqlash\n                </button>', 'PDF qilib saqlash\n                </button>' + zipButton);


// Language hook
html = html.replace(
    /if\(document\.getElementById\('ui-btn-addBatch'\)\) document\.getElementById\('ui-btn-addBatch'\)\.innerText = ui\.btnAdd;/,
    `if(document.getElementById('ui-btn-addBatch')) document.getElementById('ui-btn-addBatch').innerText = ui.btnAdd;
            if(document.getElementById('ui-btn-draftSave')) document.getElementById('ui-btn-draftSave').innerText = ui.btnDraftSave;
            if(document.getElementById('ui-btn-draftLoad')) document.getElementById('ui-btn-draftLoad').innerText = ui.btnDraftLoad;
            if(document.getElementById('ui-btn-zip')) document.getElementById('ui-btn-zip').innerHTML = \`<svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg> \` + ui.zipDownload;`
);

// Helper function definitions
const logicFunctions = `
        function getLiveBatchData() {
            if (!batchData) {
                return [getLiveFormData()];
            }
            
            // Re-read current UI states dynamically
            const container = document.getElementById('previewContainer');
            const certs = container.querySelectorAll('.certificate');
            const currentData = [];
            
            certs.forEach((cert, index) => {
                const uniTitle = cert.querySelector('.university-name');
                const nameDiv = cert.querySelector('.recipient-name');
                const regBlock = cert.querySelector('.date-block p:first-child b');
                const dateBlock = cert.querySelector('.date-block p:last-child b');
                const reasonDiv = cert.querySelector('.reason-text');
                const titleDiv = cert.querySelector('.signature-title');
                const rectorDiv = cert.querySelector('.rector-name');

                const item = batchData[index] || {};
                currentData.push({
                    uni: uniTitle ? uniTitle.innerText : item.uni,
                    name: nameDiv ? nameDiv.innerText : item.name,
                    reg: regBlock ? regBlock.innerText : item.reg,
                    date: dateBlock ? dateBlock.innerText : item.date,
                    reason: reasonDiv ? reasonDiv.innerText : item.reason,
                    rectorTitle: titleDiv ? titleDiv.innerText : item.rectorTitle,
                    rector: rectorDiv ? rectorDiv.innerText : item.rector,
                    template: item.template || document.getElementById('certTemplate').value || 'klassik'
                });
            });
            return currentData;
        }

        function saveDraft() {
            const dataToSave = {
                lang: currentLang,
                color: document.getElementById('primaryColor').value,
                seal: localStorage.getItem('adu_v3_seal'),
                sig: localStorage.getItem('adu_v3_sig'),
                data: getLiveBatchData()
            };
            
            const blob = new Blob([JSON.stringify(dataToSave)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = \`Sertifikat_Qoralama_\$\{new Date().getTime()\}.adu\`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        }

        function loadDraft(event) {
            const file = event.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const parsed = JSON.parse(e.target.result);
                    if (parsed.lang) {
                        document.getElementById('lang').value = parsed.lang;
                        changeLanguage();
                    }
                    if (parsed.color) {
                        document.getElementById('primaryColor').value = parsed.color;
                        document.documentElement.style.setProperty('--primary-color', parsed.color);
                    }
                    if (parsed.seal) localStorage.setItem('adu_v3_seal', parsed.seal);
                    if (parsed.sig) localStorage.setItem('adu_v3_sig', parsed.sig);
                    
                    if (parsed.data && parsed.data.length > 0) {
                        batchData = parsed.data;
                        const container = document.getElementById('previewContainer');
                        container.innerHTML = '';
                        batchData.forEach(item => {
                            container.appendChild(createCertificateElement(item));
                        });
                        updateScale();
                    }
                } catch(err) {
                    alert("Fayl formati noto'g'ri yoki buzilgan!");
                    console.error(err);
                }
            };
            reader.readAsText(file);
            event.target.value = ''; // Reset input
        }

        async function downloadZIP() {
            if (typeof JSZip === 'undefined' || typeof html2canvas === 'undefined') {
                return alert("Kutib turing, kutubxonalar yuklanmoqda...");
            }
            
            const btn = document.getElementById('ui-btn-zip');
            const originalHTML = btn.innerHTML;
            btn.innerHTML = \`⏳ Kuting...\`;
            btn.disabled = true;

            const container = document.getElementById('previewContainer');
            const origStyle = container.getAttribute('style');

            container.style.display = 'block';
            container.style.padding = '30px';
            container.style.background = '#fff';
            container.style.gap = '50px';
            container.style.height = 'auto';
            container.style.overflow = 'visible';

            const certs = document.querySelectorAll('.certificate');
            const zip = new JSZip();
            const imgFolder = zip.folder("Sertifikatlar");

            for (let i = 0; i < certs.length; i++) {
                const c = certs[i];
                c.dataset.origTransform = c.style.transform;
                c.dataset.origMarginBottom = c.style.marginBottom;
                c.style.transform = 'none';
                c.style.boxShadow = 'none';
                c.style.margin = '0 auto';
                c.style.height = '209mm';

                const canvas = await html2canvas(c, { scale: 2, useCORS: true, logging: false });
                const imgData = canvas.toDataURL("image/jpeg", 0.98).replace(/^data:image\\/(png|jpeg);base64,/, "");
                
                let sName = c.querySelector('.recipient-name')?.innerText?.trim() || "Sertifikat";
                sName = sName.replace(/[^a-zA-Z0-9_\u0400-\u04FF\'\`]/g, '_'); // sanitize filename
                imgFolder.file(\`\$\{sName\}_\$\{i+1\}.jpg\`, imgData, {base64: true});
            }

            try {
                const content = await zip.generateAsync({type:"blob"});
                const url = URL.createObjectURL(content);
                const a = document.createElement('a');
                a.href = url;
                a.download = "Sertifikatlar_ADU.zip";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (e) {
                console.error("ZIP yaratishda xatolik:", e);
                alert("ZIP yuklashda xatolik bo'ldi.");
            }

            // Revert styles
            if (origStyle) {
                container.setAttribute('style', origStyle);
            } else {
                container.removeAttribute('style');
            }
            certs.forEach(c => {
                c.style.transform = c.dataset.origTransform;
                c.style.marginBottom = c.dataset.origMarginBottom;
                c.style.boxShadow = '';
                c.style.margin = '';
                c.style.height = '';
            });
            updateScale();

            btn.innerHTML = originalHTML;
            btn.disabled = false;
        }
`;

html = html.replace("        function getLiveFormData() {", logicFunctions + "\n        function getLiveFormData() {");
fs.writeFileSync('/home/darkdev/adu/index.html', html);
console.log("Stage 1 injected.");
