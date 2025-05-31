'use client'

import { FC } from "react";
import { useOrderStore, Order } from "@/app/store/orders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { 
  AiOutlineRight, 
  AiOutlineCalendar, 
  AiOutlineEnvironment,
  AiOutlineTeam,
  AiOutlineStar
} from "react-icons/ai";

const PartyListPage: FC = () => {
  const { orders } = useOrderStore();

  const getPartyStatus = (status: Order['status']) => {
    const statusMap = {
      pending: '准备中',
      confirmed: '即将开始',
      preparing: '准备中',
      delivering: '进行中',
      delivered: '已结束',
      cancelled: '已取消'
    };
    return statusMap[status];
  };

  const getPartyStatusColor = (status: Order['status']) => {
    const colorMap = {
      pending: 'text-orange-500 bg-orange-50',
      confirmed: 'text-blue-500 bg-blue-50',
      preparing: 'text-yellow-500 bg-yellow-50',
      delivering: 'text-purple-500 bg-purple-50',
      delivered: 'text-green-500 bg-green-50',
      cancelled: 'text-red-500 bg-red-50'
    };
    return colorMap[status];
  };

  const formatPartyTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // 生成模拟的 Party 信息
  const generatePartyInfo = (order: Order) => {
    const partyNames = [
      '欢乐周末聚会',
      '生日庆祝派对',
      '朋友聚餐时光',
      '节日狂欢夜',
      '毕业纪念聚会',
      '团建活动派对'
    ];
    
    const locations = [
      '朝阳区三里屯',
      '海淀区五道口',
      '西城区金融街',
      '东城区王府井',
      '丰台区丽泽',
      '昌平区回龙观'
    ];

    // 使用订单ID生成一致的随机数
    const seed = parseInt(order.id.split('_')[1]) || 0;
    const partyName = partyNames[seed % partyNames.length];
    const location = locations[seed % locations.length];
    const memberCount = Math.floor(seed % 8) + 3; // 3-10人

    return {
      name: partyName,
      location,
      memberCount,
      rating: (4.2 + (seed % 8) * 0.1).toFixed(1)
    };
  };

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b px-4 py-4">
          <h1 className="text-lg font-bold">我的派对</h1>
        </div>
        
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <AiOutlineTeam className="text-6xl text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">暂无派对记录</h2>
              <p className="text-gray-500 mb-6">快去创建您的第一个派对吧！</p>
              <Link href="/events">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  开始聚会
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部标题栏 */}
      <div className="bg-white border-b px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-bold">我的派对</h1>
          <Link href="/events">
            <Button variant="outline" size="sm">
              创建派对
            </Button>
          </Link>
        </div>
      </div>

      {/* 派对列表 */}
      <div className="px-4 py-4 space-y-4">
        {orders.map((order) => {
          const partyInfo = generatePartyInfo(order);
          
          return (
            <Card key={order.id} className="overflow-hidden py-0">
              <CardContent className="p-0">
                <Link href={`/orders/${order.id}`}>
                  <div className="p-4">
                    {/* 派对头部信息 */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg">{partyInfo.name}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getPartyStatusColor(order.status)}`}>
                          {getPartyStatus(order.status)}
                        </span>
                      </div>
                      <AiOutlineRight className="text-gray-400" />
                    </div>

                    {/* 派对基本信息 */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <AiOutlineCalendar className="text-gray-400" />
                        <span>{formatPartyTime(order.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <AiOutlineEnvironment className="text-gray-400" />
                        <span>{partyInfo.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <AiOutlineTeam className="text-gray-400" />
                        <span>{partyInfo.memberCount}人参与</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <AiOutlineStar className="text-yellow-400" />
                        <span>{partyInfo.rating}分</span>
                      </div>
                    </div>

                    {/* 派对商品预览 */}
                    <div className="space-y-3 mb-4">
                      <h4 className="text-sm font-medium text-gray-700">派对套餐</h4>
                      <div className="flex gap-2 overflow-x-auto">
                        {order.items.slice(0, 3).map((item, index) => (
                          <div key={index} className="flex-shrink-0">
                            {item.event.image && (
                              <div className="relative w-16 h-16">
                                <Image
                                  src={item.event.image}
                                  alt={item.event.title}
                                  fill
                                  className="object-cover rounded"
                                />
                                {item.quantity > 1 && (
                                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {item.quantity}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        {order.items.length > 3 && (
                          <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* 派对费用 */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <span className="text-sm text-gray-500">
                        总费用
                      </span>
                      <div className="text-right">
                        <div className="text-lg font-bold text-red-500">
                          ¥{order.finalPrice.toFixed(1)}
                        </div>
                        <div className="text-xs text-gray-500">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)}项服务
                        </div>
                      </div>
                    </div>

                    {/* 快速操作 */}
                    {order.status === 'delivered' && (
                      <div className="flex gap-2 mt-3">
                        <Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // TODO: 实现评价功能
                        }}>
                          评价派对
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          // TODO: 实现再办一次功能
                        }}>
                          再办一次
                        </Button>
                      </div>
                    )}
                  </div>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PartyListPage; 