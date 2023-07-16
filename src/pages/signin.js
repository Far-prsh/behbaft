import Footer from "@/components/footer";
import Header from "@/components/header";
import { BiLeftArrowAlt } from "react-icons/bi";
import axios from "axios";
import * as Yup from "yup";

import styles from "../styles/signin.module.scss";
import Link from "next/link";
import { Form, Formik } from "formik";
import LoginInput from "@/components/inputs/loginInput";
import { useState } from "react";
import PrimaryBtn from "@/components/buttons/primaryBtn";
import {
  getCsrfToken,
  getProviders,
  getSession,
  signIn,
} from "next-auth/react";
import RiseLoaderSpinner from "@/components/loaders/riseloader";
import Router from "next/router";

const initialValues = {
  login_email: "",
  login_password: "",
  name: "",
  email: "",
  password: "",
  conf_password: "",
  success: "",
  error: "",
  login_error: "",
};

function SignIn({ country, providers, csrfToken, callbackUrl }) {
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState(initialValues);
  const {
    login_email,
    login_password,
    name,
    email,
    password,
    conf_password,
    success,
    error,
    login_error,
  } = user;

  const loginValidation = Yup.object({
    login_email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid Email address"),
    login_password: Yup.string().required("Please enter a password"),
  });

  const registerValidation = Yup.object({
    name: Yup.string()
      .required("What is your name?")
      .min(2, "Name must be between 2 - 16")
      .max(16, "Name must be between 2 - 16")
      .matches(/^[aA-zZ]/, "Just letters are allowed"),
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid Email address"),
    password: Yup.string()
      .required("Please enter a password")
      .min(6, "Password must be between 6 - 10")
      .max(10, "Password must be between 6 - 10"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const signupHandler = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });
      setUser({ ...user, error: "", success: data.message });
      setLoading(false);

      setTimeout(async () => {
        let options = {
          redirect: false,
          email: email,
          password: password,
        };
        const res = await signIn("credentials", options);
        Router.push("/");
      }, 1000);
    } catch (error) {
      setLoading(false);
      setUser({ ...user, success: "", error: error.response.data.message });
    }
  };

  const signInHandler = async () => {
    setLoading(true);
    let options = {
      redirect: false,
      email: login_email,
      password: login_password,
    };
    const res = await signIn("credentials", options);
    setUser({ ...user, success: "", error: "" });
    setLoading(false);
    if (res?.error) {
      setLoading(false);
      setUser({ ...user, login_error: res?.error });
    } else {

      return Router.push(callbackUrl || "/");
    }
  };
  return (
    <>
      {loading && <RiseLoaderSpinner loading={loading} />}

      <Header country={country} />
      <div className={styles.login}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <div className={styles.back__svg}>
              <BiLeftArrowAlt />
            </div>
            <span>
              We'd be happy to join us! <Link href="/store">Go Store</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <h1>Sign in</h1>
            <Formik
              enableReinitialize
              initialValues={{
                login_email,
                login_password,
              }}
              validationSchema={loginValidation}
              onSubmit={() => {
                signInHandler();
              }}
            >
              {(form) => (
                <Form method="post" action="/api/auth/signin/email">
                  <input
                    type="hidden"
                    defaultValue={csrfToken}
                    name="csrfToken"
                  />
                  <LoginInput
                    type="email"
                    name="login_email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={changeHandler}
                  />
                  <LoginInput
                    type="password"
                    name="login_password"
                    icon="password"
                    placeholder="Password"
                    onChange={changeHandler}
                  />
                  <PrimaryBtn type="submit" text="Sign in" />
                  {login_error && (
                    <span className={styles.errorm}>{login_error}</span>
                  )}
                  <div className={styles.forgot}>
                    <Link href="/auth/forgot">Forgot password?</Link>
                  </div>
                </Form>
              )}
            </Formik>
            <div className={styles.login__socials}>
              <span className={styles.or}>Or continue with</span>
              {providers.map((provider) => {
                if (provider.name === "Credentials") {
                  return;
                }
                return (
                  <div key={provider.name}>
                    <button
                      className={styles.social__btn}
                      onClick={() => signIn(provider.id)}
                    >
                      <img
                        src={`../../images/${provider.name}.png`}
                        alt={provider.name}
                      />
                      Sign in with {provider.name}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className={styles.login__container}>
          <div className={styles.login__form}>
            <h1>Sign up</h1>
            <Formik
              enableReinitialize
              initialValues={{
                name,
                email,
                password,
                conf_password,
              }}
              validationSchema={registerValidation}
              onSubmit={signupHandler}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="text"
                    name="name"
                    icon="user"
                    placeholder="Full Name"
                    onChange={changeHandler}
                  />
                  <LoginInput
                    type="text"
                    name="email"
                    icon="email"
                    placeholder="Email Address"
                    onChange={changeHandler}
                  />
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="Password"
                    onChange={changeHandler}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Re-Type Password"
                    onChange={changeHandler}
                  />
                  <PrimaryBtn type="submit" text="Sign up" />
                </Form>
              )}
            </Formik>
            <div>
              {success && <span className={styles.success}>{success}</span>}
            </div>
            <div>{error && <span className={styles.errorm}>{error}</span>}</div>
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export default SignIn;

export async function getServerSideProps(context) {
  const { req } = context;

  const session = await getSession({ req });
  const callbackUrl = context.query.callbackUrl || ""; // Provide a default value
  
  if (session) {
    return {
      redirect: {
        destination: callbackUrl,
      },
    };
  }

  let data = await axios
    .get("https://api.ipregistry.co/?key=hznlnxegjsv8cb86")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });

  const providers = Object.values(await getProviders());

  const csrfToken = await getCsrfToken(context);

  return {
    props: {
      // country: {name: data.name, flag: data.flag.emojitwo }
      country: {
        name: "Canada",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/255px-Flag_of_Canada_%28Pantone%29.svg.png",
      },
      providers,
      csrfToken,
      callbackUrl,
    },
  };
}
