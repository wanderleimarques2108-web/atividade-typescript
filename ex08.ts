export {};

// Formulário de cadastro

// Código do cliente
function formatarCodigo(c: number | string): string {
  let numero: number;
  if (typeof c === 'number') {
    numero = c;
  } else {
    numero = parseInt(c.replace('CLI-', ''));
  }
  return `CLI-${String(numero).padStart(4, '0')}`;
}

// Tamanho da camiseta
type Tamanho = 'P' | 'M' | 'G' | 'GG';
let tamanho: Tamanho = 'M';
// tamanho = 'XG'; // O tipo '"XG"' não pode ser atribuído ao tipo 'Tamanho'.

// Frete
function calcularFrete(regiao: 'norte' | 'nordeste' | 'centro-oeste' | 'sudeste' | 'sul'): number {
  switch (regiao) {
    case 'norte':
      return 25;
    case 'nordeste':
      return 20;
    case 'centro-oeste':
      return 18;
    case 'sudeste':
      return 12;
    case 'sul':
      return 15;
  }
}

// Endereço
function formatarEndereco(rua: string, numero: number, complemento: string | null): string {
  if (complemento === null) {
    return `${rua}, ${numero} - (sem complemento)`;
  }
  return `${rua}, ${numero} - ${complemento}`;
}

// Telefone
function limparTelefone(tel: string | number): string {
  return String(tel).replace(/\D/g, '');
}

// Inferência de literais
const r = 'sul';
calcularFrete(r);

// let r2 = 'sul';
// calcularFrete(r2); // O argumento do tipo 'string' não é atribuível ao parâmetro do tipo '"centro-oeste" | "nordeste" | "norte" | "sudeste" | "sul"'.
// Com const, o tipo inferido é o literal 'sul'. Com let, o valor pode mudar,
// então o compilador infere string, que é mais largo que as cinco regiões aceitas.

let r3 = 'sul' as const;
calcularFrete(r3);

const codigo: number | string = 42;
const complemento: string | null = null;

console.log(`Cliente: ${formatarCodigo(codigo)} | Camiseta: ${tamanho}`);
console.log(`Entrega: ${formatarEndereco('Rua das Flores', 100, complemento)}`);
console.log(`Frete para o sul: R$ ${calcularFrete(r).toFixed(2)}`);
console.log(`Telefone: ${limparTelefone('(69) 99999-0000')}`);
