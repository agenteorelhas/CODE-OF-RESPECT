const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const apiKey = process.env.GEMINI_API_KEY;

        // Chamada manual direta. Sem bibliotecas, sem erro de v1beta.
        const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Aja como o Assistente Ético do portal 'Code of Respect'. Responda: ${message}` }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "Erro na API do Google");
        }

        const aiText = data.candidates[0].content.parts[0].text;
        res.json({ text: aiText });

    } catch (error) {
        console.error("ERRO NO RENDER:", error.message);
        res.status(500).json({ text: "Erro técnico: " + error.message });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
