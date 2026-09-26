import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c1917',
    borderRadius: 20,
    padding: 18,
    marginVertical: 14,
    borderWidth: 1,
    borderColor: '#292524',
    width: '100%',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    color: '#a8a29e',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  pillCount: {
    color: '#fbbf24',
    fontSize: 12,
    fontWeight: '700',
  },
  pillList: {
    gap: 10,
  },
  pillItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#292524',
    padding: 12,
    borderRadius: 14,
  },
  checkCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    borderColor: '#78716c',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkCircleTaken: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  checkMark: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '900',
  },
  pillInfo: {
    flex: 1,
  },
  pillName: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '700',
  },
  pillNameTaken: {
    color: '#78716c',
    textDecorationLine: 'line-through',
  },
  pillDosage: {
    color: '#a8a29e',
    fontSize: 12,
    marginTop: 2,
  },
  remindBtn: {
    backgroundColor: '#3b2507',
    borderWidth: 1,
    borderColor: '#d97706',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  remindBtnText: {
    color: '#fde047',
    fontSize: 11,
    fontWeight: '700',
  },
});
