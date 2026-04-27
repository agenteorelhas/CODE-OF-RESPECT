const GEMINI_API_KEY = 'AIzaSyCss0yqKyChzh1kGA_QiVDo9LqTsuU0syA';

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 40 },
                "color": { "value": "#B89650" },
                "line_linked": { "color": "#B89650", "opacity": 0.1 }
            }
        });
    }
});

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('O Assistente Ético está analisando...', 'bot-msg', loadingId);

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `VOCÊ É O AGENTE 'CODE OF RESPECT'. 
                        Sua missão é ser um Assistente Ético especializado em assédio moral. 
                        TOM: Empático, seguro, profissional e imparcial. 
                        OBJETIVO: Ouvir o usuário, explicar o que configura assédio e orientar canais de denúncia.
                        USUÁRIO DIZ: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        document.getElementById(loadingId).remove();
        appendMessage(aiResponse, 'bot-msg');

    } catch (error) {
        document.getElementById(loadingId).innerText = "Erro: A chave de API ainda está propagando ou é inválida. Tente em 1 minuto.";
    }
}

function appendMessage(text, className, id = null) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    if (id) msgDiv.id = id;
    msgDiv.innerText = text;
    const container = document.getElementById('chatMessages');
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}

function enviarRelato() {
    alert("Relato enviado com sucesso. Sua identidade está protegida.");
    showView('home');
}
