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

  alertFallDetected: (onDone?: () => void) => {
    VoiceService.speak(
      'Warning! Fall detected! Are you okay? Please speak now.',
      onDone
    );
  },

  alertPillReminder: (pillName: string, onDone?: () => void) => {
    VoiceService.speak(
      `Hello! It is time for your ${pillName}. Have you taken your medicine?`,
      onDone
    );
  },

  alertPillTaken: (pillName: string) => {
    VoiceService.speak(`Wonderful! I have marked your ${pillName} as taken.`);
  },

  alertPillSnoozed: () => {
    VoiceService.speak("Understood. I will remind you again in 10 minutes.");
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
