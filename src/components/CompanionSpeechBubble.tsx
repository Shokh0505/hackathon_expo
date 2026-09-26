import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FallState, VoiceStatus } from '../types/sensors';
import { TriageResult } from '../services/aiTriageService';

interface Props {
  state: FallState;
  voiceStatus: VoiceStatus;
  aiTriage: TriageResult | null;
}

export const CompanionSpeechBubble: React.FC<Props> = ({
  state,
  voiceStatus,
  aiTriage,
}) => {
  const isFallen = state === 'FALLEN';

  const getMessage = () => {
    if (!isFallen) {
      return {
        title: 'All Good & Safe',
        subtitle: "I'm monitoring your posture and balance.",
      };
    }
    if (aiTriage?.aiResponse) {
      return {
        title: aiTriage.isOk ? 'Safe Confirmation' : 'Emergency Alert',
        subtitle: aiTriage.aiResponse,
      };
    }
    switch (voiceStatus) {
      case 'SPEAKING':
        return {
          title: 'Fall Detected!',
          subtitle: 'Are you okay? Please answer me.',
        };
      case 'LISTENING':
        return {
          title: 'Listening...',
          subtitle: 'Say "I am OK" or ask for help now.',
        };
      case 'ANALYZING':
        return {
          title: 'Analyzing Voice...',
          subtitle: 'Checking your condition with AI triage.',
        };
      case 'RESPONDED':
        return {
          title: 'Ambulance Dispatched',
          subtitle: 'Stay still. Contacts & medical team notified.',
        };
      default:
        return {
          title: 'Sudden Movement!',
          subtitle: 'Checking in on you...',
        };
    }
  };

  const msg = getMessage();

  return (
    <View style={styles.bubbleCard}>
      <Text style={styles.bubbleTitle}>{msg.title}</Text>
      <Text style={styles.bubbleSubtitle}>{msg.subtitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.85)',
    borderRadius: 20,
    padding: 22,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  bubbleTitle: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  bubbleSubtitle: {
    color: '#94a3b8',
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
  },
});
