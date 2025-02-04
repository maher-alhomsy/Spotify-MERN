import exporess from 'express';
import { config } from 'dotenv';

import userRoutes from './routes/user.route';
import authRoutes from './routes/auth.route';
import songRoutes from './routes/song.route';
import adminRoutes from './routes/admin.route';
import albumRoutes from './routes/admin.route';
import statisRoutes from './routes/statis.route';

config();

const app = exporess();
const PORT = process.env.PORT;

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statisRoutes);

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);
});
