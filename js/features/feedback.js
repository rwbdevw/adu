function toggleFeedbackPanel() {
    const panel = document.getElementById('feedback-panel');
    if(panel.style.display === 'none' || panel.style.display === '') {
        panel.style.display = 'flex';
        document.getElementById('feedback-text').focus();
    } else {
        panel.style.display = 'none';
    }
}

async function sendFeedback() {
    const l = i18n[currentLang].ui;
    const textEl = document.getElementById('feedback-text');
    const btn = document.getElementById('feedback-submit');
    const text = textEl.value.trim();

    if(!text) return showToast(l.msgEmpty, 'error');

    btn.disabled = true;
    btn.innerHTML = l.msgWait;
    btn.style.opacity = '0.7';

    try {
        // Call the Netlify Serverless Function instead of exposing Telegram keys
        const req = await fetch('/.netlify/functions/feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });

        if(req.ok) {
            showToast(l.msgSuccess, 'success');
            textEl.value = '';
            toggleFeedbackPanel();
        } else {
            const errText = await req.text();
            let errStr = l.msgErrorFetch;
            try { const errObj = JSON.parse(errText); errStr = errObj.error || errStr; } catch(e) { errStr += ' ('+req.status+')'; }
            throw new Error(errStr);
        }
    } catch(err) {
        console.error(err);
        showToast(l.msgError + err.message, 'error');
    } finally {
        btn.disabled = false;
        btn.innerHTML = l.btnSend;
        btn.style.opacity = '1';
    }
}
