import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { VoiceStatus } from '../types/sensors';

interface Props {
  isFallen: boolean;
  voiceStatus: VoiceStatus;
}

export const StatusBanner: React.FC<Props> = ({ isFallen, voiceStatus }) => {
  const getSubStatus = () => {
    switch (voiceStatus) {
      case 'SPEAKING':
        return '🔊 AI Speaking Warning...';
      case 'LISTENING':
        return '🎙️ Listening... Speak now';
      case 'ANALYZING':
        return '🧠 AI Triage Analyzing...';
      case 'RESPONDED':
        return '🚨 Emergency Dispatched';
      default:
        return null;
    }
  };

  const subStatus = getSubStatus();

  return (
    <View style={[styles.statusBanner, isFallen ? styles.bannerFallen : styles.bannerNormal]}>
      <Text style={styles.statusLabel}>DEVICE STATUS</Text>
      <Text style={styles.statusText}>{isFallen ? '🚨 FALLEN' : '🟢 NORMAL'}</Text>
      {subStatus && (
        <View style={styles.subStatusBox}>
          <Text style={styles.subStatusText}>{subStatus}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  statusBanner: {
    borderRadius: 20,
    paddingVertical: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bannerNormal: {
    backgroundColor: '#064e3b',
    borderWidth: 2,
    borderColor: '#10b981',
  },
  bannerFallen: {
    backgroundColor: '#7f1d1d',
    borderWidth: 3,
    borderColor: '#fca5a5',
  },
  statusLabel: {
    color: '#cbd5e1',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 4,
  },
  statusText: {
    color: '#ffffff',
    fontSize: 38,
    fontWeight: '900',
    letterSpacing: 1,
  },
  subStatusBox: {
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 10,
  },
  subStatusText: {
    color: '#fef08a',
    fontSize: 13,
    fontWeight: '700',
  },
});
