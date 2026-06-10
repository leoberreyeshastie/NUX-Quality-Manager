const STORAGE_KEYS = {

    EXPEDIENTES:
        "nux_quality_expedientes"

};

function saveExpedientes(data) {

    localStorage.setItem(

        STORAGE_KEYS.EXPEDIENTES,

        JSON.stringify(data)

    );

}

function loadExpedientes() {

    const data =
        localStorage.getItem(
            STORAGE_KEYS.EXPEDIENTES
        );

    return data
        ? JSON.parse(data)
        : [];

}

