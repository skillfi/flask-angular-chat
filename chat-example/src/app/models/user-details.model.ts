import { Message } from "./message.model";

export interface UserDetails {
  email: string;
  password: string;
  id: string;
}

export interface StudentDetails {
  birthday?: string;
  current_team_id?: number;
  email?: string;
  grade?: string;
  id?: number;
  is_admin?: boolean;
  main_image?: string;
  name?: string;
  nickname?: string;
  questionnaire?: boolean;
  role?: string;
  surname?: string;
  team_task_id?: null;
}

export interface Chat {
  id?: number;
  school?: number;
  type?: string;
  team_id?: number;
  team_task_id?: any;
  room_id?: string;
  user_id?: number;
  date?: Date;
  message?: string;
}