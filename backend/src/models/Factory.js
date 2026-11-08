const mongoose = require('mongoose');

/**
 * @typedef {Object} FactoryRecord
 * @property {string} name
 * @property {string} code
 * @property {string} location
 * @property {number} totalCapacity
 * @property {'active'|'maintenance'|'inactive'} status
 */

const factorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 160 },
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, maxlength: 32 },
    location: { type: String, required: true, trim: true, maxlength: 200 },
    totalCapacity: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: ['active', 'maintenance', 'inactive'], default: 'active' }
  },
  { timestamps: true }
);

module.exports = mongoose.models.Factory || mongoose.model('Factory', factorySchema);
