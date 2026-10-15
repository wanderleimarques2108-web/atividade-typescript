export {};

// Sistema de estacionamento

// Tipos
type Placa = string;
type Periodo = [entrada: number, saida: number];

type Carro = { readonly placa: Placa; tipo: 'carro'; portas: 2 | 4 };
type Moto = { readonly placa: Placa; tipo: 'moto'; cilindradas: number };
type Caminhao = { readonly placa: Placa; tipo: 'caminhao'; eixos: number };

// type Van = { readonly placa: Placa; tipo: 'van'; lugares: number };

type Veiculo = Carro | Moto | Caminhao;
// type Veiculo = Carro | Moto | Caminhao | Van;
// Com a Van na união e sem um case 'van' no switch, o compilador acusa no default:
// O tipo 'Van' não pode ser atribuído ao tipo 'never'.
// O never garantiu que nenhum tipo de veículo ficasse sem tratamento no cálculo da tarifa.

enum SituacaoTicket {
  Aberto = 'ABERTO',
  Pago = 'PAGO',
}

type Ticket = {
  veiculo: Veiculo;
  periodo: Periodo;
  selo: boolean;
  situacao: SituacaoTicket;
  valor?: number;
};

function falhar(mensagem: string): never {
  throw new Error(mensagem);
}

// Tarifa
function calcularTarifa(v: Veiculo, horas: number): number {
  switch (v.tipo) {
    case 'carro':
      return 8 + (horas - 1) * 5;
    case 'moto':
      return 4 + (horas - 1) * 2;
    case 'caminhao':
      return 15 + (horas - 1) * 10;
    default: {
      const _naoTratado: never = v;
      return _naoTratado;
    }
  }
}

function calcularHoras(t: Ticket): number {
  const [entrada, saida] = t.periodo;
  return Math.max(saida - entrada, 1);
}

function fecharTicket(t: Ticket): Ticket {
  const horas: number = calcularHoras(t);
  const tarifa: number = calcularTarifa(t.veiculo, horas);
  const valor: number = t.selo ? tarifa * 0.5 : tarifa;
  return { ...t, valor, situacao: SituacaoTicket.Pago };
}

function registrar(msg: string): void {
  console.log(msg);
}

// Entrada externa
function lerVeiculo(json: string): Veiculo {
  const dados: unknown = JSON.parse(json);

  if (typeof dados !== 'object' || dados === null) {
    falhar('dados inválidos');
  }
  if (!('placa' in dados) || typeof dados.placa !== 'string') {
    falhar('campo "placa" inválido');
  }
  if (!('tipo' in dados)) {
    falhar('campo "tipo" ausente');
  }

  switch (dados.tipo) {
    case 'carro':
      if (!('portas' in dados) || (dados.portas !== 2 && dados.portas !== 4)) {
        falhar('campo "portas" inválido');
      }
      return { placa: dados.placa, tipo: 'carro', portas: dados.portas };
    case 'moto':
      if (!('cilindradas' in dados) || typeof dados.cilindradas !== 'number') {
        falhar('campo "cilindradas" inválido');
      }
      return { placa: dados.placa, tipo: 'moto', cilindradas: dados.cilindradas };
    case 'caminhao':
      if (!('eixos' in dados) || typeof dados.eixos !== 'number') {
        falhar('campo "eixos" inválido');
      }
      return { placa: dados.placa, tipo: 'caminhao', eixos: dados.eixos };
    default:
      return falhar(`tipo "${String(dados.tipo)}" desconhecido`);
  }
}

// Dados de teste
const cancela: { json: string; periodo: Periodo; selo: boolean }[] = [
  { json: '{"placa":"ABC1D23","tipo":"carro","portas":4}', periodo: [8, 11], selo: false },
  { json: '{"placa":"MOT0A12","tipo":"moto","cilindradas":160}', periodo: [9, 10], selo: false },
  { json: '{"placa":"CAM9Z99","tipo":"caminhao","eixos":3}', periodo: [7, 12], selo: false },
  { json: '{"placa":"XYZ4E56","tipo":"carro","portas":2}', periodo: [14, 16], selo: true },
];

const tickets: Ticket[] = cancela.map((c) => ({
  veiculo: lerVeiculo(c.json),
  periodo: c.periodo,
  selo: c.selo,
  situacao: SituacaoTicket.Aberto,
}));

// Relatório
const fechados: Ticket[] = tickets.map(fecharTicket);
const pagos: Ticket[] = fechados.filter((t) => t.situacao === SituacaoTicket.Pago);

pagos.forEach((t) => {
  const valor: number = t.valor !== undefined ? t.valor : 0;
  const selo: string = t.selo ? ' (selo -50%)' : '';
  registrar(`[${t.situacao}] ${t.veiculo.placa} (${t.veiculo.tipo}) - ${calcularHoras(t)}h - R$ ${valor.toFixed(2)}${selo}`);
});

const faturamento: number = pagos.reduce((soma, t) => soma + (t.valor !== undefined ? t.valor : 0), 0);
console.log(`Faturamento: R$ ${faturamento.toFixed(2)}`);

const entradas: { carro: number; moto: number; caminhao: number } = tickets.reduce(
  (contagem, t) => {
    contagem[t.veiculo.tipo] = contagem[t.veiculo.tipo] + 1;
    return contagem;
  },
  { carro: 0, moto: 0, caminhao: 0 }
);
console.log(`Entradas: carro=${entradas.carro}, moto=${entradas.moto}, caminhao=${entradas.caminhao}`);

try {
  lerVeiculo('{"placa":"BIC0001","tipo":"bicicleta"}');
} catch (erro: unknown) {
  if (erro instanceof Error) {
    console.log(`Erro ao ler veículo: ${erro.message}`);
  }
}
