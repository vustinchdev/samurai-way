import React from "react";
import { Field, InjectedFormProps, reduxForm } from "redux-form";
import { required } from "../../utils/validators/validators";
import { Input } from "../common/FormsControls/FormsControls";
import { connect } from "react-redux";
import { login } from "./../../redux/auth-reducer";
import { Redirect } from "react-router-dom";
import { RootStateType } from "../../redux/redux-store";
import s from "./../common/FormsControls/FormsControls.module.css";

type FormDataType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginForm: React.FC<InjectedFormProps<FormDataType>> = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        <Field
          placeholder="Login"
          name="email"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field
          placeholder="Password"
          name="password"
          type="password"
          component={Input}
          validate={[required]}
        />
      </div>
      <div>
        <Field type="checkbox" name="rememberMe" component={Input} />
        remember me
      </div>
      {props.error && <div className={s.formSummaryError}>{props.error}</div>}
      <div>
        <button>Login</button>
      </div>
    </form>
  );
};

type LoginType = MapStateToPropsType & {
  login: (email: string, password: string, rememberMe: boolean) => void;
};

const LoginReduxForm = reduxForm<FormDataType>({ form: "login" })(LoginForm);

export const Login = (props: LoginType) => {
  const onSubmit = (formData: FormDataType) => {
    props.login(formData.email, formData.password, formData.rememberMe);
  };

  if (props.isAuth) {
    return <Redirect to="/profile" />;
  }

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} />
    </div>
  );
};

const MapStateToProps = (state: RootStateType): MapStateToPropsType => ({
  isAuth: state.auth.isAuth,
});

type MapStateToPropsType = {
  isAuth: boolean;
};

export default connect(MapStateToProps, { login })(Login);
