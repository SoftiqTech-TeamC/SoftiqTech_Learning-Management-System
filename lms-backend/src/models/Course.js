const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    courseCode: {
      type: String,
      required: [true, 'Course code is required'],
      unique: true,
      trim: true,
      uppercase: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
    },
      category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Programming', 'Data Science', 'Business', 'Design', 'Marketing', 'Engineering', 'Mathematics', 'Science', 'Language', 'Other'],
      default: 'Other',
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
    },
    maxStudents: {
      type: Number,
      default: 50,
      min: 1,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'draft',
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      sparse: true,
    },
  },
  { timestamps: true }
);


// Generate slug before saving
courseSchema.pre('save', function(next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
  }
  next();
});

module.exports = mongoose.model('Course', courseSchema);
