import React from "react";
import s from "./MyPosts.module.css";
import { Post } from "./Post/Post";
import { MyPostsType } from "./MyPostsContainer";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import {
  maxLengthCreator,
  required,
} from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControls/FormsControls";

export const MyPosts: React.FC<MyPostsType> = React.memo((props) => {
  let postsElements = props.posts.map((p) => (
    <Post key={p.id} message={p.message} likesCount={p.likesCount} />
  ));

  const addNewPost = (values: AddPostFormDataType) => {
    props.addPost(values.newPost);
  };

  return (
    <div className={s.postsBlock}>
      <h3>My posts</h3>
      <AddPostFormRedux onSubmit={addNewPost} />
      <div className={s.posts}>{postsElements}</div>
    </div>
  );
});

type AddPostFormDataType = {
  newPost: string;
};

const maxLength10 = maxLengthCreator(10);

const AddPostForm: React.FC<InjectedFormProps<AddPostFormDataType>> = (
  props
) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component={Textarea}
          name="newPost"
          placeholder="Post message"
          validate={[required, maxLength10]}
        />
      </div>
      <div>
        <button>Add post</button>
      </div>
    </form>
  );
};

const AddPostFormRedux = reduxForm<AddPostFormDataType>({
  form: "addPostForm",
})(AddPostForm);
