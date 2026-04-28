const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors());

// Inicializa a API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // CORREÇÃO CRÍTICA: Forçamos a apiVersion 'v1' como segundo argumento
        // Isso remove o 'v1beta' da URL e resolve o erro 404 em Ohio
        const model = genAI.getGenerativeModel(
            { model: "gemini-1.5-flash" }, 
            { apiVersion: 'v1' }
        );

        const prompt = `Aja como o Assistente Ético do portal 'Code of Respect'. Forneça conselhos profissionais sobre ética e assédio. Pergunta: ${message}`;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ text: text });

    } catch (error) {
        console.error("ERRO NO SERVIDOR:", error.message);
        
        // Retorna o erro amigável para o chat
        res.status(500).json({ 
            text: "Erro técnico na IA: " + error.message 
        });
    }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
