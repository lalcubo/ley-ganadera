"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adherenteSchema, type AdherenteInput, type ActionResponse } from "@/lib/schemas";
import { registrarAdherente } from "@/lib/actions";

const ESTADOS = [
  "Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar",
  "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón",
  "Guárico", "La Guaira", "Lara", "Mérida", "Miranda", "Monagas",
  "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo",
  "Yaracuy", "Zulia",
] as const;

export default function Home() {
  const [state, setState] = useState<ActionResponse | null>(null);
  const [pending, setPending] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AdherenteInput>({
    resolver: zodResolver(adherenteSchema),
    defaultValues: {
      afiliacionTipo: "independiente",
      aceptoTerminos: undefined as unknown as true,
    },
  });

  const afiliacionTipo = watch("afiliacionTipo");
  const requireAfiliacionNombre = afiliacionTipo !== "independiente" && afiliacionTipo !== undefined;

  const onSubmit = handleSubmit(async (data) => {
    setPending(true);
    setState(null);

    const formData = new FormData();
    formData.append("cedula", data.cedula);
    formData.append("nombres", data.nombres);
    formData.append("apellidos", data.apellidos);
    formData.append("telefono", data.telefono);
    formData.append("estado", data.estado);
    formData.append("afiliacionTipo", data.afiliacionTipo);
    if (data.afiliacionNombre) {
      formData.append("afiliacionNombre", data.afiliacionNombre);
    }
    if (data.propuesta) {
      formData.append("propuesta", data.propuesta);
    }
    formData.append("aceptoTerminos", "true");

    const result = await registrarAdherente(null, formData);
    setState(result);
    setPending(false);
  });

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50">
      <header className="w-full bg-primary text-white py-6 px-4 shadow-md">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ley de Ganadería
          </h1>
          <p className="mt-2 text-blue-100">
            Registro de Ciudadanos Adherentes
          </p>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
        <section className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-zinc-800 mb-4">
            Texto de la Ley
          </h2>
          <div className="prose prose-sm max-w-none text-zinc-600">
            <p>
              [Texto de prueba] La presente Ley tiene por objeto establecer el
              marco jurídico para el desarrollo integral de la actividad
              ganadera en el territorio nacional, promoviendo prácticas
              sostenibles, el bienestar animal y la seguridad alimentaria.
            </p>
            <p className="mt-2">
              Los ciudadanos que deseen manifestar su apoyo a la presente
              iniciativa legal pueden registrarse mediante el formulario
              dispuesto para tal fin, dejando constancia expresa de su
              voluntad de adherirse a los términos y principios establecidos
              en esta Ley.
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-zinc-800 mb-6">
            Formulario de Adhesión
          </h2>

          {state?.success ? (
            <div className="rounded-lg bg-green-50 border border-green-200 p-6 text-center">
              <p className="text-green-800 font-semibold text-lg">
                ¡Registro exitoso!
              </p>
              <p className="text-green-600 mt-1">
                Su adhesión ha sido registrada correctamente.
              </p>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="space-y-5"
              noValidate
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="cedula"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Cédula de Identidad
                  </label>
                  <input
                    id="cedula"
                    type="text"
                    placeholder="V-12345678"
                    {...register("cedula")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.cedula && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.cedula.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="telefono"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Teléfono
                  </label>
                  <input
                    id="telefono"
                    type="tel"
                    placeholder="+584121234567"
                    {...register("telefono")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.telefono && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.telefono.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="nombres"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Nombres
                  </label>
                  <input
                    id="nombres"
                    type="text"
                    placeholder="Nombres completos"
                    {...register("nombres")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.nombres && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.nombres.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="apellidos"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Apellidos
                  </label>
                  <input
                    id="apellidos"
                    type="text"
                    placeholder="Apellidos completos"
                    {...register("apellidos")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.apellidos && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.apellidos.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="estado"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Estado de residencia
                </label>
                <select
                  id="estado"
                  {...register("estado")}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="">Seleccione un estado</option>
                  {ESTADOS.map((e) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                {errors.estado && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.estado.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="afiliacionTipo"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Tipo de afiliación
                </label>
                <select
                  id="afiliacionTipo"
                  {...register("afiliacionTipo")}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="independiente">Independiente</option>
                  <option value="partido">Partido político</option>
                  <option value="organizacion">Organización</option>
                  <option value="otro">Otro</option>
                </select>
                {errors.afiliacionTipo && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.afiliacionTipo.message}
                  </p>
                )}
              </div>

              {requireAfiliacionNombre && (
                <div>
                  <label
                    htmlFor="afiliacionNombre"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Nombre del {afiliacionTipo === "partido" ? "partido" : afiliacionTipo === "organizacion" ? "organización" : "ente"}
                  </label>
                  <input
                    id="afiliacionNombre"
                    type="text"
                    placeholder="Nombre"
                    {...register("afiliacionNombre")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  {errors.afiliacionNombre && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.afiliacionNombre.message}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label
                  htmlFor="propuesta"
                  className="block text-sm font-medium text-zinc-700 mb-1"
                >
                  Propuesta o comentario{" "}
                  <span className="text-zinc-400">(opcional)</span>
                </label>
                <textarea
                  id="propuesta"
                  rows={3}
                  placeholder="Su propuesta..."
                  {...register("propuesta")}
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
                />
                {errors.propuesta && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.propuesta.message}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-3">
                <input
                  id="aceptoTerminos"
                  type="checkbox"
                  {...register("aceptoTerminos")}
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-primary focus:ring-primary"
                />
                <label htmlFor="aceptoTerminos" className="text-sm text-zinc-600">
                  Acepto los términos y condiciones de la presente iniciativa
                  legal y manifiesto mi voluntad expresa de adherirme a la
                  Ley de Ganadería.
                </label>
              </div>
              {errors.aceptoTerminos && (
                <p className="text-xs text-red-600">
                  {errors.aceptoTerminos.message}
                </p>
              )}

              {state?.errors?._form && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3">
                  <p className="text-sm text-red-700">
                    {state.errors._form[0]}
                  </p>
                </div>
              )}

              <button
                type="submit"
                disabled={pending}
                className="w-full rounded-lg bg-primary px-6 py-3 text-white font-semibold transition enabled:hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? "Registrando..." : "Registrar Adherente"}
              </button>
            </form>
          )}
        </section>
      </main>

      <footer className="w-full border-t border-zinc-200 py-6 px-4">
        <div className="max-w-3xl mx-auto text-center text-xs text-zinc-400">
          <p>
            Este formulario recopila datos con fines de registro de
            adherentes. Los datos serán tratados conforme a la legislación
            aplicable en materia de protección de datos personales.
          </p>
        </div>
      </footer>
    </div>
  );
}
