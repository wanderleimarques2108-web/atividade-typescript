export {};

// Ficha de paciente

let paciente1: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '123.456.789-00',
  nome: 'Ana Souza',
  idade: 34,
  plano: true,
  alergias: ['dipirona', 'lactose'],
  contatoEmergencia: { nome: 'Marcos Souza', telefone: '(69) 99999-0000' },
};

let paciente2: {
  readonly cpf: string;
  nome: string;
  idade: number;
  plano: boolean;
  alergias?: string[];
  contatoEmergencia?: { nome: string; telefone: string };
} = {
  cpf: '987.654.321-00',
  nome: 'Carlos Lima',
  idade: 61,
  plano: false,
};

function resumo(p: { nome: string; idade: number; alergias?: string[] }): string {
  if (p.alergias === undefined) {
    return `${p.nome}, ${p.idade} anos. Sem alergias registradas`;
  }
  return `${p.nome}, ${p.idade} anos. Alergias: ${p.alergias.join(', ')}`;
}

console.log(resumo(paciente1));
console.log(resumo(paciente2));

// paciente1.cpf = '000.000.000-00'; // Não é possível atribuir a 'cpf' porque é uma propriedade de somente leitura.
// paciente1.peso = 70; // A propriedade 'peso' não existe no tipo '{ readonly cpf: string; nome: string; idade: number; plano: boolean; alergias?: string[] | undefined; contatoEmergencia?: { nome: string; telefone: string; } | undefined; }'.

// Reflexão
let dados: object = paciente1;
// console.log(dados.nome); // A propriedade 'nome' não existe no tipo 'object'.
// O tipo object só diz que o valor não é primitivo. Ele aceita o objeto,
// mas não descreve as propriedades, então o compilador não sabe que existe "nome".

let x: {} = 10;
// let y: object = 10; // O tipo 'number' não pode ser atribuído ao tipo 'object'.
// {} é o objeto vazio, sem propriedades próprias, e um number também tem
// as funcionalidades comuns de objeto (toString(), valueOf()), por isso é aceito.
// object representa só valores não primitivos, e 10 é um primitivo.
