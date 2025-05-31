'use client'

import { FC, useState } from "react";
import { useOrderStore, Order } from "@/app/store/orders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { 
  AiOutlineLeft, 
} from "react-icons/ai";

// 取消订单确认弹窗组件
const CancelOrderModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderTotal: number;
}> = ({ isOpen, onClose, onConfirm, orderTotal }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6">
        <h3 className="text-lg font-bold mb-4">确认取消订单</h3>
        <div className="mb-6">
          <p className="text-gray-600 mb-2">确定要取消这个订单吗？</p>
          <p className="text-sm text-gray-500">订单金额：<span className="text-red-500 font-bold">¥{orderTotal.toFixed(1)}</span></p>
          <p className="text-xs text-gray-400 mt-2">取消后订单将无法恢复</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            不取消
          </Button>
          <Button variant="danger" onClick={onConfirm} className="flex-1">
            确认取消
          </Button>
        </div>
      </div>
    </div>
  );
};

const OrderDetailPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const { getOrder, updateOrderStatus } = useOrderStore();
  const order = getOrder(params.id as string);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const handleCancelOrder = () => {
    setShowCancelModal(true);
  };

  const handleConfirmCancel = () => {
    if (order) {
      // 更新订单状态为取消
      updateOrderStatus(order.id, 'cancelled');
      setShowCancelModal(false);
      // 可以选择跳转回订单列表或停留在当前页面
      // router.push('/orders');
    }
  };

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
    <>
      <div className="bg-gray-50">
        {/* 订单状态显示 */}
        {order.status === 'cancelled' && (
          <div className="bg-red-50 border border-red-200 mx-4 mt-4 p-3 rounded-lg">
            <div className="text-red-600 font-medium text-sm">
              🚫 订单已取消
            </div>
            <div className="text-red-500 text-xs mt-1">
              取消时间：{formatTime(new Date().toISOString())}
            </div>
          </div>
        )}

        <div className="px-4 py-4 space-y-4">
          {/* 商品信息 */}
          <Card className="py-0">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Party High</h3>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'cancelled' 
                    ? 'bg-red-100 text-red-600' 
                    : 'bg-blue-100 text-blue-600'
                }`}>
                  {getStatusText(order.status)}
                </span>
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
                <div className="flex justify-between">
                  <span>打包费</span>
                  <span>¥{order.packingFee.toFixed(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span>配送费</span>
                  <span>¥{order.deliveryFee.toFixed(1)}</span>
                </div>
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span>实付金额</span>
                    <span className="text-red-500">¥{order.finalPrice.toFixed(1)}</span>
                  </div>
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
                <div className="flex justify-between">
                  <span>订单状态</span>
                  <span className={order.status === 'cancelled' ? 'text-red-500' : 'text-green-500'}>
                    {getStatusText(order.status)}
                  </span>
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
              <Button variant="danger" className="w-full" onClick={handleCancelOrder}>
                取消订单
              </Button>
            )}
            {order.status === 'cancelled' && (
              <div className="text-center">
                <p className="text-gray-500 text-sm mb-3">订单已取消，如有疑问请联系客服</p>
                <Button variant="outline" onClick={() => router.push('/events')} className="w-full">
                  重新下单
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 取消订单确认弹窗 */}
      <CancelOrderModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
        onConfirm={handleConfirmCancel}
        orderTotal={order.finalPrice}
      />
    </>
  );
};

export default OrderDetailPage; 