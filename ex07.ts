export {};

// Central de notificações

type Notificador = (destinatario: string, mensagem: string) => void;

const porEmail: Notificador = (destinatario, mensagem) => {
  console.log(`[E-MAIL] para ${destinatario}: ${mensagem}`);
};

const porSms: Notificador = (destinatario, mensagem) => {
  if (mensagem.length > 160) {
    console.log('SMS ignorado: mensagem longa');
    return;
  }
  console.log(`[SMS] para ${destinatario}: ${mensagem}`);
};

const porApp: Notificador = (destinatario, mensagem) => {
  console.log(`[APP] para ${destinatario}: ${mensagem}`);
};

function notificarTodos(destinatarios: string[], mensagem: string, enviar: Notificador): void {
  destinatarios.forEach((destinatario) => enviar(destinatario, mensagem));
}

const aviso: string = 'Reunião de pais sexta às 19h';
const avisoLongo: string = 'Reunião de pais sexta às 19h. '.repeat(6);

notificarTodos(['ana@escola.com'], aviso, porEmail);
notificarTodos(['joao.resp'], aviso, porApp);
notificarTodos(['(69) 99999-0000'], avisoLongo, porSms);

// function teste(): void { return 10; } // O tipo 'number' não pode ser atribuído ao tipo 'void'.

const contar: Notificador = (d, m) => m.length;

// Reflexão: quando o tipo da função tem retorno void, o compilador não exige
// que a implementação devolva nada, mas também não proíbe. Quem chama
// (como o forEach) não usa o retorno, por isso o número é ignorado.
// Já em function teste(): void, o return 10 é erro porque ali o void
// é o tipo de retorno declarado da própria função.
