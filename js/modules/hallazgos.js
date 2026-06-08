function renderHallazgos() {

    return `

        <div class="panel">

            <h3>
                Registro de Hallazgo
            </h3>

            <div class="form-grid">

                <div>

                    <label>Fecha</label>

                    <input
                        type="date"
                        class="form-control">

                </div>

                <div>

                    <label>Orden</label>

                    <input
                        type="text"
                        class="form-control"
                        placeholder="N00-000-00">

                </div>

                <div>

                    <label>Cliente</label>

                    <input
                        type="text"
                        class="form-control">

                </div>

                <div>

                    <label>Producto</label>

                    <input
                        type="text"
                        class="form-control">

                </div>

                <div>

                    <label>Proceso</label>

                    <select
                        class="form-select">

                        ${CATALOGS.procesos
                            .map(item => `
                                <option>
                                    ${item}
                                </option>
                            `)
                            .join("")
                        }

                    </select>

                </div>

                <div>

                    <label>Tipo de Defecto</label>

                    <select
                        class="form-select">

                        ${CATALOGS.defectos
                            .map(item => `
                                <option>
                                    ${item}
                                </option>
                            `)
                            .join("")
                        }

                    </select>

                </div>

                <div>

                    <label>Categoría</label>

                    <select
                        class="form-select">

                        ${CATALOGS.categorias
                            .map(item => `
                                <option>
                                    ${item}
                                </option>
                            `)
                            .join("")
                        }

                    </select>

                </div>

                <div>

                    <label>
                        Piezas Afectadas
                    </label>

                    <input
                        type="number"
                        class="form-control">

                </div>

                <div>

                    <label>
                        Piezas Producidas
                    </label>

                    <input
                        type="number"
                        class="form-control">

                </div>

            </div>

            <div class="mt-3">

                <label>
                    Observaciones
                </label>

                <textarea
                    rows="4"
                    class="form-control">
                </textarea>

            </div>

            <div class="mt-3">

                <label>
                    Evidencia
                </label>

                <input
                    type="file"
                    class="form-control">

            </div>

            <div class="mt-4">

                <button
                    class="btn btn-primary">

                    Guardar Hallazgo

                </button>

            </div>

        </div>

    `;

}