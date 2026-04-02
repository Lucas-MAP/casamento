import mongoose from "mongoose";

const guestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },

  normalizedName: {
    type: String,
    required: true,
    index: true,
  },

  guestsCount: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },

  isGodfather: {
    type: Boolean,
    default: false,
  },

  confirmedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("GuestConfirmation", guestSchema);