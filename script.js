document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    
    // Partículas Neon Vibrantes (CÓDIGO VISUALMENTE ATUALIZADO)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                // Aumentado o número para maior densidade
                "number": { "value": 110, "density": { "enable": true, "value_area": 800 } },
                // Cor alterada para Dourado Vibrante
                "color": { "value": "#FFD700" }, 
                "shape": { "type": "circle" },
                // Aumentado opacity para visibilidade total
                "opacity": { 
                    "value": 1, 
                    "random": true, 
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.5, "sync": false } 
                },
                "size": { "value": 3, "random": true },
                "line_linked": { 
                    "enable": true, 
                    "distance": 150, 
                    // Cor das linhas alterada para Dourado
                    "color": "#FFD700", 
                    "opacity": 0.6, 
                    "width": 1.5 
                },
                "move": { "enable": true, "speed": 1.5, "direction": "none", "random": true }
            },
            "interactivity": {
                "events": { "onhover": { "enable": true, "mode": "grab" } },
                "modes": { "grab": { "distance": 200, "line_linked": { "opacity": 1 } } }
            },
            "retina_detect": true
        });
    }
});

// --- SUAS FUNÇÕES ORIGINAIS DO CHATBOT E INTERFACE (BLINDADAS) ---
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    if (!chat) return;
    chat.style.display = (chat.style.display === 'flex') ? 'none' : 'flex';
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value?.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('O Assistente Ético está processando...', 'bot-msg', loadingId);

    try {
        // --- CONFIGURAÇÃO DO SEU BACK-END ---
        const RENDER_API_URL = "SUA-URL-AQUI"; 
        
        const response = await fetch(RENDER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });
        const data = await response.json();
        
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.innerText = data.response || "Desculpe, não consegui processar isso.";
        }
    } catch (error) {
        console.error(error);
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.innerText = "Erro na conexão segura. Tente novamente.";
        }
    }
}

function appendMessage(text, className, id = '') {
    const messages = document.getElementById('chatMessages');
    if (!messages) return;
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    if(id) msgDiv.id = id;
    msgDiv.innerText = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

// Lógica de Abas Dinâmicas do Backup
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    const target = document.getElementById(viewId);
    if(target) target.classList.add('active');
    
    // Se a aba for o quiz, reinicia-o (funções do quiz mantidas no backup)
    if(viewId === 'quiz' && typeof startQuiz === 'function') startQuiz();
}
