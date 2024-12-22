const mongoose = require("mongoose");
const slugify = require("slugify");


const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    type: {
      type: String,
      required: true,
      enum: ["article", "video", "audio"],
    },
    thumbnail: {
      type: String,
    },
    slug: { type: String, unique: true },

    audioUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true });
  }
  this.slug = slugify(this.slug, { lower: true });
  next();
});

const post = mongoose.model("post", postSchema);

module.exports = post;
