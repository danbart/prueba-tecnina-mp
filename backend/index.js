const { listen } = require('./src/app');

const PORT = process.env.PORT || 3000;

listen(PORT, () => {
    console.log(`Servidor backend corriendo en puerto ${PORT}`);
});
