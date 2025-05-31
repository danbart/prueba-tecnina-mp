class Caso {
    constructor({ id, titulo, estado = 'pendiente', fiscalId, fechaCreacion = new Date() }) {
        this.id = id;
        this.titulo = titulo;
        this.estado = estado;
        this.fiscalId = fiscalId;
        this.fechaCreacion = fechaCreacion;
    }
}

module.exports = Caso;