"use server";

import { prisma } from "@/lib/prisma";
import { adherenteSchema, type ActionResponse } from "@/lib/schemas";
import { Prisma } from "@prisma/client";

export async function registrarAdherente(
  _prev: ActionResponse | null,
  formData: FormData
): Promise<ActionResponse> {
  const raw = Object.fromEntries(formData);

  const parsed = adherenteSchema.safeParse(raw);

  if (!parsed.success) {
    return {
      success: false,
      errors: parsed.error.flatten().fieldErrors as Record<string, string[]>,
    };
  }

  try {
    await prisma.adherente.create({
      data: {
        cedula: parsed.data.cedula.toUpperCase(),
        nombres: parsed.data.nombres.trim(),
        apellidos: parsed.data.apellidos.trim(),
        telefono: parsed.data.telefono.trim(),
        estado: parsed.data.estado,
        afiliacionTipo: parsed.data.afiliacionTipo,
        afiliacionNombre: parsed.data.afiliacionNombre?.trim() || null,
        propuesta: parsed.data.propuesta?.trim() || null,
        aceptoTerminos: true,
      },
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          success: false,
          errors: { cedula: ["Esta cédula ya está registrada"] },
        };
      }
    }

    return {
      success: false,
      errors: { _form: ["Error al procesar el registro. Intente de nuevo."] },
    };
  }
}
