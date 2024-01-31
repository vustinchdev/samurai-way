import { ProfileResponse } from "../../../api/api";
import { Input, Textarea } from "../../common/FormsControls/FormsControls";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import s from "./../../common/FormsControls/FormsControls.module.css";

type Props = {
  profile: ProfileResponse;
};

const ProfileDataForm = ({
  handleSubmit,
  profile,
  error,
}: InjectedFormProps<ProfileResponse, Props> & Props) => {
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <button>save</button>
      </div>
      <div>{error && <div className={s.formSummaryError}>{error}</div>}</div>
      <div>
        <b>Full name</b>:
        <Field placeholder="Full name" name="fullName" component={Input} />
      </div>
      <div>
        <b>Looking for a job</b>:
        <Field name="lookingForAJob" component={Input} type="checkbox" />
      </div>
      <div>
        <b>My professional skills</b>:
        <Field
          placeholder="My professional skills"
          name="lookingForAJobDescription"
          component={Textarea}
        />
      </div>
      <div>
        <b>About me</b>:
        <Field placeholder="About me" name="aboutMe" component={Textarea} />
      </div>
      <div>
        <b>Contacts</b>:
        {Object.keys(profile.contacts).map((key) => {
          console.log(profile.contacts);
          return (
            <div key={key}>
              <b>{key}</b>:
              <Field
                placeholder={key}
                name={"contacts." + key}
                component={Input}
              />
            </div>
          );
        })}
      </div>
    </form>
  );
};

export const ProfileDataFormReduxForm = reduxForm<ProfileResponse, Props>({
  form: "edit-profile",
})(ProfileDataForm);
