// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const multer = require("multer");
// const path = require("path");

// // Initialize the app
// const app = express();
// const PORT = process.env.PORT || 5000;

// // CORS setup - Allow requests from specific origins
// const corsOptions = {
//   origin: "http://127.0.0.1:5502", // Replace with your frontend URL
//   methods: "GET,POST",
//   allowedHeaders: "Content-Type,Authorization",
// };

// // Enable CORS middleware
// app.use(cors(corsOptions));

// // Middleware to parse form data and handle file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./uploads"); // Directory where files will be stored
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Renaming file with timestamp
//   },
// });

// const upload = multer({ storage: storage });

// // Middleware to parse JSON bodies
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // POST endpoint to handle job application
// app.post("/apply", upload.single("resume"), (req, res) => {
//   const { name, email, phone } = req.body;
//   const resumeFile = req.file; // The uploaded resume file

//   // Check if the resume file exists
//   if (!resumeFile) {
//     return res.status(400).json({ error: "Resume file is required" });
//   }

//   // Create a transporter for sending the email (using SMTP)
//   const transporter = nodemailer.createTransport({
//     service: "gmail", // Using Gmail SMTP service
//     auth: {
//       user: "rjravi7408563153@gmail.com", // Replace with your email
//       pass: "fhox kmqm hlpg hnww", // Replace with your email password or app password
//     },
//   });

//   // Email content setup
//   const mailOptions = {
//     user: "rjravi7408563153@gmail.com", // Replace with your email
//     from: "rj669680@gmail.com", // Sender's email
//     to: "recipient-email@example.com", // Recipient's email
//     subject: "New Job Application", // Email subject
//     text: `You have received a new job application from:

//         Name: ${name}
//         Email: ${email}
//         Phone: ${phone}

//         Please find the attached resume.`,
//     attachments: [
//       {
//         filename: resumeFile.originalname,
//         path: resumeFile.path, // Path to the uploaded resume file
//       },
//     ],
//   };

//   // Send the email with the attachment
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       return res.status(500).json({ error: "Failed to send application" });
//     }

//     // Delete the uploaded resume after sending the email
//     const fs = require("fs");
//     fs.unlinkSync(resumeFile.path);

//     console.log("Email sent: " + info.response);
//     res.status(200).json({ message: "Application submitted successfully!" });
//   });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // next working code and resume upload successfully

// const express = require("express");
// const multer = require("multer");
// const nodemailer = require("nodemailer");
// const cors = require("cors");
// const path = require("path");
// const fs = require("fs");

// const app = express();
// const PORT = 5000;

// // CORS Configuration
// app.use(cors());
// app.use(express.json());

// // Ensure uploads directory exists
// const uploadDir = path.join(__dirname, "uploads");
// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }

// // Multer Configuration
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/"); // Save to 'uploads' folder
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
//   },
// });

// const upload = multer({ storage: storage });

// // Nodemailer Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "rjravi7408563153", // Replace with your email
//     pass: "fhoxkmqmhlpghnww", // Replace with your Gmail App Password
//   },
// });

// // API Route to Handle Form Submission
// app.post("/apply", upload.single("resume"), (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: "Resume file is required" });
//   }

//   const { name, email, phone } = req.body;
//   const resumePath = req.file.path; // File path

//   // Email options
//   const mailOptions = {
//     from: "rjravi7408563153@gmail.com",
//     to: "rj669680@gmail.com", // Replace with the recipient's email
//     subject: "New Job Application",
//     text: `New application received:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}`,
//     attachments: [
//       {
//         filename: req.file.originalname, // Original file name
//         path: resumePath, // Attach uploaded file
//       },
//     ],
//   };

//   // Send email
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//       return res.status(500).json({ error: "Failed to send email" });
//     }

//     // Delete the uploaded file after sending email
//     fs.unlink(resumePath, (err) => {
//       if (err) console.error("Error deleting file:", err);
//     });

//     res.json({ message: "Application submitted successfully!" });
//   });
// });

// // Start Server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// perfect working without saving it to the server

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
