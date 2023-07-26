const fs = require('fs');
const csv = require('csv-parser');
const brain = require('brain.js');
const { train } = require('@tensorflow/tfjs-core');

const data = [];
const network = new brain.recurrent.LSTM();

fs.createReadStream('stock_data.csv')
  .pipe(csv())
  .on('data', (row) => {
    data.push({
      open: Number(row.Open),
      high: Number(row.High),
      low: Number(row.Low),
      close: Number(row.Close),
    });
  })
  .on('end', () => {
    const trainingData = [];
    console.log(trainingData);

    for (let i = 0; i < data.length - 7; i++) {
      trainingData.push({
        input: [
          data[i].open,
          data[i].high,
          data[i].low,
          data[i].close,
          data[i + 1].open,
          data[i + 1].high,
          data[i + 1].low,
          data[i + 1].close,
          data[i + 2].open,
          data[i + 2].high,
          data[i + 2].low,
          data[i + 2].close,
          data[i + 3].open,
          data[i + 3].high,
          data[i + 3].low,
          data[i + 3].close,
          data[i + 4].open,
          data[i + 4].high,
          data[i + 4].low,
          data[i + 4].close,
          data[i + 5].open,
          data[i + 5].high,
          data[i + 5].low,
          data[i + 5].close,
        ],
        output: [data[i + 6].close],
      });
    }

    network.train(trainingData);

    const today = data[data.length - 1];
    const tomorrow = network.run([
      today.open,
      today.high,
      today.low,
      today.close,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
    ]);

    console.log(`Tomorrow's stock price prediction: ${tomorrow}`);
  });
