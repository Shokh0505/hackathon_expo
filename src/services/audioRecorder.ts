import {
  AudioModule,
  RecordingPresets,
  requestRecordingPermissionsAsync,
  setAudioModeAsync,
} from 'expo-audio';

export class AudioRecorderService {
  private recorder: any = null;

  public async requestPermissions(): Promise<boolean> {
    try {
      const { granted } = await requestRecordingPermissionsAsync();
      return granted;
    } catch (err) {
      console.warn('Microphone permission error:', err);
      return false;
    }
  }

  public async startRecording(): Promise<void> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        throw new Error('Microphone permission denied');
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      this.recorder = new AudioModule.AudioRecorder(RecordingPresets.HIGH_QUALITY);
      await this.recorder.prepareToRecordAsync();
      this.recorder.record();
    } catch (err) {
      console.error('Failed to start recording:', err);
      throw err;
    }
  }

  public async stopRecording(): Promise<string | null> {
    try {
      if (!this.recorder) return null;
      await this.recorder.stop();
      const uri = this.recorder.uri;
      this.recorder = null;
      return uri;
    } catch (err) {
      console.error('Failed to stop recording:', err);
      return null;
    }
  }
}

export const audioRecorder = new AudioRecorderService();
