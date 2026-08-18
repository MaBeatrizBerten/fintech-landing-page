import { Resend } from "resend";

export async function sendNewLeadNotification(
  name: string,
  email: string,
  company?: string | null,
  message?: string
) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.log(
      `[Email] RESEND_API_KEY não configurada. Notificação de novo lead ignorada para: ${name} <${email}>`
    );
    return;
  }

  const to = process.env.NOTIFY_EMAIL_TO;
  const from = process.env.NOTIFY_EMAIL_FROM;

  if (!to || !from) {
    console.log(
      "[Email] NOTIFY_EMAIL_TO ou NOTIFY_EMAIL_FROM não configurados. Notificação ignorada."
    );
    return;
  }

  try {
    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Novo Lead: ${name}`,
      html: `
        <h2>Novo Lead Recebido</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Empresa:</strong> ${company || "Não informada"}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message || "Sem mensagem"}</p>
      `,
    });

    if (error) {
      console.error("[Email] Erro da API Resend ao enviar notificação:", error);
    }
  } catch (error) {
    console.error("[Email] Exceção ao enviar notificação de lead:", error);
  }
}
