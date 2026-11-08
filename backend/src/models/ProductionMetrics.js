const mongoose = require('mongoose');

const nonNegative = { type: Number, min: 0, default: 0 };
const percentage = { type: Number, min: 0, max: 100, default: 0 };

/**
 * @typedef {Object} ProductionMetricsRecord
 * @property {mongoose.Types.ObjectId} lineId
 * @property {mongoose.Types.ObjectId} factoryId
 * @property {Date} timestamp
 * @property {{ bottles: number, packs: number, pallets: number }} productionVolume
 * @property {{ actual: number, target: number }} speed
 * @property {{ avg: number, min: number, max: number }} cycleTime
 * @property {{ overall: number, availability: number, performance: number, quality: number }} oee Percentages from 0 to 100.
 * @property {{ breakdown: number, cleansing: number, changeover: number, idle: number, minorStops: number }} lossTree
 * @property {{ energyPerLiter: number, energyPerBottle: number, waterPerLiter: number, waterPerBottle: number }} usageKpi
 * @property {Array<{ status: string, startedAt: Date, endedAt?: Date, reason?: string }>} statusTimeline
 */

const statusEventSchema = new mongoose.Schema(
  {
    status: { type: String, required: true, enum: ['running', 'stopped', 'maintenance', 'faulty', 'idle'] },
    startedAt: { type: Date, required: true },
    endedAt: { type: Date, default: null },
    reason: { type: String, trim: true, maxlength: 300, default: '' }
  },
  { _id: false }
);

const productionMetricsSchema = new mongoose.Schema(
  {
    lineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Line', required: true },
    factoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Factory', required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    productionVolume: {
      bottles: nonNegative,
      packs: nonNegative,
      pallets: nonNegative
    },
    speed: { actual: nonNegative, target: nonNegative },
    cycleTime: {
      avg: nonNegative,
      min: nonNegative,
      max: nonNegative
    },
    oee: {
      overall: percentage,
      availability: percentage,
      performance: percentage,
      quality: percentage
    },
    lossTree: {
      breakdown: nonNegative,
      cleansing: nonNegative,
      changeover: nonNegative,
      idle: nonNegative,
      minorStops: nonNegative
    },
    usageKpi: {
      energyPerLiter: nonNegative,
      energyPerBottle: nonNegative,
      waterPerLiter: nonNegative,
      waterPerBottle: nonNegative
    },
    statusTimeline: { type: [statusEventSchema], default: [] }
  },
  { timestamps: true }
);

productionMetricsSchema.index({ factoryId: 1 });
productionMetricsSchema.index({ lineId: 1 });
productionMetricsSchema.index({ timestamp: -1 });
productionMetricsSchema.index({ factoryId: 1, timestamp: -1 });
productionMetricsSchema.index({ lineId: 1, timestamp: -1 });

module.exports =
  mongoose.models.ProductionMetrics || mongoose.model('ProductionMetrics', productionMetricsSchema);
