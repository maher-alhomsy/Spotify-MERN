import exporess from 'express';
import { config } from 'dotenv';

import { connectDB } from './lib/db.js';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import songRoutes from './routes/song.route.js';
import adminRoutes from './routes/admin.route.js';
import albumRoutes from './routes/admin.route.js';
import statisRoutes from './routes/statis.route.js';

config();

const app = exporess();
const PORT = process.env.PORT;

app.use(exporess.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statisRoutes);

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);

  connectDB();
});
