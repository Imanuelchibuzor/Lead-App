const cors = require("cors");

const corsOptions = {
  origin: [
    "http://localhost:3000",
    "https://www.lead-management-app.vercel.app",
    "https://lead-management-app.vercel.app",
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders:
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  credentials: true,
};

module.exports = cors(corsOptions);
