import { Platform } from 'react-native';
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
      console.warn('[AudioRecorder] Permission check error:', err);
      return false;
    }
  }

  public async startRecording(): Promise<boolean> {
    try {
      const hasPermission = await this.requestPermissions();
      if (!hasPermission) {
        console.warn('[AudioRecorder] Mic permission denied');
        return false;
      }

      await setAudioModeAsync({
        allowsRecording: true,
        playsInSilentMode: true,
      });

      const preset = RecordingPresets.HIGH_QUALITY;
      const options = {
        extension: preset.extension,
        sampleRate: preset.sampleRate,
        numberOfChannels: preset.numberOfChannels,
        bitRate: preset.bitRate,
        isMeteringEnabled: false,
        ...(Platform.OS === 'android' ? preset.android : preset.ios),
      };

      this.recorder = new AudioModule.AudioRecorder(options);
      await this.recorder.prepareToRecordAsync();
      this.recorder.record();
      console.log('[AudioRecorder] Recording started successfully');
      return true;
    } catch (err) {
      console.error('[AudioRecorder] Failed to start recording:', err);
      this.recorder = null;
      return false;
    }
  }

  public async stopRecording(): Promise<string | null> {
    try {
      if (!this.recorder) return null;
      await this.recorder.stop();
      const uri = this.recorder.uri;
      console.log('[AudioRecorder] Recording stopped, URI:', uri);
      this.recorder = null;
      return uri;
    } catch (err) {
      console.error('[AudioRecorder] Failed to stop recording:', err);
      this.recorder = null;
      return null;
    }
  }
}

export const audioRecorder = new AudioRecorderService();
