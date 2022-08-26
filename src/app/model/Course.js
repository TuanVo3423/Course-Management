const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    videoId: { type: String, required: true },
    level: { type: String },
    image: { type: String },
    slug: { type: String, slug: 'name', unique: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);
// add plugins
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
mongoose.plugin(slug);

module.exports = mongoose.model('coursesabc', Course);
