let expedientes =
    loadExpedientes();

function createNewExpediente(
    expediente
) {
    
    console.log(
        "Recibido en createNewExpediente:",
        expediente
    );

    expedientes.push(
        expediente
    );

    saveExpedientes(
        expedientes
    );

    return expediente;

}

function getExpedientes() {
    
    return expedientes;

}

function findByOrder(
    codigoOrden
) {

    return expedientes.find(

        exp =>
            exp.codigoOrden ===
            codigoOrden

    );

}

function updateExpediente(
    expediente
) {

    const index =
        expedientes.findIndex(

            exp =>
                exp.expedienteId ===
                expediente.expedienteId

        );

    if (index < 0) {

        return false;

    }

    expedientes[index] =
        expediente;

    saveExpedientes(
        expedientes
    );

    return true;

}

function existsOrder(
    codigoOrden
) {

    return expedientes.some(

        exp =>
            exp.codigoOrden ===
            codigoOrden

    );

}

function anularExpediente(
    expedienteId,
    motivo = ""
) {

    const expediente =
        expedientes.find(

            exp =>
                exp.expedienteId ===
                expedienteId

        );

    if (!expediente) {

        return false;

    }

    expediente.estado =
        "ANULADO";

    expediente.fechaAnulacion =
        new Date()
            .toISOString()
            .split("T")[0];

    expediente.motivoAnulacion =
        motivo;

    saveExpedientes(
        expedientes
    );

    return true;

}