'use client'

import { FC } from "react";
import { useOrderStore, Order } from "@/app/store/orders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  AiOutlineLeft, 
} from "react-icons/ai";

const OrderDetailPage: FC = () => {
  const params = useParams();
  const { getOrder } = useOrderStore();
  const order = getOrder(params.id as string);

  if (!order) {
    return (
      <div className="bg-gray-50">
        <div className="bg-white border-b px-4 py-4">
          <div className="flex items-center gap-3">
            <Link href="/orders">
              <AiOutlineLeft className="text-lg" />
            </Link>
            <h1 className="text-lg font-bold">订单详情</h1>
          </div>
        </div>
        
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h2 className="text-xl font-semibold mb-2">订单不存在</h2>
              <p className="text-gray-500 mb-6">该订单可能已被删除或不存在</p>
              <Link href="/orders">
                <Button>返回订单列表</Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const getStatusText = (status: Order['status']) => {
    const statusMap = {
      pending: '等待商家确认',
      confirmed: '商家已确认',
      preparing: '正在准备中',
      delivering: '骑手配送中',
      delivered: '已送达',
      cancelled: '订单已取消'
    };
    return statusMap[status];
  };

  const getStatusSteps = (currentStatus: Order['status']) => {
    const steps = [
      { key: 'pending', label: '已下单', time: order.createdAt },
      { key: 'confirmed', label: '已确认', time: order.createdAt },
      { key: 'preparing', label: '准备中', time: null },
      { key: 'delivering', label: '配送中', time: null },
      { key: 'delivered', label: '已送达', time: order.estimatedDeliveryTime }
    ];

    const statusOrder = ['pending', 'confirmed', 'preparing', 'delivering', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      current: index === currentIndex
    }));
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

  return (
    <div className="bg-gray-50">
      <div className="px-4 py-4 space-y-4">
        {/* 商品信息 */}
        <Card className="py-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Party High</h3>
            </div>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.event.id} className="flex items-center gap-3">
                  {item.event.image && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.event.image}
                        alt={item.event.title}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-2 mb-1">
                      {item.event.title}
                    </h4>
                    <p className="text-xs text-gray-500 line-clamp-1">
                      {item.event.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                      <span className="font-medium">¥{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 费用明细 */}
        <Card className="py-0">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">费用明细</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>商品总额</span>
                <span>¥{order.totalPrice.toFixed(1)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 订单信息 */}
        <Card className="py-0">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">订单信息</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>订单号</span>
                <span className="font-mono">{order.id}</span>
              </div>
              <div className="flex justify-between">
                <span>下单时间</span>
                <span>{formatTime(order.createdAt)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 操作按钮 */}
        <div className="pb-8">
          {order.status === 'delivered' && (
            <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black">
              再来一单
            </Button>
          )}
          {order.status === 'pending' && (
            <Button variant="danger" className="w-full">
              取消订单
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetailPage; 