const Barang = require('../models/barang');
const User = require('../models/user');

exports.tambahBarang = async (req, res) => {
    try {
        const { nama, harga, stok, kategori_id } = req.body;
        const user_id = req.user.userId;

        if(req.user.role !== 'pengguna' && req.user.role !== 'penitip') {
            console.log(req.user.role)
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk menambah barang.' });
        }

        const barangBaru = await Barang.create({ user_id, nama, harga, stok, kategori_id, status: stok > 0 ? 'stok tersedia' : 'stok kosong' });
        res.status(201).json(barangBaru);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBarang = async (req, res) => {
    try {
        const barang = await Barang.findAll();
        res.json(barang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBarang = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, harga, stok, kategori_id } = req.body;
        const user_id = req.user.userId;

        const barang = await Barang.findByPk(id);
        if (!barang) {
            return res.status(404).json({ message: 'Barang tidak ditemukan.' });
        }

        if (barang.user_id !== user_id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk mengupdate barang ini.' });
        }

        barang.nama = nama;
        barang.harga = harga;
        barang.stok = stok;
        barang.kategori_id = kategori_id;
        barang.status = stok > 0 ? 'stok tersedia' : 'stok kosong';
        
        await barang.save();
        res.json(barang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.hapusBarang = async (req, res) => {
    try {
        const { id } = req.params;
        const user_id = req.user.userId;

        const barang = await Barang.findByPk(id);
        if (!barang) {
            return res.status(404).json({ message: 'Barang tidak ditemukan.' });
        }

        if (barang.user_id !== user_id && req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Anda tidak memiliki izin untuk menghapus barang ini.' });
        }

        await barang.destroy();
        // res.status(204).send();
        res.status(200).json({ message: 'Barang berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

