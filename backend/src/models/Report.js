const mongoose = require('mongoose');

/**
 * @typedef {Object} ReportRecord
 * @property {string} title
 * @property {'daily_summary'|'oee_analysis'|'downtime_report'|'sustainability'} type
 * @property {mongoose.Types.ObjectId} factoryId
 * @property {mongoose.Types.ObjectId} [lineId]
 * @property {mongoose.Types.ObjectId} generatedBy
 * @property {string} [fileUrl]
 * @property {{ start: Date, end: Date }} period
 */

const reportSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, minlength: 2, maxlength: 200 },
    type: {
      type: String,
      required: true,
      enum: ['daily_summary', 'oee_analysis', 'downtime_report', 'sustainability']
    },
    factoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Factory', required: true },
    lineId: { type: mongoose.Schema.Types.ObjectId, ref: 'Line', default: null },
    generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fileUrl: { type: String, trim: true, maxlength: 2048 },
    period: {
      start: { type: Date, required: true },
      end: {
        type: Date,
        required: true,
        validate: {
          validator(end) {
            return !this.period?.start || end >= this.period.start;
          },
          message: 'period.end must be on or after period.start'
        }
      }
    }
  },
  { timestamps: true }
);

reportSchema.index({ factoryId: 1 });
reportSchema.index({ lineId: 1 });
reportSchema.index({ generatedBy: 1 });
reportSchema.index({ 'period.start': 1, 'period.end': 1 });

module.exports = mongoose.models.Report || mongoose.model('Report', reportSchema);
