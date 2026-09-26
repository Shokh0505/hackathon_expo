import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FallState } from '../types/sensors';

interface Props {
  state: FallState;
  onReset: () => void;
  onTestFall: () => void;
  onTriggerPill: () => void;
  onOpenSchedule: () => void;
}

export const CompanionControls: React.FC<Props> = ({
  state,
  onReset,
  onTestFall,
  onTriggerPill,
  onOpenSchedule,
}) => {
  if (state === 'FALLEN') {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.resetBtn} onPress={onReset}>
          <Text style={styles.resetBtnText}>↺ I'M OK (RESET COMPANION)</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity style={styles.pillBtn} onPress={onTriggerPill}>
          <Text style={styles.pillBtnText}>💊 Check Pill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.scheduleBtn} onPress={onOpenSchedule}>
          <Text style={styles.scheduleBtnText}>📋 Schedule</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.testBtn} onPress={onTestFall}>
        <Text style={styles.testBtnText}>⚡ Simulate Test Fall</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '100%', paddingHorizontal: 10, gap: 10 },
  row: { flexDirection: 'row', gap: 10 },
  pillBtn: {
    flex: 1,
    backgroundColor: '#3b2507',
    borderWidth: 1,
    borderColor: '#d97706',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  pillBtnText: { color: '#fde047', fontSize: 14, fontWeight: '800' },
  scheduleBtn: {
    flex: 1,
    backgroundColor: '#1c1917',
    borderWidth: 1,
    borderColor: '#292524',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  scheduleBtnText: { color: '#e7e5e4', fontSize: 14, fontWeight: '700' },
  testBtn: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  testBtnText: { color: '#94a3b8', fontSize: 13, fontWeight: '600' },
  resetBtn: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: 'center',
  },
  resetBtnText: { color: '#dc2626', fontSize: 16, fontWeight: '900' },
});
