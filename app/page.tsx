"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adherenteSchema, type AdherenteInput, type ActionResponse } from "@/lib/schemas";
import { registrarAdherente, obtenerTotalAdherentes } from "@/lib/actions";

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
  const [totalAdherentes, setTotalAdherentes] = useState(0);

  useEffect(() => {
    obtenerTotalAdherentes().then(setTotalAdherentes);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AdherenteInput>({
    resolver: zodResolver(adherenteSchema),
    defaultValues: {
      afiliacionTipo: "productor",
      aceptoTerminos: undefined as unknown as true,
    },
  });

  const afiliacionTipo = watch("afiliacionTipo");
  const requireAfiliacionNombre = afiliacionTipo === "otro" && afiliacionTipo !== undefined;

  const onSubmit = handleSubmit(async (data) => {
    setPending(true);
    setState(null);

    const result = await registrarAdherente(data);

    if (result.success) {
      reset();
      setTimeout(() => setState(null), 5000);
    }

    setState(result);
    setPending(false);
  });

  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50">
      <header className="w-full shadow-md overflow-hidden bg-zinc-950">
        <h1 className="sr-only">Ley Penal de Protección a la Actividad Ganadera - Registro de Ciudadanos Adherentes</h1>
        <img
          src="/encabezado.png"
          alt="Encabezado Ley de Ganadería"
          className="w-full h-auto object-cover max-h-[350px] mx-auto block"
        />
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 py-8 space-y-8">
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 border border-blue-200 px-5 py-2 text-sm text-blue-700 shadow-sm">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            <span><strong>{totalAdherentes}</strong> adherentes registrados</span>
          </div>
        </div>
        <section className="bg-white rounded-xl shadow-sm border border-zinc-200 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 px-6 sm:px-10 py-8 sm:py-10 text-white">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 shrink-0">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-200">Consulta Nacional Pecuaria</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold leading-tight">
              La Consulta Nacional Pecuaria nace para ampliar y nutrir el debate de una ley fundamental para Venezuela.
            </h2>
          </div>

          <div className="px-6 sm:px-10 py-6 sm:py-8 space-y-6 text-sm sm:text-base text-zinc-700 leading-relaxed">
            <p>
              Desde el sector pecuario agradecemos a la Asamblea Nacional por haber incorporado en la agenda legislativa la protección de la actividad ganadera, una deuda histórica con un sector que, incluso en los momentos más difíciles, decidió quedarse en Venezuela, sostener sus fincas, cuidar sus rebaños, generar empleo rural y seguir creyendo en el futuro productivo del país.
            </p>
            <p>
              Esta consulta se concibe como un mecanismo amplio de participación gremial, profesional y productiva, abierto a todos los actores del sector que deseen adherirse, aportar y enriquecer la propuesta presentada ante la Asamblea Nacional. Cada adhesión expresa la voluntad de quien la suscribe y fortalece una voz organizada del campo venezolano, respetando la autonomía de cada gremio, asociación, institución o productor.
            </p>
            <p>
              La Asamblea Nacional ha abierto una oportunidad valiosa para avanzar hacia una legislación moderna en defensa del sector ganadero. Esta consulta busca acompañar ese proceso con la experiencia concreta de quienes viven la actividad pecuaria todos los días: productores, gremios, profesionales, técnicos, trabajadores del campo, transportistas formales y actores de la cadena productiva que sostienen con trabajo la producción de alimentos para Venezuela.
            </p>
            <p>
              La propuesta presentada ante la Asamblea Nacional, es un aporte técnico, jurídico y productivo para fortalecer el debate legislativo y acercar la ley a la realidad del campo venezolano.
            </p>

            <div className="border-t border-zinc-100 pt-6">
              <h3 className="font-semibold text-zinc-900 text-base sm:text-lg flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-.879 3.07-.879 4.242 0 1.172.879 1.172 2.303 0 3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                ¿Qué busca esta propuesta?
              </h3>
              <p className="mb-4 text-zinc-600">
                La propuesta plantea una ley que proteja integralmente al productor, al rebaño, la parcela, la finca, el hato, y a toda la unidad productiva. Proponemos fortalecer la ley para que:
              </p>
              <ul className="grid gap-2.5 sm:grid-cols-2 text-sm text-zinc-700 bg-zinc-50 border border-zinc-200/60 rounded-xl p-4 sm:p-5">
                {[
                  "Sancione con firmeza el abigeato, el faenamiento clandestino y la receptación comercial.",
                  "Castigue toda la cadena del delito ganadero, no solo al que roba.",
                  "Reconozca a la víctima ganadera y sus derechos.",
                  "Garantice la restitución productiva inmediata de los animales recuperados.",
                  "Proteja la finca, el hato, la parcela y la infraestructura rural.",
                  "Fortalezca la trazabilidad, los Sistemas Tecnológicos y la guía digital como herramientas útiles para el productor formal.",
                  "Evite burocratismo, trámites innecesarios o discrecionalidad funcionarial.",
                  "Contribuya a producir más carne, más leche, más empleo rural y más seguridad alimentaria."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-zinc-100 pt-6">
              <h3 className="font-semibold text-zinc-900 text-base sm:text-lg flex items-center gap-2 mb-3">
                <svg className="w-5 h-5 text-blue-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 1 1 .512 1.35h-.497v.75H12a2.25 2.25 0 0 0 0-4.5h-.75V7.5a.75.75 0 0 1 1.5 0v.75a2.25 2.25 0 0 0-1.5 4.5Z" /></svg>
                ¿Por qué adherirse y aportar?
              </h3>
              <p className="mb-4 text-zinc-600">
                Porque esta ley impactará directamente la seguridad jurídica del campo, la defensa de la finca, la movilización del ganado, la lucha contra el abigeato, la protección de la cadena pecuaria y el futuro de la producción nacional.
              </p>
              
              <div className="grid gap-3 sm:grid-cols-3 mb-4">
                <div className="bg-blue-50/60 border border-blue-100 rounded-lg p-3 text-center">
                  <span className="block font-bold text-blue-800 text-sm sm:text-base">Tu adhesión</span>
                  <span className="text-blue-700 text-xs sm:text-sm">suma fuerza.</span>
                </div>
                <div className="bg-emerald-50/60 border border-emerald-100 rounded-lg p-3 text-center">
                  <span className="block font-bold text-emerald-800 text-sm sm:text-base">Tu propuesta</span>
                  <span className="text-emerald-700 text-xs sm:text-sm">suma contenido.</span>
                </div>
                <div className="bg-indigo-50/60 border border-indigo-100 rounded-lg p-3 text-center">
                  <span className="block font-bold text-indigo-800 text-sm sm:text-base">Tu participación</span>
                  <span className="text-indigo-700 text-xs sm:text-sm">lleva la voz del productor.</span>
                </div>
              </div>

              <p className="text-zinc-600 text-sm">
                Durante los próximos <strong>10 días</strong>, recogeremos adhesiones, observaciones y propuestas de todo el país. Al finalizar este período, el respaldo consolidado será consignado ante la Asamblea Nacional como expresión legítima, seria y organizada del sector pecuario venezolano.
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-blue-900 rounded-xl p-6 text-white space-y-4 shadow-sm">
              <p className="text-sm sm:text-base font-medium border-l-4 border-amber-400 pl-3 leading-relaxed">
                "El campo venezolano no pide privilegios. Pide seguridad para producir, justicia frente al delito, reglas claras, menos trabas y más respeto para quienes sostienen la producción nacional."
              </p>
              <p className="text-sm sm:text-base leading-relaxed">
                Una ley construida con la experiencia del campo se convertirá en una herramienta histórica para defender la finca, el rebaño, la familia rural y la seguridad alimentaria de Venezuela.
              </p>
              <div className="text-center pt-2 border-t border-white/10">
                <p className="text-amber-300 font-bold text-lg tracking-wider uppercase">
                  Adhiérete. Aporta. Reenvía.
                </p>
                <p className="text-white font-semibold mt-1">
                  La voz del campo debe estar en la ley. Proteger al productor es proteger a Venezuela.
                </p>
              </div>
            </div>

            <div className="rounded-lg bg-zinc-100 border border-zinc-200 p-4 text-xs text-zinc-500 leading-relaxed">
              <strong className="text-zinc-700 block mb-1">Nota institucional:</strong>
              La Consulta Nacional Pecuaria es un espacio abierto, temporal y participativo para recoger adhesiones y aportes en torno al debate legislativo de la Ley de Protección Integral de la Actividad Ganadera. Su propósito es ampliar la participación del sector pecuario y consignar ante la Asamblea Nacional una voz organizada, respetuosa y productiva desde el campo venezolano.
            </div>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8 border-t-4 border-t-blue-600">
          <h2 className="text-lg font-semibold text-zinc-800 mb-4 flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" /></svg>
            Propuesta de Articulado
          </h2>
          <div className="prose prose-sm max-w-none text-zinc-600 space-y-4 max-h-[450px] overflow-y-auto pr-2 pl-4 border-l-4 border-blue-200 bg-blue-50/30 rounded-r-lg">
            <div className="text-center space-y-1 mb-6 pb-4 border-b border-zinc-200/50">
              <h3 className="text-lg font-bold text-zinc-900 uppercase">PROPUESTA DE ARTICULADO</h3>
              <p className="font-semibold text-zinc-800 text-sm">Para el fortalecimiento del Proyecto de Ley para la Protección Integral de la Actividad Ganadera</p>
              <p className="text-xs text-zinc-500 italic">Aportes del sector pecuario para ampliar y nutrir el debate legislativo ante la Asamblea Nacional</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-zinc-800 uppercase border-b border-zinc-200/30 pb-1">EXPOSICIÓN DE MOTIVOS</h4>
              <p>La actividad ganadera constituye una actividad estratégica para la seguridad agroalimentaria, la economía rural, la generación de empleo, la producción de proteína animal, la preservación genética, la inversión agropecuaria y la estabilidad de la cadena cárnica, láctea y pecuaria nacional.</p>
              <p>El Proyecto de Ley para la Protección de la Actividad Ganadera aprobado en primera discusión por la Asamblea Nacional representa un avance relevante al incorporar trazabilidad, guías digitales, control sanitario, celeridad administrativa, fiscalización del faenamiento y combate a la informalidad.</p>
              <p>No obstante, la realidad del productor venezolano exige fortalecer el texto con una protección integral frente al abigeato, la receptación comercial, el faenamiento clandestino, las invasiones, la perturbación de unidades productivas, el fraude tecnológico, la discrecionalidad funcionarial, las alcabalas documentales y la falta de restitución inmediata de los semovientes recuperados.</p>
              <p>La presente propuesta gremial conserva la estructura positiva del Proyecto 2026 y la complementa con un régimen moderno, equilibrado y jurídicamente armonizado con la Constitución, el Código Penal, el Código Orgánico Procesal Penal, la Ley de Salud Agrícola Integral, la Ley de Tierras y Desarrollo Agrario, la Ley Orgánica para la Celeridad y Optimización de Trámites Administrativos y demás normas vigentes.</p>
              <p>La finalidad es aportar a la consulta pública un texto articulado que fortalezca la protección del productor, del rebaño nacional, de la unidad productiva, de la trazabilidad, de la sanidad animal, de la seguridad agroalimentaria y de la cadena ganadera formal.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-zinc-800 uppercase border-b border-zinc-200/30 pb-1">CRITERIOS DE ARMONIZACIÓN NORMATIVA</h4>
              <p>Esta propuesta se formula bajo los principios de legalidad, debido proceso, proporcionalidad, presunción de inocencia, protección de la víctima, tutela judicial efectiva, seguridad jurídica, propiedad, celeridad administrativa, trazabilidad verificable y simplificación de trámites.</p>
              <p>El articulado evita delegar al reglamento materias de reserva legal, especialmente delitos, agravantes, sanciones, comiso, decomiso, derechos de la víctima, medidas preventivas y responsabilidades de funcionarios.</p>
              <p>El reglamento debe limitarse a aspectos técnicos, operativos, tecnológicos, procedimentales y de implementación: formatos, protocolos, interoperabilidad, acreditación de peritos, manuales de inspección, estándares de dispositivos, baremos secundarios y cronogramas.</p>
              <p>La propuesta distingue entre productor formal, pequeño productor susceptible de asistencia y subsanación, infractor administrativo, red de comercialización informal y organización delictiva, evitando criminalizar fallas formales subsanables y sancionando con firmeza los hechos que afecten la propiedad, la sanidad, la trazabilidad y la seguridad alimentaria.</p>
            </div>

            <div className="text-center pt-4 pb-2">
              <h3 className="text-base font-bold text-zinc-900 uppercase tracking-wide">LEY PARA LA PROTECCIÓN INTEGRAL DE LA ACTIVIDAD GANADERA</h3>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">TÍTULO I<br/>DISPOSICIONES GENERALES</h4>
              
              <p><strong>Artículo 1. Objeto.</strong> La presente Ley tiene por objeto regular, proteger, fomentar y garantizar la actividad ganadera nacional en todas sus modalidades y formas, mediante mecanismos de seguridad jurídica, trazabilidad tecnológica, control sanitario, fiscalización, celeridad administrativa, restitución productiva, reparación integral, prevención y sanción de los delitos e infracciones que afecten al productor, al rebaño nacional, a la unidad productiva, a la cadena de valor ganadera y a la seguridad agroalimentaria de la República.</p>
              <p>El Ejecutivo Nacional, por órgano del Ministerio del Poder Popular con competencia en materia de agricultura y tierras, ejercerá la rectoría de las políticas públicas dirigidas al sector ganadero, sin perjuicio de las competencias que correspondan al Instituto Nacional de Salud Agrícola Integral, al Ministerio Público, a los órganos de investigación penal, a los órganos de seguridad ciudadana, a las autoridades regionales y municipales, y a los demás órganos y entes competentes.</p>

              <p><strong>Artículo 2. Finalidades.</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Fomentar la producción primaria ganadera y la modernización de las unidades de producción pecuaria.</li>
                <li>Preservar y mejorar la diversidad genética del rebaño nacional.</li>
                <li>Garantizar la trazabilidad integral de semovientes, productos, subproductos, material genético, canales y piezas de origen ganadero.</li>
                <li>Fortalecer el Sistema Integrado de Gestión para la Movilización Animal y Vegetal, SIGMA, o el sistema oficial que lo sustituya.</li>
                <li>Optimizar los procedimientos administrativos vinculados con la producción, certificación, movilización, faenamiento y comercialización ganadera.</li>
                <li>Proteger la salud animal, la salud pública, la inocuidad alimentaria y la sanidad agropecuaria.</li>
                <li>Prevenir, investigar y sancionar el abigeato, el robo, el hurto, la apropiación indebida, la receptación comercial, el faenamiento clandestino, el fraude tecnológico, el contrabando de extracción, la alteración de marcas o dispositivos de identificación y demás conductas que afecten la actividad ganadera.</li>
                <li>Reconocer y proteger los derechos de la víctima ganadera.</li>
                <li>Garantizar la restitución productiva inmediata de los semovientes recuperados.</li>
                <li>Proteger la unidad productiva ganadera frente a invasiones, perturbaciones, daños, extorsiones o paralizaciones ilegítimas.</li>
                <li>Evitar trámites innecesarios, requisitos redundantes, alcabalas documentales y retardos injustificados en la movilización pecuaria.</li>
                <li>Establecer un régimen sancionatorio administrativo y penal eficaz, proporcional, garantista y disuasivo.</li>
                <li>Promover la participación corresponsable de los gremios, asociaciones de productores primarios, cámaras agro productivas, colegios profesionales, médicos veterinarios, técnicos y demás actores de la cadena ganadera formal.</li>
              </ol>

              <p><strong>Artículo 3. Principios.</strong> La interpretación y aplicación de esta Ley se regirá por los principios de soberanía y seguridad agroalimentaria, legalidad, seguridad jurídica, debido proceso, tutela judicial efectiva, protección de la propiedad, protección de la víctima, restitución productiva, proporcionalidad, celeridad, simplificación administrativa, presunción de buena fe, subsanabilidad, interoperabilidad tecnológica, trazabilidad verificable, responsabilidad funcionarial, protección de la unidad productiva, formalización progresiva, corresponsabilidad público-gremial, por tanto toda acción contra la actividad ganadera tendrá consecuencias administrativas, civiles y penales de investigación por violación al principio constitucional de seguridad nacional alimentaria.</p>

              <p><strong>Artículo 4. Especies pecuarias protegidas.</strong> A los efectos de esta Ley, se consideran especies pecuarias protegidas todos los semovientes, animales de producción, sus crías, productos y subproductos vinculados con la actividad ganadera, pecuaria o agroproductiva lícita, destinados a la producción de carne, leche, huevos, miel, fibra, trabajo, reproducción, mejoramiento genético, investigación, cría, levante, comercialización o cualquier otro aprovechamiento productivo autorizado.</p>
              <p>Quedan comprendidas dentro de esta protección las especies bovina, bufalina, equina, asnal, mular, ovina, caprina, porcina, avícola, cunícola y apícola, así como otras especies pecuarias o de fauna silvestre bajo manejo productivo lícito, siempre que su cría, reproducción, movilización, aprovechamiento o comercialización se encuentre autorizada por los órganos competentes.</p>
              <p>La protección prevista en esta Ley comprende al animal vivo, sus crías, semen, embriones, material genético, carne, leche, huevos, miel, cueros, pieles, lana, canales, piezas, vísceras y demás productos o subproductos derivados de la actividad ganadera.</p>

              <p><strong>Artículo 5. Definiciones.</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li><strong>Actividad ganadera:</strong> conjunto de actividades lícitas vinculadas con la cría, levante, reproducción, mejoramiento genético, producción, ordeño, movilización, faenamiento, comercialización, transformación y aprovechamiento de especies pecuarias protegidas.</li>
                <li><strong>Productor ganadero:</strong> persona natural o jurídica, asociación, unidad de producción, comunidad productiva o forma de organización lícita que se dedique a la actividad ganadera.</li>
                <li><strong>Unidad productiva ganadera:</strong> espacio, finca, hato, fundo, predio, granja, parcela, centro de cría, centro de levante, centro de ordeño, instalación o infraestructura destinada a la actividad ganadera.</li>
                <li><strong>Víctima ganadera:</strong> persona natural o jurídica, productor, poseedor legítimo, unidad productiva, asociación, comunidad productiva o sujeto formal de la cadena ganadera que sufra afectación directa por delitos, infracciones o hechos que comprometan la continuidad de la actividad ganadera.</li>
                <li><strong>Trazabilidad ganadera:</strong> sistema de identificación, registro, seguimiento y verificación de semovientes, productos, subproductos, canales, piezas y material genético desde su origen hasta su destino final.</li>
                <li><strong>Guía de movilización:</strong> documento físico o digital emitido por el órgano competente, a través del sistema oficial, que autoriza y respalda la movilización de semovientes, productos o subproductos de origen ganadero.</li>
                <li><strong>Custodia productiva:</strong> depósito temporal, responsable y verificable de semovientes recuperados, retenidos o rescatados, otorgado a su propietario, poseedor legítimo o tercero idóneo para garantizar alimentación, sanidad, ordeño, cría, reproducción, levante y conservación del valor productivo.</li>
                <li><strong>Restitución productiva:</strong> entrega inmediata, provisional o definitiva, de semovientes, productos o subproductos recuperados a su propietario, poseedor legítimo o víctima acreditada, sin paralizar injustificadamente el ciclo productivo.</li>
                <li><strong>Receptación comercial ganadera:</strong> adquisición, recepción, transporte, almacenamiento, ocultamiento, beneficio, desposte, distribución, comercialización o venta de semovientes, productos o subproductos de origen ganadero provenientes de delito o sin verificación razonable de origen lícito.</li>
                <li><strong>Faenamiento clandestino:</strong> sacrificio, beneficio, desposte o procesamiento de semovientes fuera de establecimientos autorizados o sin cumplimiento de los controles sanitarios, documentales y de trazabilidad exigidos por la ley.</li>
                <li><strong>Fraude tecnológico ganadero:</strong> alteración, duplicación, suplantación, manipulación, supresión, cesión indebida, falsificación o uso fraudulento de guías digitales, registros, códigos, usuarios, claves, dispositivos de identificación, bases de datos o sistemas de trazabilidad pecuaria.</li>
              </ol>

              <p><strong>Artículo 6. Protección de la actividad ganadera.</strong> La actividad ganadera lícita será objeto de protección especial por su relación con la seguridad alimentaria, la economía rural, la propiedad, el empleo, la inversión productiva, la sanidad animal, el comercio formal y la estabilidad del circuito cárnico, lácteo y pecuario nacional.</p>
              <p>Los controles administrativos, sanitarios, policiales o de movilización deberán actuar como instrumentos de orden, transparencia y seguridad jurídica, y no como mecanismos de persecución, extorsión, paralización injustificada o criminalización social.</p>

              <p><strong>Artículo 7. Participación gremial y productiva.</strong> El Estado promoverá la participación activa, corresponsable y técnica de las federaciones, asociaciones de productores primarios, cámaras agro productivas, colegios profesionales, médicos veterinarios, técnicos agropecuarios, centros de investigación, universidades y demás actores vinculados con la actividad ganadera.</p>
              <p>La participación gremial tendrá carácter consultivo, técnico y de acompañamiento institucional, sin sustituir las competencias legales de los órganos y entes públicos.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">TÍTULO II<br/>SISTEMA NACIONAL DE TRAZABILIDAD, MOVILIZACIÓN Y CELERIDAD</h4>
              <p><strong>Artículo 8. Sistema oficial de trazabilidad ganadera.</strong> El Ministerio del Poder Popular con competencia en materia de agricultura y tierras, por órgano del Instituto Nacional de Salud Agrícola Integral o del ente competente, establecerá, unificará y actualizará el sistema oficial de trazabilidad ganadera.</p>
              <p>El sistema garantizará la identificación individual o por lote, según corresponda, así como el seguimiento de semovientes, productos, subproductos, canales, piezas y material genético desde su origen hasta su destino final.</p>

              <p><strong>Artículo 9. Valor probatorio de SIGMA.</strong> Los registros, guías, códigos, certificaciones, actas digitales, alertas, verificaciones y demás datos emitidos por SIGMA o por el sistema oficial de trazabilidad pecuaria, tendrán valor de evidencia administrativa y podrán ser incorporados al proceso penal conforme a las reglas del Código Orgánico Procesal Penal.</p>
              <p>Su valor probatorio podrá ser objeto de contradicción, verificación, experticia técnica, experticia informática o impugnación por las partes, conforme a la ley.</p>

              <p><strong>Artículo 10. Interoperabilidad institucional.</strong> El sistema oficial de trazabilidad deberá articularse progresivamente con los registros y plataformas del Instituto Nacional de Salud Agrícola Integral, Ministerio con competencia en agricultura y tierras, Ministerio Público, órganos de investigación penal, cuerpos de seguridad, autoridades fronterizas, gobernaciones, alcaldías, registros sanitarios y demás órganos competentes.</p>
              <p>La interoperabilidad tendrá por objeto evitar duplicidad de requisitos, facilitar verificaciones, reducir tiempos de respuesta, combatir fraudes y proteger la movilización ganadera lícita.</p>

              <p><strong>Artículo 11. Guía digital de movilización.</strong> La movilización de semovientes dentro del territorio de la República Bolivariana de Venezuela requerirá la emisión previa de la guía de movilización, física o digital, emitida por el órgano competente a través del sistema oficial.</p>
              <p>La guía será única, suficiente, verificable, intransferible y oponible frente a toda autoridad civil, militar, policial, sanitaria o administrativa.</p>

              <p><strong>Artículo 12. Contenido mínimo de la guía.</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Identificación del propietario, poseedor legítimo o responsable.</li>
                <li>Identificación de origen y destino.</li>
                <li>Especie, cantidad, categoría y características del semoviente, lote, producto o subproducto movilizado.</li>
                <li>Datos del transportista y medio de transporte.</li>
                <li>Ruta declarada y vigencia temporal.</li>
                <li>Código único de verificación.</li>
                <li>Registro sanitario o certificación aplicable.</li>
                <li>Cualquier otro dato necesario para la trazabilidad, sin generar cargas desproporcionadas.</li>
              </ol>

              <p><strong>Artículo 13. Prohibición de requisitos adicionales.</strong> Ninguna autoridad civil, militar, policial, sanitaria o administrativa podrá exigir durante la movilización pecuaria documentos, sellos, constancias, autorizaciones, pagos, permisos o requisitos no previstos en la ley o no contenidos en el sistema oficial de verificación.</p>
              <p>La exigencia de requisitos adicionales, la retención injustificada del transporte ganadero o el desconocimiento arbitrario de una guía válida generará responsabilidad administrativa, civil, disciplinaria o penal, según corresponda.</p>

              <p><strong>Artículo 14. Verificación extraordinaria.</strong> La verificación extraordinaria de un transporte ganadero solo procederá cuando existan indicios objetivos, verificables y documentados de:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Falsificación o alteración de la guía.</li>
                <li>Incongruencia manifiesta entre la guía y la carga.</li>
                <li>Riesgo sanitario inmediato.</li>
                <li>Delito flagrante.</li>
                <li>Maltrato animal o riesgo grave al bienestar animal.</li>
                <li>Contrabando de extracción o desvío injustificado de ruta.</li>
                <li>Suplantación del transportista, propietario o responsable.</li>
              </ol>
              <p>Toda verificación deberá constar en acta, con identificación de la autoridad actuante, causa de intervención, hora, lugar, estado de los animales, documentos revisados y resultado de la actuación.</p>

              <p><strong>Artículo 15. Bienestar animal durante la movilización.</strong> Toda actuación de inspección, retención, verificación o custodia deberá preservar la vida, salud, alimentación, hidratación, sombra, ventilación, ordeño, reproducción, levante y bienestar de los semovientes.</p>
              <p>La autoridad actuante será responsable por los daños causados por retenciones arbitrarias, demoras injustificadas o condiciones inadecuadas de custodia.</p>

              <p><strong>Artículo 16. Celeridad administrativa.</strong> Los trámites vinculados con registro, certificación, movilización, faenamiento, comercialización, inspección y restitución de semovientes deberán regirse por los principios de celeridad, simplificación, buena fe, subsanabilidad, interoperabilidad y mínima carga administrativa.</p>
              <p>La Administración Pública no podrá solicitar información o documentos que ya reposen en sus propios sistemas, registros o bases de datos, salvo imposibilidad técnica debidamente motivada.</p>

              <p><strong>Artículo 17. Brecha digital rural.</strong> El Ejecutivo Nacional garantizará mecanismos presenciales, asistidos y simplificados para productores ubicados en zonas rurales con limitaciones de conectividad, electricidad, alfabetización digital o acceso tecnológico.</p>
              <p>La digitalización no podrá ser utilizada para excluir, paralizar o sancionar injustamente al pequeño productor, siempre que no existan indicios de fraude, delito, riesgo sanitario o comercialización ilícita.</p>

              <p><strong>Artículo 18. Formalización progresiva.</strong> El Estado promoverá programas de asistencia técnica, registro, capacitación y formalización progresiva de productores, sin perjuicio de las responsabilidades que correspondan por delitos, fraude, reincidencia, riesgo sanitario o participación en redes ilícitas.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">TÍTULO III<br/>PROTECCIÓN DE LA VÍCTIMA GANADERA, RESTITUCIÓN PRODUCTIVA Y UNIDAD PRODUCTIVA</h4>
              <p><strong>Artículo 19. Reconocimiento de la víctima ganadera.</strong> Se reconoce como víctima ganadera a toda persona natural o jurídica, productor, poseedor legítimo, unidad productiva, asociación, comunidad productiva o actor formal de la cadena ganadera que sufra daño, amenaza, pérdida, perturbación o afectación directa por hechos ilícitos, infracciones administrativas, delitos o conductas que comprometan la actividad ganadera.</p>

              <p><strong>Artículo 20. Derechos de la víctima ganadera.</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Denunciar y recibir respuesta oportuna.</li>
                <li>Ser informada del avance de los procedimientos administrativos o penales.</li>
                <li>Solicitar medidas de protección.</li>
                <li>Solicitar diligencias de investigación.</li>
                <li>Acceder a registros de trazabilidad vinculados con el hecho denunciado.</li>
                <li>Solicitar restitución productiva inmediata.</li>
                <li>Reclamar reparación integral.</li>
                <li>Participar en el proceso penal conforme al Código Orgánico Procesal Penal.</li>
                <li>Ser protegida frente a retaliaciones, amenazas o nuevas afectaciones.</li>
                <li>Recibir acompañamiento técnico para acreditar propiedad, posesión, trazabilidad, daño productivo y valor económico.</li>
              </ol>

              <p><strong>Artículo 21. Restitución productiva inmediata.</strong> Los semovientes recuperados, retenidos o rescatados deberán ser entregados de forma inmediata, provisional o definitiva, a su propietario, poseedor legítimo o víctima acreditada, bajo custodia productiva, cuando existan elementos suficientes de identificación, trazabilidad, marcas, señales, dispositivos, guías, documentos, registros, testigos o cualquier otro medio lícito que permita presumir legítima titularidad o posesión.</p>
              <p>La restitución productiva deberá evitar la inmovilización prolongada de animales en sedes policiales, administrativas, judiciales o lugares inadecuados que afecten su vida, salud, alimentación, reproducción, ordeño, levante o valor genético.</p>

              <p><strong>Artículo 22. Custodia productiva.</strong> La custodia productiva será acordada mediante acta motivada que identifique los semovientes, su estado, ubicación, responsable de custodia, obligaciones de conservación, prohibición de disposición no autorizada y mecanismos de seguimiento.</p>
              <p>La custodia podrá otorgarse al propietario, poseedor legítimo, víctima acreditada, asociación ganadera, médico veterinario, depositario judicial o tercero idóneo, según las circunstancias del caso.</p>

              <p><strong>Artículo 23. Reparación integral.</strong> La reparación integral de la víctima ganadera comprenderá en todo momento la indemnización por daños y perjuicios, según corresponda:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Valor comercial del semoviente, producto o subproducto.</li>
                <li>Pérdida genética o reproductiva.</li>
                <li>Interrupción del ordeño.</li>
                <li>Pérdida de crías, semen, embriones o material genético.</li>
                <li>Pérdida de peso, deterioro sanitario o muerte del animal.</li>
                <li>Daños a cercas, corrales, potreros, vías internas, sistemas de agua, centros de ordeño, equipos o infraestructura.</li>
                <li>Gastos de recuperación, transporte, alimentación, tratamiento veterinario y custodia.</li>
                <li>Lucro cesante productivo.</li>
                <li>Daño emergente.</li>
                <li>Cualquier otra afectación demostrable a la unidad productiva.</li>
              </ol>

              <p><strong>Artículo 24. Protección de la unidad productiva ganadera.</strong> La unidad productiva ganadera será objeto de protección especial frente a invasiones, ocupaciones ilegítimas, perturbaciones, extorsiones, amenazas, destrucción de cercas, daños a corrales, potreros, sistemas de agua, vías internas, centros de ordeño, infraestructura sanitaria, equipos, insumos o cualquier conducta que perturbe, paralice, limite o afecte la continuidad productiva.</p>
              <p>Cuando tales hechos revistan carácter penal, deberán ser remitidos de inmediato al Ministerio Público.</p>

              <p><strong>Artículo 25. Relación con procedimientos agrarios.</strong> La protección prevista en esta Ley no impedirá el ejercicio legítimo de competencias agrarias, administrativas o judiciales conforme a la Ley de Tierras y Desarrollo Agrario y demás normas aplicables.</p>
              <p>Ningún reclamo, procedimiento o conflicto agrario podrá justificar vías de hecho, violencia, ocupación arbitraria, sustracción de semovientes, destrucción de infraestructura, paralización productiva o afectación de la seguridad alimentaria.</p>

              <p><strong>Artículo 26. Medidas de protección.</strong> Cuando existan amenazas, retaliaciones, extorsiones, riesgo de reiteración delictiva o afectación grave a la unidad productiva, la víctima ganadera podrá solicitar medidas de protección ante el Ministerio Público, órganos de seguridad ciudadana, órganos administrativos competentes o autoridad judicial, conforme al ordenamiento jurídico vigente y en concordancia con el artículo 55 de la constitución de la república bolivariana de Venezuela y a efectos de dar cumplimiento a este último, los organismos de seguridad tienen con carácter vinculante la obligación de cumplir con los resguardos de forma presencial.</p>

              <p><strong>Artículo 27. Peritos técnicos y gremiales.</strong> La autoridad competente podrá habilitar peritos técnicos, médicos veterinarios, zootecnistas, ingenieros agrónomos, asociaciones ganaderas o especialistas acreditados para apoyar labores de identificación, avalúo, custodia, trazabilidad, daño productivo, genética, sanidad y restitución.</p>
              <p>El reglamento establecerá los requisitos, registro, responsabilidades, incompatibilidades y mecanismos de control de los peritos habilitados.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">TÍTULO IV<br/>CONTROL SANITARIO, FAENAMIENTO Y COMERCIALIZACIÓN</h4>
              <p><strong>Artículo 28. Control sanitario.</strong> El Instituto Nacional de Salud Agrícola Integral ejercerá las competencias sanitarias, de inspección, certificación, movilización, control, prevención y fiscalización previstas en esta Ley y en la Ley de Salud Agrícola Integral.</p>
              <p>Sus actuaciones deberán documentarse mediante acta física o digital, preservar la cadena de custodia cuando existan indicios de delito y garantizar el derecho a defensa en los procedimientos administrativos.</p>

              <p><strong>Artículo 29. Faenamiento autorizado.</strong> El beneficio, sacrificio, faenamiento, desposte o procesamiento de semovientes solo podrá realizarse en establecimientos autorizados, registrados, inspeccionados y habilitados por la autoridad competente, con cumplimiento de los requisitos sanitarios, documentales y de trazabilidad.</p>

              <p><strong>Artículo 30. Prohibición del faenamiento clandestino.</strong> Queda prohibido el beneficio, sacrificio, faenamiento, desposte o procesamiento de semovientes fuera de establecimientos autorizados o sin cumplimiento de los controles sanitarios, documentales y de trazabilidad exigidos por la ley.</p>
              <p>La autoridad competente podrá ordenar medidas preventivas de inmovilización, retención, depósito, inspección, destrucción sanitaria o remisión al Ministerio Público, según la naturaleza del hecho y con respeto al debido proceso.</p>

              <p><strong>Artículo 31. Faenamiento clandestino agravado.</strong> El faenamiento clandestino será considerado agravado cuando:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Involucre semovientes robados, hurtados, apropiados indebidamente o de origen no acreditado.</li>
                <li>Exista riesgo grave a la salud pública.</li>
                <li>Se alteren marcas, señales, guías, dispositivos de identificación o registros de trazabilidad.</li>
                <li>Se realice por una red organizada.</li>
                <li>Exista reincidencia.</li>
                <li>Participen funcionarios públicos.</li>
                <li>Se trate de semovientes de alto valor genético, vientres, reproductores, material genético o animales destinados a programas de mejoramiento.</li>
                <li>Tenga conexión con contrabando de extracción.</li>
              </ol>

              <p><strong>Artículo 32. Inspección en mataderos y salas de matanza.</strong> Los mataderos, frigoríficos, salas de matanza y establecimientos autorizados deberán verificar, antes del beneficio:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Registro sanitario correspondiente.</li>
                <li>Guía de movilización válida.</li>
                <li>Identificación del propietario, poseedor legítimo o responsable.</li>
                <li>Marcas, señales, dispositivos o códigos de identificación.</li>
                <li>Estado zoosanitario.</li>
                <li>Origen lícito del semoviente.</li>
                <li>Registro en el sistema oficial de trazabilidad.</li>
              </ol>
              <p>Toda recepción, inspección, beneficio y destino deberá asentarse en acta física o digital.</p>

              <p><strong>Artículo 33. Comercialización formal.</strong> Toda comercialización de semovientes, carne, leche, cuero, pieles, canales, piezas, material genético, productos o subproductos de origen ganadero deberá contar con respaldo de origen lícito, trazabilidad, registro sanitario o documentación aplicable.</p>
              <p>Los establecimientos comerciales deberán conservar los soportes de origen y destino durante el tiempo que establezca el reglamento.</p>

              <p><strong>Artículo 34. Barreras contra la comercialización informal.</strong> Queda prohibido adquirir, recibir, almacenar, transportar, distribuir, beneficiar, despostar, comercializar o vender semovientes, carne, leche, cuero, pieles, canales, piezas, material genético, productos o subproductos de origen ganadero provenientes de redes informales, establecimientos no autorizados o sin respaldo documental razonable de origen lícito.</p>

              <p><strong>Artículo 35. Medidas preventivas sobre productos y subproductos.</strong> Cuando existan indicios de origen ilícito, riesgo sanitario, falta grave de trazabilidad o comercialización informal, la autoridad competente podrá ordenar retención preventiva, inmovilización, depósito, inspección, toma de muestras, remisión al Ministerio Público o disposición sanitaria, según corresponda.</p>
              <p>La falta documental subsanable no constituirá por sí sola delito, salvo que concurran indicios de falsificación, ocultamiento, reincidencia, riesgo sanitario, comercialización ilícita o participación en redes delictivas.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">TÍTULO V<br/>DELITOS CONTRA LA ACTIVIDAD GANADERA</h4>
              <p><strong>Artículo 36. Principio de legalidad, culpabilidad y de seguridad nacional agroalimentaria.</strong> Los delitos previstos en esta Ley se regirán por los principios de legalidad, culpabilidad, proporcionalidad, debido proceso, presunción de inocencia y demás garantías constitucionales y procesales.</p>
              <p>Queda prohibida toda forma de responsabilidad penal objetiva.</p>

              <p><strong>Artículo 37. Acción penal.</strong> Los delitos previstos en esta Ley serán de acción pública.</p>
              <p>El Ministerio Público ejercerá la acción penal y dirigirá la investigación, conforme al Código Orgánico Procesal Penal y al contenido de esta ley.</p>

              <p><strong>Artículo 38. Abigeato.</strong> Quien se apodere ilegítimamente de uno o más semovientes pertenecientes a una unidad productiva, productor, poseedor legítimo, comunidad productiva o sujeto de la cadena ganadera, será sancionado con prisión de diez (10) a quince (15) años.</p>
              <p>La pena se aplicará sin perjuicio de las sanciones más graves que correspondan cuando el hecho cometa con violencia, amenaza, armas, privación de libertad, asociación delictiva, contrabando, alteración de trazabilidad o participación de funcionarios.</p>

              <p><strong>Artículo 39. Robo de ganado.</strong> Quien, mediante violencia, amenaza, intimidación, fuerza sobre las personas o ataque a la libertad individual se apodere de semovientes, productos, subproductos o bienes vinculados con la actividad ganadera, será sancionado con prisión de diez (10) a quince (15) años.</p>
              <p>Cuando el hecho se cometa con armas, por dos o más personas, con privación de libertad, simulación de autoridad, uso de uniformes, lesiones, participación de funcionarios o contra semovientes de alto valor genético, la pena será de diez (10) a diez y seis (16) años.</p>

              <p><strong>Artículo 40. Hurto calificado de ganado.</strong> La pena será de diez (10) a doce (12) años de prisión cuando el abigeato se cometa:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>De noche.</li>
                <li>Con abuso de confianza.</li>
                <li>Por trabajador, encargado, depositario, transportista o persona vinculada a la unidad productiva.</li>
                <li>Con destrucción de cercas, corrales, potreros, candados, vías internas o infraestructura.</li>
                <li>Por dos o más personas.</li>
                <li>Con uso de vehículos, rutas clandestinas o medios de transporte no declarados.</li>
                <li>Con alteración de marcas, señales, dispositivos, guías o registros.</li>
                <li>Durante desastre, calamidad, emergencia o perturbación pública.</li>
                <li>En zona fronteriza o con fines de contrabando.</li>
                <li>Sobre animales de alto valor genético, vientres, reproductores, crías o material genético.</li>
              </ol>

              <p><strong>Artículo 41. Apropiación indebida ganadera.</strong> Quien se apropie, disponga, retenga, oculte o desvíe semovientes, productos, subproductos o material genético que le hubieren sido confiados por cualquier título que obligue a restituirlos, entregarlos, transportarlos, cuidarlos, beneficiarlos o darles un uso determinado, será sancionado con prisión de seis (06) a diez (10) años.</p>

              <p><strong>Artículo 42. Beneficio ilícito de ganado ajeno.</strong> Quien beneficie, sacrifique, desposte, procese o transforme semovientes ajenos sin consentimiento del propietario o poseedor legítimo, o sin respaldo de origen lícito, será sancionado con prisión de seis (06) a ocho (08) años.</p>
              <p>Si el hecho se comete en establecimiento clandestino, con riesgo sanitario, alteración de trazabilidad, participación de funcionarios, reincidencia o conexión con redes organizadas, la pena será de ocho (08) a doce (12) años.</p>

              <p><strong>Artículo 43. Receptación comercial ganadera.</strong> Quien adquiera, reciba, transporte, almacene, oculte, beneficie, desposte, distribuya, comercialice o venda semovientes, carne, leche, cuero, pieles, canales, piezas, material genético, productos o subproductos de origen ganadero, con conocimiento de su origen ilícito o sin adoptar las medidas razonables de verificación exigidas por la ley, será sancionado con prisión de diez (10) a catorce (14) años.</p>
              <p>Cuando el hecho sea cometido por matadero, frigorífico, carnicería, distribuidora, centro de acopio, transportista, comerciante, funcionario o red organizada, la pena será de diez (10) a catorce (14) años. Así mismo serán suspendidas las licencias y permisos para la realización de las actividades para las cuales estén autorizados como entidades privadas, debiendo resarcir los daños y perjuicios a los propietarios de los animales o victimas del hecho.</p>

              <p><strong>Artículo 44. Alteración de marcas, señales o dispositivos.</strong> Quien suprima, altere, borre, sustituya, falsifique, desfigure o manipule hierros, señales, marcas, aretes, chips, dispositivos electrónicos, códigos, registros o cualquier mecanismo de identificación ganadera, será sancionado con prisión de ocho (08) a doce (12) años.</p>
              <p>La misma pena se aplicará a quien marque, remarque, señale, contramarque o identifique semovientes ajenos sin autorización legítima.</p>

              <p><strong>Artículo 45. Guías falsas o adulteradas.</strong> Quien falsifique, altere, emita indebidamente, facilite, comercialice, use o presente guías de movilización, certificaciones, constancias, registros o documentos falsos o adulterados con el fin de movilizar, ocultar, beneficiar, comercializar o legitimar semovientes, productos o subproductos de origen ilícito, será sancionado con prisión de seis (06) a diez (10) años.</p>

              <p><strong>Artículo 46. Fraude tecnológico ganadero.</strong> Quien acceda, altere, suprima, duplique, ceda, venda, falsifique, manipule o use indebidamente usuarios, claves, guías digitales, códigos, registros, dispositivos de identificación, bases de datos o sistemas de trazabilidad ganadera, será sancionado con prisión de ocho (08) a diez (10) años.</p>
              <p>Cuando el hecho sea cometido por funcionario, administrador del sistema, operador autorizado, perito acreditado, transportista, establecimiento de faenamiento o red organizada, la pena será de ocho (08) a diez (10) años, acompañado de la destitución del cargo con la prohibición de no poder ejercer cargo público alguno en el futuro.</p>

              <p><strong>Artículo 47. Daño doloso al rebaño.</strong> Quien cause daño, lesión, inutilización, envenenamiento, enfermedad, pérdida, deterioro o muerte dolosa de semovientes ajenos será sancionado con prisión de seis (06) a diez (10) años, sin perjuicio de la reparación integral correspondiente.</p>
              <p>Cuando el daño afecte semovientes de alto valor genético, vientres, reproductores, crías, material genético o comprometa la sanidad animal o la salud pública, la pena será de ocho (08) a diez (10) años.</p>

              <p><strong>Artículo 48. Perturbación productiva ganadera.</strong> Quien, mediante violencia, amenaza, vías de hecho, ocupación ilegítima, destrucción de infraestructura, extorsión o intimidación impida, perturbe, paralice o afecte gravemente la continuidad de una unidad productiva ganadera, será sancionado con prisión de seis (06) a ocho (08) años, sin perjuicio de las penas que correspondan por otros delitos.</p>
              <p>Esta disposición no criminaliza reclamos, solicitudes, inspecciones, procedimientos agrarios o actuaciones administrativas legítimas tramitadas conforme a la ley.</p>

              <p><strong>Artículo 49. Agravantes especiales.</strong> Son agravantes especiales de los delitos previstos en esta Ley:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Uso de armas.</li>
                <li>Actuación de dos o más personas.</li>
                <li>Participación de funcionarios públicos.</li>
                <li>Simulación de autoridad.</li>
                <li>Uso de uniformes, credenciales o identificaciones falsas.</li>
                <li>Violencia, amenaza o privación de libertad.</li>
                <li>Alteración de marcas, guías, dispositivos o sistemas de trazabilidad.</li>
                <li>Faenamiento o desposte inmediato.</li>
                <li>Receptación comercial.</li>
                <li>Zona fronteriza o finalidad de contrabando.</li>
                <li>Afectación de semovientes de alto valor genético.</li>
                <li>Abuso de confianza, relación laboral o vínculo de custodia.</li>
                <li>Reincidencia.</li>
                <li>Afectación a productores primarios.</li>
                <li>Riesgo sanitario o afectación a la salud pública.</li>
              </ol>

              <p><strong>Artículo 50. Funcionarios públicos.</strong> El funcionario público que facilite, encubra, retarde, omita, altere registros, emita documentos irregulares, desconozca guías válidas, exija requisitos no previstos, permita movilizaciones ilícitas o participe en los delitos previstos en esta Ley, será sancionado conforme a la pena correspondiente aumentada de un tercio a la mitad, sin perjuicio de la responsabilidad administrativa, civil, disciplinaria o penal adicional que corresponda.</p>

              <p><strong>Artículo 51. Tentativa, frustración y participación.</strong> La tentativa, frustración, coautoría, complicidad, facilitación, encubrimiento y demás formas de participación se regirán por la normativa de esta ley y supletoriamente por el Código Penal y demás normas aplicables.</p>

              <p><strong>Artículo 52. Responsabilidad de personas jurídicas y establecimientos.</strong> Cuando los hechos previstos en esta Ley sean cometidos con ocasión de la actividad de personas jurídicas, establecimientos, empresas, mataderos, frigoríficos, centros de acopio, transportistas, distribuidoras o comercios, se aplicarán las sanciones administrativas, civiles, patrimoniales o penales que correspondan conforme al ordenamiento jurídico vigente, sin perjuicio de la responsabilidad penal individual de sus representantes, administradores, trabajadores o beneficiarios reales.</p>

              <p><strong>Artículo 53. Restricciones procesales razonables.</strong> En delitos cometidos con violencia, armas, asociación delictiva, participación de funcionarios, contrabando, fraude tecnológico, reincidencia, faenamiento clandestino agravado o receptación comercial organizada, el juez competente valorará con especial rigurosidad el riesgo de fuga, obstaculización, reiteración delictiva y afectación a la víctima ganadera, conforme al Código Orgánico Procesal Penal.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">TÍTULO VI<br/>INFRACCIONES ADMINISTRATIVAS, MEDIDAS PREVENTIVAS Y SANCIONES</h4>
              <p><strong>Artículo 54. Potestad sancionatoria.</strong> El Instituto Nacional de Salud Agrícola Integral y los órganos competentes ejercerán la potestad sancionatoria administrativa en las materias de su competencia, con sujeción a la Constitución, la ley, el debido proceso, la proporcionalidad, el derecho a defensa y los recursos correspondientes.</p>

              <p><strong>Artículo 55. Infracciones leves.</strong> Son infracciones leves:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Errores materiales subsanables en registros, guías o documentos.</li>
                <li>Retardos no dolosos en actualización de datos.</li>
                <li>Omisiones formales que no comprometan trazabilidad, sanidad, movilización, origen lícito o salud pública.</li>
                <li>Incumplimientos menores de protocolos administrativos, siempre que no exista reincidencia ni afectación a terceros.</li>
              </ol>
              <p>Las infracciones leves darán lugar preferentemente a apercibimiento, subsanación, asistencia técnica o multa proporcional.</p>

              <p><strong>Artículo 56. Infracciones graves.</strong> Son infracciones graves:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Movilizar semovientes, productos o subproductos con guía vencida, incompleta o no verificable, cuando no existan indicios de delito.</li>
                <li>Incumplir obligaciones sanitarias o de registro que afecten la trazabilidad.</li>
                <li>Beneficiar semovientes sin cumplir requisitos administrativos esenciales, sin indicios de origen ilícito.</li>
                <li>Comercializar productos o subproductos sin respaldo documental suficiente, cuando la omisión no constituya delito.</li>
                <li>Reincidir en infracciones leves.</li>
                <li>Obstaculizar inspecciones legítimas.</li>
              </ol>

              <p><strong>Artículo 57. Infracciones muy graves.</strong> Son infracciones muy graves:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Movilizar semovientes, productos o subproductos sin respaldo de origen lícito.</li>
                <li>Alterar, manipular o usar indebidamente registros, guías, códigos o dispositivos sin que el hecho constituya delito.</li>
                <li>Faenar fuera de establecimientos autorizados.</li>
                <li>Comercializar productos o subproductos de origen no verificable con riesgo sanitario.</li>
                <li>Reincidir en infracciones graves.</li>
                <li>Desconocer medidas sanitarias legalmente dictadas.</li>
                <li>Causar daño grave a la trazabilidad, sanidad animal, salud pública o seguridad agroalimentaria.</li>
              </ol>

              <p><strong>Artículo 58. Sanciones administrativas.</strong> Las infracciones previstas en esta Ley podrán ser sancionadas, según su gravedad, con:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Apercibimiento.</li>
                <li>Orden de subsanación.</li>
                <li>Multa proporcional.</li>
                <li>Suspensión temporal de autorizaciones.</li>
                <li>Retención preventiva.</li>
                <li>Inmovilización sanitaria.</li>
                <li>Clausura temporal de establecimientos.</li>
                <li>Revocatoria de autorización, cuando proceda conforme a la ley.</li>
                <li>Decomiso administrativo de productos o subproductos cuando exista riesgo sanitario y se cumpla el debido procedimiento.</li>
              </ol>

              <p><strong>Artículo 59. Criterios de graduación.</strong> Para graduar la sanción se considerará:</p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Gravedad del hecho.</li>
                <li>Daño causado.</li>
                <li>Riesgo sanitario.</li>
                <li>Afectación a la trazabilidad.</li>
                <li>Beneficio económico obtenido.</li>
                <li>Reincidencia.</li>
                <li>Condición de pequeño, mediano o gran productor.</li>
                <li>Buena fe, cooperación o subsanación.</li>
                <li>Participación en red organizada.</li>
                <li>Afectación a la víctima ganadera.</li>
              </ol>

              <p><strong>Artículo 60. Multas e indexación.</strong> Las infracciones leves podrán sancionarse con multa equivalente en bolívares entre cinco y cien veces el tipo de cambio oficial de la moneda de referencia de mayor valor publicada por el Banco Central de Venezuela para la fecha de notificación del acto administrativo sancionatorio.</p>
              <p>Las infracciones graves podrán sancionarse con multa equivalente en bolívares entre ciento una y dos mil veces el tipo de cambio oficial de la moneda de referencia de mayor valor publicada por el Banco Central de Venezuela para la fecha de notificación del acto administrativo sancionatorio.</p>
              <p>Las infracciones muy graves podrán sancionarse con multa equivalente en bolívares entre dos mil una y diez mil veces el tipo de cambio oficial de la moneda de referencia de mayor valor publicada por el Banco Central de Venezuela para la fecha de notificación del acto administrativo sancionatorio.</p>
              <p>El reglamento podrá desarrollar baremos técnicos dentro de los rangos previstos en esta Ley, pero no podrá crear nuevas infracciones ni sanciones sustantivas.</p>

              <p><strong>Artículo 61. Medidas preventivas.</strong> Cuando existan indicios de infracción grave, delito, riesgo sanitario, riesgo de fuga de bienes, alteración de evidencia o afectación a la víctima, la autoridad competente podrá dictar medidas preventivas de retención, inmovilización, depósito, inspección, custodia, toma de muestras, suspensión temporal o remisión al Ministerio Público.</p>
              <p>Toda medida deberá constar en acto motivado, con identificación de bienes, autoridad actuante, causa, duración, recursos, responsable de custodia y medidas de bienestar animal.</p>

              <p><strong>Artículo 62. Comiso preventivo y decomiso definitivo.</strong> El comiso preventivo tendrá naturaleza cautelar y no implicará pérdida definitiva de la propiedad.</p>
              <p>El decomiso definitivo solo procederá mediante decisión administrativa firme o decisión judicial, según corresponda, con respeto al debido proceso, derecho a defensa, motivación, proporcionalidad y recursos previstos en la ley, sobre todos los instrumentos utilizados para la perpetración del hecho punible.</p>

              <p><strong>Artículo 63. Productos con riesgo sanitario.</strong> Cuando productos o subproductos de origen ganadero representen riesgo grave para la salud pública, sanidad animal o inocuidad alimentaria, la autoridad competente podrá ordenar su destrucción, inutilización o disposición sanitaria, conforme a la Ley de Salud Agrícola Integral, dejando constancia motivada y garantizando los controles correspondientes.</p>

              <p><strong>Artículo 64. Destino de las multas.</strong> Los recursos provenientes de multas administrativas se destinarán preferentemente al fortalecimiento tecnológico del sistema de trazabilidad, dotación de inspección sanitaria, capacitación de productores, asistencia rural, atención de brecha digital, control de faenamiento clandestino y apoyo a mecanismos de protección ganadera.</p>
              <p>La autoridad competente deberá rendir cuenta periódica del destino de dichos recursos.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">TÍTULO VII<br/>COORDINACIÓN INSTITUCIONAL Y PARTICIPACIÓN GREMIAL</h4>
              <p><strong>Artículo 65. Coordinación interinstitucional.</strong> El Ejecutivo Nacional establecerá mecanismos permanentes de coordinación entre el Ministerio con competencia en agricultura y tierras, INSAI, Ministerio Público, CICPC, órganos de seguridad ciudadana, autoridades fronterizas, gobernaciones, alcaldías, gremios ganaderos y demás órganos competentes, para prevenir, investigar y combatir el abigeato, la receptación, el faenamiento clandestino, el contrabando de extracción y el fraude tecnológico ganadero.</p>

              <p><strong>Artículo 66. Mesa Nacional Permanente de Protección Ganadera.</strong> Se crea la Mesa Nacional Permanente de Protección Ganadera como instancia de coordinación, consulta, seguimiento y articulación técnica, sin personalidad jurídica propia ni estructura burocrática adicional.</p>
              <p>La Mesa tendrá participación de órganos públicos competentes y representación gremial ganadera nacional y regional.</p>

              <p><strong>Artículo 67. Funciones de la Mesa Nacional.</strong></p>
              <ol className="list-decimal pl-5 space-y-1">
                <li>Evaluar nudos críticos de seguridad ganadera.</li>
                <li>Proponer protocolos de actuación.</li>
                <li>Hacer seguimiento a denuncias estructurales de abigeato, receptación, faenamiento clandestino y alcabalas documentales.</li>
                <li>Promover interoperabilidad institucional.</li>
                <li>Recomendar mejoras en SIGMA.</li>
                <li>Impulsar formación de funcionarios y productores.</li>
                <li>Elaborar reportes periódicos sobre afectaciones a la actividad ganadera.</li>
                <li>Proponer mecanismos de protección a pequeños y medianos productores.</li>
              </ol>

              <p><strong>Artículo 68. Órganos de investigación penal.</strong> Los órganos de investigación penal actuarán conforme al Código Orgánico Procesal Penal, bajo dirección del Ministerio Público, en los delitos previstos en esta Ley.</p>
              <p>El INSAI y demás órganos administrativos deberán preservar actas, registros, evidencias digitales, muestras, documentos y elementos de trazabilidad que puedan servir a la investigación penal.</p>
              <p>Se conformará y regulara en el reglamento de esta ley, en cada región la oficina de fiscalización y procesos de cooperación técnica y peritajes, integrada por expertos en materia ganadera que servirán como auxiliares en el proceso investigativo.</p>

              <p><strong>Artículo 69. Autoridades fronterizas.</strong> Las autoridades competentes establecerán controles sanitarios, documentales y de trazabilidad en ejes fronterizos, con especial atención al contrabando de extracción, desvío de rutas, guías falsas, transporte irregular y comercialización transfronteriza ilícita.</p>
              <p>Los controles fronterizos deberán respetar la guía válida, el bienestar animal, la legalidad, la proporcionalidad y la celeridad.</p>

              <p><strong>Artículo 70. Pueblos indígenas, subsistencia y consumo familiar.</strong> Las actividades de consumo familiar, subsistencia o prácticas tradicionales lícitas de comunidades vulnerables o pueblos indígenas recibirán tratamiento diferenciado, siempre que no exista comercialización ilícita, abigeato, riesgo sanitario, faenamiento clandestino organizado, contrabando o afectación a terceros.</p>
              <p>El reglamento establecerá mecanismos de atención diferenciada y formalización progresiva.</p>

              <p><strong>Artículo 71. Reglamento.</strong> El reglamento de esta Ley desarrollará exclusivamente aspectos técnicos, operativos, tecnológicos, procedimentales y de implementación, tales como formatos, interoperabilidad, manuales de inspección, requisitos de acreditación de peritos, protocolos de custodia, estándares de dispositivos, rutas de atención, baremos secundarios y cronogramas.</p>
              <p>El reglamento no podrá crear delitos, agravantes penales, infracciones sustantivas, sanciones no previstas, restricciones a derechos fundamentales ni requisitos que contradigan la ley.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">DISPOSICIONES TRANSITORIAS</h4>
              <p><strong>Artículo Primera. Adecuación tecnológica.</strong> El Ejecutivo Nacional, por órgano de las autoridades competentes, adecuará el sistema oficial de trazabilidad, guías digitales, interoperabilidad y mecanismos de verificación en un plazo no mayor de ciento ochenta días continuos contados desde la publicación de esta Ley en la Gaceta Oficial de la República Bolivariana de Venezuela.</p>
              <p><strong>Artículo Segunda. Reglamentación.</strong> El Ejecutivo Nacional dictará el reglamento de esta Ley en un plazo no mayor de noventa días continuos contados desde su publicación en la Gaceta Oficial de la República Bolivariana de Venezuela.</p>
              <p><strong>Artículo Tercera. Formalización progresiva.</strong> Durante el período de adecuación, la Administración Pública deberá priorizar la orientación, asistencia técnica y subsanación de los productores primarios, salvo en casos de delito, fraude, reincidencia, riesgo sanitario, contrabando o participación en redes ilícitas.</p>
              <p><strong>Artículo Cuarta. Capacitación institucional.</strong> El Ejecutivo Nacional implementará programas de formación para funcionarios civiles, militares, policiales, sanitarios y administrativos sobre guía digital única, celeridad administrativa, trazabilidad, bienestar animal, derechos del productor, protección de la víctima y prohibición de requisitos innecesarios.</p>
              <p><strong>Artículo Quinta. Protocolos de restitución.</strong> El Ministerio con competencia en agricultura y tierras, el INSAI, el Ministerio Público y los órganos de investigación penal elaborarán protocolos de restitución productiva, custodia, avalúo, preservación de evidencia y protección de semovientes recuperados.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">DISPOSICIÓN DEROGATORIA</h4>
              <p><strong>Artículo Única. Derogatoria.</strong> Se deroga la Ley Penal de Protección a la Actividad Ganadera publicada en la Gaceta Oficial de la República de Venezuela N.º 5.159 Extraordinario de fecha 25 de julio de 1997, así como todas las disposiciones legales, reglamentarias o administrativas que colidan con la presente Ley.</p>
            </div>

            <div className="space-y-3">
              <h4 className="font-bold text-zinc-800 text-center uppercase tracking-wider text-xs bg-zinc-200/50 py-1 rounded">DISPOSICIÓN FINAL</h4>
              <p><strong>Artículo Único. Entrada en vigencia.</strong> La presente Ley entrará en vigencia a partir de su publicación en la Gaceta Oficial de la República Bolivariana de Venezuela.</p>
            </div>
          </div>
        </section>

        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-red-100 text-red-600 shrink-0 shadow-sm">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
            </span>
            <div>
              <h3 className="font-semibold text-zinc-900 text-sm sm:text-base">Documento Completo de la Propuesta</h3>
              <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">Descarga la propuesta de ley completa en formato PDF para leerla en detalle.</p>
            </div>
          </div>
          <a
            href="/PROPUESTA LEY.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-red-600 hover:bg-red-700 px-5 py-2.5 text-white font-medium text-sm shadow-sm transition-colors w-full sm:w-auto text-center cursor-pointer shrink-0"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            Descargar PDF
          </a>
        </div>

        <div className="flex items-center gap-3">
          <hr className="flex-1 border-zinc-200" />
          <span className="text-xs font-medium text-zinc-400 uppercase tracking-widest">Formulario</span>
          <hr className="flex-1 border-zinc-200" />
        </div>

        <section id="registro" className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8 border-t-4 border-t-emerald-600">
          <h2 className="text-lg font-semibold text-zinc-800 mb-6 flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" /></svg>
            Formulario de Adhesión
          </h2>

          {state?.success && (
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-4 text-center mb-6 shadow-sm">
              <div className="flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" /></svg>
                <p className="text-emerald-800 font-semibold">
                  ¡Registro exitoso! La adhesión ha sido registrada.
                </p>
              </div>
            </div>
          )}

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
                    placeholder="12345678"
                    {...register("cedula")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
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
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
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
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
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
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
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
                    htmlFor="correo"
                    className="block text-sm font-medium text-zinc-700 mb-1"
                  >
                    Correo Electrónico
                  </label>
                  <input
                    id="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    {...register("correo")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
                  />
                  {errors.correo && (
                    <p className="mt-1 text-xs text-red-600">
                      {errors.correo.message}
                    </p>
                  )}
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
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
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
                    Clasificación
                  </label>
                  <select
                    id="afiliacionTipo"
                    {...register("afiliacionTipo")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
                  >
                    <option value="productor">Productor</option>
                    <option value="asociacion">Asociación Ganadera</option>
                    <option value="profesional">Profesional afín</option>
                    <option value="otro">Otros</option>
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
                    Especifique
                  </label>
                  <input
                    id="afiliacionNombre"
                    type="text"
                    placeholder="Nombre"
                    {...register("afiliacionNombre")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400"
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
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm hover:border-zinc-400 resize-y"
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
                  className="mt-1 h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500 accent-blue-600"
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
                className="w-full rounded-lg bg-gradient-to-r from-blue-700 to-blue-600 px-6 py-3 text-white font-semibold shadow-md transition-all duration-200 enabled:hover:from-blue-800 enabled:hover:to-blue-700 enabled:hover:shadow-lg enabled:hover:scale-[1.01] enabled:active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {pending ? "Registrando..." : "Registrar Adherente"}
              </button>
            </form>
        </section>
      </main>

      <footer className="w-full bg-zinc-950 mt-8 overflow-hidden shadow-inner">
        <img
          src="/footer.png"
          alt="Pie de página"
          className="w-full h-auto block"
        />
      </footer>

      {/* Botón flotante Regístrate y Apoya */}
      <a
        href="#registro"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3.5 text-white font-bold shadow-xl hover:from-emerald-700 hover:to-teal-600 transition-all hover:scale-105 active:scale-95 duration-200 group"
      >
        <svg className="w-5 h-5 animate-bounce group-hover:animate-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
        </svg>
        <span>Regístrate y Apoya</span>
      </a>
    </div>
  );
}
