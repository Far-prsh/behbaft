import axios from "axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginInput from "@/components/inputs/loginInput";
import PrimaryBtn from "@/components/buttons/primaryBtn";
import styles from "../../../styles/forgot.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import RiseLoaderSpinner from "@/components/loaders/riseloader";
import jwt from "jsonwebtoken";
import { getSession, signIn } from "next-auth/react";
import { Router } from "next/router";

function Reset({ country, user_id }) {
  console.log("user_id", user_id);

  const [password, setPassword] = useState("");
  const [conf_password, setConf_password] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const passwordValidation = Yup.object({
    password: Yup.string()
      .required("Please enter a password")
      .min(6, "Password must be between 6 - 10")
      .max(10, "Password must be between 6 - 10"),
    conf_password: Yup.string()
      .required("Confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const resetHandler = async () => {
    try {
      setLoading(true);
      const { data } = await axios.put("/api/auth/reset", {
        user_id,
        password,
      });

      let options = {
        redirect: false,
        email: data.email,
        password: password,
      };
      await signIn("credentials", options);
      window.location.reload(true);
    
    } catch (error) {
      
      setLoading(false);
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading && <RiseLoaderSpinner loading={loading} />}
      <Header country={country} />
      <div className={styles.container}>
        <div className={styles.login__container}>
          <div className={styles.login__header}>
            <Link href="/signin">
              <div className={styles.back__svg}>
                <BiLeftArrowAlt />
              </div>
            </Link>
            <span>
              Reset your password <Link href="/signin">Login instead</Link>
            </span>
          </div>
          <div className={styles.login__form}>
            <Formik
              enableReinitialize
              initialValues={{
                password,
                conf_password,
              }}
              validationSchema={passwordValidation}
              onSubmit={() => {
                resetHandler();
              }}
            >
              {(form) => (
                <Form>
                  <LoginInput
                    type="password"
                    name="password"
                    icon="password"
                    placeholder="New Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <LoginInput
                    type="password"
                    name="conf_password"
                    icon="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setConf_password(e.target.value)}
                  />

                  <PrimaryBtn type="submit" text="Reset Password" />
                  {error && <span className={styles.errorm}>{error}</span>}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Footer country={country} />
    </>
  );
}

export default Reset;

export async function getServerSideProps(context) {
  const resetToken = "fdsndvvvds##$$Gdvb05ve%^sd**lkfeNJVDNFK";

  const { query, req } = context;
  const session = await getSession({ req });
  if (session) {
    return {
      redirect: {
        destination: "/",
      },
    };
  }
  const token = query.token;
  const user_id = jwt.verify(token, resetToken);

  let data = await axios
    .get("https://api.ipregistry.co/?key=hznlnxegjsv8cb86")
    .then((res) => {
      return res.data.location.country;
    })
    .catch((err) => {
      console.log(err);
    });
  return {
    props: {
      // country: {name: data.name, flag: data.flag.emojitwo }
      country: {
        name: "Canada",
        flag: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Flag_of_Canada_%28Pantone%29.svg/255px-Flag_of_Canada_%28Pantone%29.svg.png",
      },
      user_id: user_id.id,
    },
  };
}
