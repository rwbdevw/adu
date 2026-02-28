function updateScale() {
    const area = document.getElementById('previewArea');
    const container = document.getElementById('previewContainer');
    if (!area || !container) return;
    const certs = document.querySelectorAll('.certificate');
    if(certs.length === 0) return;
    const availWidth = area.clientWidth - 80;

    certs.forEach(cert => {
        const isPort = cert.classList.contains('format-portrait');
        const baseW = isPort ? 794 : 1150;
        const scale = availWidth / baseW;
        const sf = Math.min(Math.max(scale, 0.4), 1);

        cert.style.transform = `scale(${sf})`;
        cert.dataset.scale = sf;
        const h = isPort ? 297 * 3.779527 : 210 * 3.779527; // mm to px
        const diff = h - (h*sf);
        cert.style.marginBottom = `-${diff - 50}px`;
    });

    // Auto-resize names
    const names = container.querySelectorAll('.recipient-name');
    names.forEach(nameEl => {
        let currentSize = 50;
        nameEl.style.fontSize = currentSize + 'px';
        while (nameEl.scrollWidth > nameEl.offsetWidth && currentSize > 20) {
            currentSize -= 2;
            nameEl.style.fontSize = currentSize + 'px';
        }
    });
}

function updateTemplate() {
    const l = i18n[currentLang];
    const typeConfig = l.types[document.getElementById('docType').value];
    if (document.getElementById('reasonText')) document.getElementById('reasonText').value = typeConfig.reason;

    const rInput = document.getElementById('rectorName');
    if (rInput && (!rInput.value || rInput.value.includes('['))) rInput.value = l.signerPlaceholder;

    const rTitleInput = document.getElementById('rectorTitle');
    if (rTitleInput) {
        let isDefaultTitle = !rTitleInput.value;
        Object.values(i18n).forEach(lang => {
            Object.values(lang.types).forEach(t => {
                if (rTitleInput.value === t.role) isDefaultTitle = true;
            });
        });
        if (isDefaultTitle) rTitleInput.value = typeConfig.role;
    }

    const uInput = document.getElementById('uniName');
    if (uInput) {
        let isDefaultUni = !uInput.value;
        Object.values(i18n).forEach(lang => {
            if (uInput.value === lang.uni) isDefaultUni = true;
        });
        if (isDefaultUni) uInput.value = l.uni;
    }

    if (typeof updateSinglePreview === 'function') updateSinglePreview();
}

function updateColors() {
    const color = document.getElementById('primaryColor').value;
    document.documentElement.style.setProperty('--primary-color', color);
    localStorage.setItem('adu_v3_color', color);
    if (typeof updateSinglePreview === 'function') updateSinglePreview();
}

function createCertificateElement(data) {
    const l = i18n[currentLang];
    const typeOpts = l.types[document.getElementById('docType').value] || l.types["Sertifikat"];

    const div = document.createElement('div');
    const certTemplate = data.template || document.getElementById('certTemplate').value || 'klassik';
    const certFormat = data.format || document.getElementById('certFormat').value || 'landscape';
    div.className = `certificate template-${certTemplate} format-${certFormat}`;
    div.style.position = "relative";

    const sealImg = localStorage.getItem('adu_v3_seal');
    const sigImg = localStorage.getItem('adu_v3_sig');
    const customLogo = localStorage.getItem('adu_v3_logo');
    const globalBg = localStorage.getItem('adu_v3_bg');
    const localBgImg = data.localBg;
    const displayBg = localBgImg || globalBg;
    const nameFontCSS = data.nameFont ? `font-family: ${data.nameFont} !important;` : '';

    const fallbackLogo = typeof DEFAULT_ADU_LOGO !== 'undefined' ? DEFAULT_ADU_LOGO : 'assets/img/adu_logo.png';
    const resolvedLogo = customLogo ? customLogo : fallbackLogo;

    if (localBgImg) div.dataset.localBg = localBgImg;

    const t = l.ui;

    div.innerHTML = `
        ${displayBg ? `<div class="custom-bg-layer" style="background-image: url('${displayBg}');"></div>` : ''}

        <div class="cert-local-actions" data-html2canvas-ignore="true">
            <label title="Ushbu sertifikat uchun boshqa fon yuklash" class="local-bg-btn">
                ${t.localBgBtn}
                <input type="file" style="display:none;" accept="image/*" onchange="uploadLocalBg(event, this)">
            </label>
            ${localBgImg ? `<button onclick="removeLocalBg(this)" class="local-bg-remove-btn">${t.removeBgBtn}</button>` : ''}
        </div>

        <div class="cert-top-logo drag-element" style="position: absolute; top: 20mm; left: 20mm; z-index: 10;">
            <img src="${resolvedLogo}" alt="University Logo" style="height: 140px; width: auto; display: block; object-fit: contain;">
        </div>

        <div class="header drag-element">
            ${data.uni ? `<h1 class="university-name" contenteditable="true" spellcheck="false">${data.uni}</h1>` : ''}
            <h2 class="certificate-title" contenteditable="true" spellcheck="false">${typeOpts.title}</h2>
        </div>
        <div class="content">
            <div class="intro-text drag-element" contenteditable="true" spellcheck="false">${typeOpts.intro}</div>
            <div class="recipient-name drag-element" contenteditable="true" spellcheck="false" style="${nameFontCSS}">${data.name}</div>
            <div class="reason-text drag-element" contenteditable="true" spellcheck="false">${data.reason}</div>
        </div>

        <div class="seal drag-element">
            ${sealImg ? `<img src="${sealImg}">` : 'MUHR<br>O\'RNI'}
        </div>

        <div class="footer">
            <div class="left-footer drag-element">
                <div class="qrcode-container"><canvas></canvas></div>
                <div class="date-block">
                    <p>${l.regLabel}: <b contenteditable="true" spellcheck="false">${data.reg}</b></p>
                    <p>${l.dateLabel}: <b contenteditable="true" spellcheck="false">${data.date}</b></p>
                </div>
            </div>
            <div class="signature-block drag-element">
                <div class="signature-line">
                    ${sigImg ? `<img src="${sigImg}" class="signature-image">` : ''}
                </div>
                <div class="signature-title" contenteditable="true" spellcheck="false">${data.rectorTitle || typeOpts.role}</div>
                <div class="rector-name" contenteditable="true" spellcheck="false" style="font-weight:600; font-size:14px; margin-top:5px; color:#333;">${data.rector}</div>
            </div>
        </div>
    `;

    const qrCanvas = div.querySelector('canvas');
    try {
        const docType = document.getElementById('docType').value;
        const verifyData = {
            u: data.uni || 'Tashkilot',
            n: data.name || '',
            r: data.reg || '',
            d: data.date || '',
            t: docType
        };
        const encodedData = btoa(encodeURIComponent(JSON.stringify(verifyData)));
        const verifyUrl = window.location.origin + window.location.pathname.replace('index.html', '') + 'verify.html?v=' + encodedData;

        new QRious({
            element: qrCanvas,
            value: verifyUrl,
            size: 300,
            level: 'H'
        });
    } catch(e) { console.error("QR generation error:", e); }

    qrCanvas.style.width = '100%';
    qrCanvas.style.height = '100%';

    return div;
}

function updateSinglePreview() {
    if (typeof batchData !== 'undefined' && batchData) return;
    const l = i18n[currentLang];
    const dataObj = {
        uni: document.getElementById('uniName').value,
        name: document.getElementById('recipientName').value || l.namePlaceholder,
        reason: document.getElementById('reasonText').value || "[Matn kiritilmagan...]",
        reg: document.getElementById('regNumber').value || "_______",
        date: document.getElementById('dateText').value || "26.02.2025",
        rectorTitle: document.getElementById('rectorTitle').value,
        rector: document.getElementById('rectorName').value || l.signerPlaceholder,
        template: document.getElementById('certTemplate').value || 'klassik',
        format: document.getElementById('certFormat').value || 'landscape',
        nameFont: document.getElementById('nameFont').value || ''
    };

    const container = document.getElementById('previewContainer');
    if (container) {
        container.innerHTML = '';
        container.appendChild(createCertificateElement(dataObj));
        updateScale();
    }

    localStorage.setItem('adu_v3_data', JSON.stringify({
        lang: currentLang, docType: document.getElementById('docType').value,
        template: dataObj.template, uni: dataObj.uni, rectorTitle: dataObj.rectorTitle,
        format: dataObj.format, nameFont: dataObj.nameFont,
        name: dataObj.name, reason: dataObj.reason, reg: dataObj.reg, date: dataObj.date, rector: dataObj.rector
    }));
}
