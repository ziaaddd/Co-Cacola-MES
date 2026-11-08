const mongoose = require('mongoose');

/**
 * @typedef {Object} PlanningRecord
 * @property {mongoose.Types.ObjectId} lineId
 * @property {string} productSKU
 * @property {number} targetQuantity
 * @property {number} producedQuantity
 * @property {Date} startTime
 * @property {Date} endTime
 * @property {'planned'|'in_progress'|'completed'|'cancelled'} status
 */

const planningSchema = new mongoose.Schema(
  {
    lineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Line', required: true },
    productSKU: { type: String, required: true, trim: true, uppercase: true, maxlength: 64 },
    targetQuantity: { type: Number, required: true, min: 1 },
    producedQuantity: { type: Number, min: 0, default: 0 },
    startTime: { type: Date, required: true },
    endTime: {
      type: Date,
      required: true,
      validate: {
        validator(endTime) {
          return !this.startTime || endTime >= this.startTime;
        },
        message: 'endTime must be on or after startTime'
      }
    },
    status: {
      type: String,
      required: true,
      enum: ['planned', 'in_progress', 'completed', 'cancelled'],
      default: 'planned'
    }
  },
  { timestamps: true }
);

planningSchema.index({ lineId: 1 });
planningSchema.index({ lineId: 1, startTime: 1, endTime: 1 });

module.exports = mongoose.models.Planning || mongoose.model('Planning', planningSchema);
