function handleExcel(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const json = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        if (json.length === 0) return alert("Excel bo'sh yoki format noto'g'ri");

        const l = i18n[currentLang];
        batchData = json.map(row => ({
            uni: row.Tashkilot !== undefined ? row.Tashkilot : (row.Org !== undefined ? row.Org : (row.University !== undefined ? row.University : (row.Организация !== undefined ? row.Организация : document.getElementById('uniName').value))),
            name: row.Ism || row.Name || row.FullName || row["Ф.И.О"] || row["ФИО"] || l.namePlaceholder,
            reason: row.Matn || row.Reason || row.Text || row["Текст"] || row.Причина || document.getElementById('reasonText').value,
            reg: row.Reg || row.No || row.Number || row["Рег"] || row["Номер"] || "_______",
            date: row.Sana || row.Date || row["Дата"] || document.getElementById('dateText').value,
            rectorTitle: row.Lavozim !== undefined ? row.Lavozim : (row.Title !== undefined ? row.Title : (row.Position !== undefined ? row.Position : (row["Должность"] !== undefined ? row["Должность"] : document.getElementById('rectorTitle').value))),
            rector: row.Rektor || row.Signer || row.Director || row["Ректор"] || row["Подписант"] || document.getElementById('rectorName').value,
            template: document.getElementById('certTemplate').value || 'klassik'
        }));

        // Show all in batch
        const container = document.getElementById('previewContainer');
        container.innerHTML = '';
        batchData.forEach(item => {
            container.appendChild(createCertificateElement(item));
        });
        updateScale();
    };
    reader.readAsArrayBuffer(file);
}
