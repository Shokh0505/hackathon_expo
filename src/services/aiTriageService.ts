import { audioRecorder } from './audioRecorder';
import { VoiceService } from './voiceService';

export interface TriageResult {
  transcript: string;
  isOk: boolean;
  severity: 'LOW' | 'MEDIUM' | 'CRITICAL';
  aiResponse: string;
}

export const AITriageService = {
  backendUrl: '',

  analyzeAudio: async (audioUri: string): Promise<TriageResult> => {
    if (AITriageService.backendUrl) {
      try {
        const formData = new FormData();
        formData.append('audio', {
          uri: audioUri,
          type: 'audio/m4a',
          name: 'response.m4a',
        } as any);

        const res = await fetch(AITriageService.backendUrl, {
          method: 'POST',
          body: formData,
        });
        return await res.json();
      } catch (err) {
        console.warn('Backend triage failed:', err);
      }
    }

    // Default 1.5s simulated AI understanding
    await new Promise((resolve) => setTimeout(resolve, 1500));
    return {
      transcript: 'I am okay, no emergency.',
      isOk: true,
      severity: 'LOW',
      aiResponse: "Glad you're okay. Resetting system to normal.",
    };
  },

  recordAndAnalyze: async (durationMs: number = 4000): Promise<TriageResult | null> => {
    await audioRecorder.startRecording();
    await new Promise((resolve) => setTimeout(resolve, durationMs));
    const audioUri = await audioRecorder.stopRecording();
    if (!audioUri) return null;
    return await AITriageService.analyzeAudio(audioUri);
  },
};
