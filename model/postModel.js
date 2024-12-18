const mongoose = require("mongoose");

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
    slug: { type: String, required: true, unique: true }, // نامک

    audioUrl: {
      type: String,
    },
    videoUrl: {
      type: String,
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now,
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { timestamps: true }
);

postSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true });
  }

  next();
});

const post = mongoose.model("post", postSchema);

module.exports = post;
