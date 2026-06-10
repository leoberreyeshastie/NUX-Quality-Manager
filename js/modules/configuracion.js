function renderConfiguracion() {

    const test1 =
        parseOrderCode(
            "IN06-025-26"
        );

    const test2 =
        parseOrderCode(
            "N03-001-26"
        );

    const test3 =
        parseOrderCode(
            "04-120-25"
        );

    return `

        <div class="panel">

            <h3>
                Pruebas Order Parser
            </h3>

            <pre>

${JSON.stringify(
    test1,
    null,
    2
)}

            </pre>

            <hr>

            <pre>

${JSON.stringify(
    test2,
    null,
    2
)}

            </pre>

            <hr>

            <pre>

${JSON.stringify(
    test3,
    null,
    2
)}

            </pre>

        </div>

    `;

}