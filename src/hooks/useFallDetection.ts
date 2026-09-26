import { useState, useEffect, useRef, useCallback } from 'react';
import { Accelerometer } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import { FallDetector } from '../services/fallDetector';
import { VoiceService } from '../services/voiceService';
import { audioRecorder } from '../services/audioRecorder';
import { AITriageService, TriageResult } from '../services/aiTriageService';
import { DEFAULT_CONFIG } from '../config/fallDetection';
import { FallState, Vector3D, FallEvent, VoiceStatus } from '../types/sensors';

export function useFallDetection() {
  const [state, setState] = useState<FallState>('NORMAL');
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('IDLE');
  const [aiTriage, setAiTriage] = useState<TriageResult | null>(null);
  const [liveG, setLiveG] = useState<number>(1.0);
  const [vector, setVector] = useState<Vector3D>({ x: 0, y: 0, z: 0 });

  const detectorRef = useRef<FallDetector>(new FallDetector(DEFAULT_CONFIG));

  const startVoiceTriage = useCallback(async (peakG: number) => {
    try {
      setVoiceStatus('LISTENING');
      const triage = await AITriageService.recordAndAnalyze(4000, peakG);

      if (!triage) {
        setVoiceStatus('IDLE');
        return;
      }

      setVoiceStatus('ANALYZING');
      setAiTriage(triage);

      if (triage.isOk) {
        VoiceService.alertReset(triage.aiResponse);
        detectorRef.current.reset();
        setState('NORMAL');
        setVoiceStatus('IDLE');
      } else {
        VoiceService.alertEmergencyDispatched();
        setVoiceStatus('RESPONDED');
      }
    } catch (err) {
      console.error('Voice triage error:', err);
      setVoiceStatus('IDLE');
    }
  }, []);

  const onFallDetected = useCallback((event: FallEvent) => {
    setState('FALLEN');
    setVoiceStatus('SPEAKING');
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    VoiceService.alertFallDetected(() => startVoiceTriage(event.peakG));
  }, [startVoiceTriage]);

  const resetToNormal = useCallback(() => {
    audioRecorder.stopRecording();
    VoiceService.stop();
    detectorRef.current.reset();
    setState('NORMAL');
    setVoiceStatus('IDLE');
    setAiTriage(null);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    VoiceService.alertReset();
  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(DEFAULT_CONFIG.updateIntervalMs);
    const sub = Accelerometer.addListener((data) => {
      setLiveG(detectorRef.current.calculateTotalG(data));
      setVector(data);
      if (state === 'NORMAL') {
        const fallEvent = detectorRef.current.processReading(data);
        if (fallEvent) onFallDetected(fallEvent);
      }
    });
    return () => sub.remove();
  }, [state, onFallDetected]);

  return {
    state,
    voiceStatus,
    aiTriage,
    liveG,
    vector,
    resetToNormal,
    triggerTestFall: () => onFallDetected({ timestamp: Date.now(), peakG: 3.45, freeFallG: 0.22 }),
  };
}
