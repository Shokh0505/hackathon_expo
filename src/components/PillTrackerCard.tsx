import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Pill } from '../types/medication';
import { styles } from './PillTrackerCard.styles';

interface Props {
  pills: Pill[];
  onTriggerReminder: (pill: Pill) => void;
  onTogglePill: (pillId: string) => void;
}

export const PillTrackerCard: React.FC<Props> = ({
  pills,
  onTriggerReminder,
  onTogglePill,
}) => {
  const takenCount = pills.filter((p) => p.isTaken).length;

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.cardTitle}>TODAY'S MEDICATIONS</Text>
        <Text style={styles.pillCount}>
          {takenCount}/{pills.length} Taken
        </Text>
      </View>

      <View style={styles.pillList}>
        {pills.map((pill) => (
          <View key={pill.id} style={styles.pillItem}>
            <TouchableOpacity
              style={[styles.checkCircle, pill.isTaken && styles.checkCircleTaken]}
              onPress={() => onTogglePill(pill.id)}
            >
              {pill.isTaken && <Text style={styles.checkMark}>✓</Text>}
            </TouchableOpacity>

            <View style={styles.pillInfo}>
              <Text style={[styles.pillName, pill.isTaken && styles.pillNameTaken]}>
                {pill.name}
              </Text>
              <Text style={styles.pillDosage}>
                {pill.dosage} • {pill.scheduledTime}
              </Text>
            </View>

            {!pill.isTaken && (
              <TouchableOpacity
                style={styles.remindBtn}
                onPress={() => onTriggerReminder(pill)}
              >
                <Text style={styles.remindBtnText}>Ask AI 🎙️</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>
    </View>
  );
};
