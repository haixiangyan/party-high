'use client'

import { FC, useState } from "react";
import { useCartStore } from "@/app/store/cart";
import { useOrderStore } from "@/app/store/orders";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";
import { useRouter } from "next/navigation";

// 确认弹窗组件
const ConfirmModal: FC<{
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  totalPrice: number;
}> = ({ isOpen, onClose, onConfirm, totalPrice }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.6)] z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-sm w-full p-6">
        <h3 className="text-lg font-bold mb-4">确认订单</h3>
        <div className="mb-6">
          <p className="text-gray-600 mb-2">确认提交订单吗？</p>
          <p className="text-sm text-gray-500">订单金额：<span className="text-red-500 font-bold">¥{totalPrice.toFixed(1)}</span></p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            取消
          </Button>
          <Button onClick={onConfirm} className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black">
            确认提交
          </Button>
        </div>
      </div>
    </div>
  );
};

const CartPage: FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart } = useCartStore();
  const { createOrder } = useOrderStore();
  const router = useRouter();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 计算总价（假设每个活动价格15元）
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * 15), 0);
  const packingFee = 1;
  const deliveryFee = totalPrice >= 20 ? 0 : 1.2;
  const finalPrice = totalPrice + packingFee + deliveryFee;

  const handleSubmitOrder = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmOrder = () => {
    // 创建订单
    const order = createOrder(
      items.map(item => ({
        event: item.event,
        quantity: item.quantity
      })),
      "北京市朝阳区xxx街道xxx号", // 模拟地址
      "138****8888", // 模拟电话
      "请尽快送达" // 模拟备注
    );

    // 清空购物车
    clearCart();
    
    // 关闭弹窗
    setShowConfirmModal(false);
    
    // 跳转到订单详情页
    router.push(`/orders/${order.id}?to=/parties`);
  };

  if (items.length === 0) {
    return (
      <div className="bg-gray-50">
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h2 className="text-2xl font-semibold mb-4">购物车是空的</h2>
              <p className="text-gray-500 mb-6">快去添加一些活动吧！</p>
              <Button onClick={() => window.history.back()} className="bg-yellow-400 hover:bg-yellow-500 text-black">
                返回活动列表
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-gray-50">
        {/* 商品列表 */}
        <div className="bg-white px-4 py-4 mb-2">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.event.id} className="flex gap-3">
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
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-sm line-clamp-1 mb-1">{item.event.title}</h3>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.event.id)}
                      className="text-red-500 h-6 w-6"
                    >
                      <AiOutlineDelete className="h-4 w-4 " />
                    </Button>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">1盒</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="font-medium">¥{15 * item.quantity}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                        className="h-5 w-5 border-gray-300"
                      >
                        <AiOutlineMinus className="h-2 w-2" />
                      </Button>
                      <span className="w-6 text-center text-sm">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                        className="h-5 w-5 bg-yellow-400 border-yellow-400 hover:bg-yellow-500"
                      >
                        <AiOutlinePlus className="h-1 w-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 总计 */}
        <div className="bg-white px-4 py-4 mb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-medium">总计</span>
            </div>
            <div className="flex items-center">
              <span className="text-lg font-bold">¥{finalPrice.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* 底部结算栏 */}
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm">
                合计 <span className="text-lg font-bold">¥{finalPrice.toFixed(1)}</span>
              </div>
            </div>
            <Button 
              size="lg" 
              className="bg-yellow-400 hover:bg-yellow-500 text-black font-medium px-8"
              onClick={handleSubmitOrder}
            >
              提交订单
            </Button>
          </div>
        </div>
      </div>

      {/* 确认弹窗 */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleConfirmOrder}
        totalPrice={finalPrice}
      />
    </>
  );
};

export default CartPage; 