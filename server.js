require("dotenv").config();
const express = require("express");
const { connectToDB } = require("./database/db");
const app = express();
const PORT = process.env.PORT || 1500;
const cors = require("cors");
const bodyParser = require("body-parser");

// cross site origin fix
app.use(cors());

//Cors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );

  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({});
  }

  next();
});


// Parse JSON bodies for all requests
app.use(express.json({extended: true}));
app.use(bodyParser.json({extended: true}));

app.get("/", (req, res) => {
  res.send("Service is up!");
});

app.use((err, req, res, next) => {
  if (err.code == 401) {
    return res.status(401).send(err.message);
  }
  res.status(err.code).json({ message: "Internal Server Error!" });
});

// Routes Importation
const clientRoutes = require("./routes/clientRoutes");
const studentRoutes = require("./routes/studentRoutes");



// Route initialization
app.use('/api/client', clientRoutes);
app.use("/api/student", studentRoutes);



app.listen(PORT, async () => {
  await connectToDB()
  console.log(`server is running on http://localhost:${PORT}`)
}
);
