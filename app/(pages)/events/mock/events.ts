import { IEvent } from '@/app/types/party';
import { mockCategories } from './categories';

// 生成模拟事件数据
const generateMockEvent = (categoryId: string, index: number): IEvent => {
  const now = new Date();
  const startTime = new Date(now.getTime() + (index + 1) * 24 * 60 * 60 * 1000);
  const endTime = new Date(startTime.getTime() + 3 * 60 * 60 * 1000);
  const category = mockCategories.find(cat => cat.id === categoryId)!;

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
    comments: [
      {
        id: `comment_${categoryId}_${index}_1`,
        content: `这个${category.name}活动很棒！`,
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        author: {
          id: 'user1',
          name: '张三',
          email: 'zhangsan@example.com',
          createdAt: new Date().toISOString(),
        }
      },
      {
        id: `comment_${categoryId}_${index}_2`,
        content: `期待下次活动！`,
        createdAt: new Date(Date.now() - 43200000).toISOString(),
        author: {
          id: 'user2',
          name: '李四',
          email: 'lisi@example.com',
          createdAt: new Date().toISOString(),
        }
      }
    ],
    category
  };
};

// 生成20个事件，每个分类4个
export const mockEvents: IEvent[] = Array.from({ length: 20 }, (_, index) => {
  const categoryIndex = Math.floor(index / 4); // 每4个事件属于同一个分类
  const categoryId = mockCategories[categoryIndex % mockCategories.length].id;
  return generateMockEvent(categoryId, index);
}); 