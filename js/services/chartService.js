function createTrendChart() {

    const ctx =
        document.getElementById(
            "trendChart"
        );

    if (!ctx) return;

    new Chart(ctx, {

        type: "line",

        data: {

            labels: [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun"
            ],

            datasets: [

                {

                    label: "Hallazgos",

                    data:
                        MOCK_DATA.dashboard
                            .tendenciaMensual

                }

            ]

        }

    });

}

function createParetoChart() {

    const ctx =
        document.getElementById(
            "paretoChart"
        );

    if (!ctx) return;

    new Chart(ctx, {

        type: "bar",

        data: {

            labels:

                MOCK_DATA.dashboard.pareto
                    .map(x => x.defecto),

            datasets: [

                {

                    label: "Cantidad",

                    data:

                        MOCK_DATA.dashboard.pareto
                            .map(x => x.cantidad)

                }

            ]

        }

    });

}

function getMonthlyMetrics(
    mes,
    anio
) {

    const expedientes =
        getExpedientes()
            .filter(

                exp =>

                    exp.estado !==
                        "ANULADO"

                    &&

                    exp.mesProduccion ===
                        mes

                    &&

                    exp.anioProduccion ===
                        anio

            );

    let piezasProduccion = 0;

    let piezasDetectadas = 0;

    let piezasRecuperadas = 0;

    let piezasRechazadas = 0;

    expedientes.forEach(

        expediente => {

            piezasProduccion +=
                expediente.cantidadProducida || 0;

            expediente.hallazgos
                .forEach(

                    hallazgo => {

                        piezasDetectadas +=
                            hallazgo.piezasDetectadas || 0;

                        piezasRecuperadas +=
                            hallazgo.piezasRecuperadas || 0;

                        piezasRechazadas +=
                            hallazgo.piezasRechazadas || 0;

                    }

                );

        }

    );

    return {

        totalOrdenes:
            expedientes.length,

        piezasProduccion,

        piezasDetectadas,

        piezasRecuperadas,

        piezasRechazadas

    };

}

function calculateKPIs(
    metrics
) {

    return {

        porcentajeDefectos:

            metrics.piezasProduccion

                ? (

                    metrics.piezasDetectadas
                    /
                    metrics.piezasProduccion

                ) * 100

                : 0,

        porcentajeRecuperacion:

            metrics.piezasDetectadas

                ? (

                    metrics.piezasRecuperadas
                    /
                    metrics.piezasDetectadas

                ) * 100

                : 0,

        porcentajeRechazo:

            metrics.piezasDetectadas

                ? (

                    metrics.piezasRechazadas
                    /
                    metrics.piezasDetectadas

                ) * 100

                : 0

    };

}

function getParetoDefectos(
    mes,
    anio
) {

    const resumen = {};

    getExpedientes()

        .filter(

            exp =>

                exp.estado !==
                    "ANULADO"

                &&

                exp.mesProduccion ===
                    mes

                &&

                exp.anioProduccion ===
                    anio

        )

        .forEach(

            expediente => {

                expediente.hallazgos
                    .forEach(

                        hallazgo => {

                            const defecto =
                                hallazgo.defecto;

                            if (
                                !resumen[
                                    defecto
                                ]
                            ) {

                                resumen[
                                    defecto
                                ] = 0;

                            }

                            resumen[
                                defecto
                            ] +=

                                hallazgo
                                    .piezasDetectadas || 0;

                        }

                    );

            }

        );

    return Object.entries(
        resumen
    )

    .map(

        ([defecto,total]) => ({

            defecto,

            total

        })

    )

    .sort(

        (a,b) =>

            b.total -
            a.total

    );

}

function getParetoProcesos(
    mes,
    anio
) {

    const resumen = {};

    getExpedientes()

        .filter(

            exp =>

                exp.estado !==
                    "ANULADO"

                &&

                exp.mesProduccion ===
                    mes

                &&

                exp.anioProduccion ===
                    anio

        )

        .forEach(

            expediente => {

                expediente.hallazgos
                    .forEach(

                        hallazgo => {

                            const proceso =
                                hallazgo.proceso;

                            if (
                                !resumen[
                                    proceso
                                ]
                            ) {

                                resumen[
                                    proceso
                                ] = 0;

                            }

                            resumen[
                                proceso
                            ] +=

                                hallazgo
                                    .piezasDetectadas || 0;

                        }

                    );

            }

        );

    return Object.entries(
        resumen
    )

    .map(

        ([proceso,total]) => ({

            proceso,

            total

        })

    )

    .sort(

        (a,b) =>

            b.total -
            a.total

    );

}

function getTopOrders(
    mes,
    anio,
    limit = 10
) {

    const resultado = [];

    getExpedientes()

        .filter(

            exp =>

                exp.estado !==
                    "ANULADO"

                &&

                exp.mesProduccion ===
                    mes

                &&

                exp.anioProduccion ===
                    anio

        )

        .forEach(

            expediente => {

                let totalIncidencias = 0;

                expediente.hallazgos
                    .forEach(

                        hallazgo => {

                            totalIncidencias +=

                                hallazgo
                                    .piezasDetectadas || 0;

                        }

                    );

                resultado.push({

                    expedienteId:
                        expediente.expedienteId,

                    codigoOrden:
                        expediente.codigoOrden,

                    cliente:
                        expediente.cliente,

                    producto:
                        expediente.producto,

                    incidencias:
                        totalIncidencias

                });

            }

        );

    return resultado

        .sort(

            (a,b) =>

                b.incidencias -
                a.incidencias

        )

        .slice(
            0,
            limit
        );

}

function getQualityIndexByOrder(
    mes,
    anio
) {

    const resultado = [];

    getExpedientes()

        .filter(

            exp =>

                exp.estado !==
                    "ANULADO"

                &&

                exp.mesProduccion ===
                    mes

                &&

                exp.anioProduccion ===
                    anio

        )

        .forEach(

            expediente => {

                let defectos = 0;

                expediente.hallazgos
                    .forEach(

                        hallazgo => {

                            defectos +=

                                hallazgo
                                    .piezasDetectadas || 0;

                        }

                    );

                const produccion =

                    expediente
                        .cantidadProducida || 0;

                const calidad =

                    produccion > 0

                        ?

                        (

                            (
                                produccion -
                                defectos
                            )

                            /

                            produccion

                        ) * 100

                        :

                        0;

                resultado.push({

                    codigoOrden:
                        expediente.codigoOrden,

                    cliente:
                        expediente.cliente,

                    producto:
                        expediente.producto,

                    produccion,

                    defectos,

                    calidad

                });

            }

        );

    return resultado;

}

function getBestOrders(
    mes,
    anio,
    limit = 10
) {

    return getQualityIndexByOrder(
        mes,
        anio
    )

    .sort(

        (a,b) =>

            b.calidad -
            a.calidad

    )

    .slice(
        0,
        limit
    );

}

function getWorstOrders(
    mes,
    anio,
    limit = 10
) {

    return getQualityIndexByOrder(
        mes,
        anio
    )

    .sort(

        (a,b) =>

            a.calidad -
            b.calidad

    )

    .slice(
        0,
        limit
    );

}

function getRecoveryIndexByOrder(
    mes,
    anio
) {

    const resultado = [];

    getExpedientes()

        .filter(

            exp =>

                exp.estado !== "ANULADO"

                &&

                exp.mesProduccion === mes

                &&

                exp.anioProduccion === anio

        )

        .forEach(

            expediente => {

                let detectadas = 0;

                let recuperadas = 0;

                let rechazadas = 0;

                expediente.hallazgos
                    .forEach(

                        hallazgo => {

                            detectadas +=

                                hallazgo
                                    .piezasDetectadas || 0;

                            recuperadas +=

                                hallazgo
                                    .piezasRecuperadas || 0;

                            rechazadas +=

                                hallazgo
                                    .piezasRechazadas || 0;

                        }

                    );

                const porcentajeRecuperacion =

                    detectadas > 0

                        ?

                        (
                            recuperadas
                            /
                            detectadas
                        ) * 100

                        :

                        0;

                resultado.push({

                    codigoOrden:
                        expediente.codigoOrden,

                    cliente:
                        expediente.cliente,

                    producto:
                        expediente.producto,

                    detectadas,

                    recuperadas,

                    rechazadas,

                    porcentajeRecuperacion

                });

            }

        );

    return resultado;

}

function getBestRecoveryOrders(
    mes,
    anio,
    limit = 10
) {

    return getRecoveryIndexByOrder(
        mes,
        anio
    )

    .sort(

        (a,b) =>

            b.porcentajeRecuperacion -
            a.porcentajeRecuperacion

    )

    .slice(
        0,
        limit
    );

}

function getWorstRecoveryOrders(
    mes,
    anio,
    limit = 10
) {

    return getRecoveryIndexByOrder(
        mes,
        anio
    )

    .sort(

        (a,b) =>

            a.porcentajeRecuperacion -
            b.porcentajeRecuperacion

    )

    .slice(
        0,
        limit
    );

}