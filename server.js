const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const redisHelper = require("./utils/RedisHelper");

const result = dotenv.config();
if (result.error) {
  console.error(result.error);
  process.exit(1);
}
const { PORT, DB_URI } = process.env;

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"))

app.listen(PORT, async err => {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  console.log(`Authorization Server Started in PORT ${PORT}`);
  try {
    await mongoose.connect(DB_URI, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
  } catch (e) {
    console.error(e);
    process.exit(3);
  }
});

const db = mongoose.connection;
db.once("open", () => {
  console.log(`MongoDB Connection Established`);
  const IndexRouter = require("./routes/index");
  app.use("/auth", IndexRouter);
});