const path = require("path");
const express = require("express");
const fileUpload = require("express-fileupload");
const router = require("./routes");

const carUsecase = require("./usecase/car");

const app = express();
const port = 3000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.json());
app.use(fileUpload({ useTempFiles: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api", router);

app.get("/", async (req, res, next) => {
  try {
    const cars = await carUsecase.getCars(); // Fetch cars data from the database or any other source
    res.render("index", { cars }); // Pass the cars data to the index.ejs template
  } catch (error) {
    next(error);
  }
});

app.get("/add-car", (req, res) => {
  res.render("addCarPage");
});

app.get("/update-car", (req, res) => {
  res.render("updateCarPage");
});

app.use("*", (req, res) => {
  res.status(404).json({
    data: null,
    message: "Route not found",
  });
});

app.use((err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err.statusCode) {
    statusCode = err.statusCode;
  }
  if (err.message) {
    message = err.message;
  }

  res.status(statusCode).json({
    data: null,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
