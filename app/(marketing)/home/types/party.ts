import { IUser } from "./user";

export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  author: IUser;
}

export interface IEvent {
  id: string;
  title: string;
  description: string;
  image?: string;
  rate: number;
  startTime: string;
  endTime: string;
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  comments: IComment[];
  category: ICategory;
}

export interface ICategory {
  id: string;
  icon: string;
  name: string;
  description: string;
  image?: string;
}

export interface IParty {
  id: string;
  category: ICategory;
  title: string;
  description: string;
  authorId: string;
  events: IEvent[];
  members: IUser[];
  createdAt: string;
  updatedAt: string;
}
