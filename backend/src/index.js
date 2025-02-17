import path from 'path';
import exporess from 'express';
import { config } from 'dotenv';
import fileUpload from 'express-fileupload';
import { clerkMiddleware } from '@clerk/express';

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
const __dirname = path.resolve();

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, 'tmp'),
    createParentPath: true,
    limits: {
      fileSize: 10 * 1024 * 1024, // 10MB
    },
  })
);

app.use(exporess.json());
app.use(clerkMiddleware());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/stats', statisRoutes);

// error handler
app.use((error, req, res, next) => {
  console.log(error);

  res.status(500).json({
    message:
      process.env.NODE_ENV === 'producation'
        ? 'Internal Server Error'
        : error.message,
  });
});

app.listen(PORT, () => {
  console.log('Server listening on port ' + PORT);

  connectDB();
});
