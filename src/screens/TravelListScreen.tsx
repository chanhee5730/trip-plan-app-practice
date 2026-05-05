import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, LayoutAnimation } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { TRIP_DATA } from '../constants/tripData';
import TripCard from '../components/TripCard';

const TravelListScreen = () => {
  const [activeFilter, setActiveFilter] = useState('전체');
  const [expandedId, setExpandedId] = useState<string | null>('1');
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
        <TouchableOpacity style={styles.addButton}><Text style={styles.addButtonText}>+ 추가</Text></TouchableOpacity>
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
        {TRIP_DATA.map(item => (
          <TripCard
            key={item.id}
            item={item}
            isExpanded={expandedId === item.id}
            onToggle={() => toggleExpand(item.id)}
          />
        ))}
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
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 20 },
  headerTitle: { fontSize: 20, fontWeight: 'bold' },
  addButton: { backgroundColor: '#DF6C20', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 10 },
  addButtonText: { color: '#fff', fontSize: 13 },
  filterContainer: { paddingBottom: 20 },
  filterScroll: { paddingHorizontal: 15 },
  filterButton: { paddingVertical: 5, paddingHorizontal: 15, borderRadius: 20, borderWidth: 1, borderColor: '#E5E5E5', marginRight: 10 },
  filterButtonActive: { backgroundColor: '#DF6C20' },
  filterText: { color: '#919191', fontSize: 10 },
  filterTextActive: { color: '#fff' },
  listContent: { padding: 15, paddingBottom: 80 },
  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 70, backgroundColor: '#fff', flexDirection: 'row', borderTopWidth: 1, borderColor: '#EEE' },
  barItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  barLabel: { fontSize: 10, color: '#999', marginTop: 5 },
  barLabelActive: { color: '#FF6B35', fontWeight: 'bold' }
});

export default TravelListScreen;