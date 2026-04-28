const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        
        // Se o 1.5-flash dá 404, vamos usar o nome técnico exato do modelo estável
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const result = await model.generateContent(`Aja como o Assistente Ético do portal 'Code of Respect'. Pergunta: ${message}`);
        const response = await result.response;
        
        res.json({ text: response.text() });
    } catch (error) {
        console.error("ERRO NO SERVIDOR:", error.message);
        res.status(500).json({ text: "Erro na comunicação com a IA. Verifique sua chave no painel do Render." });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
