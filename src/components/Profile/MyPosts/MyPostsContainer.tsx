import React from "react";
import { addPostAC } from "../../../redux/profile-reducer";
import { MyPosts } from "./MyPosts";
import { connect } from "react-redux";
import { RootStateType } from "../../../redux/redux-store";
import { PostType } from "../../../redux/store";
import { Dispatch } from "redux";

type MapStatePropsType = {
  posts: PostType[];
};

type MapDispatchPropsType = {
  addPost: (newPost: string) => void;
};

export type MyPostsType = MapStatePropsType & MapDispatchPropsType;

const mapStateToProps = (state: RootStateType): MapStatePropsType => {
  return {
    posts: state.profilePage.posts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchPropsType => {
  return {
    addPost: (newPost) => dispatch(addPostAC(newPost)),
  };
};

export const MyPostsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);
