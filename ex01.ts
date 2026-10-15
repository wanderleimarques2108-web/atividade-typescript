export {};

// Caixa da padaria

let nomeProduto1: string = 'Pão francês';
let precoUnitario1: number = 0.75;
let quantidade1: number = 12;

let nomeProduto2: string = 'Bolo de cenoura';
let precoUnitario2: number = 18.5;
let quantidade2: number = 2;

let aberta = true; // tipo inferido: boolean

const subtotal1: number = precoUnitario1 * quantidade1;
const subtotal2: number = precoUnitario2 * quantidade2;
const total: number = subtotal1 + subtotal2;

const paesVendidosNoAno: number = 1_250_000;
const categoria: number = 0x1a;

// quantidade1 = 'doze'; // O tipo 'string' não pode ser atribuído ao tipo 'number'.

console.log(`${nomeProduto1}: ${quantidade1} x R$ ${precoUnitario1.toFixed(2)} = R$ ${subtotal1.toFixed(2)}`);
console.log(`${nomeProduto2}: ${quantidade2} x R$ ${precoUnitario2.toFixed(2)} = R$ ${subtotal2.toFixed(2)}`);
console.log(`Total: R$ ${total.toFixed(2)}`);
console.log(`Padaria aberta? ${aberta}`);
console.log(`Pães vendidos no ano: ${paesVendidosNoAno}`);
console.log(`Categoria: ${categoria}`);
