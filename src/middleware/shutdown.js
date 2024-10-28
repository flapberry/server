import mongoose from 'mongoose';

export function shutdown(server) {
  console.log('Shutting down server...');
  server.close(async () => { 
    console.log('HTTP server closed');
    try {
      await mongoose.disconnect(); 
      console.log('MongoDB disconnected');
      process.exit(0); 
    } catch (err) {
      console.error('Error disconnecting MongoDB:', err);
      process.exit(1); 
    }
  });
}