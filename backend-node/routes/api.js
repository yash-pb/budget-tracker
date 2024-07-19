const mongoose = require('mongoose');
const query = "mongodb+srv://yash:G8sIV81k8fBsGSMN@chat-app-cluster.wbie3cb.mongodb.net/?retryWrites=true&w=majority&appName=Chat-App-Cluster";

async function connectToDatabase() {
  try {
    await mongoose.connect(query, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Database connection successful');
  } catch (err) {
    console.error('Database connection error:', err);
  }
}

connectToDatabase();