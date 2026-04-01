import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: String,
  guestsCount: Number,
  isGodfather: Boolean,
  confirmedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("GuestConfirmation", guestSchema)