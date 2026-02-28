let batchData = null;

function updateFileLabel(input, labelId) {
    const label = document.getElementById(labelId);
    if (input.files && input.files.length > 0) {
        let text = input.files[0].name;
        label.innerHTML = text.length > 20 ? text.substring(0,20)+'...' : text;
        label.style.borderColor = "var(--primary-color)";
        label.style.color = "var(--primary-color)";
        label.style.background = "var(--bg-surface-hover)";
    }
}

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
            template: item.template || document.getElementById('certTemplate').value || 'klassik',
            format: item.format || document.getElementById('certFormat').value || 'landscape',
            nameFont: item.nameFont || document.getElementById('nameFont').value || '',
            localBg: cert.dataset.localBg || item.localBg || null
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
        bg: localStorage.getItem('adu_v3_bg'),
        data: getLiveBatchData()
    };

    const blob = new Blob([JSON.stringify(dataToSave)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Sertifikat_Qoralama_${new Date().getTime()}.adu`;
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
                if (typeof changeLanguage === 'function') changeLanguage();
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
                if (container) {
                    container.innerHTML = '';
                    batchData.forEach(item => {
                        if (typeof createCertificateElement === 'function') {
                            container.appendChild(createCertificateElement(item));
                        }
                    });
                    if (typeof updateScale === 'function') updateScale();
                }
            }
        } catch(err) {
            alert("Fayl formati noto'g'ri yoki buzilgan!");
            console.error(err);
        }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
}

function getLiveFormData() {
    const l = i18n[currentLang];
    return {
        uni: document.getElementById('uniName').value || l.uni,
        name: document.getElementById('recipientName').value || l.namePlaceholder,
        reason: document.getElementById('reasonText').value || "[Matn kiritilmagan...]",
        reg: document.getElementById('regNumber').value || "_______",
        date: document.getElementById('dateText').value || "26.02.2025",
        rectorTitle: document.getElementById('rectorTitle').value || (l.types[document.getElementById('docType').value] ? l.types[document.getElementById('docType').value].role : ''),
        rector: document.getElementById('rectorName').value || l.signerPlaceholder,
        template: document.getElementById('certTemplate').value || 'klassik',
        format: document.getElementById('certFormat').value || 'landscape',
        nameFont: document.getElementById('nameFont').value || ''
    };
}

function addBlankCertificate() {
    const l = i18n[currentLang];
    if (!batchData) {
        batchData = [ getLiveFormData() ];
    }

    const newCert = {
        ...batchData[batchData.length - 1],
        name: l.namePlaceholder,
        reg: "_______"
    };
    batchData.push(newCert);

    const container = document.getElementById('previewContainer');
    if (container) {
        container.innerHTML = '';
        batchData.forEach(item => {
            if (typeof createCertificateElement === 'function') {
                container.appendChild(createCertificateElement(item));
            }
        });
        if (typeof updateScale === 'function') updateScale();

        setTimeout(() => {
            const area = document.getElementById('previewArea');
            if (area) area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
        }, 100);
    }
}

// Event Listeners for Live Preview & QR
document.getElementById('previewContainer').addEventListener('input', function(e) {
    if (e.target.hasAttribute('contenteditable')) {
        const certDef = e.target.closest('.certificate');
        if (certDef) {
            const uniTitle = certDef.querySelector('.university-name');
            const uni = uniTitle ? uniTitle.innerText : 'Tashkilot';
            const name = certDef.querySelector('.recipient-name')?.innerText || '';
            const regBlock = certDef.querySelector('.date-block p:first-child b');
            const reg = regBlock ? regBlock.innerText : '';

            const dateBlockNode = certDef.querySelector('.date-block p:last-child b');
            const dateText = dateBlockNode ? dateBlockNode.innerText : '';
            const qrCanvas = certDef.querySelector('canvas');
            if (qrCanvas) {
                try {
                    const docType = document.getElementById('docType').value;
                    const verifyData = {
                        u: uni, n: name, r: reg, d: dateText, t: docType
                    };
                    const encodedData = btoa(encodeURIComponent(JSON.stringify(verifyData)));
                    const verifyUrl = window.location.origin + window.location.pathname.replace('index.html', '') + 'verify.html?v=' + encodedData;

                    new QRious({
                        element: qrCanvas,
                        value: verifyUrl,
                        size: 200,
                        level: 'M'
                    });
                } catch(e) { console.error("QR error:", e); }
            }
        }
    }
});

// App Initialization
window.onload = () => {
    // Initialize Nav Logo
    const navLogo = document.getElementById('nav-brand-logo');
    if (navLogo) {
        navLogo.src = typeof DEFAULT_ADU_LOGO !== 'undefined' ? DEFAULT_ADU_LOGO : 'ADU-logoj.png';
    }

    if (typeof currentLang !== 'undefined') document.getElementById('lang').value = currentLang;

    const color = localStorage.getItem('adu_v3_color');
    if (color) {
        document.getElementById('primaryColor').value = color;
        document.documentElement.style.setProperty('--primary-color', color);
    }

    try {
        const ls = JSON.parse(localStorage.getItem('adu_v3_data'));
        if (ls) {
            if (ls.docType) document.getElementById('docType').value = ls.docType;
            if (ls.name) document.getElementById('recipientName').value = ls.name;
            if (ls.reason) document.getElementById('reasonText').value = ls.reason;
            if (ls.reg) document.getElementById('regNumber').value = ls.reg;
            if (ls.date) document.getElementById('dateText').value = ls.date;
            if (ls.rector) document.getElementById('rectorName').value = ls.rector;
            if (ls.rectorTitle !== undefined) document.getElementById('rectorTitle').value = ls.rectorTitle;
            if (ls.uni !== undefined) document.getElementById('uniName').value = ls.uni;
            if (ls.template) document.getElementById('certTemplate').value = ls.template;
            if (ls.format) document.getElementById('certFormat').value = ls.format;
            if (ls.nameFont) document.getElementById('nameFont').value = ls.nameFont;
        }
    } catch (e) {}

    if (typeof initTheme === 'function') initTheme();
    if (typeof changeLanguage === 'function') changeLanguage();
    if (typeof initDragAndDrop === 'function') initDragAndDrop();

    window.addEventListener('resize', () => {
        if (typeof updateScale === 'function') updateScale();
    });
};
