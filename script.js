document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    
    // Partículas Neon Vibrantes (Amarelo brilhante)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" }, // Corrigido para amarelo neon
                "shape": { "type": "circle" },
                "opacity": { 
                    "value": 1, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.4, "sync": false } 
                },
                "size": { "value": 3, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    "color": "#FFD700", // Linhas amarelo neon
                    "opacity": 0.6, 
                    "width": 1.5 
                },
                "move": { "enable": true, "speed": 2, "direction": "none", "random": true }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } } }
            },
            "retina_detect": true
        });
    }
});

// SUAS FUNÇÕES ORIGINAIS DO CHATBOT E INTERFACE (INTACTAS)
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
    appendMessage('O Assistente Ético está processando...', 'bot-msg', loadingId);

    try {
        // --- CONFIGURAÇÃO IMPORTANTE ---
        // Substitua a URL abaixo pela URL que o Render gerou para o seu Web Service
        // Exemplo: https://code-of-respect-api.onrender.com/chat
        const RENDER_API_URL = "https://SUA-URL"; 
        
        // (O resto do seu código fetch/try-catch continua daqui pra baixo exatamente como você tem aí no seu arquivo)
    } catch (error) {
        console.error(error);
    }
}

// Suponho que você já tenha estas funções, mas deixei aqui por segurança baseado no seu HTML:
function appendMessage(text, className, id = '') {
    const messages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    if(id) msgDiv.id = id;
    msgDiv.innerText = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}
