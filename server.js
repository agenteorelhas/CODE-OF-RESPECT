const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        // Chamada direta via FETCH para a URL estável do Google
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: `Aja como o Assistente Ético do portal 'Code of Respect'. Pergunta: ${message}` }]
                }]
            })
        });

        const data = await response.json();

        // Se o Google retornar erro 404 ou outro, capturamos aqui
        if (!response.ok) {
            console.error("Erro da API Google:", data);
            throw new Error(data.error?.message || "Erro desconhecido na API");
        }

        const text = data.candidates[0].content.parts[0].text;
        res.json({ text: text });

    } catch (error) {
        console.error("ERRO NO SERVIDOR:", error.message);
        res.status(500).json({ 
            text: "Erro técnico: " + error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando em Ohio na porta ${PORT}`));
