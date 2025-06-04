// scraper.js
import puppeteer from 'puppeteer';

const URL =
  'https://servicos.receita.fazenda.gov.br/Servicos/CPF/ConsultaSituacao/ConsultaPublica.asp';

const onlyDigits = str => (str || '').replace(/\D+/g, '');
const formatNascimento = d => {
  d = d.replace(/\D+/g, '');
  if (d.length === 8 && (d.startsWith('19') || d.startsWith('20')))
    d = d.slice(6) + d.slice(4, 6) + d.slice(0, 4); // AAAAMMDD → DDMMYYYY
  if (d.length !== 8) throw Error('Data de nascimento inválida');
  return d;
};

export async function consultarCpf(cpf, nasc) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--lang=pt-BR'],
    executablePath: puppeteer.executablePath()   // aponta para o Chrome baixado
  });

  try {
    const page = await browser.newPage();
    await page.goto(URL, { waitUntil: 'networkidle2' });
    await page.type('#txtCPF', onlyDigits(cpf));
    await page.type('#txtDataNascimento', formatNascimento(nasc));

    // marca o hCaptcha
    const iframe = await page.waitForSelector('iframe[src*="hcaptcha.com"]');
    const hFrame = await iframe.contentFrame();
    await hFrame.click('div[role="checkbox"]');
    await page.waitForTimeout(1000);

    const SUBMIT = '#id_submit';
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle2' }),
      page.click(SUBMIT)
    ]);

    // extrai resultado
    const raw = await page.$eval(
      '#mainComp > div:nth-child(3)',
      el => el.innerText.trim()
    );

    const result = {};
    raw.split('\n').forEach(l => {
      const [label, ...rest] = l.split(':');
      const key = label.trim()
        .replace('Nº do CPF', 'cpf')
        .replace('Nome', 'nome')
        .replace('Data de Nascimento', 'dataNascimento')
        .replace('Situação Cadastral', 'situacao')
        .replace('Data da Inscrição', 'dataInscricao')
        .replace('Digito Verificador', 'digitoVerificador')
        .replace(/\s+/g, '');
      result[key] = rest.join(':').trim();
    });

    return result;
  } finally {
    await browser.close();
  }
}
