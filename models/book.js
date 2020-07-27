const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  genre: { type: String },
  ISBN: {
    type: String,
    required: true,
    validate: {
      validator: async function(value) {
        const book = await this.constructor.findOne({ ISBN: value});
        if (book) {
          throw new Error(`ISBN: ${value} already in use.`);
        }
      }
    }},
  authorId: { type: String, required: true },
  blurb: { type: String },
  publicationYear: { type: Number, required: true },
  pageCount: { type: Number, required: true }
});

bookSchema.index({ authorId: 1 })
bookSchema.index({ ISBN: 1 })
module.exports = mongoose.model("books", bookSchema);
