'use client'

import { FC } from "react";
import { useCartStore } from "@/app/store/cart";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { mockEvents } from "../mock/events";
import { 
  AiOutlineStar,
  AiOutlineEnvironment,
  AiOutlineClockCircle,
  AiOutlineMinus,
  AiOutlinePlus
} from "react-icons/ai";

const EventDetailPage: FC = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart, getCartItemQuantity } = useCartStore();
  
  const event = mockEvents.find(e => e.id === params.id);
  const currentQuantity = event ? getCartItemQuantity(event.id) : 0;

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto p-4">
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-16">
              <h2 className="text-xl font-semibold mb-2">活动不存在</h2>
              <p className="text-gray-500 mb-6">该活动可能已被删除或不存在</p>
              <Button onClick={() => router.back()}>
                返回
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(event);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-4">
        {/* 活动图片 */}
        {event.image && (
          <Card className="mb-4 overflow-hidden">
            <div className="relative h-64">
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            </div>
          </Card>
        )}

        {/* 活动基本信息 */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <div className="mb-3">
              <h1 className="text-xl font-bold mb-2">{event.title}</h1>
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <AiOutlineStar className="text-yellow-400" />
                  <span className="text-sm font-medium">{event.rate}</span>
                </div>
                <span className="text-sm text-gray-500">
                  ({event.comments.length}条评价)
                </span>
              </div>
              <div className="text-2xl font-bold text-red-500 mb-3">
                ¥15.0
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed">
              {event.description}
            </p>
          </CardContent>
        </Card>

        {/* 活动详情 */}
        <Card className="mb-4">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">活动详情</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <AiOutlineClockCircle className="text-gray-400" />
                <div className="text-sm">
                  <span className="text-gray-600">时间：</span>
                  <span>{new Date(event.startTime).toLocaleString('zh-CN')} - {new Date(event.endTime).toLocaleString('zh-CN')}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <AiOutlineEnvironment className="text-gray-400" />
                <div className="text-sm">
                  <span className="text-gray-600">地点：</span>
                  <span>{event.location.name}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 用户评价 */}
        <Card className="mb-20">
          <CardContent className="p-4">
            <h3 className="font-medium mb-3">用户评价 ({event.comments.length})</h3>
            <div className="space-y-4">
              {event.comments.map((comment) => (
                <div key={comment.id} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-sm">{comment.author.name}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <AiOutlineStar 
                          key={star} 
                          className="w-3 h-3 text-yellow-400" 
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-1">{comment.content}</p>
                  <span className="text-xs text-gray-400">
                    {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 底部操作栏 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4">
        <div className="flex items-center gap-4">
          {currentQuantity > 0 ? (
            <div className="flex items-center gap-3 flex-1">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    if (currentQuantity > 1) {
                      // 如果数量大于1，减少数量
                      const newQuantity = currentQuantity - 1;
                      const { updateQuantity } = useCartStore.getState();
                      updateQuantity(event.id, newQuantity);
                    } else {
                      // 如果数量为1，从购物车移除
                      const { removeFromCart } = useCartStore.getState();
                      removeFromCart(event.id);
                    }
                  }}
                  className="h-8 w-8"
                >
                  <AiOutlineMinus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{currentQuantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleAddToCart}
                  className="h-8 w-8 bg-yellow-400 border-yellow-400 hover:bg-yellow-500"
                >
                  <AiOutlinePlus className="h-4 w-4" />
                </Button>
              </div>
              <Button 
                onClick={() => router.push('/cart')}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
              >
                去购物车
              </Button>
            </div>
          ) : (
            <Button 
              onClick={handleAddToCart}
              className="flex-1 bg-yellow-400 hover:bg-yellow-500 text-black"
            >
              加入购物车
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage; 