import OsakaImage from '../assets/osaka.png';
import JejuImage from '../assets/jeju.png';
import TokyoImage from '../assets/tokyo.png';

export const TRIP_DATA = [
  {
    id: '1',
    status: '여행 중',
    title: '오사카 여행',
    date: '2026.02.15 - 2026.02.21',
    image: OsakaImage,
    locationCount: 5,
    dayCount: 7,
    timeline: [
      { time: '09:00', title: '공항 도착', location: '간사이 국제 공항', desc: '공항 도착 후 기차 탑승' },
      { time: '11:00\n13:00', title: '도톤보리 구경', location: '오사카, 도톤보리', desc: '먹거리, 구경하기' },
      { time: '13:00\n15:00', title: '쇼핑하러 가기', location: '다이마루 백화점', desc: '구경 및 쇼핑' },
      { time: '15:00\n18:00', title: '오사카 성', location: '오사카 성', desc: '성 구경 및 포토타임' },
      { time: '18:00', title: '숙소 도착', location: '1 Chome Senshukukokita, Izumisano', desc: '숙소 이동 및 자유시간' },
    ],
  },
  {
    id: '2',
    status: '예정',
    title: 'Jeju',
    date: '2026.03.01 - 2026.03.04',
    image: JejuImage,
    locationCount: 3,
    dayCount: 4,
    timeline: [],
  },
  {
    id: '3',
    status: '종료',
    title: '도쿄',
    date: '2026.00.00 - 2026.00.00',
    image: TokyoImage,
    locationCount: 1,
    dayCount: 1,
    timeline: [],
  },
];