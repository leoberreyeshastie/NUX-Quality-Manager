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