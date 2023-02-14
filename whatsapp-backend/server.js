//Importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";

import Messages from "./dbMessages.js";

//app.config
const app = express();

const port = process.env.PORT || 5000;

const pusher = new Pusher({
  appId: "1547744",
  key: "2d97d90aa64bc3c333ce",
  secret: "4277d69b4886aaedd00b",
  cluster: "ap3",
  useTLS: true,
});

// middlewares
app.use(cors());
app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Header", "*");
//   next();
// });

// Database
const url =
  "mongodb+srv://WhatsAppClon:WhatsAppClone@cluster0.y1clhms.mongodb.net/WhatsAppMessages?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(() => {
    console.log("Connection Successfull");
  })
  .catch((err) => {
    console.log(err);
  });

// ??
const db = mongoose.connection;
db.once("open", () => {
  console.log("Db is connected");
  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        recieved: messageDetails.recieved,
      });
    } else {
      console.log("Error Triggering Pusing");
    }
  });
});

// App routing
app.get("/", (req, res) => {
  res.status(201).send("THis is the Home Page");
});

// Recievingt the message
app.get("/message/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Sending the message
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// Server listen
app.listen(port, () => {
  console.log(`server is running at https://127.0.0.1:${port}`);
});
