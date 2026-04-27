const GEMINI_API_KEY = 'AIzaSyDAo7C9lmOy5D8JX-JkLIvLbRT8fHDovm8';

document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    
    // Configuração de Partículas Neon
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 90, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#B89650" },
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 0.8, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false } 
                },
                "size": { 
                    "value": 3, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 2, "size_min": 0.1, "sync": false } 
                },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#B89650", 
                    "opacity": 0.4, 
                    "width": 1.5 
                },
                "move": { "enable": true, "speed": 2.5, "direction": "none", "random": true, "straight": false, "out_mode": "out" }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 0.8 } } }
            },
            "retina_detect": true
        });
    }
});

// Mantive as funções de toggleChat, enviarChat e showView conforme o código anterior
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
    appendMessage('Processando...', 'bot-msg', loadingId);

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Aja como o Assistente Ético do portal 'Code of Respect'. Pergunta: ${userText}` }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;
        document.getElementById(loadingId).remove();
        appendMessage(aiResponse, 'bot-msg');

    } catch (error) {
        if (document.getElementById(loadingId)) {
            document.getElementById(loadingId).innerText = "Erro na conexão segura.";
        }
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
    alert("Relato enviado com segurança.");
    showView('home');
}
