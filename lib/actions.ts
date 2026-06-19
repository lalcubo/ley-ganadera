"use server";

import { supabaseAdmin } from "@/lib/supabase/server";
import { adherenteSchema, type AdherenteInput, type ActionResponse } from "@/lib/schemas";
import { enviarCorreoConfirmacion } from "@/lib/email";

export async function registrarAdherente(
  data: AdherenteInput
): Promise<ActionResponse> {
  const parsed = adherenteSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  const { error } = await supabaseAdmin.from("adherentes").insert({
    cedula: parsed.data.cedula,
    nombres: parsed.data.nombres.trim(),
    apellidos: parsed.data.apellidos.trim(),
    telefono: parsed.data.telefono.trim(),
    correo: parsed.data.correo.trim(),
    estado: parsed.data.estado,
    afiliacion_tipo: parsed.data.afiliacionTipo,
    afiliacion_nombre: parsed.data.afiliacionNombre?.trim() || null,
    propuesta: parsed.data.propuesta?.trim() || null,
    acepto_terminos: true,
  });

  if (error) {
    return {
      success: false,
      errors: { _form: ["Error al procesar el registro. Intente de nuevo."] },
    };
  }

  await enviarCorreoConfirmacion(
    parsed.data.correo,
    parsed.data.nombres,
    parsed.data.apellidos
  );

  return { success: true };
}

export async function obtenerTotalAdherentes(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("adherentes")
    .select("*", { count: "exact", head: true });

  if (error) return 0;
  return count ?? 0;
}
