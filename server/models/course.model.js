import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  courseCode: { type: String, required: true },
  courseName: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Course', courseSchema);
