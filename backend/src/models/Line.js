const mongoose = require('mongoose');

/**
 * @typedef {Object} LineRecord
 * @property {mongoose.Types.ObjectId} factoryId
 * @property {string} name
 * @property {string} lineCode
 * @property {'active'|'stopped'|'maintenance'} status
 * @property {number} designedSpeed Bottles per hour.
 */

const lineSchema = new mongoose.Schema(
  {
    factoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Factory', required: true },
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    lineCode: { type: String, required: true, uppercase: true, trim: true, maxlength: 32 },
    status: { type: String, required: true, enum: ['active', 'stopped', 'maintenance'], default: 'active' },
    designedSpeed: { type: Number, required: true, min: 0 }
  },
  { timestamps: true }
);

lineSchema.index({ factoryId: 1 });
lineSchema.index({ factoryId: 1, lineCode: 1 }, { unique: true });

module.exports = mongoose.models.Line || mongoose.model('Line', lineSchema);
