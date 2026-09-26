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
    } catch {
      return false;
    }
  }

  public async startRecording(): Promise<boolean> {
    try {
      if (!(await this.requestPermissions())) return false;
      await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
      const p = RecordingPresets.HIGH_QUALITY;
      const opts = {
        extension: p.extension,
        sampleRate: p.sampleRate,
        numberOfChannels: p.numberOfChannels,
        bitRate: p.bitRate,
        isMeteringEnabled: true,
        ...(Platform.OS === 'android' ? p.android : p.ios),
      };
      this.recorder = new AudioModule.AudioRecorder(opts);
      await this.recorder.prepareToRecordAsync();
      this.recorder.record();
      return true;
    } catch (err) {
      console.error('[AudioRecorder] Start error:', err);
      this.recorder = null;
      return false;
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
      console.error('[AudioRecorder] Stop error:', err);
      this.recorder = null;
      return null;
    }
  }

  public async recordWithVad(maxMs = 6000, minMs = 1500): Promise<string | null> {
    if (!(await this.startRecording())) return null;
    let hasSpoken = false;
    let silenceStart = 0;
    const startTime = Date.now();

    return new Promise((resolve) => {
      const timer = setInterval(async () => {
        if (!this.recorder) {
          clearInterval(timer);
          return resolve(null);
        }
        const elapsed = Date.now() - startTime;
        const db = this.recorder.getStatus()?.metering ?? -160;

        if (db > -35) {
          hasSpoken = true;
          silenceStart = 0;
        } else if (hasSpoken && db < -42) {
          if (!silenceStart) silenceStart = Date.now();
          if (Date.now() - silenceStart >= 1000 && elapsed >= minMs) {
            clearInterval(timer);
            return resolve(await this.stopRecording());
          }
        }

        if (elapsed >= maxMs) {
          clearInterval(timer);
          return resolve(await this.stopRecording());
        }
      }, 100);
    });
  }
}

export const audioRecorder = new AudioRecorderService();
