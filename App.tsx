import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFallDetection } from './src/hooks/useFallDetection';
import { usePillReminder } from './src/hooks/usePillReminder';
import { SphereFace } from './src/components/SphereFace';
import { CompanionSpeechBubble } from './src/components/CompanionSpeechBubble';
import { CompanionControls } from './src/components/CompanionControls';
import { PillTrackerCard } from './src/components/PillTrackerCard';
import { VoiceStatus } from './src/types/sensors';

export default function App() {
  const [localVoiceStatus, setLocalVoiceStatus] = useState<VoiceStatus>('IDLE');
  const { state, voiceStatus: fallVoiceStatus, aiTriage, resetToNormal, triggerTestFall } = useFallDetection();
  const { pills, triggerPillReminder, togglePill } = usePillReminder(setLocalVoiceStatus);

  const isFallen = state === 'FALLEN';
  const effectiveVoiceStatus = fallVoiceStatus !== 'IDLE' ? fallVoiceStatus : localVoiceStatus;

  return (
    <SafeAreaView style={[styles.safeArea, isFallen ? styles.bgFallen : styles.bgNormal]}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badgeText}>LAS VEGAS SPHERE AI COMPANION</Text>
          <Text style={styles.titleText}>{isFallen ? '⚠️ I AM WORRIED' : '💛 ALL GOOD & HAPPY'}</Text>
        </View>

        <SphereFace state={state} voiceStatus={effectiveVoiceStatus} />

        <CompanionSpeechBubble
          state={state}
          voiceStatus={effectiveVoiceStatus}
          aiTriage={aiTriage}
        />

        <PillTrackerCard
          pills={pills}
          onTriggerReminder={triggerPillReminder}
          onTogglePill={togglePill}
        />

        <CompanionControls
          state={state}
          onReset={resetToNormal}
          onTestFall={triggerTestFall}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  bgNormal: {
    backgroundColor: '#0c0a09',
  },
  bgFallen: {
    backgroundColor: '#450a0a',
  },
  container: {
    padding: 20,
    paddingTop: 24,
    alignItems: 'center',
    gap: 12,
  },
  header: {
    alignItems: 'center',
    marginTop: 6,
  },
  badgeText: {
    color: '#a8a29e',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 2,
  },
  titleText: {
    color: '#fef08a',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 4,
    letterSpacing: 0.5,
  },
});
