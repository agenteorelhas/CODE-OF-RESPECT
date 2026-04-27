const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
app.use(express.json());
app.use(cors()); 

// A chave API será lida das variáveis de ambiente do Render
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        
        const prompt = `Aja como o Assistente Ético do portal 'Code of Respect'. Forneça conselhos profissionais sobre ética e assédio. Pergunta: ${message}`;
        
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        res.json({ text: response.text() });
    } catch (error) {
        console.error("Erro na API:", error);
        res.status(500).json({ error: "Ocorreu um erro ao processar a tua solicitação." });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor ativo na porta ${PORT}`));
