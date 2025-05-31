import React from 'react';
import { IEvent } from '../types/party';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useCartStore } from '@/app/store/cart';
import Link from 'next/link';
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const ProductCard: React.FC<{ data: IEvent }> = ({ data }) => {
  const { addToCart, items, updateQuantity } = useCartStore();
  const cartItem = items.find(item => item.event.id === data.id);
  const isInCart = !!cartItem;

  const handleQuantityChange = (delta: number) => {
    if (!cartItem) return;
    updateQuantity(data.id, cartItem.quantity + delta);
  };

  // 假数据：月售、标签、原价、折扣
  const monthlySales = Math.floor(Math.random() * 100 + 10);
  const originPrice = data.originPrice || 23.5;
  const price = data.price || 15;
  const hasDiscount = price < originPrice;
  const tag = data.tag || (hasDiscount ? '6.38折起' : '热销');

  return (
    <div className="flex flex-col shadow bg-white p-4">
      {/* 左侧图片+内容区域可点击跳转 */}
      <Link href={`/event/${data.id}`} className="flex flex-1 flex-row items-start gap-4 min-w-0 group">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-md overflow-hidden bg-gray-100">
          <Image src={data.image} alt={data.title} fill className="object-cover group-hover:scale-105 transition-transform" />
        </div>
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* 商品名和描述 */}
          <div className="mb-2">
            <div className="text-base font-bold text-gray-900 leading-tight line-clamp-2 mb-2">{data.title}</div>
            <div className="text-xs text-gray-500 line-clamp-2">{data.description}</div>
          </div>
        </div>
      </Link>

      <div className="flex flex-row gap-4">
        <div className="w-20"></div>

        {/* 价格区域 */}
        <div className="flex items-center justify-between flex-1 gap-2">
          <span className="text-lg text-red-500 font-bold">￥{price}</span>

          {/* 操作按钮区 */}
          <div className="flex items-center gap-1 flex-shrink-0 ml-auto">
            {!isInCart ? (
              <Button size="sm" className="rounded-full px-2 py-0 text-[12px] bg-yellow-400 text-black font-bold hover:bg-yellow-500" onClick={() => addToCart(data)}>
                添加
              </Button>
            ) : (
              <div className="flex items-center">
                <Button size="icon" variant="outline" onClick={() => handleQuantityChange(-1)} className="h-5 w-5" >
                    <AiOutlineMinus className="h-2 w-2" />
                </Button>
                <span className="text-sm w-6 text-center">{cartItem.quantity}</span>
                <Button size="icon" variant="outline" onClick={() => handleQuantityChange(1)} className="h-5 w-5 bg-yellow-400 hover:bg-yellow-500">
                    <AiOutlinePlus className="h-2 w-2" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 