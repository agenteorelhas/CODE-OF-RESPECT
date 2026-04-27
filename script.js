// CONFIGURAÇÃO DO GEMINI
// Substitua 'SUA_CHAVE_AQUI' pela sua chave real do Google AI Studio
const GEMINI_API_KEY = 'SUA_CHAVE_AQUI'; 

// Inicialização de Ícones e Partículas
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80 },
            "color": { "value": "#B89650" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5 },
            "size": { "value": 3 },
            "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.2, "width": 1 }
        },
        "interactivity": {
            "events": { "onhover": { "enable": true, "mode": "repulse" } }
        }
    });
});

// Navegação entre abas
function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
    window.scrollTo(0, 0);
}

// Controle do Chatbot
function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function handleKeyPress(e) {
    if (e.key === 'Enter') enviarChat();
}

async function enviarChat() {
    const input = document.getElementById('chatInput');
    const container = document.getElementById('chatMessages');
    const userText = input.value.trim();

    if (!userText) return;

    // Adiciona msg do usuário
    appendMessage(userText, 'user-msg');
    input.value = '';

    // Efeito de "Digitando..."
    const loadingId = 'loading-' + Date.now();
    appendMessage('Analisando ética...', 'bot-msg', loadingId);

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Aja como um Assistente Ético Corporativo do site Code of Respect. 
                        Sua missão é ajudar vítimas de assédio moral e orientar sobre ética. 
                        Seja acolhedor, profissional e direto. 
                        Pergunta do usuário: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        const aiResponse = data.candidates[0].content.parts[0].text;

        // Remove loading e adiciona resposta real
        document.getElementById(loadingId).remove();
        appendMessage(aiResponse, 'bot-msg');

    } catch (error) {
        document.getElementById(loadingId).innerText = "Erro ao conectar com a IA. Verifique sua chave de API.";
        console.error("Erro Gemini:", error);
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

// Função de Denúncia Simulação
function enviarRelato() {
    alert("Relato enviado com sucesso sob criptografia ponta-a-ponta.");
    showView('home');
}
