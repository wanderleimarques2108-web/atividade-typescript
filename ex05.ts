export {};

// Boletim do clima

const leituras: [cidade: string, temperatura: number][] = [
  ['Porto Velho', 34],
  ['Curitiba', 12],
  ['Manaus', 31],
  ['Porto Alegre', 9],
  ['Natal', 29],
];

function extremos(temps: number[]): [number, number] {
  return [Math.min(...temps), Math.max(...temps)];
}

for (const [cidade, temp] of leituras) {
  console.log(`${cidade}: ${temp}°C`);
}

const temperaturas: number[] = leituras.map(([, temp]) => temp);
const [minima, maxima] = extremos(temperaturas);

// Histórico: a cidade seguida de qualquer quantidade de temperaturas
const historico: [string, ...number[]] = ['Capitais', ...temperaturas];
const [, ...valores] = historico;
const media: number = valores.reduce((soma, t) => soma + t, 0) / valores.length;

console.log(`Mínima: ${minima}°C | Máxima: ${maxima}°C | Média: ${media.toFixed(1)}°C`);

// Contatos de imprensa (e-mail opcional)
const contato1: [nome: string, telefone: string, email?: string] = ['Paula Reis', '(69) 98888-1111', 'paula@jornal.com'];
const contato2: [nome: string, telefone: string, email?: string] = ['Rui Prado', '(69) 97777-2222'];

const capitalOficial: readonly [string, string] = ['RO', 'Porto Velho'];
// capitalOficial[0] = 'AC'; // Não é possível atribuir a '0' porque é uma propriedade de somente leitura.
