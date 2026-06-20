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
      subject: "Gracias por sumarte a la Consulta Nacional Pecuaria",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #064e3b, #059669); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Ley de Protección Integral de la Actividad Ganadera</h1>
          </div>
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Estimado(a) <strong>${nombres} ${apellidos}</strong> del sector pecuario:
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; font-weight: bold; color: #064e3b; margin-bottom: 16px;">
              Gracias por sumarte a la Consulta Nacional Pecuaria.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 16px;">
              Tu apoyo y tus aportes fortalecen una voz amplia, seria y organizada del campo venezolano ante la Asamblea Nacional, en el marco del debate de la Ley de Protección Integral de la Actividad Ganadera.
            </p>
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              Esta consulta nace para ampliar y nutrir una propuesta que busca proteger al productor, defender la unidad productiva, combatir el abigeato, fortalecer la trazabilidad útil, evitar nuevas trabas y contribuir a la seguridad alimentaria de Venezuela.
            </p>
            
            <div style="background: #ecfdf5; border-left: 4px solid #059669; padding: 15px; margin: 20px 0; border-radius: 6px; text-align: center;">
              <p style="color: #064e3b; margin: 0; font-size: 16px; line-height: 1.8; font-weight: bold;">
                Cada adhesión cuenta.<br>
                Cada propuesta suma.<br>
                Cada productor escuchado fortalece la ley.
              </p>
            </div>

            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 20px;">
              En los próximos días, el respaldo consolidado de esta consulta será consignado ante la Asamblea Nacional como expresión legítima del sector pecuario venezolano.
            </p>
            
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin-bottom: 12px;">
              Te invitamos a compartir este enlace con otros productores, gremios, profesionales y actores del campo para que también puedan apoyar y aportar:
            </p>
            <p style="margin-bottom: 24px;">
              <a href="https://ley-ganadera.vercel.app" style="color: #059669; font-weight: bold; text-decoration: underline; font-size: 16px;">https://ley-ganadera.vercel.app</a>
            </p>
            
            <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin-bottom: 24px;">
              <p style="color: #374151; font-size: 15px; line-height: 1.5; font-weight: bold; margin: 0 0 8px 0;">
                Para mayor información o coordinación, puedes comunicarte con nosotros:
              </p>
              <p style="color: #4b5563; font-size: 15px; line-height: 1.5; margin: 0;">
                <strong>Contacto 1:</strong> 0414-7385222<br>
                <strong>Contacto 2:</strong> 0414-1719920
              </p>
            </div>

            <div style="border-t: 1px solid #e5e7eb; padding-top: 20px; margin-top: 20px; text-align: center;">
              <p style="color: #064e3b; font-size: 16px; line-height: 1.6; font-weight: bold; margin: 0;">
                La voz del campo debe estar en la ley.
              </p>
              <p style="color: #059669; font-size: 16px; line-height: 1.6; font-weight: bold; margin: 5px 0 20px 0;">
                Proteger al productor es proteger a Venezuela.
              </p>
            </div>

            <p style="color: #374151; font-size: 15px; line-height: 1.6; margin-top: 25px;">
              Atentamente,<br>
              <strong style="color: #064e3b; font-size: 16px;">Consulta Nacional Pecuaria</strong><br>
              <span style="color: #6b7280; font-size: 14px;">Por la ampliación del debate de la Ley de Protección Integral de la Actividad Ganadera ante la Asamblea Nacional.</span>
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
