// backend/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getUserByEmail, createUser } = require('../models/userModel');

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  console.log("Received data:", { username, email, password }); // Kollar vad som skickas in
  try {
    // Kontrollera om användaren redan finns i databasen
    const userExists = await getUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hashera lösenordet innan vi sparar det
    const hashedPassword = await bcrypt.hash(password, 10);

    // Skapa en ny användare
    const newUser = await createUser(username, email, hashedPassword);
    
    // Logga den nya användaren efter att den har skapats
    console.log('New user created:', newUser);

    // Skapa en JWT-token för användaren
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Skicka tillbaka svaret till klienten med token
    res.status(201).json({ message: 'User registered successfully', token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Skapa en JWT-token för den inloggade användaren
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, loginUser };
