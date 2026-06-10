let currentExpediente = null;

let evidenciasTemp = {};

function renderExpedientes() {

    return `

        <div class="panel">

            <h3>

                Expediente de Calidad

            </h3>

            <div class="form-grid">

                ${

                    currentExpediente &&
                    isReadOnlyExpediente()

                    ?

                    `

                        <div
                            class="alert-warning">

                            Expediente en modo
                            solo lectura

                        </div>

                    `

                    :

                    ""

                }
                <div>

                    <label>

                        Código Orden

                    </label>

                    <input
                        id="codigoOrden"
                        class="form-control">
                    <div id="orderInfoPanel"></div>
                </div>

                <div>

                    <label>

                        Cliente

                    </label>

                    <input
                        id="cliente"
                        class="form-control">

                </div>

                <div>

                    <label>

                        Producto

                    </label>

                    <input
                        id="producto"
                        class="form-control">

                </div>

                <div>

                    <label>

                        Cantidad Producida

                    </label>

                    <input
                        id="cantidadProducida"
                        type="number"
                        class="form-control">

                </div>

            </div>

            <hr>

            <div class="d-flex justify-content-between align-items-center">

                <h4>

                    Hallazgos

                </h4>

                <div>

                    <button
                        id="btnAddHallazgo"
                        class="btn btn-primary">

                        + Agregar Hallazgo

                    </button>

                    <button
                        id="btnSaveExpediente"
                        class="btn btn-success">

                        Guardar Expediente

                    </button>

                    <button

                        id="btnCerrarExpediente"
                        class="btn btn-success">

                        Cerrar Expediente

                    </button>

                </div>

            </div>

            <div id="hallazgosContainer">

            </div>

            <hr>

            <h4>

                Bitácora de Calidad

            </h4>

            <div
                id="timelineContainer">

                ${

                    currentExpediente

                        ?

                        renderHallazgosTimeline(
                            currentExpediente
                        )

                        :

                        ""

                }

            </div>
            
            <hr>

            <h4>

                Expedientes Registrados

            </h4>

            <select
                id="filtroEstado"
                class="form-select">

                <option value="">

                    Todos

                </option>

                <option value="ABIERTO">

                    Abiertos

                </option>

                <option value="EN_PROCESO">

                    En Proceso

                </option>

                <option value="CERRADO">

                    Cerrados

                </option>

                <option value="ANULADO">

                    Anulados

                </option>

            </select>
            </br>

            <div id="expedientesList">

            </div>

        </div>

    `;

}

function initExpedientes() {

    const btnAdd =
        document.getElementById(
            "btnAddHallazgo"
        );

    btnAdd.addEventListener(
        "click",
        addHallazgoCard
    );

    const btnSave =
        document.getElementById(
            "btnSaveExpediente"
        );

    btnSave.addEventListener(
        "click",
        saveExpediente
    );

    document
        .getElementById(
            "filtroEstado"
        )
        ?.addEventListener(
            "change",
            renderExpedientesList
        );

    renderExpedientesList();

}

let hallazgoCounter = 0;

function addHallazgoCard() {

    if (
        isReadOnlyExpediente()
    ) {

        alert(
            "Expediente en modo solo lectura"
        );

        return;

    }
    
    hallazgoCounter++;

    const container =
        document.getElementById(
            "hallazgosContainer"
        );

    container.insertAdjacentHTML(

        "beforeend",

        createHallazgoHTML(
            hallazgoCounter
        )

    );

}

function createHallazgoHTML(
    id,
    hallazgo = null
) {

    return `

        <div
            class="hallazgo-card"
            id="hallazgo-${id}">

            <div
                class="d-flex justify-content-between">

                <h5>

                    Hallazgo #${id}

                </h5>

                <button

                    class="btn btn-danger btn-sm"

                    onclick="
                        removeHallazgo(${id})
                    ">

                    Eliminar

                </button>

            </div>

            <div class="form-grid">

                <div>

                    <label>

                        Proceso

                    </label>

                    <select
                        id="proceso-${id}"
                        class="form-select">

                        ${CATALOGS.procesos
            .map(x => `

                                <option
                                    ${hallazgo?.proceso === x
                    ? "selected"
                    : ""
                }>

                                    ${x}

                                </option>

                            `)
            .join("")
        }

                    </select>

                </div>

                <div>

                    <label>

                        Defecto

                    </label>

                    <select
                        id="defecto-${id}"
                        class="form-select">

                        ${CATALOGS.defectos
            .map(x => `

                                <option
                                    ${hallazgo?.defecto === x
                    ? "selected"
                    : ""
                }>

                                    ${x}

                                </option>

                            `)
            .join("")
        }

                    </select>

                </div>

                <div>

                    <label>

                        Piezas Detectadas

                    </label>

                    <input
                        id="detectadas-${id}"
                        type="number"
                        class="form-control"
                        value="${hallazgo?.piezasDetectadas || 0
        }">

                </div>

                <div>

                    <label>

                        Acción Tomada

                    </label>

                    <select
                        id="accion-${id}"
                        class="form-select">

                        ${CATALOGS.acciones
            .map(x => `

                                <option
                                    ${hallazgo?.accionTomada === x
                    ? "selected"
                    : ""
                }>

                                    ${x}

                                </option>

                            `)
            .join("")
        }

                    </select>

                </div>

                <div>

                    <label>

                        Recuperadas

                    </label>

                    <input
                        id="recuperadas-${id}"
                        type="number"
                        class="form-control"
                        value="${hallazgo?.piezasRecuperadas || 0
        }">

                </div>

                <div>

                    <label>

                        Rechazadas

                    </label>

                    <input
                        id="rechazadas-${id}"
                        type="number"
                        class="form-control"
                        value="${hallazgo?.piezasRechazadas || 0
        }">

                </div>

            </div>

            <div class="mt-3">

                <label>

                    Observaciones

                </label>

                <textarea
                    id="observaciones-${id}"
                    rows="3"
                    class="form-control">${hallazgo?.observaciones || ""
        }
                </textarea>

            </div>

            <div class="mt-3">

            <h6>

                Evidencias Fotográficas

            </h6>

            <input
                type="file"
                accept="image/*"
                id="evidenciaFile-${id}">

            <input
                type="text"
                id="evidenciaDescripcion-${id}"
                class="form-control mt-2"
                placeholder="Descripción de la evidencia">

            <button
                type="button"
                class="btn btn-secondary mt-2"
                onclick="addEvidencia(${id})">

                Agregar Evidencia

            </button>

            <div
                id="evidenciasList-${id}"
                class="mt-3">

            </div>

        </div>

        </div>

    `;

}

function getHallazgosFromUI() {

    const hallazgos = [];

    document
        .querySelectorAll(
            ".hallazgo-card"
        )
        .forEach(card => {

            const id =
                card.id.replace(
                    "hallazgo-",
                    ""
                );

            const hallazgo =
                createHallazgo();

            hallazgo.proceso =
                document.getElementById(
                    `proceso-${id}`
                ).value;

            hallazgo.defecto =
                document.getElementById(
                    `defecto-${id}`
                ).value;

            hallazgo.accionTomada =
                document.getElementById(
                    `accion-${id}`
                ).value;

            hallazgo.piezasDetectadas =
                Number(

                    document.getElementById(
                        `detectadas-${id}`
                    ).value || 0

                );

            hallazgo.piezasRecuperadas =
                Number(

                    document.getElementById(
                        `recuperadas-${id}`
                    ).value || 0

                );

            hallazgo.piezasRechazadas =
                Number(

                    document.getElementById(
                        `rechazadas-${id}`
                    ).value || 0

                );

            hallazgo.observaciones =
                document.getElementById(
                    `observaciones-${id}`
                ).value.trim();

            hallazgo.evidencias =
                evidenciasTemp[id] || [];
            
            hallazgos.push(
                hallazgo
            );
            console.log("HALLAZGOS ENCONTRADOS");
            console.log(hallazgo);

        });

    return hallazgos;

}

function removeHallazgo(id) {
    if (
        isReadOnlyExpediente()
    ) {

        alert(
            "Expediente en modo solo lectura"
        );

        return;

    }

    document
        .getElementById(
            `hallazgo-${id}`
        )
        ?.remove();

}

function removeEvidencia(
    hallazgoId,
    index
) {
    if (
        isReadOnlyExpediente()
    ) {

        alert(
            "Expediente en modo solo lectura"
        );

        return;

    }

    evidenciasTemp[
        hallazgoId
    ].splice(
        index,
        1
    );

    renderEvidencias(
        hallazgoId
    );

}

function addEvidencia(
    hallazgoId
) {

    if (
        isReadOnlyExpediente()
    ) {

        alert(
            "Expediente en modo solo lectura"
        );

        return;

    }

    const fileInput =
        document.getElementById(
            `evidenciaFile-${hallazgoId}`
        );

    const file =
        fileInput.files[0];

    if (!file) {

        alert(
            "Seleccione una imagen"
        );

        return;

    }

    const reader =
        new FileReader();

    reader.onload =
        function(event) {

            const evidencia =
                createEvidencia();

            evidencia.nombreArchivo =
                file.name;

            evidencia.descripcion =
                document.getElementById(
                    `evidenciaDescripcion-${hallazgoId}`
                ).value.trim();

            evidencia.imagenBase64 =
                event.target.result;

            evidencia.tamanoKB =
                Math.round(
                    file.size / 1024
                );

            if (
                !evidenciasTemp[
                    hallazgoId
                ]
            ) {

                evidenciasTemp[
                    hallazgoId
                ] = [];

            }

            evidenciasTemp[
                hallazgoId
            ].push(
                evidencia
            );

            renderEvidencias(
                hallazgoId
            );

        };

    reader.readAsDataURL(
        file
    );

}

function renderEvidencias(
    hallazgoId
) {

    const container =
        document.getElementById(
            `evidenciasList-${hallazgoId}`
        );

    const evidencias =
        evidenciasTemp[
            hallazgoId
        ] || [];

    container.innerHTML =

    evidencias.map(

        (evidencia,index) => `

            <div
                class="evidencia-item">

                <img
                    src="${evidencia.imagenBase64}"
                    width="120">

                <div>

                    <strong>

                        ${evidencia.nombreArchivo}

                    </strong>

                    <br>

                    ${evidencia.descripcion}

                    <br>

                    ${evidencia.tamanoKB} KB

                    <br>

                    <button

                        class="btn btn-danger btn-sm"

                        onclick="
                            removeEvidencia(
                                ${hallazgoId},
                                ${index}
                            )
                        ">

                        Eliminar

                    </button>

                </div>

            </div>

        `

    ).join("");

}

function saveExpediente() {

    if (

        currentExpediente &&
        isReadOnlyExpediente()

    ) {

        alert(
            "Expediente cerrado"
        );

        return;

    }

    const codigoOrden =
        document.getElementById(
            "codigoOrden"
        ).value.trim();

    if (!codigoOrden) {

        alert(
            "Debe ingresar una orden"
        );

        return;

    }

    if (
        !currentExpediente &&
        existsOrder(
            codigoOrden
        )
    ) {

        alert(
            "La orden ya existe"
        );

        return;

    }

    const parsed =
        parseOrderCode(
            codigoOrden
        );

    if (
        !parsed ||
        !parsed.valid
    ) {

        alert(
            "Orden inválida"
        );

        return;

    }

    const expediente =
        currentExpediente
            ? currentExpediente
            : createExpediente();

    expediente.codigoOrden =
        codigoOrden;

    expediente.interna =
        parsed.interna;

    expediente.clienteNux =
        parsed.clienteNux;

    expediente.mesProduccion =
        parsed.mes;

    expediente.anioProduccion =
        parsed.anio;

    expediente.consecutivo =
        parsed.consecutivo;

    expediente.cliente =
        document.getElementById(
            "cliente"
        ).value.trim();

    expediente.producto =
        document.getElementById(
            "producto"
        ).value.trim();

    expediente.cantidadProducida =
        Number(

            document.getElementById(
                "cantidadProducida"
            ).value || 0

        );

    expediente.hallazgos =
        getHallazgosFromUI();

    if (
        expediente.hallazgos.length > 0
    ) {

        expediente.estado =
            "EN_PROCESO";

    }
    
    if (
        currentExpediente
    ) {
        updateExpediente(
            expediente
        );

    }
    else {
        createNewExpediente(
            expediente
        );
    }

    renderExpedientesList();

    if (
        currentExpediente
    ) {

        const timeline =
            document.getElementById(
                "timelineContainer"
            );

        if (timeline) {

            timeline.innerHTML =

                renderHallazgosTimeline(
                    expediente
                );

        }

    }

    alert(
        "Expediente guardado"
    );

    clearExpedienteForm();

}

function renderExpedientesList() {
    
    

    const container =
        document.getElementById(
            "expedientesList"
        );

    if (!container) {

        return;

    }

    const expedientes =
        getExpedientes().filter(

            exp =>
                exp.estado !==
                "ANULADO"

        );
    let expedientesFiltrados =
        expedientes;

    const estadoFiltro =
        document
            .getElementById(
                "filtroEstado"
            )
            ?.value;
    
    if (
        estadoFiltro
    ) {
        expedientesFiltrados =
            expedientes.filter(
                exp =>
                    exp.estado ===
                    estadoFiltro
            );

    }

    

    if (
        expedientesFiltrados.length === 0
    ) {

        container.innerHTML =

            "<p>No existen expedientes registrados.</p>";

        return;

    }

    container.innerHTML =

        expedientesFiltrados.map(exp => {

            const totalHallazgos =
                exp.hallazgos.length;

            const totalDefectos =
                exp.hallazgos.reduce(

                    (sum, hallazgo) =>

                        sum +
                        (hallazgo.piezasDetectadas || 0),

                    0

                );

            const porcentajeDefectos =

                exp.cantidadProducida > 0

                    ? (
                        (
                            totalDefectos /
                            exp.cantidadProducida
                        ) * 100
                    ).toFixed(2)

                    : "0.00";

            return `
            
            <div
                class="expediente-row">

                <div
                    class="expediente-header">

                    <strong>

                        ${exp.codigoOrden}

                    </strong>

                </div>

                <div>

                    Cliente:
                    ${exp.cliente || "-"}

                </div>

                <div>

                    Producto:
                    ${exp.producto || "-"}

                </div>

                <div>

                    <span

                        class="${
                            getEstadoClass(
                                exp.estado
                            )
                        }">
                        ${exp.estado}
                    
                    </span>

                </div>

                <div>

                    Hallazgos:
                    ${totalHallazgos}

                </div>

                <div>

                    Piezas Defectuosas:
                    ${totalDefectos}

                </div>

                <div>

                    % Defectos:
                    ${porcentajeDefectos}%

                </div>

                <div
                    class="expediente-actions">

                    <button
                        class="btn btn-primary btn-sm"
                        onclick="
                            event.stopPropagation();
                            openExpediente(
                                '${exp.expedienteId}'
                            );
                        ">

                        Abrir

                    </button>

                    <button
                        class="btn btn-warning btn-sm"
                        onclick="
                            event.stopPropagation();
                            anularExpedienteUI(
                                '${exp.expedienteId}'
                            );
                        ">

                        Anular

                    </button>

                </div>

            </div>

        `;

        }).join("");

}

function openExpediente(
    expedienteId
) {
    
    evidenciasTemp = {};

    const expediente =
        getExpedientes().find(

            exp =>
                exp.expedienteId ===
                expedienteId

        );

    currentExpediente =
        expediente;

    document.getElementById(
        "btnSaveExpediente"
    ).textContent =
        "Actualizar Expediente";

    if (!expediente) {

        return;

    }

    document.getElementById(
        "codigoOrden"
    ).value =
        expediente.codigoOrden;

    document.getElementById(
        "cliente"
    ).value =
        expediente.cliente;

    document.getElementById(
        "producto"
    ).value =
        expediente.producto;

    document.getElementById(
        "cantidadProducida"
    ).value =
        expediente.cantidadProducida;

    const container =
        document.getElementById(
            "hallazgosContainer"
        );

    container.innerHTML = "";

    hallazgoCounter = 0;

    if (
        expediente.hallazgos &&
        expediente.hallazgos.length
    ) {

        expediente.hallazgos.forEach(

            hallazgo => {

                hallazgoCounter++;

                container.insertAdjacentHTML(

                    "beforeend",

                    createHallazgoHTML(

                        hallazgoCounter,

                        hallazgo

                    )

                );

                if (
                    hallazgo.evidencias &&
                    hallazgo.evidencias.length
                ) {

                    evidenciasTemp[
                        hallazgoCounter
                    ] =
                        hallazgo.evidencias;

                    renderEvidencias(
                        hallazgoCounter
                    );

                }

            }

        );

    }

    alert(
        "Expediente cargado"
    );

}

function anularExpedienteUI(
    expedienteId
) {

    const confirmar =
        confirm(
            "¿Desea anular este expediente?"
        );

    if (!confirmar) {

        return;

    }

    anularExpediente(
        expedienteId
    );

    renderExpedientesList();

}

function clearExpedienteForm() {

    currentExpediente =
        null;

    hallazgoCounter = 0;

    evidenciasTemp = {};    

    document.getElementById(
        "codigoOrden"
    ).value = "";

    document.getElementById(
        "cliente"
    ).value = "";

    document.getElementById(
        "producto"
    ).value = "";

    document.getElementById(
        "cantidadProducida"
    ).value = "";

    document.getElementById(
        "hallazgosContainer"
    ).innerHTML = "";

    document.getElementById(
        "btnSaveExpediente"
    ).textContent =
        "Guardar Expediente";

}

function getEstadoClass(
    estado
) {

    switch(estado) {

        case "ABIERTO":

            return "estado-abierto";

        case "EN_PROCESO":

            return "estado-proceso";

        case "CERRADO":

            return "estado-cerrado";

        case "ANULADO":

            return "estado-anulado";

        default:

            return "";

    }

}

function closeExpediente() {

    if (
        !currentExpediente
    ) {

        return;

    }

    if (

        !confirm(

            "¿Cerrar expediente?"

        )

    ) {

        return;

    }

    currentExpediente.estado =
        "CERRADO";

    updateExpediente(
        currentExpediente
    );

    renderExpedientesList();

    alert(
        "Expediente cerrado"
    );

}

function isReadOnlyExpediente() {

    if (!currentExpediente) {

        return false;

    }

    return [

        "CERRADO",

        "ANULADO"

    ].includes(

        currentExpediente.estado

    );

}

function reopenExpediente() {

    if (
        !currentExpediente
    ) {

        return;

    }

    currentExpediente.estado =
        "EN_PROCESO";

    updateExpediente(
        currentExpediente
    );

    renderExpedientesList();

    alert(
        "Expediente reabierto"
    );

}

function renderHallazgosTimeline(
    expediente
) {

    if (
        !expediente ||
        !expediente.hallazgos ||
        expediente.hallazgos.length === 0
    ) {

        return `

            <div class="timeline-empty">

                Sin hallazgos registrados

            </div>

        `;

    }

    return expediente.hallazgos

        .sort(

            (a,b) =>

                new Date(
                    a.fechaDeteccion
                )

                -

                new Date(
                    b.fechaDeteccion
                )

        )

        .map(

            hallazgo => `

                <div
                    class="timeline-item">

                    <div
                        class="timeline-date">

                        ${hallazgo.fechaDeteccion}

                    </div>

                    <div
                        class="timeline-content">

                        <strong>

                            ${hallazgo.proceso}

                        </strong>

                        <br>

                        ${hallazgo.defecto}

                        <br>

                        Detectadas:
                        ${hallazgo.piezasDetectadas}

                        <br>

                        Acción:
                        ${hallazgo.accionTomada}

                    </div>

                </div>

            `

        )

        .join("");

}