export interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export type FallState = 'NORMAL' | 'FALLEN';

export type VoiceStatus = 'IDLE' | 'SPEAKING' | 'LISTENING' | 'ANALYZING' | 'RESPONDED';

export interface FallDetectionConfig {
  updateIntervalMs: number;
  freeFallThresholdG: number;
  impactThresholdG: number;
  impactWindowMs: number;
}

export interface FallEvent {
  timestamp: number;
  peakG: number;
  freeFallG: number;
}
