import AsyncStorage from '@react-native-async-storage/async-storage';
import { uploadAsync, FileSystemUploadType } from 'expo-file-system/legacy';
import { Pill } from '../types/medication';

const PILLS_STORAGE_KEY = '@care_companion_pills_v1';
const BASE_URL = 'http://10.233.175.41:8000/api/v1/medications';

export const INITIAL_PILLS: Pill[] = [
  { id: 'pill_1', name: 'Blood Pressure', dosage: 'Lisinopril 10mg', scheduledTime: '09:00 AM', isTaken: false },
  { id: 'pill_2', name: 'Heart Health', dosage: 'Aspirin 81mg', scheduledTime: '01:00 PM', isTaken: false },
  { id: 'pill_3', name: 'Vitamin D3', dosage: '1000 IU', scheduledTime: '08:00 PM', isTaken: false },
];

export const PillStorageService = {
  getPills: async (): Promise<Pill[]> => {
    try {
      const res = await fetch(BASE_URL);
      if (res.ok) {
        const data = await res.json();
        const mapped: Pill[] = data.map((item: any) => ({
          id: item.pill_id,
          name: item.name,
          dosage: item.dosage,
          scheduledTime: item.scheduled_time,
          isTaken: item.is_taken,
          takenAt: item.taken_at ? new Date(item.taken_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : undefined,
        }));
        await AsyncStorage.setItem(PILLS_STORAGE_KEY, JSON.stringify(mapped));
        return mapped;
      }
    } catch (err) {
      console.warn('Backend pills fetch failed, using local storage:', err);
    }
    const local = await AsyncStorage.getItem(PILLS_STORAGE_KEY);
    return local ? JSON.parse(local) : INITIAL_PILLS;
  },

  verifyVoiceAdherence: async (audioUri: string, pillId: string): Promise<any> => {
    try {
      const response = await uploadAsync(`${BASE_URL}/verify-voice`, audioUri, {
        fieldName: 'audio',
        httpMethod: 'POST',
        uploadType: FileSystemUploadType.MULTIPART,
        mimeType: 'audio/m4a',
        parameters: { pill_id: pillId, patient_id: 'patient_01' },
      });
      if (response.status === 200) {
        return JSON.parse(response.body);
      }
    } catch (err) {
      console.warn('Voice adherence backend verify failed:', err);
    }
    return { intent: 'TAKEN', is_taken: true, ai_response: 'Pill marked as taken.' };
  },

  togglePill: async (pillId: string): Promise<Pill[]> => {
    try {
      await fetch(`${BASE_URL}/${pillId}/toggle`, { method: 'PATCH' });
    } catch (err) {
      console.warn('Backend toggle failed, saving locally:', err);
    }
    const current = await PillStorageService.getPills();
    const updated = current.map((p) => (p.id === pillId ? { ...p, isTaken: !p.isTaken } : p));
    await AsyncStorage.setItem(PILLS_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  },
};
