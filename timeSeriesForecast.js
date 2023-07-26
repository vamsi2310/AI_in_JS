const tf = require('@tensorflow/tfjs');
const data = require('./data.json');

// Prepare the training data
const trainingData = tf.tensor2d(data.trainingInputs);
const trainingLabels = tf.tensor2d(data.trainingLabels);

// Define the model architecture
const model = tf.sequential();
model.add(tf.layers.dense({ units: 50, inputShape: [1], activation: 'relu' }));
model.add(tf.layers.dense({ units: 1, activation: 'linear' }));

// Compile the model
model.compile({ optimizer: 'adam', loss: 'meanSquaredError' });

// Train the model
model.fit(trainingData, trainingLabels, { epochs: 100 })
  .then(() => {
    // Prepare the test data
    const testData = tf.tensor2d(data.testInputs);
    
    // Use the model to make predictions on the test data
    const predictions = model.predict(testData);
    
    // Print the predicted values
    predictions.print();
  });
