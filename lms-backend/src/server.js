require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const mongoose = require('mongoose');
const notificationRoutes = require('./routes/notification.routes');
const discussionRoutes = require('./routes/discussion.routes');



const app = express();

connectDB();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)  // ← MUST be MONGO_URI (NOT MONGODB_URI)
  .then(() => console.log(' MongoDB Connected'))
  .catch(err => console.error('DB connection error:', err));

app.get('/', (req, res) => res.send('LMS API running'));

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/discussions', discussionRoutes);



// basic 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



