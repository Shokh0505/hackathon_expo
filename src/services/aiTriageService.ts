import { uploadAsync, FileSystemUploadType } from 'expo-file-system/legacy';
import { audioRecorder } from './audioRecorder';

export interface TriageResult {
  transcript: string;
  isOk: boolean;
  severity: 'LOW' | 'MEDIUM' | 'CRITICAL';
  aiResponse: string;
}

export const AITriageService = {
  backendUrl: 'http://10.233.175.41:8000/api/v1/triage/audio',

  analyzeAudio: async (
    audioUri: string | null,
    peakG: number = 3.0
  ): Promise<TriageResult> => {
    if (AITriageService.backendUrl && audioUri) {
      try {
        console.log('[AITriage] Uploading audio to:', AITriageService.backendUrl);
        const response = await uploadAsync(AITriageService.backendUrl, audioUri, {
          fieldName: 'audio',
          httpMethod: 'POST',
          uploadType: FileSystemUploadType.MULTIPART,
          mimeType: 'audio/m4a',
          parameters: {
            peak_g: String(peakG),
            device_id: 'chest-iot-node-01',
            timestamp: String(Date.now()),
          },
        });

        console.log('[AITriage] Backend response:', response.status, response.body);
        if (response.status === 200) {
          const data = JSON.parse(response.body);
          return {
            transcript: data.transcript ?? '',
            isOk: data.is_ok ?? data.isOk ?? true,
            severity: data.severity ?? 'LOW',
            aiResponse: data.ai_response ?? data.aiResponse ?? "I've processed your status.",
          };
        }
        console.warn('[AITriage] Non-200 response:', response.status, response.body);
      } catch (err) {
        console.warn('[AITriage] Upload failed:', err);
      }
    }

    console.log('[AITriage] Using fallback response');
    return {
      transcript: 'I am okay (fallback)',
      isOk: true,
      severity: 'LOW',
      aiResponse: "Glad you're okay. System back to normal.",
    };
  },

  recordAndAnalyze: async (
    durationMs: number = 4000,
    peakG: number = 3.0
  ): Promise<TriageResult> => {
    console.log('[AITriage] Initiating voice recording...');
    const started = await audioRecorder.startRecording();
    await new Promise((resolve) => setTimeout(resolve, durationMs));
    const audioUri = started ? await audioRecorder.stopRecording() : null;
    return await AITriageService.analyzeAudio(audioUri, peakG);
  },
};
