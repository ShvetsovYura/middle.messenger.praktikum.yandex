export type UserResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
};

export type MessageResponse = {
  id: number;
  chat_id: number;
  user_id: number;
  type: string;
  time: string;
  content: string;
  is_read: boolean;
  file: string | null;
};

export type DialogMessage = MessageResponse & { isCurrentUser: boolean; displayUserName: string };
