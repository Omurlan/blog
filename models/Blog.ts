import { BlockTypes } from '@interface/blog';
import mongoose, { Types, Schema } from 'mongoose';

const fileSchema = new Schema({
  url: String,
});

const blockSchemaData = new Schema({
  text: String,
  level: Number,
  file: fileSchema,
  caption: String,
  message: String,
  withBorder: Boolean,
  stretched: Boolean,
  withBackground: Boolean,
});

const anchorSchema = new Schema({
  anchor: String,
});

const tuneSchema = new Schema({
  anchorTune: anchorSchema,
});

const blockSchema = new Schema({
  data: blockSchemaData,
  id: String,
  type: {
    type: String,
    enum: Object.values(BlockTypes),
  },
  tunes: tuneSchema,
});

const blogSchema = new Schema(
  {
    title: String,
    previewImage: String,
    author: {
      ref: 'User',
      type: Types.ObjectId,
    },
    blocks: [blockSchema],
    time: Number,
  },
  {
    timestamps: true,
  }
);

const blogModel = mongoose.models.Blog || mongoose.model('Blog', blogSchema);

export default blogModel;
