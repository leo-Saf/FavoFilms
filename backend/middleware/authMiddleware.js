// backend/controllers/authController.js
const jwt = require('jsonwebtoken');

const loginUser = (req, res) => {
  const { email, password } = req.body;

  // Verifiera användarens inloggningsuppgifter här (t.ex. kolla mot databas)

  const user = { id: 1, email }; // Exempel på användardata som kan vara från databas

  // Skapa JWT-token
  const token = jwt.sign(
    { userId: user.id, email: user.email },  // Payload
    process.env.JWT_SECRET,  // Hemlig nyckel
    { expiresIn: '1h' }  // Utlöper om 1 timme
  );

  res.json({ token });
};


module.exports = { loginUser };
