import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Vector3D } from '../types/sensors';

interface Props {
  liveG: number;
  vector: Vector3D;
}

export const TelemetryCard: React.FC<Props> = ({ liveG, vector }) => {
  return (
    <View style={styles.telemetryCard}>
      <Text style={styles.cardHeader}>LIVE ACCELEROMETER</Text>
      <View style={styles.gRow}>
        <Text style={styles.gLabel}>Total Acceleration</Text>
        <Text style={styles.gValue}>{liveG.toFixed(2)} G</Text>
      </View>

      <View style={styles.vectorRow}>
        <View style={styles.vectorItem}>
          <Text style={styles.axisLabel}>X (Lateral)</Text>
          <Text style={styles.axisValue}>{vector.x.toFixed(2)}</Text>
        </View>
        <View style={styles.vectorItem}>
          <Text style={styles.axisLabel}>Y (Vertical)</Text>
          <Text style={styles.axisValue}>{vector.y.toFixed(2)}</Text>
        </View>
        <View style={styles.vectorItem}>
          <Text style={styles.axisLabel}>Z (Forward)</Text>
          <Text style={styles.axisValue}>{vector.z.toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  telemetryCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 16,
    padding: 20,
  },
  cardHeader: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1.5,
    marginBottom: 16,
    textAlign: 'center',
  },
  gRow: {
    alignItems: 'center',
    marginBottom: 20,
  },
  gLabel: {
    color: '#94a3b8',
    fontSize: 13,
    marginBottom: 4,
  },
  gValue: {
    color: '#ffffff',
    fontSize: 44,
    fontWeight: '800',
    fontVariant: ['tabular-nums'],
  },
  vectorRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  vectorItem: {
    flex: 1,
    alignItems: 'center',
  },
  axisLabel: {
    color: '#94a3b8',
    fontSize: 12,
    marginBottom: 2,
  },
  axisValue: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
});
