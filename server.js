// perfect working without saving it to the server

// require("dotenv").config(); // Load .env variables

// const express = require("express");
// const multer = require("multer");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000; // Use env port or default 5000

// // CORS Configuration
// app.use(cors());
// app.use(express.json());

// // Multer Configuration (Memory Storage - No File Saving)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Nodemailer Transporter (Using Environment Variables)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // API Route to Handle Form Submission
// app.post("/apply", upload.single("resume"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "Resume file is required" });
//   }

//   const { name, email, phone } = req.body;
//   const resumeFile = req.file; // File in memory

//   // Email options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_TO,
//     subject: "New Job Application",
//     text: `New application received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
//     attachments: [
//       {
//         filename: resumeFile.originalname, // Original file name
//         content: resumeFile.buffer, // File content in memory
//       },
//     ],
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).json({ error: "Failed to send email" });
//     }

//     res.json({ message: "Application submitted successfully!" });
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

//with adding the /health end point to implement the ping

require("dotenv").config(); // Load .env variables

const express = require("express");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Use env port or default 5000

// CORS Configuration
app.use(cors());
app.use(express.json());

// Multer Configuration (Memory Storage - No File Saving)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Nodemailer Transporter (Using Environment Variables)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health-Check Endpoint
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is alive!" });
});

// API Route to Handle Form Submission
app.post("/apply", upload.single("resume"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "Resume file is required" });
  }

  const { name, email, phone } = req.body;
  const resumeFile = req.file; // File in memory

  // Email options
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    subject: "New Job Application",
    text: `New application received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
    attachments: [
      {
        filename: resumeFile.originalname, // Original file name
        content: resumeFile.buffer, // File content in memory
      },
    ],
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Failed to send email" });
    }

    res.json({ message: "Application submitted successfully!" });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//using reddif

// require("dotenv").config(); // Load .env variables

// const express = require("express");
// const multer = require("multer");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();
// const PORT = process.env.PORT || 5000; // Use env port or default 5000

// // CORS Configuration
// app.use(cors());
// app.use(express.json());

// // Multer Configuration (Memory Storage - No File Saving)
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// // Nodemailer Transporter (Using Rediffmail SMTP)
// const transporter = nodemailer.createTransport({
//   host: "smtp.rediffmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER, // Your Rediffmail email
//     pass: process.env.EMAIL_PASS, // Rediffmail password (or app password)
//   },
// });

// // API Route to Handle Form Submission
// app.post("/apply", upload.single("resume"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "Resume file is required" });
//   }

//   const { name, email, phone } = req.body;
//   const resumeFile = req.file; // File in memory

//   // Email options
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: process.env.EMAIL_TO,
//     subject: "New Job Application",
//     text: `New application received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
//     attachments: [
//       {
//         filename: resumeFile.originalname, // Original file name
//         content: resumeFile.buffer, // File content in memory
//       },
//     ],
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).json({ error: "Failed to send email" });
//     }

//     res.json({ message: "Application submitted successfully!" });
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
