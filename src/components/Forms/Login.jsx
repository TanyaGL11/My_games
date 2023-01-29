import { Formik, Field, Form } from 'formik'
import cn from 'classnames'
import s from './style.module.css'

function validateEmail(value) {
  let error
  if (!value) {
    error = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    error = 'Invalid email address'
  }
  return error
}

function validateField(value) {
  let error
  if (!value) {
    error = 'Required'
  }
  return error
}

export const LoginForm = ({ onChangeType, onSubmit }) => {
  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className={s.form}>
          <Field type="email" name="email" placeholder="Email" className={s.input} validate={validateEmail} />
          {errors.email && touched.email && <div>{errors.email}</div>}
          <Field type="password" name="password" placeholder="Password" className={s.input} validate={validateField} />
          {errors.password && touched.password && <div>{errors.password}</div>}
          <button type="submit" className={cn(s.button, s.mainButton)}>
            Войти
          </button>
          <button onClick={() => onChangeType('registration')} className={s.button}>
            Регистрация
          </button>
        </Form>
      )}
    </Formik>
  )
}