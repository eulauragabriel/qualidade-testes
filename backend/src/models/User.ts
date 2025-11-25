import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  _id?: string;
  name: string;
  email: string;
  age: number;
  status: 'active' | 'inactive';
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [1, 'Name cannot be empty'],
      maxlength: [100, 'Name must be less than 100 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9+._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email format'],
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: [18, 'Age must be at least 18'],
      max: [120, 'Age cannot exceed 120'],
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  {
    timestamps: true,
  }
);

// Create indices
userSchema.index({ email: 1 });
userSchema.index({ status: 1 });
userSchema.index({ age: 1 });

export const User = model<IUser>('User', userSchema);
