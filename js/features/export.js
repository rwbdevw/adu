async function downloadPDF() {
    const btn = document.getElementById('ui-btn-download');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `⏳ Kuting...`;
    btn.disabled = true;

    const container = document.getElementById('previewContainer');

    // Vaqtincha stillarni olib tashlash (Faqat aslgiga tortish uchun)
    const origStyle = container.getAttribute('style');

    container.style.display = 'block';
    container.style.padding = '0';
    container.style.background = 'none';
    container.style.gap = '0';
    container.style.height = 'auto';
    container.style.overflow = 'visible';

    const certs = document.querySelectorAll('.certificate');
    certs.forEach((c, index) => {
        c.dataset.origTransform = c.style.transform;
        c.dataset.origMarginBottom = c.style.marginBottom;
        c.style.transform = 'none';
        c.style.boxShadow = 'none';
        c.style.margin = '0 auto';

        c.style.height = '209mm';
        c.style.overflow = 'hidden';
        c.dataset.origPageBreak = c.style.pageBreakAfter;
        if (index === certs.length - 1) {
            c.style.pageBreakAfter = 'auto';
        } else {
            c.style.pageBreakAfter = 'always';
        }
    });

    const isFirstPort = certs[0] && certs[0].classList.contains('format-portrait');
    const opt = {
        margin:       0,
        filename:     'Sertifikatlar_ADU.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, scrollY: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: isFirstPort ? 'portrait' : 'landscape' },
        pagebreak:    { mode: 'css' }
    };

    try {
        await html2pdf().set(opt).from(container).save();
    } catch (e) {
        console.error("PDF yaratishda xatolik:", e);
        alert("PDF yuklashda muammo bo'ldi.");
    }

    // Qayta moslashtirish
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
        c.style.overflow = '';
        c.style.pageBreakAfter = c.dataset.origPageBreak || '';
    });

    if (typeof updateScale === 'function') updateScale();

    btn.innerHTML = originalHTML;
    btn.disabled = false;
}

async function downloadZIP() {
    if (typeof JSZip === 'undefined' || typeof html2canvas === 'undefined') {
        return alert("Kutib turing, kutubxonalar yuklanmoqda...");
    }

    const btn = document.getElementById('ui-btn-zip');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = `⏳ Kuting...`;
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
        const imgData = canvas.toDataURL("image/jpeg", 0.98).replace(/^data:image\/(png|jpeg);base64,/, "");

        let sName = c.querySelector('.recipient-name')?.innerText?.trim() || "Sertifikat";
        sName = sName.replace(/[^a-zA-Z0-9_Ѐ-ӿ'`]/g, '_'); // sanitize filename
        imgFolder.file(`${sName}_${i+1}.jpg`, imgData, {base64: true});
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

    if (typeof updateScale === 'function') updateScale();

    btn.innerHTML = originalHTML;
    btn.disabled = false;
}
