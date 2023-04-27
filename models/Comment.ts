import mongoose, { Types } from 'mongoose';

const commentSchema = new mongoose.Schema(
  {
    author: { type: Types.ObjectId, ref: 'User' },
    parentId: { type: Types.ObjectId, ref: 'Comment' },
    blogId: Types.ObjectId,
    comment: String,
    replies: [{ type: Types.ObjectId, ref: 'Comment' }],
    authorLike: Boolean,
    likes: [{ type: Types.ObjectId, ref: 'User' }],
    edited: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const commentModel = mongoose.models.Comment || mongoose.model('Comment', commentSchema);

export default commentModel;
