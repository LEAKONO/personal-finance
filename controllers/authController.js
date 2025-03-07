const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Signup
exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  console.log('Signup request:', { username, email });

  try {
    const normalizedEmail = email.trim().toLowerCase();
    let user = await User.findOne({ email: normalizedEmail });
    console.log('User found:', user);

    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    user = new User({
      username: username.trim(),
      email: normalizedEmail,
      password: password.trim(), // No manual hashing here
    });

    await user.save();
    console.log('User saved:', user);

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);

    res.status(201).json({ token, message: 'Signup successful!' });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  console.log('Login request data:', { email, password });

  try {
    // Normalize email and find user
    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail });
    console.log('User found:', user);

    if (!user) {
      console.log('User not found in database.');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Debugging: Log stored password
    console.log('Stored Hashed Password:', user.password);

    // Compare passwords
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    console.log('Password Match Result:', isMatch);

    if (!isMatch) {
      console.log('Password does not match.');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    console.log('Token generated:', token);

    res.status(200).json({ token, message: `Welcome back, ${user.username}!` });
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
