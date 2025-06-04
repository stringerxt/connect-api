
// app.js
import express from 'express';
import dotenv  from 'dotenv';
import { consultarCpf } from './scraper.js';

dotenv.config();
const app  = express();
const port = process.env.PORT || 3000;

app.get('/consulta-cpf', async (req, res) => {
  const { cpf, nasc } = req.query;
  if (!cpf || !nasc)
    return res.status(400).json({ error: 'Parâmetros cpf e nasc obrigatórios' });

  try {
    const dados = await consultarCpf(cpf, nasc);
    res.json(dados);
  } catch (err) {
    console.error('Erro na consulta:', err);
    res.status(500).json({ error: 'Falha ao consultar CPF', detalhe: err.message });
  }
});

app.listen(port, () => {
  console.log(`🚀  API rodando em http://localhost:${port}`);
});
