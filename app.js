const fs = require('fs');
const express = require('express');
const app = express();

// app.get('/', (req, res) => {
//   res.send('heyy there!');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      tours,
    },
  });
});

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
