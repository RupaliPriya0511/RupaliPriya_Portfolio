const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const multer = require('multer');
const path = require('path');
const Project = require('./models/project');
const Certificate = require('./models/certificate');
const Blog = require('./models/blog');
const app = express();
// const Blog = require('./models/blog');


// Static folder to serve images
app.use('/uploads', express.static('uploads'));

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error(err));

// Routes
app.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

// app.post('/projects', async (req, res) => {
//     const newProject = new Project(req.body);
//     await newProject.save();
//     res.json(newProject);
// });

app.post('/projects', async (req, res) => {
    try {
        const newProject = new Project(req.body);
        await newProject.save();
        res.status(201).json(newProject);
    } catch (err) {
        console.error("Error saving project:", err.message);
        res.status(500).json({ error: "Failed to save project" });
    }
});


app.delete('/projects/:title', async (req, res) => {
    const result = await Project.deleteOne({ title: req.params.title });
    res.json(result);
});





// Get all certificates
app.get('/certificates', async (req, res) => {
    const certificates = await Certificate.find();
    res.json(certificates);
});

// Add a certificate
app.post('/certificates', async (req, res) => {
    const newCertificate = new Certificate(req.body);
    await newCertificate.save();
    res.json(newCertificate);
});

// Delete certificate by ID
app.delete('/certificates/:id', async (req, res) => {
    const result = await Certificate.findByIdAndDelete(req.params.id);
    res.json(result);
});





// Multer config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + path.extname(file.originalname);
        cb(null, uniqueName);
    }
});
const upload = multer({ storage: storage });

// Blog upload route
app.post('/blogs', upload.single('image'), async (req, res) => {
    try {
        const { title, date, content } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";

        const newBlog = new Blog({
            title,
            date,
            content,
            imageUrl
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/blogs', async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ date: -1 });
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
app.use('/uploads', express.static('uploads'));




app.delete('/blogs/:id', async (req, res) => {
  const { id } = req.params;

  // ✅ Validate MongoDB ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid blog ID format" });
  }

  try {
    const result = await Blog.findByIdAndDelete(id);
    if (result) {
      res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (err) {
    console.error("Server error during deletion:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  

  

const path = require('path');

// Serve frontend files from root
app.use(express.static(path.join(__dirname, '../')));

// Fallback route for SPA or direct HTML page links
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
