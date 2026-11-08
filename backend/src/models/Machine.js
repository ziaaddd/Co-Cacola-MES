const mongoose = require('mongoose');

/**
 * @typedef {Object} MachineRecord
 * @property {mongoose.Types.ObjectId} lineId
 * @property {string} name
 * @property {'blower'|'filler'|'capper'|'labeler'|'packer'|'conveyor'} type
 * @property {'running'|'faulty'|'idle'} status
 * @property {number} mtbf Mean time between failures in hours.
 * @property {number} uptime In hours.
 */

const machineSchema = new mongoose.Schema(
  {
    lineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Line', required: true },
    name: { type: String, required: true, trim: true, minlength: 2, maxlength: 120 },
    type: {
      type: String,
      required: true,
      enum: ['blower', 'filler', 'capper', 'labeler', 'packer', 'conveyor']
    },
    status: { type: String, required: true, enum: ['running', 'faulty', 'idle'], default: 'idle' },
    mtbf: { type: Number, required: true, min: 0 },
    uptime: { type: Number, required: true, min: 0, default: 0 }
  },
  { timestamps: true }
);

machineSchema.index({ lineId: 1 });

module.exports = mongoose.models.Machine || mongoose.model('Machine', machineSchema);
