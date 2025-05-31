import { FC } from "react";
import { IParty } from "../types/party";

interface IProps {
  data: IParty
}

const Party: FC<IProps> = (props) => {
  const { data } = props;

  return (
    <div>
      <h1>Party: {data.title}</h1>
      <p>{data.description}</p>
    </div>
  )
}

export default Party;
