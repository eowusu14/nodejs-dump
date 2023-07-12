// 'use strict';

const fs = require('fs');
const express = require('express');
const app = express();

// middleware
app.use(express.json());

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// get all tours
const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

// get tour
const getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1;
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'not found',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

// add Tour
const addTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (error) => {
      if (error) {
        console.error(error);
      } else
        res.status(201).json({
          status: 'success',
          data: {
            tour: newTour,
          },
        });
    }
  );
};

// update tour
const updateTour = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      message: 'id not found',
    });
  }

  res.status(200).json({
    status: 'success',
    message: 'updated tour',
    data: {
      tour: 'updated tour here',
    },
  });
};

// delete tour
const deleteTour = (req, res) => {
  res.status(204).json({
    status: 'success',
    message: 'successfully deleted',
    data: null,
  });
};

// app.get('/api/tours', getAllTours);
// app.post('/api/tours', addTour);
// app.get('/api/tours/:id', getTour);
// app.patch('/api/tours/:id', updateTour);
// app.delete('/api/tours/:id', deleteTour);

app.route('/api/tours').get(getAllTours).post(addTour);
app.route('/api/tours/:id').get(getTour).patch(updateTour).delete(deleteTour);

const port = 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
