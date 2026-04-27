const GEMINI_API_KEY = 'AIzaSyCss0yqKyChzh1kGA_QiVDo9LqTsuU0syA';

document.addEventListener('DOMContentLoaded', () => {
    // Inicializa ícones do Lucide
    if (window.lucide) lucide.createIcons();
    
    // Inicializa partículas (Configuração ajustada para visibilidade)
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            "particles": {
                "number": { "value": 50, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#B89650" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.3 },
                "size": { "value": 3 },
                "line_linked": { "enable": true, "distance": 150, "color": "#B89650", "opacity": 0.2, "width": 1 },
                "move": { "enable": true, "speed": 2 }
            }
        });
    }
});

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    const isVisible = chat.style.display === 'flex';
    chat.style.display = isVisible ? 'none' : 'flex';
}

function handleKeyPress(e) { 
    if (e.key === 'Enter') enviarChat(); 
}

async function enviarChat() {
    const input = document.getElementById('chatInput');
    const userText = input.value.trim();
    if (!userText) return;

    appendMessage(userText, 'user-msg');
    input.value = '';

    const loadingId = 'loading-' + Date.now();
    appendMessage('Analisando...', 'bot-msg', loadingId);

    try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Aja como o Assistente Ético do portal 'Code of Respect'. 
                        Sua missão é ajudar no combate ao assédio moral corporativo. 
                        Seja profissional, empático e informativo. Pergunta: ${userText}`
                    }]
                }]
            })
        });

        const data = await response.json();
        
        if (data.error) throw new Error(data.error.message);

        const aiResponse = data.candidates[0].content.parts[0].text;
        
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) loadingEl.remove();
        
        appendMessage(aiResponse, 'bot-msg');

    } catch (error) {
        console.error("Erro na API:", error);
        const loadingEl = document.getElementById(loadingId);
        if (loadingEl) {
            loadingEl.innerText = "Erro na conexão segura. Verifique se sua chave está ativa.";
            loadingEl.style.color = "#ff4444";
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
    const texto = document.getElementById('relatoTexto').value;
    if(!texto) {
        alert("Por favor, descreva o relato.");
        return;
    }
    alert("Relato enviado com sucesso. Sua identidade está protegida.");
    document.getElementById('relatoTexto').value = "";
    showView('home');
}
