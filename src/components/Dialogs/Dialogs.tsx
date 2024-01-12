import React, { ChangeEvent } from "react";
import s from "./Dialogs.module.css";
import { DialogItem } from "./DialogItem/DialogItem";
import { Message } from "./Message/Message";
import { DialogsType } from "./DialogsContainer";
import { InjectedFormProps, reduxForm, Field } from "redux-form";

export const Dialogs: React.FC<DialogsType> = (props) => {
  let dialogsElements = props.dialogsPage.dialogs.map((d) => (
    <DialogItem key={d.id} id={d.id} name={d.name} />
  ));
  let messagesElements = props.dialogsPage.messages.map((m) => (
    <Message key={m.id} message={m.message} />
  ));

  const addNewMessage = (values: AddMessageFormDataType) => {
    console.log(values);
    props.sendMessage(values.newMessageBody);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElements}</div>
      <div className={s.messages}>
        {messagesElements}
        <AddMessageFormRedux onSubmit={addNewMessage} />
      </div>
    </div>
  );
};

type AddMessageFormDataType = {
  newMessageBody: string;
};

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormDataType>> = (
  props
) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          component="textarea"
          name="newMessageBody"
          placeholder="Enter your message"
        />
      </div>
      <div>
        <button>send</button>
      </div>
    </form>
  );
};

const AddMessageFormRedux = reduxForm<AddMessageFormDataType>({
  form: "dialogAddMessageForm",
})(AddMessageForm);
