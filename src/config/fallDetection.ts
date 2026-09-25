import { FallDetectionConfig } from '../types/sensors';

export const DEFAULT_CONFIG: FallDetectionConfig = {
  updateIntervalMs: 20, // 50 Hz sampling rate
  freeFallThresholdG: 0.55,
  impactThresholdG: 2.7,
  impactWindowMs: 600,
};
