import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  LayoutAnimation,
  Platform,
  UIManager
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import OsakaImage from './assets/osaka.png';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const osakaTimeline = [
  { time: '09:00', title: '공항 도착', location: '간사이 국제 공항', desc: '공항 도착 후 기차 탑승' },
  { time: '11:00\n13:00', title: '도톤보리 구경', location: '오사카, 도톤보리', desc: '먹거리, 구경하기' },
  { time: '13:00\n15:00', title: '쇼핑하러 가기', location: '다이마루 백화점', desc: '구경 및 쇼핑' },
  { time: '15:00\n18:00', title: '오사카 성', location: '오사카 성', desc: '성 구경 및 포토타임' },
  { time: '18:00', title: '숙소 도착', location: '1 Chome Senshukukokita, Izumisano', desc: '숙소 이동 및 자유시간' },
];

const tripData = [
  {
    id: '1',
    status: '여행 중',
    title: '오사카 여행',
    date: '2026.02.15 - 2026.02.21',
    image: OsakaImage,
    locationCount: 5,
    dayCount: 7,
    timeline: osakaTimeline,
  },
  {
    id: '2',
    status: '예정',
    title: 'Jeju',
    date: '2026.03.01 - 2026.03.04',
    image: null,
    locationCount: 3,
    dayCount: 4,
    timeline: [],
  },
  {
    id: '3',
    status: '종료',
    title: '구텐탁   ',
    date: '2026.00.00 - 2026.00.00',
    image: null,
    locationCount: 1,
    dayCount: 1,
    timeline: [],
  },
];

const TravelApp = () => {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [expandedId, setExpandedId] = useState<string | null>('0');

  const filters = ['전체', '예정된 여행', '지난 여행'];

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>내여행</Text>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>+ 추가</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {filters.map(filter => (
            <TouchableOpacity
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterButton, activeFilter === filter && styles.filterButtonActive]}>
              <Text style={[styles.filterText, activeFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.listContent}>
        {tripData.map(item => {
          const isExpanded = expandedId === item.id;
          const hasImage = item.image !== null;
          return (
            <View key={item.id} style={styles.cardContainer}>
              <View style={[styles.cardHeader, !hasImage && styles.mintBackground]}>
                {hasImage && <Image source={item.image} style={styles.cardImage} />}
                <View style={[styles.statusTag, item.status === '여행 중' ? styles.statusGreen : item.status === '종료'? styles.statusGrey : styles.statusOrange]}>
                  <Text style={item.status === '여행 중' ? styles.statusTextGreen : item.status === '종료'? styles.statusTextGrey : styles.statusTextOrange}>{item.status}</Text>
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
                    <Text style={styles.infoText}>{item.locationCount}개 일정  {item.dayCount}일간</Text>
                  </View>
                  <TouchableOpacity onPress={() => toggleExpand(item.id)} style={styles.expandButton}>
                    <Text style={styles.expandButtonText}>{isExpanded ? '일정 접기' : '일정 보기'}</Text>
                    <Icon name={isExpanded ? "chevron-up" : "chevron-down"} size={16} color="#FF6B35" />
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
        })}
      </ScrollView>

      <View style={styles.bottomBar}>
        <View style={styles.barItem}><Icon name="search" size={22} color="#999" /><Text style={styles.barLabel}>검색</Text></View>
        <View style={styles.barItem}><Icon name="map" size={22} color="#FF6B35" /><Text style={[styles.barLabel, styles.barLabelActive]}>내여행</Text></View>
        <View style={styles.barItem}><Icon name="compass" size={22} color="#999" /><Text style={styles.barLabel}>홈</Text></View>
        <View style={styles.barItem}><Icon name="bookmark" size={22} color="#999" /><Text style={styles.barLabel}>저장</Text></View>
        <View style={styles.barItem}><Icon name="user" size={22} color="#999" /><Text style={styles.barLabel}>마이페이지</Text></View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20, backgroundColor: '#fff' },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  addButton: { backgroundColor: '#DF6C20', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 },
  addButtonText: { color: '#fff', fontSize: 13},
  filterContainer: { backgroundColor: '#fff', paddingBottom: 20 },
  filterScroll: { paddingHorizontal: 15 },
  filterButton: { paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1,borderColor: '#E5E5E5', backgroundColor: '#FFF', marginRight: 10 },
  filterButtonActive: { backgroundColor: '#DF6C20' },
  filterText: { color: '#919191', fontSize: 10},
  filterTextActive: { color: '#fff' },
  listContent: { padding: 15, paddingBottom: 80 },
  cardContainer: { backgroundColor: '#fff', borderRadius: 15, marginBottom: 20, overflow: 'hidden', elevation: 3 },
  cardHeader: { height: 180 },
  cardImage: { width: '100%', height: '100%' },
  mintBackground: { backgroundColor: '#6FAEB5' },
  titleOverlay: { position: 'absolute', bottom: 7, left: 10 },
  cardTitle: { fontSize: 22, color: '#fff' },
  cardDate: { fontSize: 12, color: '#fff', marginLeft: 5},
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
  infoText: { fontSize: 14, color: '#666', marginLeft: 5 },
  expandButton: { flexDirection: 'row', alignItems: 'center' },
  expandButtonText: { fontSize: 13, color: '#DF6C20', fontWeight: 'bold', marginRight: 5 },
  detailsContainer: { marginTop: 15 },
  detailsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  detailsHeaderText: { fontSize: 14, fontWeight: 'bold', color: 'grey' },
  divider: { height: 1, backgroundColor: '#EEE', marginBottom: 15 },
  dateDropdown: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#DDD', paddingVertical: 4, paddingHorizontal: 10 },
  dateDropdownText: { fontSize: 10, color: '#666', marginRight: 5 },
  timelineList: { paddingLeft: 5 },
  timelineItem: { flexDirection: 'row' },
  timelineLeft: { width: 60, alignItems: 'center' },
  timeBox: { backgroundColor: '#FFE5D8', padding: 8, borderRadius: 8, width: 60, height: 60, alignItems: 'center', justifyContent: 'center'},
  timeText: { fontSize: 10, color: '#DF6C20', fontWeight: 'bold', textAlign: 'center' },
  verticalLine: { width: 2, flex: 1, backgroundColor: '#C5C5C5', marginVertical: 2 },
  timelineRight: { flex: 1, paddingLeft: 15, paddingBottom: 20 },
  eventTitle: { fontSize: 16, fontWeight: 'bold', color: '#333' },
  locationText: { fontSize: 11, color: '#A8A8A8', marginVertical: 2 },
  descText: { fontSize: 12, color: '#A8A8A8' },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: '#fff', flexDirection: 'row', borderTopWidth: 1, borderColor: '#EEE' },
  barItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  barLabel: { fontSize: 10, color: '#999', marginTop: 5 },
  barLabelActive: { color: '#FF6B35', fontWeight: 'bold' }
});

export default TravelApp;