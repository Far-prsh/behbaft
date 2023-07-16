import axios from "axios";
import Header from "@/components/header";
import Footer from "@/components/footer";
import LoginInput from "@/components/inputs/loginInput";
import PrimaryBtn from "@/components/buttons/primaryBtn";
import styles from "../../styles/forgot.module.scss";
import { BiLeftArrowAlt } from "react-icons/bi";
import Link from "next/link";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import RiseLoaderSpinner from "@/components/loaders/riseloader";

const initialValues = {
  email: "",
  success: "",
  error: "",
  login_error: "",
};

function Forgot({ country }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error,setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const emailValidation = Yup.object({
    email: Yup.string()
      .required("Email address is required")
      .email("Please enter a valid Email address"),
  });

  const forgotHandler = async() => {
    try {
      setLoading(true)
      const {data} = await axios.post('/api/auth/forgot', {email})
      setLoading(false)
      setError('')
      setSuccess(data.message)
      setEmail('')
    } catch (error) {
      setLoading(false)
      setError(error.response.data.message)
      setSuccess('')
    }
  }

  return (
    <>
     {loading && <RiseLoaderSpinner loading={loading} />}
      <Header country={country} />
      <div className={styles.container}><div className={styles.login__container}>
        <div className={styles.login__header}>
        <Link href="/signin"><div className={styles.back__svg}>
            <BiLeftArrowAlt />
          </div></Link>
          <span>
            Forgot your password? <Link href="/signin">Login instead</Link>
          </span>
        </div>
        <div className={styles.login__form}>
          <Formik
            enableReinitialize
            initialValues={{
              email,
            }}
            validationSchema={emailValidation}
            onSubmit={() => {
              forgotHandler();
            }}
          >
            {(form) => (
              <Form>
              
                <LoginInput
                  type="email"
                  name="email"
                  icon="email"
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <PrimaryBtn type="submit" text="Reset Password" />
                {error && <span className={styles.errorm}>{error}</span>}
                {success && <span className={styles.success}>{success}</span>}
              </Form>
            )}
          </Formik>
        </div>
      </div></div>
      <Footer country={country} />
    </>
  );
}

export default Forgot;

export async function getServerSideProps() {
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
    },
  };
}
