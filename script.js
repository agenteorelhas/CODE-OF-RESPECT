document.addEventListener('DOMContentLoaded', () => {
    if (window.lucide) lucide.createIcons();
    
    // Configuração das Partículas
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#FFD700" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5 },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "distance": 150, "color": "#FFD700", "opacity": 0.4, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            }
        });
    }
});

// 1. FUNÇÃO PARA ABRIR/FECHAR O CHAT
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    // Alterna a classe 'active' que controla o display: flex no CSS
    if (chat.style.display === 'flex') {
        chat.style.display = 'none';
    } else {
        chat.style.display = 'flex';
    }
}

// 2. FUNÇÃO DE INTERAÇÃO COM A IA (CORRIGIDA)
async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    
    if (!userText) return;

    // Adiciona mensagem do usuário na tela
    appendMessage(userText, 'user-msg');
    input.value = '';

    // Adiciona balão de carregamento
    const loadingId = 'loading-' + Date.now();
    appendMessage('Processando sua dúvida...', 'bot-msg', loadingId);

    try {
        // COLOQUE SUA URL DO RENDER AQUI:
        const RENDER_API_URL = "SUA_URL_AQUI/chat"; 

        const response = await fetch(RENDER_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText })
        });

        const data = await response.json();
        
        // Remove o texto de carregamento e coloca a resposta da IA
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.innerText = data.response || "Desculpe, não consegui processar isso agora.";
        }

    } catch (error) {
        console.error('Erro na API:', error);
        const loadingElement = document.getElementById(loadingId);
        if (loadingElement) {
            loadingElement.innerText = "Erro na conexão segura. Tente novamente.";
        }
    }
}

function appendMessage(text, className, id = '') {
    const messages = document.getElementById('chatMessages');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    if(id) msgDiv.id = id;
    msgDiv.innerText = text;
    messages.appendChild(msgDiv);
    messages.scrollTop = messages.scrollHeight;
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

// Troca de abas
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}
