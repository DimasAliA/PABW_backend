const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    try {
        const { nama, email, password, status_keanggotaan, role } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!['pengguna', 'pegawai', 'penitip', 'admin'].includes(role)) {
            return res.status(400).json({ error: 'Role tidak valid' });
        }

        const newUser = await User.create({
            nama,
            email,
            password_hash: hashedPassword,
            status_keanggotaan,
            saldo_iuran_wajib: 0,
            saldo_iuran_sukarela: 0,
            saldo_penjualan: 0,
            role
        });

        res.status(201).json({
            id: newUser.id,
            nama: newUser.nama,
            email: newUser.email,
            status_keanggotaan: newUser.status_keanggotaan,
            role: newUser.role
        });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isValid = await bcrypt.compare(password, user.password_hash);

        if (!isValid) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
