import { IParty } from "../types/party";

interface IProps {
  data: IParty
}

const Party: FC<IProps> = (props) => {
  const { data } = props;

  return (
    <div>
      <h1>Party</h1>
    </div>
  )
}

export default Party;
