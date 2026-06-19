import { z } from "zod";

const cedulaRegex = /^\d{7,8}$/;
const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
const telefonoRegex = /^\+58(4\d{2}|2\d{2})\d{7}$/;

export const adherenteSchema = z.object({
  cedula: z
    .string()
    .min(1, "La cédula es requerida")
    .regex(cedulaRegex, "Solo números, 7-8 dígitos"),
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
    .enum(["productor", "asociacion", "profesional", "otro"], {
      error: "Seleccione una clasificación",
    }),
  afiliacionNombre: z
    .string()
    .max(100, "Máximo 100 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.\,\/\(\)]+$/, "Caracteres no permitidos")
    .optional()
    .or(z.literal("")),
  propuesta: z
    .string()
    .max(500, "Máximo 500 caracteres")
    .regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ0-9\s\-\.\,\/\?\(\)\:\;\!\@\#\$\%\&\*\=\+\~]*$/, "Caracteres no permitidos")
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
