const Transaksi = require('../models/transaksi');
const Barang = require('../models/barang');

exports.buatTransaksi = async (req, res) => {
    const { barang_id, jumlah, metode_pengiriman, alamat_pengiriman, lokasi_pengambilan, batas_waktu_pengambilan } = req.body;

    try {
        const barang = await Barang.findByPk(barang_id);

        if (!barang || barang.stok < jumlah) {
            return res.status(400).json({ message: 'Stok barang tidak mencukupi' });
        }

        barang.stok -= jumlah;
        await barang.save();

        const transaksi = await Transaksi.create({
            user_id: req.user.userId,
            barang_id,
            jumlah,
            total_harga: barang.harga * jumlah,
            status: 'menunggu pegawai',
            metode_pengiriman,
            alamat_pengiriman,
            lokasi_pengambilan,
            batas_waktu_pengambilan
        });

        res.status(201).json(transaksi);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
