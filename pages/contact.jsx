import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { Header } from "../components/Header";
import styles from "../styles/Form.module.scss";

const ContactForm = (props) => {
  let showErrorMessage = false;
  let errorMessage = "";

  const initialValues = {
    fullName: "",
    email: "",
    message: "",
  };

  const yupValidate = yup.object().shape({
    fullName: yup
      .string()
      .min(2, "Name is too short")
      .max(255, "Name is too long")
      .required("Name is required"),
    email: yup
      .string()
      .email("This must be an emailadress")
      .required("Email is required"),
    message: yup.string(),
  });

  const postHandler = (values) => {
    console.log(values);
  };

  return (
    <>
      <Header />
      <h1>Contact</h1>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={yupValidate}
        onSubmit={postHandler}
      >
        <Form className={styles.contact_form}>
          <label htmlFor="fullName">Name</label>
          <Field id="fullName" name="fullName" />
          <label htmlFor="email">Email</label>
          <Field id="email" name="email" type="email" />
          <label htmlFor="message">Message</label>
          <Field as="textarea" id="message" name="message" />
          <button type="submit">Send</button>
        </Form>
      </Formik>
    </>
  );
};

export default ContactForm;
