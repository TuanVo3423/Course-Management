const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
  {
    _id : {type : Number},
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
    _id : false,
    timestamps: true,
  },
);
// add plugins
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });
Course.plugin(AutoIncrement);
mongoose.plugin(slug);

module.exports = mongoose.model('coursesabc', Course);
