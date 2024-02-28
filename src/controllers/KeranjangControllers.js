const db = require('../models/index');
const Keranjang = db.Keranjang;

exports.tambahItemKeKeranjang = async (req, res) => {
    const barang_id = req.body.barang_id;
    const jumlah = req.body.jumlah;
    const user_id = req.user.userId;

    try {
        const itemExist = await Keranjang.findOne({ where: { user_id, barang_id }});

        if (itemExist) {
            itemExist.jumlah += jumlah;
            await itemExist.save();
        } else {
            await Keranjang.create({ user_id, barang_id, jumlah });
        }

        res.status(200).json({ message: 'Barang berhasil ditambahkan ke keranjang' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
