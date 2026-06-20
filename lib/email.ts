import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function enviarCorreoConfirmacion(
  correo: string,
  nombres: string,
  apellidos: string
): Promise<boolean> {
  try {
    await resend.emails.send({
      from: "Registro Ley Ganadera <onboarding@resend.dev>",
      to: correo,
      subject: "Gracias por tu adhesión a la Ley Penal de Protección a la Actividad Ganadera",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #064e3b, #059669); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Ley Penal de Protección a la Actividad Ganadera</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">Estimado(a) <strong>${nombres} ${apellidos}</strong>,</p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              En nombre del comité organizador, queremos agradecerle sinceramente por haber registrado su adhesión
              a la <strong>Ley Penal de Protección a la Actividad Ganadera</strong>.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Su participación es fundamental para fortalecer esta iniciativa y demostrar el respaldo del sector
              ante la Asamblea Nacional. Todas las opiniones y propuestas recibidas serán cuidadosamente
              evaluadas por nuestro comité técnico para enriquecer el proyecto de ley.
            </p>
            <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 15px; margin: 20px 0; border-radius: 6px;">
              <p style="color: #064e3b; margin: 0; font-size: 15px; line-height: 1.5;">
                "El campo no se detiene, y nuestra defensa jurídica tampoco. ¡Su voz es la fuerza de nuestra ley!"
              </p>
            </div>
            <p style="color: #374151; font-size: 16px; line-height: 1.6;">
              Si desea realizar algún aporte adicional o tiene alguna consulta, no dude en contactarnos.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-top: 25px;">
              Atentamente,<br>
              <strong style="color: #064e3b;">Comité Organizador</strong><br>
              Ley Penal de Protección a la Actividad Ganadera
            </p>
          </div>
        </div>
      `,
    });
    return true;
  } catch {
    return false;
  }
}
