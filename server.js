const express = require('express');
const db = require('./src/config/database');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());

db.sync().then(() => {
  console.log('Database connected');
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('Server is up and running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
