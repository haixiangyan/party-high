import { Card, CardHeader, CardContent, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { IEvent } from "../types/party";
import { FC } from "react";
import Image from "next/image";
import Ratings from "./Ratings";
import { Button } from "@/components/ui/button";
import { AiFillEnvironment } from "react-icons/ai";

interface IEventProps {
  data: IEvent
}

const Event: FC<IEventProps> = (props) => {
  const { data } = props;

  return (
    <Card className="w-80">
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
      <CardFooter>
        <Button>加入</Button>
      </CardFooter>
    </Card>
  )
}

export default Event;
