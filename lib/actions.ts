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
    correo: parsed.data.correo?.trim() || null,
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

  if (parsed.data.correo && parsed.data.correo.trim() !== "") {
    await enviarCorreoConfirmacion(
      parsed.data.correo.trim(),
      parsed.data.nombres,
      parsed.data.apellidos
    );
  }

  return { success: true };
}

export async function obtenerTotalAdherentes(): Promise<number> {
  const { count, error } = await supabaseAdmin
    .from("adherentes")
    .select("*", { count: "exact", head: true });

  if (error) return 0;
  return count ?? 0;
}

export type PropuestaPublica = {
  id?: string;
  nombres: string;
  apellidos: string;
  estado: string;
  afiliacion_tipo: string;
  afiliacion_nombre?: string | null;
  propuesta: string;
  creado_at?: string | null;
};

export type PropuestasPaginadasResponse = {
  propuestas: PropuestaPublica[];
  total: number;
  totalPages: number;
  page: number;
};

export async function obtenerPropuestasPaginadas(
  page: number = 1,
  pageSize: number = 6
): Promise<PropuestasPaginadasResponse> {
  try {
    const validPage = Math.max(1, page);
    const validPageSize = Math.max(1, pageSize);
    const from = (validPage - 1) * validPageSize;
    const to = from + validPageSize - 1;

    let propuestasList: PropuestaPublica[] = [];
    let total = 0;

    // Intentamos primero ordenar por creado_at descendente
    const res = await supabaseAdmin
      .from("adherentes")
      .select(
        "id, nombres, apellidos, estado, afiliacion_tipo, afiliacion_nombre, propuesta, creado_at",
        { count: "exact" }
      )
      .not("propuesta", "is", null)
      .neq("propuesta", "")
      .order("creado_at", { ascending: false })
      .range(from, to);

    // Si ocurre un error (por si la columna creado_at no existe o tiene otro nombre)
    if (res.error) {
      console.warn("Consulta con creado_at no disponible, reintentando consulta alternativa:", res.error.message);
      const fallback = await supabaseAdmin
        .from("adherentes")
        .select(
          "id, nombres, apellidos, estado, afiliacion_tipo, afiliacion_nombre, propuesta",
          { count: "exact" }
        )
        .not("propuesta", "is", null)
        .neq("propuesta", "")
        .range(from, to);

      if (fallback.error) {
        console.error("Error al obtener propuestas:", fallback.error);
        return { propuestas: [], total: 0, totalPages: 0, page: validPage };
      }

      propuestasList = (fallback.data as PropuestaPublica[]) ?? [];
      total = fallback.count ?? 0;
    } else {
      propuestasList = (res.data as PropuestaPublica[]) ?? [];
      total = res.count ?? 0;
    }

    const totalPages = Math.ceil(total / validPageSize);

    return {
      propuestas: propuestasList,
      total,
      totalPages,
      page: validPage,
    };
  } catch (error) {
    console.error("Excepción en obtenerPropuestasPaginadas:", error);
    return { propuestas: [], total: 0, totalPages: 0, page };
  }
}

