import { ICategory, IParty, IEvent } from '../types/party';
import { IUser } from '../types/user';

// 添加模拟用户数据
const mockUsers: IUser[] = [
  {
    id: 'user1',
    name: '张三',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user1',
    email: 'zhangsan@example.com',
    password: 'hashed_password_1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'user2',
    name: '李四',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user2',
    email: 'lisi@example.com',
    password: 'hashed_password_2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const mockCategoryList: ICategory[] = [
  {
    id: 'cat1',
    name: '桌游派对',
    description: '各种有趣的桌游活动，从经典到新潮',
    icon: '🎲'
  },
  {
    id: 'cat2',
    name: '户外运动',
    description: '徒步、骑行、野餐等户外活动',
    icon: '🏃'
  },
  {
    id: 'cat3',
    name: '美食聚会',
    description: '美食分享、烹饪课程、品鉴会',
    icon: '🍽️'
  },
  {
    id: 'cat4',
    name: '电影之夜',
    description: '经典电影放映、新片首映、影评分享',
    icon: '🎬'
  },
  {
    id: 'cat5',
    name: '音乐派对',
    description: '现场音乐、卡拉OK、音乐分享会',
    icon: '🎵'
  },
  {
    id: 'cat6',
    name: '读书会',
    description: '书籍分享、读书讨论、作者见面会',
    icon: '📚'
  }
];

// 生成模拟事件数据
const generateMockEvent = (categoryId: string, index: number): IEvent => {
  const now = new Date();
  const startTime = new Date(now.getTime() + (index + 1) * 24 * 60 * 60 * 1000);
  const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);
  const category = mockCategoryList.find(cat => cat.id === categoryId)!;

  return {
    id: `event_${categoryId}_${index}`,
    title: `${category.name}活动 ${index + 1}`,
    description: `这是一个精彩的${category.name}活动，欢迎参加！`,
    image: `https://picsum.photos/seed/event_${categoryId}_${index}/800/400`,
    rate: Math.floor(Math.random() * 3) + 3, // 3-5的随机评分
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    location: {
      lat: 39.915 + (index % 5) * 0.01,
      lng: 116.404 + (index % 5) * 0.01,
      name: `${category.name}活动地点 ${index + 1}`
    },
    comments: [],
    category
  };
};

// 生成20个事件
export const mockEventList: IEvent[] = Array.from({ length: 20 }, (_, index) => {
  const categoryIndex = Math.floor(index / 4); // 每4个事件属于同一个分类
  const categoryId = mockCategoryList[categoryIndex % mockCategoryList.length].id;
  return generateMockEvent(categoryId, index);
});

// 修改生成派对函数，使用 mockEventList 中的事件
const generateMockParty = (categoryId: string, index: number): IParty => {
  const now = new Date();
  const category = mockCategoryList.find(cat => cat.id === categoryId)!;
  
  // 从 mockEventList 中获取属于该分类的事件
  const categoryEvents = mockEventList.filter(event => event.category.id === categoryId);
  // 随机选择2个事件
  const selectedEvents = categoryEvents
    .sort(() => Math.random() - 0.5)
    .slice(0, 2);

  return {
    id: `party_${categoryId}_${index}`,
    title: `${category.name}派对 ${index + 1}`,
    description: `这是一个精彩的${category.name}派对，欢迎参加！`,
    category,
    authorId: 'user1',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    members: [mockUsers[0], mockUsers[1]],
    events: selectedEvents
  };
};

export const mockPartyList: IParty[] = mockCategoryList.flatMap(category =>
  Array.from({ length: 5 }, (_, index) => generateMockParty(category.id, index))
);
