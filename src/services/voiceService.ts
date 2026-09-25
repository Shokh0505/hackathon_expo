import * as Speech from 'expo-speech';

export const VoiceService = {
  speak: (text: string, onDone?: () => void) => {
    Speech.stop();
    Speech.speak(text, {
      language: 'en-US',
      pitch: 1.0,
      rate: 1.0,
      onDone: () => {
        if (onDone) onDone();
      },
    });
  },

  alertFallDetected: (onFinishedSpeaking?: () => void) => {
    VoiceService.speak(
      'Warning! Fall detected! Are you okay? Please speak now.',
      onFinishedSpeaking
    );
  },

  alertReset: (customMsg?: string) => {
    VoiceService.speak(customMsg || 'Alert canceled. System back to normal.');
  },

  alertEmergencyDispatched: () => {
    VoiceService.speak('Emergency assistance has been dispatched to your location.');
  },

  stop: () => {
    Speech.stop();
  },
};
