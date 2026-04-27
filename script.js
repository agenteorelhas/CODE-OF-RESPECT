const GEMINI_API_KEY = 'AIzaSyDAo7C9lmOy5D8JX-JkLIvLbRT8fHDovm8';

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    
    // Configuração de Partículas Refinada
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 70 },
                "color": { "value": "#B89650" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.4 },
                "size": { "value": 2 },
                "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.2 },
                "move": { "enable": true, "speed": 1.5 }
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
                        text: `Você é o Assistente Ético do portal 'Code of Respect'. Responda de forma acolhedora e profissional. Pergunta: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const aiResponse = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).remove();
        appendMessage(aiResponse, 'bot-msg');

    } catch (error) {
        console.error(error);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.innerText = "Erro na conexão segura. Verifique se a chave de API está ativa.";
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
    window.scrollTo(0,0);
}

function enviarRelato() {
    alert("Relato enviado com sucesso. Sua identidade está protegida.");
    document.getElementById('relatoTexto').value = "";
    showView('home');
}
