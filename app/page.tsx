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
      <header className="w-full bg-primary text-white py-6 px-4 shadow-md">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Ley Penal de Protección a la Actividad Ganadera
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
          <div className="prose prose-sm max-w-none text-zinc-600 space-y-3 max-h-[420px] overflow-y-auto pr-1">
            <p className="text-xs text-zinc-400 italic">
              Gaceta Oficial N° 5.159 Extraordinario de fecha 25 de julio de 1997
            </p>
            <p className="font-semibold text-center text-zinc-800">
              El Congreso de la República decreta la siguiente,
            </p>
            <h3 className="text-base font-bold text-center text-zinc-800">
              Ley Penal de Protección a la Actividad Ganadera
            </h3>

            <h4 className="font-semibold text-zinc-800 mt-4">Título I. De los Delitos contra la Actividad Ganadera</h4>
            <h5 className="font-medium text-zinc-700">Capítulo I. Disposiciones Generales</h5>

            <p><strong>Artículo 1°</strong> Esta Ley tiene por objeto tipificar como delitos hechos que ocasionen perjuicio a la actividad ganadera con fines económicos, experimentales y cualquier otra actividad conexa, estableciendo las sanciones penales correspondientes. Igualmente determina las medidas de restitución y reparación a que haya lugar.</p>

            <p><strong>Artículo 2°</strong> A los efectos de esta Ley se considera:</p>
            <p><strong>Ganado Mayor:</strong> Las especies bovinas, bufalinas, équidos y otras similares.</p>
            <p><strong>Ganado Menor:</strong> Las especies ovinas, caprinas, suidos, avícolas, cunícolas, apícolas y cualquier otra especie comercial que sea tratada como población manejada.</p>
            <p><strong>Parágrafo Único:</strong> A los fines de esta Ley se entiende como población manejada, la reproducción y cría en cautiverio de especies de fauna silvestre, con fines experimentales de repoblación y comerciales.</p>

            <p><strong>Artículo 3°</strong> Son penas principales, las privativas de libertad previstas en el artículo 9° del Código Penal.</p>
            <p>1. El comiso de los medios de transporte, equipos, implementos y demás bienes utilizados para cometer el delito, cuando su propietario sea el autor intelectual, material, coautor, facilitador, cómplice o encubridor del hecho punible. El Tribunal de la causa deberá sacar los bienes decomisados a subasta pública mediante el procedimiento previsto en el Código de Procesamiento Civil, previa la fijación del justiprecio por un solo perito designado por el Juez. El monto de la subasta del bien decomisado si se declara desierta, será adjudicado según las disposiciones legales pertinentes que rige la misma, por el Tribunal Penal, en igual proporción al Cuerpo Técnico de Policía Judicial, Fuerzas Armadas de Cooperación y a las Inspectorías o Fiscalías del Llano, en las jurisdicciones donde existieren, quienes deberán destinar dicha suma para la adquisición de equipos.</p>
            <p>2. El comiso de los instrumentos o armas se regirá por lo dispuesto en los artículos 33 y 279 del Código Penal; y</p>
            <p>3. Inhabilitación para el ejercicio de funciones o empleos públicos, por un término igual a la pena principal, contado a partir de la fecha de haberse cumplido, cuando se trate de hechos punibles cometidos por funcionarios públicos, por abuso o incumplimiento de sus funciones.</p>

            <p><strong>Artículo 4°</strong> Se consideran circunstancias agravantes para los delitos previstos en esta Ley, las establecidas en el artículo 77 del Código Penal. En este caso, la pena será aumentada en una tercera parte de su límite máximo, independientemente que se exceda de este límite.</p>

            <p><strong>Artículo 5°</strong> La tentativa del delito y el delito frustrado, se regirán a los efectos de esta Ley por lo previsto en los artículos 80 al 82 del Libro Primero, Título VI del Código Penal.</p>

            <h5 className="font-medium text-zinc-700 mt-4">Capítulo II. De los Delitos de Robo, Hurto y Apropiación Indebida</h5>

            <p><strong>Artículo 6°</strong> Quien mediante violencia o amenaza de graves daños inmediatas a personas o cosas, haya constreñido al dueño, detentor o a otra persona presente en el lugar del delito, a que se le entregue o se apodere de una o varias cabezas de ganado, que formen o no parte de un rebaño, será penado con presidio de cuatro (4) a ocho (8) años. Igualmente incurrirá en esta pena, cuando una vez perpetrado el delito, el individuo utilizare la violencia o amenaza para procurarse la impunidad o procurarla a cualquier otra persona que haya participado del mismo.</p>

            <p><strong>Artículo 7°</strong> Cuando el delito de robo de ganado se haya cometido por medio de amenaza a la vida, a mano armada o por varias personas, una de las cuales hubiere estado manifiestamente armada, o bien por varias personas ilegítimamente uniformadas o disfrazadas o si en fin, se hubiere cometido el delito por medio de un ataque a la libertad individual, la pena de presidio será de ocho (8) a dieciséis (16) años, sin perjuicio de la aplicación de la pena correspondiente al porte ilícito de armas.</p>

            <p><strong>Artículo 8°</strong> Quien se apodere de una o varias cabezas de ganado ajeno que forme o no parte de un rebaño sin consentimiento de su dueño, o de quien deba darlo, será penado con prisión de cuatro (4) a ocho (8) años. Si el hecho se hubiere realizado sobre ganado cuyo valor fuere inferior a veinticinco (25) Unidades Tributarias, se impondrá una multa de veinticinco (25) a cincuenta (50) Unidades Tributarias y el pago de los daños y perjuicios causados. Si fuere reincidente se le aplicará además, arresto de quince (15) días a tres (3) meses.</p>

            <p><strong>Artículo 9°</strong> Quien beneficie una o varias cabezas de ganado ajeno, sin consentimiento de su dueño o de quien deba darlo, será penado con prisión de cuatro (4) a ocho (8) años.</p>

            <p><strong>Artículo 10°</strong> La pena de prisión para el delito de hurto calificado de ganado será de seis (6) a diez (10) años en los casos siguientes:</p>
            <p>1. Si el hecho se cometió abusando de la confianza o de la buena fe que le hubiera ofrecido el dueño o encargado del ganado;</p>
            <p>2. Si para cometer el hecho se ha aprovechado de las facilidades que le ofrecía algún desastre, calamidad, perturbación pública o las desgracias particulares del dueño del ganado hurtado;</p>
            <p>3. Si el hecho punible se ha realizado de noche;</p>
            <p>4. Si para realizar el hurto o bien para trasladar el ganado sustraído, han demolido o dañado las cercas hechas para el resguardo y protección del ganado o de linderos, aunque la demolición o daño no se hubiere efectuado en el lugar del delito;</p>
            <p>5. Si para cometer el hecho o para trasladar el ganado sustraído, se ha servido de una vía distinta a la destinada ordinariamente al pasaje de la gente o del ganado;</p>
            <p>6. Si el hecho se ha cometido por personas ilícitamente uniformadas o disfrazadas;</p>
            <p>7. Si el hecho se ha cometido por dos o más personas reunidas;</p>
            <p>8. Si el hecho se ha cometido valiéndose de la condición de funcionario público, de haber simulado serlo o utilizando documentos de identidad falsos;</p>
            <p>9. Quienes supriman, alteren, desfiguren o borren el hierro o señal de animales vivos o de pieles de ganado;</p>
            <p>10. Quienes hierren o señalen animales orejanos sin consentimiento del dueño o de quien deba darlo;</p>
            <p>11. Si se contrahierran o contraseñalan animales ajenos, sin derecho para ello. Si el hecho punible fuere perpetrado con dos o más de las circunstancias especificadas en este artículo, la pena de prisión será de ocho (8) a diez (10) años.</p>

            <p><strong>Artículo 11°</strong> Quien se apropie de una o más cabezas de ganado ajenas o su producto, que se le hubiere confiado o entregado por cualquier título que comporte la obligación de restituirlos o hacer un uso determinado, será penado con prisión de cuatro (4) a diez (10) años.</p>

            <h5 className="font-medium text-zinc-700 mt-4">Capítulo III. De la Aplicación y Utilización Indebida de Hierros y Señales, así como de Documentos o Guías de Compraventa o de Movilización de Ganado</h5>

            <p><strong>Artículo 12°</strong> Incurrirán en la pena de prisión de tres (3) a cinco (5) años:</p>
            <p>1. Quienes compren o permuten, u oculten ganado, cueros o subproductos que resulten tener el hierro o señal adulterado o borrado;</p>
            <p>2. Quienes transporten una o más cabezas de ganado, pieles o subproductos derivados de los mismos sin la debida autorización del dueño y sin las correspondientes guías de compraventa o de movilización, expedidos por la autoridad competente;</p>
            <p>3. El funcionario público que ordene o ejecute actos, que permitan el beneficio o matanza de ganado sin cumplir con los requisitos establecidos o que expida guías o copias certificadas de documentos sobre la propiedad o movilización de ganado, será sancionado de conformidad con lo previsto en el artículo 69 de la Ley Orgánica de Salvaguarda del Patrimonio Público.</p>

            <p><strong>Artículo 13°</strong> Incurrirá en pena de prisión de cuatro (4) a seis (6) años:</p>
            <p>1. Quien otorgue documentos falsos o altere documentos verdaderos para obtener guías de movilización de ganado o subproductos derivados de ellos; y</p>
            <p>2. Quien utilice documentos o guías de compraventa o de movilización falsos o adulterados, con el fin de transportar ganado o disponer de él, o de subproductos de los mismos.</p>

            <h5 className="font-medium text-zinc-700 mt-4">Capítulo IV. Del Aprovechamiento de las Cosas Provenientes de estos Delitos</h5>

            <p><strong>Artículo 14°</strong> Quien adquiera, reciba o de alguna manera gestione o participe para que se adquieran o reciban bienes provenientes de ganado robado, hurtado o de subproductos de los mismos, sin haber tomado parte en el delito, será penado con prisión de dos (2) a cuatro (4) años. Si el culpable es reincidente en la comisión del hecho punible previsto en este artículo, la pena de prisión será de cuatro (4) a seis (6) años.</p>

            <h5 className="font-medium text-zinc-700 mt-4">Capítulo V. De los Daños</h5>

            <p><strong>Artículo 15°</strong> Quien cause daños a una o más cabezas de ganado ajeno, que lo inutilice total o parcialmente para el uso que fue adquirido o para el uso comúnmente destinado dentro de la actividad pecuaria, será penado con prisión de uno (1) a tres (3) años, a instancia de la parte agraviada.</p>

            <p><strong>Artículo 16°</strong> Quien ocasione dolosamente la muerte de una o varias cabezas de ganado ajeno, será penado con prisión de dos (2) a tres (3) años, a instancia de la parte agraviada.</p>

            <p><strong>Artículo 17°</strong> Si los hechos punibles que se prevén en este capítulo, fueran realizados mediante violencia o amenaza a cualquier persona o en las circunstancias previstas en el artículo 10 de esta Ley, la pena será aumentada en una tercera parte.</p>

            <h5 className="font-medium text-zinc-700 mt-4">Capítulo VI. Disposiciones Generales</h5>

            <p><strong>Artículo 18°</strong> Cuando los hechos punibles previstos en los artículos 6°, 7°, 8°, 9°, 10°, 11° numerales 1 y 2 del artículo 12 y en el artículo 15 de esta Ley, se realizaren sobre una o más cabezas de ganado menor, la pena será disminuida en la mitad.</p>

            <h4 className="font-semibold text-zinc-800 mt-4">Título II. Del Procedimiento</h4>
            <h5 className="font-medium text-zinc-700">Capítulo I. Disposiciones Generales</h5>

            <p><strong>Artículo 19°</strong> Los Tribunales que conozcan de estos delitos durante la etapa del sumario, que detecten vicios de forma o de fondo cometidos por las autoridades encargadas de instruir los respectivos expedientes, procederá, de oficio a la corrección de estos vicios antes de que se produzca la decisión sobre la procedencia o no del auto de detención del presupuesto indicado.</p>

            <p><strong>Artículo 20°</strong> Cuando el órgano instructor aprehenda, retenga o recupere el ganado y demás bienes presuntamente objeto de los ilícitos penales previstos en esta Ley, a los fines de la averiguación sumaria, deberán entregarlo o confiarlo bajo guarda o custodia, al dueño agraviado, quien se comprometerá a llevarlos a un lugar seguro, no disponer de ellos ni movilizarlos fuera de la jurisdicción del tribunal que deba conocer de la causa. Demostrando como sea el legítimo dueño y previo requerimiento por escrito del mismo o de quien a éste represente, el juez penal competente ordenará dentro de los tres (3) días siguientes la entrega material.</p>

            <p><strong>Artículo 21°</strong> La responsabilidad civil derivada de los delitos previstos en esta Ley, se considera de orden público. A tales efectos, el Juez practicará aun de oficio las diligencias conducentes a su determinación, debiendo en la sentencia de fondo pronunciarse sobre dicha responsabilidad del o de los enjuiciamientos. Si no tuviere determinada la cuantía de la reparación o indemnización que corresponda, en la sentencia se ordenará proceder con arreglo a lo previsto en el artículo 249 del Código de Procedimiento Civil.</p>

            <p><strong>Artículo 22°</strong> El Juez en cualquier Estado y grado de la causa podrá dictar, aun de oficio, las medidas preventivas previstas en el Código de Procedimiento Civil y demás leyes de la República, a fin de asegurar el fiel cumplimiento de la responsabilidad civil que nace de la realización de los hechos punibles previstos en esta Ley.</p>

            <p><strong>Artículo 23°</strong> Son medios de pruebas aquellos que determinen el Código de Enjuiciamiento Criminal, Código Procedimiento Civil y otras leyes de la República. Pueden también valerse de cualquier otro medio de prueba no prohibido expresamente por esta Ley, que consideren conducente a la demostración de los hechos punibles. Estos medios se promoverán y evacuarán aplicando por analogía las disposiciones relativas a los medios de pruebas semejantes contemplados en el Código de Enjuiciamiento Criminal y en su defecto, en la forma que señale el Juez.</p>

            <p><strong>Artículo 24°</strong> A menos que exista una norma legal expresa, para valorar el mérito de la prueba, el Juez deberá apreciarla según las reglas de la sana crítica.</p>

            <p><strong>Artículo 25°</strong> En los procesos de los Delitos tipificados en esta Ley, el Juez tendrá por norte de sus actos la verdad, que procurará conocer en los límites de su oficio. En sus decisiones deberá atenerse a las normas del derecho, pudiendo fundar las mismas en los conocimientos de hechos que se encuentren comprendidos en la experiencia común o máximas de experiencias.</p>

            <p><strong>Artículo 26°</strong> No gozarán de los beneficios previstos en esta Ley de Beneficios en el Proceso Penal y en la Ley de Libertad Provisional Bajo Fianza, los procesados por los delitos previstos en el Capítulo II del Título I de esta Ley.</p>
            <p><strong>Parágrafo Único.</strong> En los procesos que se inicien por la comisión de los delitos tipificados en esta Ley, en los casos que sean procedentes los beneficios a que se refiere la Ley de Beneficios en el Proceso Penal y en la Ley de Libertad Provisional Bajo Fianza o cualquier otro beneficio previsto en otras leyes. El Juez que conozca del caso, para poder otorgar tales beneficios deberá solicitar al indiciado o condenado según el caso, que presente caución o garantía para responder a las obligaciones patrimoniales derivadas de las responsabilidades civiles que sean consecuencia del hecho punible. La caución o garantía a exigir deberá constituirse por un monto equivalente al doble del avalúo del bien objeto del delito. A tal efecto, sólo se admitirán los medios previstos en el artículo 590 del Código de Procedimiento Civil.</p>

            <p><strong>Artículo 27°</strong> El Procurador Agrario queda facultado el pleno derecho para ejercer las acciones civiles correspondientes y obtener la indemnización de los daños y perjuicios causados a quienes resulten agraviados por los delitos previstos en esta Ley, y ejercerá la representación de los pequeños y medianos productores cuando éstos se lo soliciten.</p>

            <h5 className="font-medium text-zinc-700 mt-4">Capítulo II. De los Órganos Competentes</h5>

            <p><strong>Artículo 28°</strong> La competencia de los tribunales en los casos de acción penal por los delitos previstos en esta Ley, se determinará conforme la establece el Código de Enjuiciamiento Criminal, en su Título Preliminar, Capítulo II y III y se regirá por el procedimiento penal ordinario contemplado en el mismo Código.</p>

            <h5 className="font-medium text-zinc-700 mt-4">Capítulo III. De los Funcionarios de Institución y de los Órganos de Policía Judicial</h5>

            <p><strong>Artículo 29°</strong> Son instrumentos del proceso penal que se inicie por los delitos establecidos en esta Ley:</p>
            <p>1. Los Tribunales de Primera Instancia en lo Penal;</p>
            <p>2. Los Tribunales de Parroquia y Municipio cuando actúen también con aquel carácter; y</p>
            <p>3. Los órganos principales de Policía Judicial, con las limitaciones que le impone el Código de Enjuiciamiento Criminal y las demás Leyes que le rigen.</p>
            <p><strong>Parágrafo Primero.</strong> Podrán actuar como auxiliares de los funcionarios instructores, por solicitud de ellos cuando fuere necesario, con las limitaciones establecidas en la Ley de Policía Judicial, las Inspectorías de Llano y las Fiscalías de Llano en los lugares donde existan y los demás Cuerpos de Policía Nacional, Estadal o Municipal.</p>
            <p><strong>Parágrafo Segundo.</strong> Los funcionarios que instruyan el sumario, cuando no sean los tribunales penales competentes, se consideran que actúan por delegación de éstos.</p>

            <p><strong>Artículo 30°</strong> Salvo disposiciones de leyes especiales y de conformidad con lo dispuesto en el artículo 74-A del Código de Enjuiciamiento Criminal son órganos de Policía Judicial, a los efectos de esta Ley:</p>
            <p>1. El Cuerpo Técnico de Policía Judicial; y</p>
            <p>2. Las Fuerzas Armadas de Cooperación.</p>

            <h4 className="font-semibold text-zinc-800 mt-4">Título III. Disposiciones Finales</h4>

            <p><strong>Artículo 31°</strong> Quedan derogadas todas aquellas disposiciones contenidas en leyes, decretos, reglamentos y resoluciones que contemplen penas por los delitos previstos en esta Ley, o regulen casos iguales o semejantes a ellos en el mismo hecho punible.</p>

            <p><strong>Artículo 32°</strong> Lo no previsto en esta Ley, se resolverá conforme a las disposiciones contenidas en el Código Penal, Código de Enjuiciamiento Criminal, Código de Procedimiento Civil y otras leyes que en forma supletoria puedan ser aplicadas en cuanto no colidan con esta Ley.</p>

            <p><strong>Artículo 33°</strong> Esta Ley entrará en vigencia a partir de la fecha de su publicación en la Gaceta Oficial de la República de Venezuela.</p>

            <p className="mt-4">Dada, firmada y sellada en el Palacio Federal Legislativo, en Caracas a los tres días del mes de julio de mil novecientos noventa y siete. Años 187° de la Independencia y 138° de la Federación.</p>

            <p className="text-right font-medium">Rafael Caldera</p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow-sm border border-zinc-200 p-6 sm:p-8">
          <h2 className="text-lg font-semibold text-zinc-800 mb-6">
            Formulario de Adhesión
          </h2>

          {state?.success && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4 text-center mb-6">
              <p className="text-green-800 font-semibold">
                ¡Registro exitoso! La adhesión ha sido registrada.
              </p>
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
                    Clasificación
                  </label>
                  <select
                    id="afiliacionTipo"
                    {...register("afiliacionTipo")}
                    className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
