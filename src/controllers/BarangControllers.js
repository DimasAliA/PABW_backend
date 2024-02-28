const db = require('../models/index');
const Barang = db.Barang;
const Kategori = db.Kategori;

exports.tambahBarang = async (req, res) => {
    try {
        const { nama, harga, stok, kategori_id } = req.body;
        const user_id = req.user.userId;
        const barangBaru = await Barang.create({ user_id, nama, harga, stok, kategori_id, status: stok > 0 ? 'stok tersedia' : 'stok kosong' });
        res.status(201).json(barangBaru);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getBarang = async (req, res) => {
    try {
        let sortQuery = [['nama', 'ASC']];
        if (req.query.sort) {
            switch (req.query.sort) {
                case 'terbaru':
                    sortQuery = [['createdAt', 'DESC']];
                    break;
                case 'harga':
                    sortQuery = [['harga', req.query.order || 'ASC']];
                    break;
                case 'kategori':
                    sortQuery = [[{ model: Kategori, as: 'kategori' }, 'nama', req.query.order || 'ASC']];
                    break;
            }
        }

        const barang = await Barang.findAll({
            include: [Kategori],
            order: sortQuery
        });

        res.json(barang);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getBarangPenjual = async (req, res) => {
    try {
        const user_id = req.user.userId;

        const barangPenjual = await Barang.findAll({
            where: { user_id: user_id },
            include: [{
                model: Kategori,
            }]
        });

        if (!barangPenjual.length) {
            return res.status(404).json({ message: "Tidak ada barang yang ditemukan." });
        }

        const barangDijual = barangPenjual.map(item => {
            return {
                id: item.id,
                nama: item.nama,
                stok: item.stok,
                kategori: item.Kategori ? item.Kategori.nama : null
            };
        });

        res.status(200).json(barangDijual);
    } catch (error) {
        res.status(500).json({ message: error.message });
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

        await barang.destroy();
        // res.status(204).send();
        res.status(200).json({ message: 'Barang berhasil dihapus.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

