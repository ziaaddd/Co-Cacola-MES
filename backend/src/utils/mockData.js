const FACTORY_STATUSES = ['active', 'maintenance', 'inactive'];
const LINE_STATUSES = ['active', 'stopped', 'maintenance'];

/**
 * Generate a representative metrics snapshot for local development.
 * @param {{ lineId: import('mongoose').Types.ObjectId, factoryId: import('mongoose').Types.ObjectId, timestamp?: Date }} options
 */
function generateMockProductionMetrics({ lineId, factoryId, timestamp = new Date() }) {
  const actualSpeed = 18000 + Math.floor(Math.random() * 4000);
  const availability = 85 + Math.random() * 15;
  const performance = 80 + Math.random() * 20;
  const quality = 95 + Math.random() * 5;

  return {
    lineId,
    factoryId,
    timestamp,
    productionVolume: {
      bottles: Math.floor(actualSpeed / 60),
      packs: Math.floor(actualSpeed / 12),
      pallets: Math.floor(actualSpeed / 2400)
    },
    speed: { actual: actualSpeed, target: 22000 },
    cycleTime: { avg: 0.18, min: 0.15, max: 0.24 },
    oee: {
      availability: Number(availability.toFixed(2)),
      performance: Number(performance.toFixed(2)),
      quality: Number(quality.toFixed(2)),
      overall: Number(((availability * performance * quality) / 10000).toFixed(2))
    },
    lossTree: { breakdown: 2, cleansing: 1, changeover: 3, idle: 2, minorStops: 4 },
    usageKpi: { energyPerLiter: 0.08, energyPerBottle: 0.04, waterPerLiter: 1.8, waterPerBottle: 0.9 },
    statusTimeline: [{ status: 'running', startedAt: timestamp }]
  };
}

module.exports = { FACTORY_STATUSES, LINE_STATUSES, generateMockProductionMetrics };
