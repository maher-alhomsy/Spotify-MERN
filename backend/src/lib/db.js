import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connect to Mongoose ' + connection.host);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1);
  }
};
