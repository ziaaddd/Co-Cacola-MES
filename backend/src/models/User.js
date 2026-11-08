const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const USER_ROLES = ['admin', 'plant_manager', 'line_supervisor', 'maintenance_engineer'];

/**
 * @typedef {Object} UserRecord
 * @property {string} name
 * @property {string} email
 * @property {string} password Hashed before persistence; excluded from queries by default.
 * @property {'admin'|'plant_manager'|'line_supervisor'|'maintenance_engineer'} role
 * @property {mongoose.Types.ObjectId} [assignedFactory]
 */

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      maxlength: 254,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    password: { type: String, required: true, minlength: 8, select: false },
    role: { type: String, required: true, enum: USER_ROLES, default: 'line_supervisor' },
    assignedFactory: { type: mongoose.Schema.Types.ObjectId, ref: 'Factory', default: null }
  },
  { timestamps: true }
);

userSchema.index({ assignedFactory: 1 });

userSchema.pre('save', async function hashPassword() {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 12);
});

userSchema.methods.comparePassword = function comparePassword(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model('User', userSchema);
