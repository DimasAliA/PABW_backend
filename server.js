const express = require('express');
const db = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
const barangRoutes = require('./src/routes/barangRoutes');
const transaksiRoutes = require('./src/routes/transaksiRoutes');

require('dotenv').config();

const app = express();
app.use(express.json());

db.sync().then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use('/api/users', userRoutes);
app.use('/api/barang', barangRoutes);
app.use('/api/transaksi', transaksiRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
