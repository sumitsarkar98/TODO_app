import { app } from "./app.js";
import connectDB from "./src/db/db.connection.js";

// config env using import statement + another partof setup is in package.json/scripts/start
import dotenv from "dotenv";
dotenv.config();

//loading mongoDB ~ app
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.error("ERROR :", error);
      throw error;
    });
    app.listen(process.env.PORT || 8000, () => {
      console.log(`server is running at port ${process.env.PORT || 8000}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB connection fail !! ", err);
  });
