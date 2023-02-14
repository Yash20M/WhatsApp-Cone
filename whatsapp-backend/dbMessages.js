import mongoose from "mongoose";

const whatsappSchema = new mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  recieved: Boolean,
});

const whatsAppModel = new mongoose.model("messagecontent", whatsappSchema);

export default whatsAppModel;
