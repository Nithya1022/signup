const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, enum: ['logged in', 'logged out'], default: 'logged out' } // Add status field
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
