# CPF Scraper (Node.js)

Web‑scraper que consulta a situação cadastral de um CPF diretamente
no site da Receita Federal e devolve os dados em JSON.

## Requisitos

* Node >= 16  
* Google Chrome ou Microsoft Edge instalados

## Instalação

```bash
npm install
```

## Uso

```bash
node cpfScraper.js --cpf 020.527.631-80 --nasc 23/06/1995
# ou
node cpfScraper.js --cpf 02052763180 --nasc 23061995 --browser edge
```

O script abre o navegador, preenche o formulário, clica no hCaptcha
e espera a validação. Caso apareça o desafio de imagens, resolva‑o
manualmente. Após o carregamento da página de resultado, o JSON é
exibido no terminal.

## Dependências

* [puppeteer](https://github.com/puppeteer/puppeteer)  
* [minimist](https://github.com/minimistjs/minimist)
