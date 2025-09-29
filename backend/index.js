const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.post('/api/phone', (req, res) => {
  const { phone } = req.body;
  if (!phone) {
    return res.status(400).json({ error: 'Phone number is required' });
  }
  // Save phone to a local file (simple demo)
  fs.appendFile('phones.txt', phone + '\n', err => {
    if (err) {
      return res.status(500).json({ error: 'Failed to save number' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});