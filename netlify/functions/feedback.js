exports.handler = async function(event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
    }

    try {
        const payload = JSON.parse(event.body);
        const text = payload.text;

        if (!text) {
            return { statusCode: 400, body: JSON.stringify({ error: "No text provided" }) };
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        if (!botToken || !chatId) {
            return { statusCode: 500, body: JSON.stringify({ error: "Server credentials missing" }) };
        }

        const msg = `📬 Yangi Xabar (ADU Sertifikat):\n\n${text}`;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        // Use global fetch available in Node 18+ (Netlify standard)
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: msg
            })
        });

        if (response.ok) {
            return {
                statusCode: 200,
                body: JSON.stringify({ success: true, message: "Sent successfully" })
            };
        } else {
            const err = await response.text();
            return {
                statusCode: response.status,
                body: JSON.stringify({ error: "Telegram API Error", details: err })
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
}
