/**
 * Expediente de Calidad
 */
function createExpediente() {

    return {

        expedienteId: generateId("EXP"),

        codigoOrden: "",

        interna: false,

        clienteNux: false,

        mesProduccion: null,

        anioProduccion: null,

        consecutivo: null,

        fechaCreacion: new Date()
            .toISOString()
            .split("T")[0],

        cliente: "",

        producto: "",

        cantidadProducida: 0,

        estado: "ABIERTO",

        fechaAnulacion: null,

        motivoAnulacion: "",

        hallazgos: []

    };

}

/**
 * Hallazgo
 */
function createHallazgo() {

    return {

        hallazgoId: generateId("HAL"),

        fechaDeteccion: new Date()
            .toISOString()
            .split("T")[0],

        proceso: "",

        defecto: "",

        categoria:
            "PRODUCTO_NO_CONFORME",

        piezasDetectadas: 0,

        accionTomada: "",

        piezasRecuperadas: 0,

        piezasRechazadas: 0,

        responsable: "",

        observaciones: "",

        estado: "ABIERTO",

        evidencias: []

    };

}

/**
 * Evidencia
 */
function createEvidencia() {

    return {

        evidenciaId: generateId("EVD"),

        nombreArchivo: "",

        descripcion: "",

        imagenBase64: "",

        tamanoKB: 0,

        fechaCaptura: new Date()
            .toISOString()
            .split("T")[0]

    };

}