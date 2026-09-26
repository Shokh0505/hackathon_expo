import { useState, useEffect, useCallback } from 'react';
import { Pill } from '../types/medication';
import { PillStorageService } from '../services/pillStorage';
import { VoiceService } from '../services/voiceService';
import { audioRecorder } from '../services/audioRecorder';

export function usePillReminder(onVoiceStatusChange: (status: any) => void) {
  const [pills, setPills] = useState<Pill[]>([]);
  const [activePill, setActivePill] = useState<Pill | null>(null);

  useEffect(() => {
    PillStorageService.getPills().then(setPills);
  }, []);

  const triggerPillReminder = useCallback(
    async (pill: Pill) => {
      setActivePill(pill);
      onVoiceStatusChange('SPEAKING');

      VoiceService.alertPillReminder(pill.name, async () => {
        onVoiceStatusChange('LISTENING');
        const started = await audioRecorder.startRecording();
        await new Promise((resolve) => setTimeout(resolve, 4000));
        const audioUri = started ? await audioRecorder.stopRecording() : null;

        onVoiceStatusChange('ANALYZING');
        let isTaken = false;
        let aiResponse = '';

        if (audioUri) {
          const res = await PillStorageService.verifyVoiceAdherence(audioUri, pill.id);
          isTaken = res.is_taken ?? (res.intent === 'TAKEN');
          aiResponse = res.ai_response;
        }

        if (isTaken) {
          const updated = await PillStorageService.togglePill(pill.id);
          setPills(updated);
          VoiceService.alertPillTaken(pill.name);
        } else {
          VoiceService.alertPillSnoozed();
        }

        setTimeout(() => {
          onVoiceStatusChange('IDLE');
          setActivePill(null);
        }, 1500);
      });
    },
    [onVoiceStatusChange]
  );

  const togglePill = async (pillId: string) => {
    const updated = await PillStorageService.togglePill(pillId);
    setPills(updated);
  };

  return { pills, activePill, triggerPillReminder, togglePill };
}
