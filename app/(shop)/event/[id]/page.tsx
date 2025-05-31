'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { IEvent } from '@/app/(marketing)/home/types/party';
import { mockEventList } from '@/app/(marketing)/home/mock';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCartStore } from '@/app/store/cart';
import { AiFillEnvironment, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import Image from 'next/image';
import Ratings from '@/app/components/Ratings';

export default function EventDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items, updateQuantity } = useCartStore();
  
  const cartItem = items.find(item => item.event.id === id);
  const isInCart = !!cartItem;

  useEffect(() => {
    const foundEvent = mockEventList.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    }
  }, [id]);

  if (!event) {
    return <div className="container mx-auto py-8">加载中...</div>;
  }

  const handleQuantityChange = (delta: number) => {
    if (isInCart) {
      updateQuantity(event.id, cartItem.quantity + delta);
    } else {
      setQuantity(prev => Math.max(1, prev + delta));
    }
  };

  const handleAddToCart = () => {
    if (isInCart) return;
    addToCart(event);
  };

  return (
    <div className="container mx-auto py-8 px-2 sm:px-6 md:px-10 lg:px-16 xl:px-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* 左侧图片展示区 */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
            {event.image && (
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover"
              />
            )}
          </div>
          <div className="grid grid-cols-4 gap-2">
            {/* 这里可以添加更多图片缩略图 */}
          </div>
        </div>

        {/* 右侧信息区 */}
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
            <div className="flex items-center gap-4 mb-4">
              <Ratings rate={event.rate} size="lg" />
              <span className="text-gray-500">已有 {Math.floor(Math.random() * 1000)} 人参与</span>
            </div>
            <div className="flex items-center text-gray-600">
              <AiFillEnvironment className="mr-1" />
              <span>{event.location.name}</span>
            </div>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">活动时间</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">活动地点</span>
                  <span>{event.location.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">活动评分</span>
                  <Ratings rate={event.rate} size="sm" />
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(-1)}
                className="h-10 w-10"
              >
                <AiOutlineMinus className="h-4 w-4" />
              </Button>
              <span className="w-12 text-center">
                {isInCart ? cartItem.quantity : quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleQuantityChange(1)}
                className="h-10 w-10"
              >
                <AiOutlinePlus className="h-4 w-4" />
              </Button>
            </div>
            <Button 
              className="flex-1 h-10"
              onClick={handleAddToCart}
              disabled={isInCart}
            >
              {isInCart ? '已在购物车' : '加入购物车'}
            </Button>
          </div>
        </div>
      </div>

      {/* 详情标签页 */}
      <div className="mt-8">
        <Tabs defaultValue="detail" className="w-full">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="detail">活动详情</TabsTrigger>
            <TabsTrigger value="notice">活动须知</TabsTrigger>
            <TabsTrigger value="comments">用户评价</TabsTrigger>
          </TabsList>
          <TabsContent value="detail" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">活动介绍</h3>
                  <p>{event.description}</p>
                  {/* 这里可以添加更多富文本内容 */}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="notice" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="prose max-w-none">
                  <h3 className="text-lg font-semibold mb-4">活动须知</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>请提前15分钟到达活动地点</li>
                    <li>请穿着舒适的服装和鞋子</li>
                    <li>活动期间请遵守现场工作人员指引</li>
                    <li>如遇天气原因，活动可能会改期</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="comments" className="mt-4">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* 这里可以添加用户评价列表 */}
                  <p className="text-gray-500 text-center py-8">暂无评价</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 