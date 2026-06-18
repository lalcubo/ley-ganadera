"use server";

import { supabaseAdmin } from "@/lib/supabase/server";
import { adherenteSchema, type AdherenteInput, type ActionResponse } from "@/lib/schemas";

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

  return { success: true };
}
