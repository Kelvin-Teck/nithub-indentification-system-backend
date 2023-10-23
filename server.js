require("dotenv").config();
const express = require("express");
const { connectToDB } = require("./database/db");
const app = express();
const PORT = process.env.PORT || 1500;
const cors = require("cors");
const bodyParser = require("body-parser");


// cors options
const corsOptions = {
  origin: ['http://localhost:5173', 'http'],
  methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
};
// cross site origin fix
app.use(cors(corsOptions));

//Cors
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );

//   if (req.method == "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
//     return res.status(200).json({});
//   }

//   next();
// });

app.use((req, res, next) =>  {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

// Parse JSON bodies for all requests
app.use(express.json({ extended: true }));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));

app.get("/", (req, res) => {
  res.send("Service is up!");
});

// app.use((err, req, res, next) => {
//   if (err.code == 401) {
//     return res.status(401).send(err.message);
//   }
//   res.status(err.code).json({ message: "Internal Server Error!" });
// });

// Routes Importation
const clientRoutes = require("./routes/clientRoutes");
const studentRoutes = require("./routes/studentRoutes");
const internRoutes = require("./routes/internRoutes");
const visitorRoutes = require("./routes/visitorRoutes");



// Route initialization
app.use("/api/client", clientRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/intern", internRoutes);
app.use("/api/visitor", visitorRoutes);


app.listen(PORT, async () => {
  await connectToDB();
  console.log(`server is running on http://localhost:${PORT}`);
});
