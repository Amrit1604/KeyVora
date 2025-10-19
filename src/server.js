const app = require('./app');
const config = require('./config');
const connectDB = require('./config/database');

const PORT = config.app.port || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${PORT}`);
});