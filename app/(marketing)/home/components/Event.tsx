import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
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
    <Card className="w-80">
      <Link href={`/event/${data.id}`}>
        <CardHeader>
          <CardTitle>{data.title}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {data.image && (
            <Image src={data.image} alt={data.title} width={400} height={200} className="rounded-lg" />
          )}

          <div className="mt-4 flex flex-row items-center">
            <AiFillEnvironment />
            <span className="ml-1">{data.location.name}</span>
          </div>

          <div className="flex items-center">
            <Ratings rate={data.rate} size="sm" />
          </div>
        </CardContent>
      </Link>
      <CardFooter className="flex justify-between items-center">
        {!isInCart ? (
          <Button 
            onClick={() => addToCart(data)}
            className="w-full"
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
