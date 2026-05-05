import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const TripCard = ({ item, isExpanded, onToggle }) => {
  const hasImage = item.image !== null;

  return (
    <View style={styles.cardContainer}>
      <View style={[styles.cardHeader, !hasImage && styles.mintBackground]}>
        {hasImage && <Image source={item.image} style={styles.cardImage} />}
        <View style={[styles.statusTag, item.status === '여행 중' ? styles.statusGreen : item.status === '종료' ? styles.statusGrey : styles.statusOrange]}>
          <Text style={item.status === '여행 중' ? styles.statusTextGreen : item.status === '종료' ? styles.statusTextGrey : styles.statusTextOrange}>
            {item.status}
          </Text>
        </View>
        <View style={styles.titleOverlay}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.dateRow}>
            <Icon name="calendar" size={14} color="#fff" style={styles.dateIcon} />
            <Text style={styles.cardDate}>{item.date}</Text>
          </View>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.locationInfo}>
            <Icon name="map-pin" size={14} color="#999" />
            <Text style={styles.infoText}>{item.locationCount}개 일정 {item.dayCount}일간</Text>
          </View>
          <TouchableOpacity onPress={onToggle} style={styles.expandButton}>
            <Text style={styles.expandButtonText}>{isExpanded ? '일정 접기' : '일정 보기'}</Text>
            <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color="#DF6C20" />
          </TouchableOpacity>
        </View>

        {isExpanded && item.timeline.length > 0 && (
          <View style={styles.detailsContainer}>
            <View style={styles.divider} />
            <View style={styles.detailsHeader}>
              <Text style={styles.detailsHeaderText}>1일차 (2월 15일)</Text>
              <View style={styles.dateDropdown}>
                <Text style={styles.dateDropdownText}>2월 15일</Text>
                <Icon name="chevron-down" size={14} color="#666" />
              </View>
            </View>

            <View style={styles.timelineList}>
              {item.timeline.map((event, index) => (
                <View key={index} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={styles.timeBox}><Text style={styles.timeText}>{event.time}</Text></View>
                    {index !== item.timeline.length - 1 && <View style={styles.verticalLine} />}
                  </View>
                  <View style={styles.timelineRight}>
                    <Text style={styles.eventTitle}>{event.title}</Text>
                    <Text style={styles.locationText}><Icon name="map-pin" size={10} /> {event.location}</Text>
                    <Text style={styles.descText}>{event.desc}</Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, overflow: 'hidden', elevation: 3 },
  cardHeader: { height: 180 },
  cardImage: { width: '100%', height: '100%' },
  mintBackground: { backgroundColor: '#6FAEB5' },
  titleOverlay: { position: 'absolute', bottom: 7, left: 10 },
  cardTitle: { fontSize: 22, color: '#fff' },
  cardDate: { fontSize: 12, color: '#fff', marginLeft: 5 },
  dateRow: { flexDirection: 'row', alignItems: 'center', marginTop: 5 },
  statusTag: { position: 'absolute', alignItems: 'center', width: 60, top: 15, left: 15, paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
  statusGreen: { backgroundColor: '#C6FF8D' },
  statusOrange: { backgroundColor: '#FFD78D' },
  statusGrey: { backgroundColor: '#CFCFCF' },
  statusTextGreen: { fontSize: 11, fontWeight: 'bold', color: '#2D6800' },
  statusTextGrey: { fontSize: 11, fontWeight: 'bold', color: '#6B6B6B' },
  statusTextOrange: { fontSize: 11, fontWeight: 'bold', color: '#683100' },
  cardBody: { padding: 15 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  locationInfo: { flexDirection: 'row', alignItems: 'center' },
  infoText: { fontSize: 14, color: '#A8A8A8', marginLeft: 5 },
  expandButton: { flexDirection: 'row', alignItems: 'center' },
  expandButtonText: { fontSize: 10, color: '#DF6C20', marginRight: 5 },
  detailsContainer: { marginTop: 15 },
  detailsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  detailsHeaderText: { fontSize: 14, fontWeight: 'bold', color: 'grey' },
  divider: { height: 1, backgroundColor: '#EEE', marginBottom: 15 },
  dateDropdown: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', paddingVertical: 4, paddingHorizontal: 10 },
  dateDropdownText: { fontSize: 10, color: '#666', marginRight: 5 },
  timelineList: { paddingLeft: 5 },
  timelineItem: { flexDirection: 'row' },
  timelineLeft: { width: 60, alignItems: 'center' },
  timeBox: { backgroundColor: '#FFE5D8', padding: 8, borderRadius: 8, width: 60, height: 60, alignItems: 'center', justifyContent: 'center' },
  timeText: { fontSize: 10, color: '#DF6C20', fontWeight: 'bold', textAlign: 'center' },
  verticalLine: { width: 2, flex: 1, backgroundColor: '#C5C5C5', marginVertical: 2 },
  timelineRight: { flex: 1, paddingLeft: 15, paddingBottom: 20 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  locationText: { fontSize: 11, color: '#A8A8A8', marginVertical: 2 },
  descText: { fontSize: 12, color: '#A8A8A8' },
});

export default TripCard;