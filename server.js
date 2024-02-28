const express = require('express');
const db = require('./src/models/index');
const userRoutes = require('./src/routes/userRoutes');
const barangRoutes = require('./src/routes/barangRoutes');
const keranjang = require('./src/routes/keranjangRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

db.sequelize.sync().then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use('/api/users', userRoutes);
app.use('/api/barang', barangRoutes);
app.use('/api/keranjang', keranjang);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
