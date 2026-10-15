export {};

// Cupom fiscal

function formatarNome(nome: string): string {
  const semEspacosNasPontas: string = nome.trim();
  const palavras: string[] = semEspacosNasPontas.split(' ').filter((p) => p !== '');
  const minusculas: string[] = ['da', 'de', 'do'];

  const formatadas: string[] = palavras.map((p) => {
    const palavra: string = p.toLowerCase();
    if (minusculas.includes(palavra)) {
      return palavra;
    }
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
  });

  return formatadas.join(' ');
}

const nomeDigitado: string = '  maria   da silva ';
const precoLido: string = '12.40';
const quantidadeLida: string = '3un';

const preco: number = Number(precoLido);
const quantidade: number = parseInt(quantidadeLida);
const clienteFidelidade: boolean = true;
const numeroCupom: number = 42;

const subtotal: number = preco * quantidade;
const desconto: number = clienteFidelidade ? subtotal * 0.05 : 0;
const totalCupom: number = subtotal - desconto;

const cupom: string = `CUPOM Nº ${String(numeroCupom).padStart(6, '0')}
Cliente: ${formatarNome(nomeDigitado)}
Item: ${quantidade} x R$ ${preco.toFixed(2)}
Subtotal: R$ ${subtotal.toFixed(2)}
Desconto fidelidade: R$ ${desconto.toFixed(2)}
TOTAL: R$ ${totalCupom.toFixed(2)}`;

console.log(cupom);
