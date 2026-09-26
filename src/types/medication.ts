export interface Pill {
  id: string;
  name: string;
  dosage: string;
  scheduledTime: string;
  isTaken: boolean;
  takenAt?: string;
}

export type PillActionIntent = 'TAKEN' | 'SNOOZED' | 'UNRESPONSIVE';
