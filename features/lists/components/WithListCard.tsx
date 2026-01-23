import { IList } from "../types";
import ListCard from "./ListCard";

interface WithListCardProps {
  list: IList;
}
const WithListCard = ({ list }: WithListCardProps) => {
  return <ListCard list={list} boardId={"list.boardId"} isExpanded />;
};

export default WithListCard;
