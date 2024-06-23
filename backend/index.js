const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Connect to MongoDB using the provided connection string
const mongoURI = 'mongodb+srv://nagi:nagi@cluster0.ohv5gsc.mongodb.net/grapesjs?retryWrites=true&w=majority';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Define a schema and model for the templates
const templateSchema = new mongoose.Schema({
  html: String,
  css: String,
  components: String,
  styles: String,
});

const Template = mongoose.model('Template', templateSchema);

// API routes
app.post('/save-template', async (req, res) => {
  const { html, css, components, styles } = req.body;
  const newTemplate = new Template({ html, css, components, styles });
  await newTemplate.save();
  res.send({ message: 'Template saved successfully' });
});

app.get('/templates', async (req, res) => {
  const templates = await Template.find();
  res.send(templates);
});

app.get('/templates/:id', async (req, res) => {
  const template = await Template.findById(req.params.id);
  res.send(template);
});

app.put('/templates/:id', async (req, res) => {
  const { html, css, components, styles } = req.body;
  await Template.findByIdAndUpdate(req.params.id, { html, css, components, styles });
  res.send({ message: 'Template updated successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
