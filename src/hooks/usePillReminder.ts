import { useState, useEffect, useCallback, useRef } from 'react';
import { Pill } from '../types/medication';
import { PillStorageService } from '../services/pillStorage';
import { VoiceService } from '../services/voiceService';
import { audioRecorder } from '../services/audioRecorder';

export function usePillReminder(onVoiceStatusChange: (status: any) => void) {
  const [pills, setPills] = useState<Pill[]>([]);
  const isRunningRef = useRef(false);

  useEffect(() => {
    PillStorageService.getPills().then(setPills);
  }, []);

  const triggerPillReminder = useCallback(
    async (pill: Pill) => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;
      onVoiceStatusChange('SPEAKING');

      VoiceService.alertPillReminder(pill.name, async () => {
        onVoiceStatusChange('LISTENING');
        const audioUri = await audioRecorder.recordWithVad(6000, 1500);

        onVoiceStatusChange('ANALYZING');
        let isTaken = false;

        if (audioUri) {
          const res = await PillStorageService.verifyVoiceAdherence(audioUri, pill.id);
          isTaken = res.is_taken ?? (res.intent === 'TAKEN');
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
          isRunningRef.current = false;
        }, 1500);
      });
    },
    [onVoiceStatusChange]
  );

  const triggerNextDuePill = useCallback(() => {
    const nextDue = pills.find((p) => !p.isTaken) || pills[0];
    if (nextDue) triggerPillReminder(nextDue);
  }, [pills, triggerPillReminder]);

  const togglePill = async (pillId: string) => {
    const updated = await PillStorageService.togglePill(pillId);
    setPills(updated);
  };

  return { pills, triggerPillReminder, triggerNextDuePill, togglePill };
}
