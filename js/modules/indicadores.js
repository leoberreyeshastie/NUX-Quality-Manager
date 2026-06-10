function renderIndicadores() {

    return `

        <div class="panel">

            <h3>

                Indicadores de Calidad

            </h3>

            <div class="form-grid">

                <div>

                    <label>

                        Mes

                    </label>

                    <select
                        id="mesIndicador"
                        class="form-select">

                        ${Object.entries(MONTHS)

                            .map(

                                ([id,nombre]) =>

                                    `<option value="${id}">
                                        ${nombre}
                                    </option>`

                            )

                            .join("")
                        }

                    </select>

                </div>

                <div>

                    <label>

                        Año

                    </label>

                    <input
                        id="anioIndicador"
                        type="number"
                        value="2026"
                        class="form-control">

                </div>

            </div>

            <button

                id="btnCalcularIndicadores"

                class="btn btn-primary mt-3">

                Calcular

            </button>

            <div
                id="indicadoresResultado"
                class="mt-4">

            </div>

        </div>

    `;

}

function initIndicadores() {

    document
        .getElementById(
            "btnCalcularIndicadores"
        )
        .addEventListener(
            "click",
            calculateIndicators
        );

}

function calculateIndicators() {

    const mes =
        Number(

            document.getElementById(
                "mesIndicador"
            ).value

        );

    const anio =
        Number(

            document.getElementById(
                "anioIndicador"
            ).value

        );

    const metrics =
        getMonthlyMetrics(
            mes,
            anio
        );

    const kpis =
        calculateKPIs(
            metrics
        );
    
    const paretoDefectos =
        getParetoDefectos(
            mes,
            anio
        );

    const paretoProcesos =
        getParetoProcesos(
            mes,
            anio
        );

    const topOrders =
        getTopOrders(
            mes,
            anio
        );

    const bestOrders =
        getBestOrders(
            mes,
            anio
        );

    const worstOrders =
        getWorstOrders(
            mes,
            anio
        );

    const bestRecoveryOrders =
        getBestRecoveryOrders(
            mes,
            anio
        );

    const worstRecoveryOrders =
        getWorstRecoveryOrders(
            mes,
            anio
        );

    renderIndicatorsResult(
        metrics,
        kpis,
        paretoDefectos,
        paretoProcesos,
        topOrders,
        bestOrders,
        worstOrders,
        bestRecoveryOrders,
        worstRecoveryOrders
    );

}

function renderIndicatorsResult(
    metrics,
    kpis,
    paretoDefectos,
    paretoProcesos,
    topOrders,
    bestOrders,
    worstOrders,
    bestRecoveryOrders,
    worstRecoveryOrders
) {

    document.getElementById(
        "indicadoresResultado"
    ).innerHTML = `

        <div class="panel">

            <h4>

                Resumen Mensual

            </h4>

            <div class="stats-grid">

                <div class="stat-card">

                    <strong>

                        Órdenes

                    </strong>

                    <br>

                    ${metrics.totalOrdenes}

                </div>

                <div class="stat-card">

                    <strong>

                        Producción

                    </strong>

                    <br>

                    ${metrics.piezasProduccion}

                </div>

                <div class="stat-card">

                    <strong>

                        Detectadas

                    </strong>

                    <br>

                    ${metrics.piezasDetectadas}

                </div>

                <div class="stat-card">

                    <strong>

                        Recuperadas

                    </strong>

                    <br>

                    ${metrics.piezasRecuperadas}

                </div>

                <div class="stat-card">

                    <strong>

                        Rechazadas

                    </strong>

                    <br>

                    ${metrics.piezasRechazadas}

                </div>

            </div>

            <hr>

            <div class="stats-grid">

                <div class="stat-card">

                    <strong>

                        % Defectos

                    </strong>

                    <br>

                    ${kpis
                        .porcentajeDefectos
                        .toFixed(2)}%

                </div>

                <div class="stat-card">

                    <strong>

                        % Recuperación

                    </strong>

                    <br>

                    ${kpis
                        .porcentajeRecuperacion
                        .toFixed(2)}%

                </div>

                <div class="stat-card">

                    <strong>

                        % Rechazo

                    </strong>

                    <br>

                    ${kpis
                        .porcentajeRechazo
                        .toFixed(2)}%

                </div>

            </div>

            <hr>

            <h4>

                Pareto de Defectos

            </h4>

            <table class="table">

                <thead>

                    <tr>

                        <th>

                            Defecto

                        </th>

                        <th>

                            Piezas

                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${paretoDefectos.map(

                        item => `

                            <tr>

                                <td>

                                    ${item.defecto}

                                </td>

                                <td>

                                    ${item.total}

                                </td>

                            </tr>

                        `

                    ).join("")}

                </tbody>

            </table>

            <hr>

            <h4>

                Pareto por Proceso

            </h4>

            <table class="table">

                <thead>

                    <tr>

                        <th>

                            Proceso

                        </th>

                        <th>

                            Piezas

                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${paretoProcesos.map(

                        item => `

                            <tr>

                                <td>

                                    ${item.proceso}

                                </td>

                                <td>

                                    ${item.total}

                                </td>

                            </tr>

                        `

                    ).join("")}

                </tbody>

            </table>

            <hr>

            <h4>

                Top Órdenes con Más Incidencias

            </h4>

            <table class="table">

                <thead>

                    <tr>

                        <th>

                            Orden

                        </th>

                        <th>

                            Cliente

                        </th>

                        <th>

                            Producto

                        </th>

                        <th>

                            Incidencias

                        </th>

                    </tr>

                </thead>

                <tbody>

                    ${topOrders.map(

                        item => `

                            <tr>

                                <td>

                                    ${item.codigoOrden}

                                </td>

                                <td>

                                    ${item.cliente}

                                </td>

                                <td>

                                    ${item.producto}

                                </td>

                                <td>

                                    ${item.incidencias}

                                </td>

                            </tr>

                        `

                    ).join("")}

                </tbody>

            </table>

            <hr>

            <h4>

                Top Calidad

            </h4>

            <table class="table">

                <thead>

                    <tr>

                        <th>Orden</th>

                        <th>Calidad</th>

                    </tr>

                </thead>

                <tbody>

                    ${bestOrders.map(

                        item => `

                            <tr>

                                <td>

                                    ${item.codigoOrden}

                                </td>

                                <td>

                                    ${item.calidad.toFixed(2)}%

                                </td>

                            </tr>

                        `

                    ).join("")}

                </tbody>

            </table>

            <hr>

            <h4>

                Órdenes con Menor Calidad

            </h4>

            <table class="table">

                <thead>

                    <tr>

                        <th>Orden</th>

                        <th>Calidad</th>

                    </tr>

                </thead>

                <tbody>

                    ${worstOrders.map(

                        item => `

                            <tr>

                                <td>

                                    ${item.codigoOrden}

                                </td>

                                <td>

                                    ${item.calidad.toFixed(2)}%

                                </td>

                            </tr>

                        `

                    ).join("")}

                </tbody>

            </table>

            <hr>

            <h4>

                Órdenes con Mejor Recuperación

            </h4>

            <table class="table">

                <thead>

                    <tr>

                        <th>Orden</th>

                        <th>Recuperación</th>

                    </tr>

                </thead>

                <tbody>

                    ${bestRecoveryOrders.map(

                        item => `

                            <tr>

                                <td>

                                    ${item.codigoOrden}

                                </td>

                                <td>

                                    ${item.porcentajeRecuperacion
                                        .toFixed(2)}%

                                </td>

                            </tr>

                        `

                    ).join("")}

                </tbody>

            </table>

            <hr>

            <h4>

                Órdenes con Menor Recuperación

            </h4>

            <table class="table">

                <thead>

                    <tr>

                        <th>Orden</th>

                        <th>Recuperación</th>

                    </tr>

                </thead>

                <tbody>

                    ${worstRecoveryOrders.map(

                        item => `

                            <tr>

                                <td>

                                    ${item.codigoOrden}

                                </td>

                                <td>

                                    ${item.porcentajeRecuperacion
                                        .toFixed(2)}%

                                </td>

                            </tr>

                        `

                    ).join("")}

                </tbody>

            </table>

        </div>

    `;

}

