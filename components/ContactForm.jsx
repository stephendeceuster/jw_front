import axios from "axios";
import { Formik, Field, Form } from "formik";
import { useState } from "react";
import * as yup from "yup";
import styles from "../styles/Form.module.scss";

export const ContactForm = () => {
    let showErrorMessage = false;
    const [errorMessage, setErrorMessage] = useState('');

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

  const postHandler = async( values ) => {
      
    const resp = await axios.post('/api/contact', { values });
    
  };

  return (<Formik
    enableReinitialize
    initialValues={initialValues}
    validationSchema={yupValidate}
    onSubmit={postHandler}
  >{(props) => {
    return (
    <Form className={styles.contact_form}>
      <label htmlFor="fullName">Name</label>
      <Field id="fullName" name="fullName" />
     
      <label htmlFor="email">Email</label>
      <Field id="email" name="email" type="email" />
      
      <label htmlFor="message">Message</label>
      <Field as="textarea" id="message" name="message" />
      <button type="submit">Send</button>
    </Form>)}}
  </Formik>);
};
