import { FallDetectionConfig, FallEvent, Vector3D } from '../types/sensors';

export class FallDetector {
  private config: FallDetectionConfig;
  private freeFallTimestamp: number | null = null;
  private lowestFreeFallG = 1.0;

  constructor(config: FallDetectionConfig) {
    this.config = config;
  }

  public updateConfig(newConfig: FallDetectionConfig): void {
    this.config = newConfig;
  }

  public calculateTotalG(reading: Vector3D): number {
    return Math.sqrt(
      reading.x * reading.x +
      reading.y * reading.y +
      reading.z * reading.z
    );
  }

  public processReading(reading: Vector3D, timestamp: number = Date.now()): FallEvent | null {
    const totalG = this.calculateTotalG(reading);

    // 1. Detect Free-Fall / Weightlessness phase
    if (totalG < this.config.freeFallThresholdG) {
      if (!this.freeFallTimestamp) {
        this.freeFallTimestamp = timestamp;
        this.lowestFreeFallG = totalG;
      } else {
        this.lowestFreeFallG = Math.min(this.lowestFreeFallG, totalG);
      }
    }

    // 2. Detect Impact Shock phase after free-fall or extreme direct impact (>4.2G)
    const isDirectHardImpact = totalG >= 4.2;
    const isFallSequence =
      this.freeFallTimestamp !== null &&
      timestamp - this.freeFallTimestamp <= this.config.impactWindowMs &&
      totalG >= this.config.impactThresholdG;

    if (isFallSequence || isDirectHardImpact) {
      const event: FallEvent = {
        timestamp,
        peakG: totalG,
        freeFallG: this.lowestFreeFallG,
      };
      this.reset();
      return event;
    }

    // 3. Clear expired freefall window
    if (this.freeFallTimestamp && timestamp - this.freeFallTimestamp > this.config.impactWindowMs) {
      this.reset();
    }

    return null;
  }

  public reset(): void {
    this.freeFallTimestamp = null;
    this.lowestFreeFallG = 1.0;
  }
}
