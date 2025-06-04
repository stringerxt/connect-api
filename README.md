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
node cpfScraper.js --cpf 000.000.000-00 --nasc 00/00/0000
# ou
node cpfScraper.js --cpf 00000000000 --nasc 0000000 --browser edge
```

O script abre o navegador, preenche o formulário, clica no hCaptcha
e espera a validação. Caso apareça o desafio de imagens, resolva‑o
manualmente. Após o carregamento da página de resultado, o JSON é
exibido no terminal.

## Dependências

* [puppeteer](https://github.com/puppeteer/puppeteer)  
* [minimist](https://github.com/minimistjs/minimist)
