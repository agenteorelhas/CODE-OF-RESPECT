// ATENÇÃO: Use sua chave real aqui
const API_KEY = 'AIzaSyCss0yqKyChzh1kGA_QiVDo9LqTsuU0syA';

// Inicializa ícones e navegação
document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
});

function toggleChat() {
    const chat = document.getElementById('chatWindow');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
}

function handleKeyPress(e) { if (e.key === 'Enter') enviarChat(); }

async function enviarChat() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;

    appendMessage(text, 'user-msg');
    input.value = '';

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ contents: [{ parts: [{ text: text }] }] })
        });
        
        const data = await response.json();
        const botText = data.candidates[0].content.parts[0].text;
        appendMessage(botText, 'bot-msg');
    } catch (e) {
        appendMessage("Erro de conexão. Verifique sua internet.", 'bot-msg');
    }
}

function appendMessage(text, type) {
    const div = document.createElement('div');
    div.className = `msg ${type}`;
    div.innerText = text;
    document.getElementById('chatMessages').appendChild(div);
    const container = document.getElementById('chatMessages');
    container.scrollTop = container.scrollHeight;
}

function showView(viewId) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(viewId).classList.add('active');
}
