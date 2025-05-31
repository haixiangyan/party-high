'use client'

import { FC } from "react";
import { useCartStore } from "@/app/store/cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus, AiOutlineDelete } from "react-icons/ai";

const CartPage: FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, getTotalItems } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <h2 className="text-2xl font-semibold mb-4">购物车是空的</h2>
            <p className="text-gray-500 mb-6">快去添加一些活动吧！</p>
            <Button onClick={() => window.history.back()}>返回活动列表</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">购物车</h1>
        <div className="flex gap-4">
          <Button variant="outline" onClick={clearCart}>
            清空购物车
          </Button>
        </div>
      </div>

      <div className="grid gap-6">
        {items.map((item) => (
          <Card key={item.event.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                {item.event.image && (
                  <div className="relative w-40 h-24">
                    <Image
                      src={item.event.image}
                      alt={item.event.title}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{item.event.title}</h3>
                  <p className="text-gray-500 text-sm mb-4">{item.event.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.event.id, item.quantity - 1)}
                        className="h-8 w-8"
                      >
                        <AiOutlineMinus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => updateQuantity(item.event.id, item.quantity + 1)}
                        className="h-8 w-8"
                      >
                        <AiOutlinePlus className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.event.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <AiOutlineDelete className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">总计</p>
              <p className="text-2xl font-bold">{getTotalItems()} 个活动</p>
            </div>
            <Button size="lg">结算</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CartPage; 