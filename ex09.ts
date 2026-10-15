export {};

// Lendo a resposta de uma API de clima

const respostaOk = '{"cidade":"Porto Velho","temperatura":34,"umidade":0.62}';
const respostaQuebrada = '{"cidade":"Porto Velho","temperatura":"quente"}';
const respostaInvalida = '{ cidade: Porto Velho ';

// Versão com any: o compilador não reclama de nada
function lerComAny(json: string): string {
  const dados: any = JSON.parse(json);
  return dados.temperatura.toFixed(1);
}

// lerComAny(respostaQuebrada); // só falha na execução: TypeError: dados.temperatura.toFixed is not a function

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// Versão segura com unknown
function lerClima(json: string): { cidade: string; temperatura: number } {
  let dados: unknown;

  try {
    dados = JSON.parse(json);
  } catch (erro: unknown) {
    if (erro instanceof SyntaxError) {
      falhar('JSON malformado');
    }
    throw erro;
  }

  if (typeof dados !== 'object' || dados === null) {
    falhar('resposta inválida');
  }
  if (!('cidade' in dados) || typeof dados.cidade !== 'string') {
    falhar('campo "cidade" inválido');
  }
  if (!('temperatura' in dados) || typeof dados.temperatura !== 'number') {
    falhar('campo "temperatura" inválido');
  }

  return { cidade: dados.cidade, temperatura: dados.temperatura };
}

for (const resposta of [respostaOk, respostaQuebrada, respostaInvalida]) {
  try {
    const clima = lerClima(resposta);
    console.log(`${clima.cidade}: ${clima.temperatura.toFixed(1)}°C`);
  } catch (erro: unknown) {
    if (erro instanceof Error) {
      console.log(`Erro: ${erro.message}`);
    }
  }
}
