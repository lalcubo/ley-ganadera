"use client";

import { useEffect, useState, useTransition } from "react";
import { obtenerPropuestasPaginadas, type PropuestaPublica } from "@/lib/actions";

interface PropuestasSectionProps {
  refreshTrigger?: number;
}

const AFILIACION_LABELS: Record<string, string> = {
  productor: "Productor",
  gremialista: "Gremialista",
  tecnico: "Técnico / Profesional",
  trabajador: "Trabajador",
  transportista: "Transportista",
  comerciante: "Comerciante",
  agroindustrial: "Agroindustrial",
  otro: "Otro",
};

export default function PropuestasSection({ refreshTrigger }: PropuestasSectionProps) {
  const [propuestas, setPropuestas] = useState<PropuestaPublica[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  const cargarPagina = (paginaDestino: number) => {
    setLoading(true);
    startTransition(async () => {
      try {
        const respuesta = await obtenerPropuestasPaginadas(paginaDestino, 6);
        setPropuestas(respuesta.propuestas);
        setTotal(respuesta.total);
        setTotalPages(Math.max(1, respuesta.totalPages));
        setPage(respuesta.page);
      } catch (err) {
        console.error("Error cargando propuestas:", err);
      } finally {
        setLoading(false);
      }
    });
  };

  useEffect(() => {
    cargarPagina(1);
  }, [refreshTrigger]);

  const cambiarPagina = (nuevaPagina: number) => {
    if (nuevaPagina < 1 || nuevaPagina > totalPages || nuevaPagina === page) return;
    cargarPagina(nuevaPagina);

    // Desplazamiento suave hacia la sección de propuestas
    const elemento = document.getElementById("propuestas");
    if (elemento) {
      elemento.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="propuestas"
      className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8 space-y-6"
    >
      {/* Encabezado de la sección */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-zinc-100 pb-5">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-emerald-100 text-emerald-800">
              <svg
                className="w-5 h-5 text-emerald-700"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                />
              </svg>
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-900">
              Propuestas y Aportes del Sector
            </h2>
          </div>
          <p className="text-sm text-zinc-500 mt-1">
            Comentarios, sugerencias y aportes de los ciudadanos y productores adherentes.
          </p>
        </div>

        {total > 0 && (
          <div className="inline-flex items-center gap-1.5 self-start sm:self-auto rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
            <svg
              className="w-4 h-4 text-emerald-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            <span>{total} {total === 1 ? "propuesta registrada" : "propuestas registradas"}</span>
          </div>
        )}
      </div>

      {/* Contenido / Cards */}
      {loading && propuestas.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="rounded-xl border border-zinc-200 p-5 space-y-4 bg-zinc-50/50 animate-pulse"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-zinc-200" />
                <div className="space-y-1.5 flex-1">
                  <div className="h-4 bg-zinc-200 rounded w-1/2" />
                  <div className="h-3 bg-zinc-200 rounded w-1/3" />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="h-3 bg-zinc-200 rounded w-full" />
                <div className="h-3 bg-zinc-200 rounded w-5/6" />
                <div className="h-3 bg-zinc-200 rounded w-2/3" />
              </div>
            </div>
          ))}
        </div>
      ) : propuestas.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 p-8 text-center bg-zinc-50/50">
          <svg
            className="w-12 h-12 text-zinc-400 mx-auto mb-3"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
            />
          </svg>
          <h3 className="text-base font-semibold text-zinc-800">
            Aún no hay propuestas registradas
          </h3>
          <p className="text-sm text-zinc-500 max-w-md mx-auto mt-1">
            Al registrarte en el formulario superior, puedes agregar tu propuesta o comentario opcional para que se muestre en este espacio.
          </p>
        </div>
      ) : (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 transition-opacity duration-200 ${isPending ? "opacity-60" : "opacity-100"}`}>
          {propuestas.map((item, idx) => {
            const iniciales = `${item.nombres?.[0] || ""}${item.apellidos?.[0] || ""}`.toUpperCase();
            const etiquetaAfiliacion = AFILIACION_LABELS[item.afiliacion_tipo] || item.afiliacion_tipo;

            let fechaFormateada = "";
            if (item.creado_at) {
              try {
                fechaFormateada = new Date(item.creado_at).toLocaleDateString("es-VE", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                });
              } catch {
                fechaFormateada = "";
              }
            }

            return (
              <div
                key={item.id || `${item.nombres}-${idx}`}
                className="flex flex-col justify-between rounded-xl border border-zinc-200/90 bg-white p-5 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all duration-200"
              >
                <div>
                  {/* Encabezado de la card: autor, clasificación y estado */}
                  <div className="flex items-start justify-between gap-3 mb-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                        {iniciales || "VE"}
                      </div>
                      <div>
                        <h4 className="font-semibold text-zinc-900 text-sm sm:text-base leading-snug">
                          {item.nombres} {item.apellidos}
                        </h4>
                        <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                          <span className="inline-flex items-center text-xs font-medium text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded">
                            {etiquetaAfiliacion}
                            {item.afiliacion_nombre ? ` • ${item.afiliacion_nombre}` : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                      <span className="inline-flex items-center gap-1 text-xs text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                        <svg
                          className="w-3.5 h-3.5 text-zinc-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        {item.estado}
                      </span>
                      {fechaFormateada && (
                        <span className="text-[11px] text-zinc-400 mt-1">
                          {fechaFormateada}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cuerpo de la card con la propuesta */}
                  <div className="relative pl-3 border-l-2 border-emerald-500 bg-zinc-50/60 rounded-r-lg p-3">
                    <p className="text-zinc-700 text-sm leading-relaxed whitespace-pre-wrap break-words italic">
                      "{item.propuesta}"
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-100">
          <div className="text-xs sm:text-sm text-zinc-500">
            Página <span className="font-semibold text-zinc-800">{page}</span> de{" "}
            <span className="font-semibold text-zinc-800">{totalPages}</span> ({total}{" "}
            {total === 1 ? "propuesta" : "propuestas"})
          </div>

          <div className="inline-flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => cambiarPagina(page - 1)}
              disabled={page <= 1 || isPending}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 text-xs sm:text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50 hover:border-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              <span>Anterior</span>
            </button>

            {/* Botones numéricos de página */}
            <div className="hidden sm:flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter((p) => {
                  // Mostrar primera, última, actual y adyacentes
                  return p === 1 || p === totalPages || Math.abs(p - page) <= 1;
                })
                .map((p, idx, arr) => {
                  const prev = arr[idx - 1];
                  const hasGap = prev && p - prev > 1;

                  return (
                    <div key={p} className="flex items-center">
                      {hasGap && <span className="px-1 text-zinc-400 text-xs">...</span>}
                      <button
                        type="button"
                        onClick={() => cambiarPagina(p)}
                        disabled={isPending}
                        className={`w-8 h-8 rounded-lg text-xs font-semibold transition-colors ${
                          p === page
                            ? "bg-emerald-700 text-white shadow-xs"
                            : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                        }`}
                      >
                        {p}
                      </button>
                    </div>
                  );
                })}
            </div>

            <button
              type="button"
              onClick={() => cambiarPagina(page + 1)}
              disabled={page >= totalPages || isPending}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-zinc-300 text-xs sm:text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50 hover:border-zinc-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <span>Siguiente</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
