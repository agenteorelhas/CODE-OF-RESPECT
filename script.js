async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('O Assistente Ético está a digitar...', 'bot-msg', loadingId);

    try {
        // IMPORTANTE: Assim que o Render terminar o deploy, ele dá-te um link.
        // Substitui "TEU-APP-AQUI.onrender.com" pelo link que o Render te der.
        const RENDER_URL = "https://TEU-APP-AQUI.onrender.com/chat";
        
        const response = await fetch(RENDER_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        
        if (data.text) {
            appendMessage(data.text, 'bot-msg');
        } else {
            throw new Error("Resposta vazia do servidor");
        }

    } catch (error) {
        console.error("Erro na ligação:", error);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.innerText = "Erro na ligação segura. Tenta novamente.";
    }
}
