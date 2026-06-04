function renderDashboard() {

    return `

        <div class="dashboard">

            <div class="kpi-grid">

                <div class="kpi-card">

                    <div class="kpi-label">
                        Órdenes Procesadas
                    </div>

                    <div class="kpi-value">
                        245
                    </div>

                </div>

                <div class="kpi-card">

                    <div class="kpi-label">
                        Hallazgos
                    </div>

                    <div class="kpi-value">
                        38
                    </div>

                </div>

                <div class="kpi-card">

                    <div class="kpi-label">
                        Piezas NC
                    </div>

                    <div class="kpi-value">
                        1,250
                    </div>

                </div>

                <div class="kpi-card">

                    <div class="kpi-label">
                        % NC
                    </div>

                    <div class="kpi-value danger">
                        0.87%
                    </div>

                </div>

            </div>

            <div class="dashboard-row">

                <div class="panel">

                    <h4>
                        Tendencia Mensual
                    </h4>

                    <canvas id="trendChart"></canvas>

                </div>

            </div>

            <div class="dashboard-row two-columns">

                <div class="panel">

                    <h4>
                        Pareto de Defectos
                    </h4>

                    <canvas id="paretoChart"></canvas>

                </div>

                <div class="panel">

                    <h4>
                        Últimos Hallazgos
                    </h4>

                    <table class="table">

                        <thead>

                            <tr>

                                <th>Orden</th>
                                <th>Defecto</th>
                                <th>Piezas</th>

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>OT-1258</td>

                                <td>Error Registro</td>

                                <td>120</td>

                            </tr>

                            <tr>

                                <td>OT-1259</td>

                                <td>Mancha</td>

                                <td>80</td>

                            </tr>

                            <tr>

                                <td>OT-1260</td>

                                <td>Corte</td>

                                <td>45</td>

                            </tr>

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    `;

}

function initDashboard() {

    createTrendChart();

    createParetoChart();

}