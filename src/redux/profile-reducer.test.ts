import {
  addPostAC,
  deletePost,
  profileReducer,
  setStatus,
  setUserProfile,
} from "./profile-reducer";
import { ProfilePageType } from "./store";

let startState: ProfilePageType;

beforeEach(() => {
  startState = {
    posts: [
      { id: 1, message: "Hello, how are you?", likesCount: 15 },
      { id: 2, message: "It's my first post", likesCount: 20 },
    ],
    profile: {
      userId: 1,
      aboutMe: "",
      lookingForAJob: true,
      lookingForAJobDescription: "",
      fullName: "",
      contacts: {
        github: "",
        vk: "",
        facebook: "",
        instagram: "",
        twitter: "",
        website: "",
        youtube: "",
        mainLink: "",
      },
      photos: {
        small: "",
        large: "",
      },
    },
    status: "",
  };
});

test("correct post should be added to array", () => {
  const endState = profileReducer(startState, addPostAC("hello"));

  expect(endState.posts.length).toBe(3);
  expect(endState.posts[2].id).toBeDefined();
  expect(endState.posts[2].likesCount).toBe(0);
  expect(endState.posts[2].message).toBe("hello");
});
test("correct profile should be set", () => {
  const userProfile = {
    userId: 2,
    aboutMe: "",
    lookingForAJob: true,
    lookingForAJobDescription: "",
    fullName: "",
    contacts: {
      github: "",
      vk: "",
      facebook: "",
      instagram: "",
      twitter: "",
      website: "",
      youtube: "",
      mainLink: "",
    },
    photos: {
      small: "",
      large: "",
    },
  };
  const endState = profileReducer(startState, setUserProfile(userProfile));

  expect(endState.profile?.userId).toBe(2);
});
test("correct post should be added to array", () => {
  const endState = profileReducer(startState, setStatus("hello"));

  expect(endState.status).toBe("hello");
});
test("correct post should be removed from the array", () => {
  const endState = profileReducer(startState, deletePost(1));

  expect(endState.posts.length).toBe(1);
});
