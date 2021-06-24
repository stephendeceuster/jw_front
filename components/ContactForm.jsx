import { useState } from "react";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import { motion } from "framer-motion";
import styles from "../styles/Form.module.scss";
import { disable } from "debug";

export const ContactForm = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

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

  const postHandler = async (values, actions) => {
    // make call to api for posting form-input
    const resp = await axios.post("/api/contactHandler", { values });
    // if status is 200 show Success else showError
    resp.status === 200 ? setShowSuccess(true) : setShowError(true);
    // reset form to emptyState
    actions.resetForm();
  };

  return (
    <>
      {showSuccess && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.success}
        >
          Dank je voor je bericht, ik neem zo snel mogelijk contact met je op.
        </motion.div>
      )}
      {showError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={styles.error}
        >
          Er is iets misgelopen, probeer later nog eens of stuur een mail naar
          jornewellens@gmail.com
        </motion.div>
      )}
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={yupValidate}
        onSubmit={postHandler}
      >
        {(props) => {
        
          return (
            <Form className={styles.contact_form}>
              <label htmlFor="fullName">Name</label>
              <Field id="fullName" name="fullName" />
              <ErrorMessage
                component="div"
                className={styles.form_error}
                name="fullName"
              />

              <label htmlFor="email">Email</label>
              <Field id="email" name="email" type="email" />
              <ErrorMessage
                component="div"
                className={styles.form_error}
                name="email"
              />

              <label htmlFor="message">Message</label>
              <Field as="textarea" id="message" name="message" />
              <ErrorMessage
                component="div"
                className={styles.form_error}
                name="message"
              />

              <button type="submit" disable={showError ? "true" : "false"}>
                Send
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
