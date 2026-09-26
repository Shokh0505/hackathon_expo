import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFallDetection } from './src/hooks/useFallDetection';
import { SphereFace } from './src/components/SphereFace';
import { CompanionSpeechBubble } from './src/components/CompanionSpeechBubble';
import { CompanionControls } from './src/components/CompanionControls';

export default function App() {
  const {
    state,
    voiceStatus,
    aiTriage,
    resetToNormal,
    triggerTestFall,
  } = useFallDetection();

  const isFallen = state === 'FALLEN';

  return (
    <SafeAreaView style={[styles.safeArea, isFallen ? styles.bgFallen : styles.bgNormal]}>
      <StatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.badgeText}>LAS VEGAS SPHERE AI COMPANION</Text>
          <Text style={styles.titleText}>{isFallen ? '⚠️ I AM WORRIED' : '💛 ALL GOOD & HAPPY'}</Text>
        </View>

        <SphereFace state={state} voiceStatus={voiceStatus} />

        <CompanionSpeechBubble
          state={state}
          voiceStatus={voiceStatus}
          aiTriage={aiTriage}
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
    padding: 24,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
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
    marginTop: 6,
    letterSpacing: 0.5,
  },
});
