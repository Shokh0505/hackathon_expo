import { FallState, VoiceStatus } from '../types/sensors';

export interface SphereMoodConfig {
  sphereColor: string;
  shadowColor: string;
  leftEyePupil: { x: number; y: number };
  rightEyePupil: { x: number; y: number };
  mouthType: 'HAPPY_SMILE' | 'WORRIED_O' | 'LISTENING_O' | 'THINKING_WAVE' | 'DIZZY_SAD';
  showBlush: boolean;
  pulseSpeed: number;
}

export function getSphereMood(state: FallState, voiceStatus: VoiceStatus): SphereMoodConfig {
  if (state === 'NORMAL') {
    return {
      sphereColor: '#fbbf24', // Warm Las Vegas Sphere Golden Yellow
      shadowColor: '#d97706',
      leftEyePupil: { x: 0, y: 0 },
      rightEyePupil: { x: 0, y: 0 },
      mouthType: 'HAPPY_SMILE',
      showBlush: true,
      pulseSpeed: 1600,
    };
  }

  switch (voiceStatus) {
    case 'SPEAKING':
      return {
        sphereColor: '#f59e0b',
        shadowColor: '#b45309',
        leftEyePupil: { x: 0, y: -2 },
        rightEyePupil: { x: 0, y: -2 },
        mouthType: 'WORRIED_O',
        showBlush: false,
        pulseSpeed: 600,
      };
    case 'LISTENING':
      return {
        sphereColor: '#facc15',
        shadowColor: '#ca8a04',
        leftEyePupil: { x: 0, y: 2 },
        rightEyePupil: { x: 0, y: 2 },
        mouthType: 'LISTENING_O',
        showBlush: true,
        pulseSpeed: 400,
      };
    case 'ANALYZING':
      return {
        sphereColor: '#eab308',
        shadowColor: '#a16207',
        leftEyePupil: { x: 3, y: -3 },
        rightEyePupil: { x: 3, y: -3 },
        mouthType: 'THINKING_WAVE',
        showBlush: false,
        pulseSpeed: 500,
      };
    case 'RESPONDED':
      return {
        sphereColor: '#f87171',
        shadowColor: '#dc2626',
        leftEyePupil: { x: 0, y: 0 },
        rightEyePupil: { x: 0, y: 0 },
        mouthType: 'DIZZY_SAD',
        showBlush: false,
        pulseSpeed: 300,
      };
    default:
      return {
        sphereColor: '#fbbf24',
        shadowColor: '#d97706',
        leftEyePupil: { x: 0, y: 0 },
        rightEyePupil: { x: 0, y: 0 },
        mouthType: 'WORRIED_O',
        showBlush: false,
        pulseSpeed: 800,
      };
  }
}
