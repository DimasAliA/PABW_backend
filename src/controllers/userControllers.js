const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../models/index');
const User = db.User;

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

exports.getUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findByPk(userId);
        
        if (!user) {
            return res.status(404).json({ message: "User Tidak Ditemukan" });
        }
        
        res.status(200).json({
            id: user.id,
            nama: user.nama,
            email: user.email,
            status_keanggotaan: user.status_keanggotaan,
            saldo_iuran_wajib: user.saldo_iuran_wajib,
            saldo_iuran_sukarela: user.saldo_iuran_sukarela,
            saldo_penjualan: user.saldo_penjualan,
            role: user.role
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.userId;
        const { nama, email, password } = req.body;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "User Tidak Ditemukan" });
        }

        user.nama = nama || user.nama;
        user.email = email || user.email;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password_hash = hashedPassword;
        }

        await user.save();

        res.status(200).json({ message: "Profile updated successfully." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


