import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
  course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  section: { type: String, required: true },
  type: { type: String, enum: ['Theory', 'Lab'], default: 'Theory' },
}, { timestamps: true });

export default mongoose.model('Todo', todoSchema);
