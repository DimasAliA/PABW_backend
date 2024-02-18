const Transaksi = require('../models/transaksi');
const Barang = require('../models/barang');
const Keranjang = require('../models/keranjang');

exports.buatTransaksi = async (req, res) => {
    try {
        const { metode_pengiriman, alamat_pengiriman, lokasi_pengambilan, batas_waktu_pengambilan } = req.body;
        const userId = req.user.userId;
        const keranjangItems = await Keranjang.findAll({ where: { user_id: userId } });

        if (keranjangItems.length === 0) {
            return res.status(400).json({ message: 'Keranjang belanja kosong' });
        }

        for (const item of keranjangItems) {
            const barang = await Barang.findByPk(item.barang_id);

            if (!barang || barang.stok < item.jumlah) {
                return res.status(400).json({ message: 'Stok barang tidak mencukupi untuk barang dengan id: ' + item.barang_id });
            }

            barang.stok -= item.jumlah;
            await barang.save();

            await Transaksi.create({
                user_id: userId,
                barang_id: item.barang_id,
                jumlah: item.jumlah,
                total_harga: barang.harga * item.jumlah,
                status_pengiriman: 'menunggu pegawai',
                metode_pengiriman,
                alamat_pengiriman,
                lokasi_pengambilan,
                batas_waktu_pengambilan
            });

            await item.destroy();
        }

        res.status(201).json({ message: 'Transaksi berhasil' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
