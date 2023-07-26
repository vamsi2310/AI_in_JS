const tf = require('@tensorflow/tfjs');

// Define a constant tensor with value 'Hello, TensorFlow!'
const msg = tf.tensor('Hello, TensorFlow!');

// Print the value of the tensor
msg.print();
