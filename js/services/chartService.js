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

                    data: [
                        12,
                        18,
                        9,
                        25,
                        14,
                        38
                    ]

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

            labels: [

                "Registro",
                "Mancha",
                "Corte",
                "Tinta",
                "Otros"

            ],

            datasets: [

                {

                    label: "Cantidad",

                    data: [

                        25,
                        18,
                        12,
                        8,
                        4

                    ]

                }

            ]

        }

    });

}