import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import styles from './ContactForm.module.css';
import { useDispatch } from 'react-redux';
import { addContact } from '../../redux/contactsOps';

const ContactForm = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Minimum 3 characters')
      .max(50, 'Maximum 50 characters')
      .required('Required'),
    number: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
      .min(3, 'Minimum 3 digits')
      .max(15, 'Maximum 15 digits')
      .required('Required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    const { name, number } = values;
    dispatch(addContact({ name: name.trim().toLowerCase(), number }));
    resetForm();
  };

  return (
    <div className={styles.formContainer}>
      <Formik
        initialValues={{ name: '', number: '' }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        {() => (
          <Form className={styles.contactForm}>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Name
                <Field className={styles.formInput} name='name' />
                <ErrorMessage
                  className={styles.errorText}
                  name='name'
                  component='p'
                />
              </label>
            </div>
            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Number
                <Field className={styles.formInput} name='number' />
                <ErrorMessage
                  className={styles.errorText}
                  name='number'
                  component='p'
                />
              </label>
            </div>
            <button className={styles.submitButton} type='submit'>
              Add Contact
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ContactForm;
