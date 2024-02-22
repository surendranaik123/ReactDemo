const { model, Schema } = require("mongoose");

const storeVideoSchema = new Schema({
  videoUrl: {
    type: String,
  },
});

module.exports = model("videos", storeVideoSchema);
