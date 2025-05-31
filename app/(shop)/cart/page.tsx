'use client'

import { FC } from "react";
import { useCartStore } from "@/app/store/cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const CartPage: FC = () => {
  const { items, updateQuantity, removeFromCart } = useCartStore();

  // 计算总价（假设每个活动价格15元）
  const totalPrice = items.reduce((sum, item) => sum + (item.quantity * 15), 0);
  const packingFee = 1;
  const deliveryFee = totalPrice >= 20 ? 0 : 1.2;
  const finalPrice = totalPrice + packingFee + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
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
          >
            提交订单
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartPage; 