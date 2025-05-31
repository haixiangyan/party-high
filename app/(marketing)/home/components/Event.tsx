import { Card, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { IEvent } from "../types/party";
import { FC } from "react";
import Image from "next/image";
import Ratings from "@/app/components/Ratings";
import { Button } from "@/components/ui/button";
import { AiFillEnvironment, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useCartStore } from "@/app/store/cart";
import Link from 'next/link';

interface IEventProps {
  data: IEvent
}

const Event: FC<IEventProps> = (props) => {
  const { data } = props;
  const addToCart = useCartStore(state => state.addToCart);
  const updateQuantity = useCartStore(state => state.updateQuantity);
  const items = useCartStore(state => state.items);
  const cartItem = items.find(item => item.event.id === data.id);
  const isInCart = !!cartItem;

  const handleQuantityChange = (delta: number) => {
    if (!cartItem) return;
    updateQuantity(data.id, cartItem.quantity + delta);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <Link href={`/event/${data.id}`} className="block">
        <div className="relative aspect-[4/3] w-full">
          {data.image && (
            <Image 
              src={data.image} 
              alt={data.title} 
              fill 
              className="object-cover"
            />
          )}
        </div>
        <CardContent className="p-4">
          <CardTitle className="text-base font-medium line-clamp-1 mb-1">
            {data.title}
          </CardTitle>
          <CardDescription className="text-sm text-gray-500 line-clamp-2 mb-2">
            {data.description}
          </CardDescription>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AiFillEnvironment className="text-gray-400" />
              <span className="text-sm text-gray-500">{data.location.name}</span>
            </div>
            <Ratings rate={data.rate} size="sm" />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 flex justify-between items-center">
        {!isInCart ? (
          <Button 
            onClick={() => addToCart(data)}
            className="w-full"
            size="sm"
          >
            加入购物车
          </Button>
        ) : (
          <div className="flex items-center gap-2 w-full">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(-1)}
              className="h-8 w-8"
            >
              <AiOutlineMinus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{cartItem.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(1)}
              className="h-8 w-8"
            >
              <AiOutlinePlus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

export default Event;
