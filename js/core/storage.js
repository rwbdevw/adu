function uploadImage(event, type) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        localStorage.setItem(`adu_v3_${type}`, e.target.result);
        if(typeof batchData === 'undefined' || !batchData) {
            if (typeof updateSinglePreview === 'function') updateSinglePreview();
        } else {
            // Update all previews visually without resetting entire array
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
    };
    reader.readAsDataURL(file);
}

function clearCustomBg() {
    if(confirm("Haqiqatdan ham shaxsiy rasmni o'chirasizmi?")) {
        localStorage.removeItem('adu_v3_bg');
        const lbl = document.getElementById('lbl-bg');
        if (lbl) lbl.innerHTML = `<span id="ui-lblBg">📂 Surat (.png, .jpg)</span>`;
        if(typeof batchData === 'undefined' || !batchData) {
            if (typeof updateSinglePreview === 'function') updateSinglePreview();
        } else {
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
    }
}

function clearSettings() {
    if (confirm("Haqiqatdan kesh va kiritilgan ma'lumotlarni tozalaysizmi?")) {
        localStorage.clear();
        location.reload();
    }
}

function uploadLocalBg(event, inputElement) {
    const file = event.target.files[0];
    if (!file) return;
    const certElement = inputElement.closest('.certificate');
    const reader = new FileReader();
    reader.onload = (e) => {
        const base64 = e.target.result;
        certElement.dataset.localBg = base64;

        let bgLayer = certElement.querySelector('.custom-bg-layer');
        if(!bgLayer) {
            bgLayer = document.createElement('div');
            bgLayer.className = 'custom-bg-layer';
            certElement.insertBefore(bgLayer, certElement.firstChild);
        }
        bgLayer.style.backgroundImage = `url('${base64}')`;

        let actionsContainer = certElement.querySelector('.cert-local-actions');
        let removeBtn = actionsContainer.querySelector('.local-bg-remove-btn');
        const t = i18n[currentLang].ui;
        if(!removeBtn) {
             removeBtn = document.createElement('button');
             removeBtn.className = "local-bg-remove-btn";
             removeBtn.innerHTML = t.removeBgBtn;
             removeBtn.onclick = function() { removeLocalBg(this); };
             actionsContainer.appendChild(removeBtn);
        }
    };
    reader.readAsDataURL(file);
}

function removeLocalBg(btnElement) {
    const certElement = btnElement.closest('.certificate');
    delete certElement.dataset.localBg;
    certElement.removeAttribute('data-local-bg');

    const globalBg = localStorage.getItem('adu_v3_bg');
    let bgLayer = certElement.querySelector('.custom-bg-layer');
    if (globalBg) {
        if(bgLayer) {
            bgLayer.style.backgroundImage = `url('${globalBg}')`;
        } else {
             bgLayer = document.createElement('div');
             bgLayer.className = 'custom-bg-layer';
             certElement.insertBefore(bgLayer, certElement.firstChild);
             bgLayer.style.backgroundImage = `url('${globalBg}')`;
        }
    } else {
        if(bgLayer) bgLayer.remove();
    }
    btnElement.remove();
}
