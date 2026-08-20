import { Resend } from "resend";
import { env } from "./env";
import { logger } from "./logger";

export async function sendNewLeadNotification(
  name: string,
  email: string,
  company?: string | null,
  message?: string
) {
  const apiKey = env.RESEND_API_KEY;

  if (!apiKey) {
    logger.debug(
      { leadName: name, leadEmail: email },
      "[Email] RESEND_API_KEY não configurada. Notificação de novo lead ignorada."
    );
    return;
  }

  const to = env.NOTIFY_EMAIL_TO;
  const from = env.NOTIFY_EMAIL_FROM;

  if (!to || !from) {
    logger.warn(
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
      logger.error({ err: error }, "[Email] Erro da API Resend ao enviar notificação");
    } else {
      logger.info({ leadEmail: email, to }, "[Email] Notificação de lead enviada com sucesso");
    }
  } catch (error) {
    logger.error({ err: error }, "[Email] Exceção ao enviar notificação de lead");
  }
}
