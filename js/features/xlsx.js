function handleExcel(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const json = XLSX.utils.sheet_to_json(firstSheet);

        if (json.length === 0) {
            showToast(i18n[currentLang].ui.msgEmptyExcel || "Excel bo'sh!", 'error');
            return;
        }

        // Get headers to check for completeness
        const rowData = XLSX.utils.sheet_to_json(firstSheet, { header: 1 });
        const headers = rowData[0] || [];
        const foundColumns = headers.map(h => h ? String(h).toLowerCase() : "");

        const recommended = ['ism', 'sana', 'reg', 'matn', 'rektor'];
        const missing = recommended.filter(r => !foundColumns.some(f => f.includes(r)));

        const l = i18n[currentLang];
        batchData = json.map(row => ({
            uni: row.Tashkilot || row.Org || row.University || row.Организация || document.getElementById('uniName').value || l.uni,
            name: row.Ism || row.Name || row.FullName || row["Ф.И.О"] || row["ФИО"] || l.namePlaceholder,
            reason: row.Matn || row.Reason || row.Text || row["Текст"] || row.Причина || document.getElementById('reasonText').value,
            reg: row.Reg || row.No || row.Number || row["Рег"] || row["Номер"] || "_______",
            date: row.Sana || row.Date || row["Дата"] || document.getElementById('dateText').value,
            rectorTitle: row.Lavozim || row.Title || row.Position || row["Должность"] || document.getElementById('rectorTitle').value,
            rector: row.Rektor || row.Signer || row.Director || row["Ректор"] || row["Подписант"] || document.getElementById('rectorName').value,
            template: document.getElementById('certTemplate').value || 'klassik'
        }));

        const processData = () => {
            const container = document.getElementById('previewContainer');
            container.innerHTML = '';
            batchData.forEach(item => {
                container.appendChild(createCertificateElement(item));
            });
            updateScale();
            showToast(l.ui.msgBatchSuccess.replace('{n}', batchData.length), 'success');
        };

        if (missing.length > 0) {
            showExcelWarning(missing, processData);
        } else {
            processData();
        }
    };
    reader.readAsArrayBuffer(file);
}

function showExcelWarning(missingCols, callback) {
    const l = i18n[currentLang];
    const modal = document.createElement('div');
    modal.className = 'adu-modal-overlay';

    const missingText = missingCols.join(', ');
    const noteText = {
        uz: "* Eslatma: Ustun nomlari aynan shunday bo'lishi shart emas, lekin mazmunan yaqin bo'lishi kerak.",
        ru: "* Примечание: Названия колонок не обязательно должны быть такими же, но должны быть близки по смыслу.",
        en: "* Note: Column names don't have to be exactly the same, but should be similar in meaning."
    };

    modal.innerHTML = `
        <div class="adu-modal-content">
            <div class="adu-modal-header">
                <div style="font-size: 24px;">⚠️</div>
                <h3 class="adu-modal-title">${l.ui.modalExcelTitle || "Excel formati to'liq emas"}</h3>
            </div>
            <div class="adu-modal-body">
                <p class="adu-modal-text">
                    ${(l.ui.modalExcelDesc || "Tavsiya etilgan ustunlar topilmadi: {cols}").replace('{cols}', `<b>${missingText}</b>`)}
                </p>

                <div class="adu-sample-table-wrapper">
                    <table class="adu-sample-table">
                        <thead>
                            <tr>
                                <th>${l.ui.name || 'Ism'}</th>
                                <th>${l.ui.date || 'Sana'}</th>
                                <th>${l.ui.reg || 'Reg'}</th>
                                <th>${l.ui.reason || 'Matn'}</th>
                                <th>${l.ui.rector || 'Rektor'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Ali Valiyev</td>
                                <td>${new Date().toLocaleDateString()}</td>
                                <td>001/25</td>
                                <td>...</td>
                                <td>A. Nabiyev</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p class="adu-modal-text" style="font-size: 13px; color: #ef4444;">
                    ${noteText[currentLang] || noteText.uz}
                </p>
            </div>
            <div class="adu-modal-footer">
                <button class="btn btn-secondary" id="btn-modal-cancel">${l.ui.btnCancel || "Bekor qilish"}</button>
                <button class="btn-modal-primary" id="btn-modal-continue">${l.ui.btnContinue || "Davom etish"}</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('show'), 10);

    const close = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };

    document.getElementById('btn-modal-continue').onclick = () => {
        close();
        callback();
    };
    document.getElementById('btn-modal-cancel').onclick = close;
}
