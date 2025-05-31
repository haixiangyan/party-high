'use client'

import { FC } from "react";
import { useOrderStore, Order } from "@/app/store/orders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineRight, AiOutlineShoppingCart, AiOutlineClockCircle } from "react-icons/ai";

const OrdersPage: FC = () => {
  const { orders } = useOrderStore();

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: '待确认',
      confirmed: '已确认',
      preparing: '准备中',
      delivering: '配送中',
      delivered: '已送达',
      cancelled: '已取消'
    };
    return statusMap[status];
  };

  const getStatusColor = (status: Order['status']) => {
    const colorMap = {
      pending: 'text-orange-500',
      confirmed: 'text-blue-500',
      preparing: 'text-yellow-500',
      delivering: 'text-purple-500',
      delivered: 'text-green-500',
      cancelled: 'text-gray-500'
    };
    return colorMap[status];
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="bg-gray-50">
        <div className="bg-white border-b px-4 py-4">
          <h1 className="text-lg font-bold">订单</h1>
        </div>
        
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <AiOutlineShoppingCart className="text-6xl text-gray-300 mb-4" />
              <h2 className="text-xl font-semibold mb-2">暂无订单</h2>
              <p className="text-gray-500 mb-6">快去下单体验Party High的精彩活动吧！</p>
              <Link href="/events">
                <Button className="bg-yellow-400 hover:bg-yellow-500 text-black">
                  去逛逛
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
          <h1 className="text-lg font-bold">订单</h1>
          <Link href="/events">
            <Button variant="outline" size="sm">
              继续购物
            </Button>
          </Link>
        </div>
      </div>

      {/* 订单列表 */}
      <div className="px-4 py-4 space-y-4">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
            <CardContent className="p-0">
              <Link href={`/orders/${order.id}`}>
                <div className="p-4">
                  {/* 订单头部信息 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Party High</span>
                      <AiOutlineClockCircle className="text-gray-400 text-sm" />
                      <span className="text-sm text-gray-500">
                        {formatTime(order.createdAt)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-medium ${getStatusColor(order.status)}`}>
                        {getStatusText(order.status)}
                      </span>
                      <AiOutlineRight className="text-gray-400" />
                    </div>
                  </div>

                  {/* 商品列表 */}
                  <div className="space-y-3 mb-4">
                    {order.items.slice(0, 2).map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        {item.event.image && (
                          <div className="relative w-12 h-12 flex-shrink-0">
                            <Image
                              src={item.event.image}
                              alt={item.event.title}
                              fill
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium line-clamp-1">
                            {item.event.title}
                          </h3>
                          <p className="text-xs text-gray-500">x{item.quantity}</p>
                        </div>
                        <span className="text-sm font-medium">¥{item.price * item.quantity}</span>
                      </div>
                    ))}
                    
                    {order.items.length > 2 && (
                      <div className="text-sm text-gray-500 text-center">
                        等{order.items.length}件商品
                      </div>
                    )}
                  </div>

                  {/* 订单总价 */}
                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-sm text-gray-500">
                      共{order.items.reduce((sum, item) => sum + item.quantity, 0)}件
                    </span>
                    <div className="text-right">
                      <div className="text-sm">
                        实付 <span className="text-lg font-bold text-red-500">¥{order.finalPrice.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>

                  {/* 快速操作按钮 */}
                  {order.status === 'delivered' && (
                    <div className="flex justify-end mt-3">
                      <Button variant="outline" size="sm" onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // TODO: 实现再来一单功能
                      }}>
                        再来一单
                      </Button>
                    </div>
                  )}
                </div>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default OrdersPage; 