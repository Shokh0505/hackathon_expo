import React from 'react';
import { Modal, View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { Pill } from '../types/medication';
import { styles } from './MedicationModal.styles';

interface Props {
  visible: boolean;
  pills: Pill[];
  onClose: () => void;
  onTriggerPill: (pill: Pill) => void;
  onTogglePill: (pillId: string) => void;
}

export const MedicationModal: React.FC<Props> = ({
  visible,
  pills,
  onClose,
  onTriggerPill,
  onTogglePill,
}) => {
  const takenCount = pills.filter((p) => p.isTaken).length;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet">
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>Medication Schedule</Text>
            <Text style={styles.subTitle}>{takenCount}/{pills.length} Taken Today</Text>
          </View>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeBtnText}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollList}>
          {pills.map((pill) => (
            <View key={pill.id} style={styles.pillCard}>
              <TouchableOpacity
                style={[styles.checkCircle, pill.isTaken && styles.checkCircleTaken]}
                onPress={() => onTogglePill(pill.id)}
              >
                {pill.isTaken && <Text style={styles.checkMark}>✓</Text>}
              </TouchableOpacity>

              <View style={styles.info}>
                <Text style={[styles.name, pill.isTaken && styles.nameTaken]}>{pill.name}</Text>
                <Text style={styles.dosage}>{pill.dosage} • {pill.scheduledTime}</Text>
              </View>

              {!pill.isTaken && (
                <TouchableOpacity
                  style={styles.voiceBtn}
                  onPress={() => {
                    onClose();
                    onTriggerPill(pill);
                  }}
                >
                  <Text style={styles.voiceBtnText}>Ask AI 🎙️</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
