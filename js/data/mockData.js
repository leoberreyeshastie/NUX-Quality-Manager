const MOCK_DATA = {

    dashboard: {

        kpis: {

            ordenes: 245,

            hallazgos: 38,

            piezasNC: 1250,

            porcentajeNC: 0.87

        },

        tendenciaMensual: [

            12,
            18,
            9,
            25,
            14,
            38

        ],

        pareto: [

            {
                defecto: "Error Registro",
                cantidad: 25
            },

            {
                defecto: "Mancha",
                cantidad: 18
            },

            {
                defecto: "Corte",
                cantidad: 12
            },

            {
                defecto: "Tinta",
                cantidad: 8
            },

            {
                defecto: "Otros",
                cantidad: 4
            }

        ],

        ultimosHallazgos: [

            {
                orden: "OT-1258",
                defecto: "Error Registro",
                piezas: 120
            },

            {
                orden: "OT-1259",
                defecto: "Mancha",
                piezas: 80
            },

            {
                orden: "OT-1260",
                defecto: "Corte",
                piezas: 45
            }

        ]

    }

};