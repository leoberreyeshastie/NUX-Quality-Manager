function renderDashboard() {

    const metrics =
        getDashboardMetrics();

    return `

        <div class="dashboard-grid">

            <div class="kpi-card-modern kpi-primary">

                <h3>

                    ${metrics.abiertos}

                </h3>

                <p>

                    Expedientes Activos

                </p>

            </div>

            <div class="kpi-card-modern">

                <h3>

                    ${metrics.cerrados}

                </h3>

                <p>

                    Expedientes Cerrados

                </p>

            </div>

            <div class="kpi-card-modern">

                <h3>

                    ${metrics.piezasProducidas}

                </h3>

                <p>

                    Piezas Inspeccionadas

                </p>

            </div>

            <div class="kpi-card-modern">

                <h3>

                    ${metrics.defectos}

                </h3>

                <p>

                    Hallazgos Detectados

                </p>

            </div>

            <div class="kpi-card-modern">

                <h3>

                    ${metrics.calidad.toFixed(2)}%

                </h3>

                <p>

                    Calidad General

                </p>

            </div>

            <div class="kpi-card-modern">

                <h3>

                    ${metrics.recuperacion.toFixed(2)}%

                </h3>

                <p>

                    Recuperación

                </p>

            </div>

        </div>

    `;

}

function initDashboard() {

    createTrendChart();

    createParetoChart();

}

function getDashboardMetrics() {

    const expedientes =
        getExpedientes()
            .filter(

                exp =>
                    exp.estado !==
                    "ANULADO"

            );

    let abiertos = 0;
    let cerrados = 0;

    let piezasProducidas = 0;

    let defectos = 0;

    let recuperadas = 0;

    expedientes.forEach(

        expediente => {

            if (
                expediente.estado ===
                "ABIERTO"
            ) {

                abiertos++;

            }

            if (
                expediente.estado ===
                "EN_PROCESO"
            ) {

                abiertos++;

            }

            if (
                expediente.estado ===
                "CERRADO"
            ) {

                cerrados++;

            }

            piezasProducidas +=

                expediente
                    .cantidadProducida || 0;

            expediente.hallazgos
                .forEach(

                    hallazgo => {

                        defectos +=

                            hallazgo
                                .piezasDetectadas || 0;

                        recuperadas +=

                            hallazgo
                                .piezasRecuperadas || 0;

                    }

                );

        }

    );

    const calidad =

        piezasProducidas > 0

            ?

            (

                (
                    piezasProducidas -
                    defectos
                )

                /

                piezasProducidas

            ) * 100

            :

            0;

    const recuperacion =

        defectos > 0

            ?

            (

                recuperadas
                /
                defectos

            ) * 100

            :

            0;

    return {

        abiertos,

        cerrados,

        piezasProducidas,

        defectos,

        calidad,

        recuperacion

    };

}