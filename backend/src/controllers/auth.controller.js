const authService = require('../services/auth.service');

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const data = await authService.login(email, password);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.refresh = async (req, res) => {
    try {
        const { refreshToken } = req.body;
        const data = await authService.refresh(refreshToken);
        res.json(data);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};