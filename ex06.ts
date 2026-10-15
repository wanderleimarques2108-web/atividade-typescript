export {};

// Status do pedido no app de delivery

enum StatusPedido {
  Recebido = 1,
  EmPreparo,
  SaiuParaEntrega,
  Entregue,
  Cancelado,
}

enum FormaPagamento {
  Pix = 'PIX',
  Cartao = 'CARTAO',
  Dinheiro = 'DINHEIRO',
}

function mensagem(status: StatusPedido): string {
  switch (status) {
    case StatusPedido.Recebido:
      return 'Recebemos seu pedido!';
    case StatusPedido.EmPreparo:
      return 'Seu pedido está sendo preparado 🍳';
    case StatusPedido.SaiuParaEntrega:
      return 'O entregador está a caminho 🛵';
    case StatusPedido.Entregue:
      return 'Pedido entregue. Bom apetite!';
    case StatusPedido.Cancelado:
      return 'Pedido cancelado.';
  }
}

function avancar(status: StatusPedido): StatusPedido {
  switch (status) {
    case StatusPedido.Recebido:
      return StatusPedido.EmPreparo;
    case StatusPedido.EmPreparo:
      return StatusPedido.SaiuParaEntrega;
    case StatusPedido.SaiuParaEntrega:
      return StatusPedido.Entregue;
    default:
      return status;
  }
}

function mostrar(status: StatusPedido): void {
  // StatusPedido[status] é o mapeamento reverso: número -> nome
  console.log(`[${status} - ${StatusPedido[status]}] ${mensagem(status)}`);
}

let status: StatusPedido = StatusPedido.Recebido;
mostrar(status);
while (status !== StatusPedido.Entregue) {
  status = avancar(status);
  mostrar(status);
}

const pagamento: FormaPagamento = FormaPagamento.Pix;
console.log(`Pagamento: ${pagamento}`);

// let outro: FormaPagamento = 'PIX'; // O tipo '"PIX"' não pode ser atribuído ao tipo 'FormaPagamento'.
// O enum de string só aceita os próprios membros (FormaPagamento.Pix).
// Mesmo com o mesmo texto, a string 'PIX' não é do tipo FormaPagamento.
