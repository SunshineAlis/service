import express from "express";
import cors from "cors";
import { connectDb } from "./src/schemas/mongo.connection.js";
import router from "./src/routers/user.router.js";
// import bodyParser from 'body-parser';

// app.use(bodyParser.json());

const port = 4040;
const app = express();



const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PUT'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};
app.use(cors(corsOptions))

app.use(express.json());

connectDb();




app.use("/user", router);



app.listen(4040, () => {
  console.log(`Server is running on port ${port}`);
});









