import axios from "axios";

const instanse = axios.create({
  baseURL: "https://social-network.samuraijs.com/api/1.0/",
  withCredentials: true,
});

export const usersAPI = {
  getUsers(currentPage: number, pageSize: number) {
    return instanse
      .get<GetUsers>(`users?page=${currentPage}&count=${pageSize}`)
      .then((res) => res.data);
  },
  follow(userId: number) {
    return instanse.post<BaseResponse>(`follow/${userId}`);
  },
  unfollow(userId: number) {
    return instanse.delete<BaseResponse>(`follow/${userId}`);
  },
};

export const profileAPI = {
  getProfile(userId: string) {
    return instanse.get<ProfileResponse>(`profile/${userId}`);
  },
  getStatus(userId: string) {
    return instanse.get<string>(`profile/status/${userId}`);
  },
  updateStatus(status: string) {
    return instanse.put<BaseResponse>("profile/status", { status });
  },
};

export const authAPI = {
  me() {
    return instanse.get<BaseResponse<AuthData>>("auth/me");
  },
  login(email: string, password: string, rememberMe: boolean = false) {
    return instanse.post<BaseResponse>("auth/login", {
      email,
      password,
      rememberMe,
    });
  },
  logout() {
    return instanse.delete<BaseResponse>("auth/login");
  },
};

type Photos = {
  small: null | string;
  large: null | string;
};
export type UserResponse = {
  id: number;
  name: string;
  status: string;
  uniqueUrlName: null | string;
  photos: Photos;
  followed: boolean;
};
type GetUsers = {
  items: UserResponse[];
  totalCount: number;
  error: null | string;
};
type BaseResponse<T = {}> = {
  resultCode: number;
  messages: string[];
  data: T;
};
type ContactsType = {
  github: string;
  vk: string;
  facebook: string;
  instagram: string;
  twitter: string;
  website: string;
  youtube: string;
  mainLink: string;
};
export type ProfileResponse = {
  userId: number;
  aboutMe: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: ContactsType;
  photos: Photos;
};
type AuthData = {
  id: number;
  email: string;
  login: string;
};
