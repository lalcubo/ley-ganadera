import { z } from "zod";

const cedulaRegex = /^[VEJPGvejpg]-\d{7,8}$/;
const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const telefonoRegex = /^\+?\d{7,15}$/;

export const adherenteSchema = z.object({
  cedula: z
    .string()
    .min(1, "La cédula es requerida")
    .regex(cedulaRegex, "Formato: V-12345678 (letra + guión + 7-8 dígitos)"),
  nombres: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(100, "Máximo 100 caracteres")
    .regex(soloLetrasRegex, "Solo se permiten letras"),
  apellidos: z
    .string()
    .min(2, "Mínimo 2 caracteres")
    .max(100, "Máximo 100 caracteres")
    .regex(soloLetrasRegex, "Solo se permiten letras"),
  telefono: z
    .string()
    .min(1, "El teléfono es requerido")
    .regex(telefonoRegex, "Teléfono inválido. Ej: +584121234567"),
  estado: z
    .string()
    .min(2, "Seleccione un estado")
    .max(50),
  afiliacionTipo: z
    .enum(["partido", "independiente", "organizacion", "otro"], {
      error: "Seleccione un tipo de afiliación",
    }),
  afiliacionNombre: z
    .string()
    .max(100, "Máximo 100 caracteres")
    .optional()
    .or(z.literal("")),
  propuesta: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .optional()
    .or(z.literal("")),
  aceptoTerminos: z
    .literal(true, {
      error: "Debe aceptar los términos y condiciones",
    }),
});

export type AdherenteInput = z.infer<typeof adherenteSchema>;

export type ActionResponse = {
  success: boolean;
  errors?: Record<string, string[]>;
};
