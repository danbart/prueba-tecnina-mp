const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const users = [];
let uSeq = 1;

// TODO!: usuario por defecto para pruebas
(async () => {
    const hash = await bcrypt.hash('test123', 10);
    users.push(new Usuario({ id: uSeq++, nombre: 'Fiscal Demo', email: 'fiscal@mp.gt', passwordHash: hash, rol: 'fiscal' }));
})();

module.exports = {
    findByEmail: async email => users.find(u => u.email === email),
    create: async ({ nombre, email, password, rol }) => {
        const passwordHash = await bcrypt.hash(password, 10);
        const user = new Usuario({ id: uSeq++, nombre, email, passwordHash, rol });
        users.push(user);
        return user;
    }
};