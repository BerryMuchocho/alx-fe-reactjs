import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().trim().required("Username is required"),
  email: Yup.string().trim().email("Enter a valid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

export default function FormikForm() {
  const initialValues = { username: "", email: "", password: "" };

  async function onSubmit(values, { resetForm, setStatus, setSubmitting }) {
    setStatus("");

    try {
      const res = await fetch("http://localhost:3001/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const maybeError = await res.json().catch(() => null);
        throw new Error(maybeError?.message || "Registration failed");
      }

      setStatus("Registration successful ✅");
      resetForm();
    } catch (err) {
      setStatus(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div style={{ maxWidth: 420 }}>
      <h2>Register (Formik + Yup)</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            <label>
              Username
              <Field name="username" autoComplete="username" />
            </label>
            <ErrorMessage name="username" component="p" style={{ color: "crimson" }} />

            <label>
              Email
              <Field name="email" autoComplete="email" />
            </label>
            <ErrorMessage name="email" component="p" style={{ color: "crimson" }} />

            <label>
              Password
              <Field name="password" type="password" autoComplete="new-password" />
            </label>
            <ErrorMessage name="password" component="p" style={{ color: "crimson" }} />

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Create account"}
            </button>

            {status && <p>{status}</p>}
          </Form>
        )}
      </Formik>
    </div>
  );
}