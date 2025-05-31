class Usuario {
    constructor({ id, nombre, email, passwordHash, rol = 'fiscal' }) {
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.passwordHash = passwordHash;
        this.rol = rol; // 'fiscal' | 'coordinador'
    }
}
module.exports = Usuario;