// server.js (ou nome do arquivo principal do seu servidor)
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint para o login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Verificar as credenciais (exemplo básico)
  if (username === 'user' && password === 'password') {
    res.json({ success: true, message: 'Login successful' });
  } else {
    res.status(401).json({ success: false, message: 'Login failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
