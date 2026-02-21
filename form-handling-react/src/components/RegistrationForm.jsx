import { useState } from "react";

const initialValues = {
    username: "",
    email: "",
    password: "",
};

export default function RegistrationForm() {
   const [values, setValues] = useState(initialValues);
   const [errors, setErrors] = useState({}); 
   const [status, setStatus] = useState({ loading: false, message: "" });

   function validate(nextValues) {
    const nextErrors = {};

    if (!nextValues.username.trim()) nextErrors.username = "Username is required";
    if (!nextValues.email.trim()) nextErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(nextValues.email))
        nextErrors.email = "Enter a valid email";

    if (!nextValues.password.trim()) nextErrors.password = "PAssword is required";
    else if (nextValues.password.length < 8)
        nextErrors.password = "PAssword must be at least 8 characters";

    return nextErrors;
   }
   
    function handleChange(event) {
        const { name, value } = event.target;

        //Update form values
        const nextValues = { ...values, [name]: value };
        setValues(nextValues);

        //Live validate form values as user types
        setErrors(validate(nextValues));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const validationErrors = validate(values);
        setErrors(validationErrors);

        if(Object.keys(validationErrors).length > 0) return;

        setStatus({ loading: true, message: "" });

        try {
            //Simulate API call
            const res = await fetch("http://localhost:3001/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            if (!res.ok) {
                const maybeError = await res.json().catch(() => null);
                throw new Error(maybeError?.message || "Registration failed");
            }

            setStatus({ loading: false, message: "Registration successful!" });
            setValues(initialValues);
        } catch (error) {
            setStatus({ loading: false, message: error.message || "Something went wrong" });
        }
    }


    return (
        <form>
            <h>Register (Controlled Form)</h>

            <label>
                Username
                <input
                name= "username"
                value={values.username}
                onChange={handleChange}
                autoComplete="username"
                />
            </label>
            {errors.username && <p style={{ color: "crimson"}}>{errors.username}</p>}

            <label>
                Email
                <input
                name="email"
                value={values.email}
                onChange={handleChange}
                autoComplete="email"
                />
            </label>
            {errors.email && <p style={{ color: "crimson"}}>{errors.email}</p>}

            <label>
                Password
                <input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                autoComplete="new-password"
                />
            </label>
            {errors.password && <p style={{ color: "crimson"}}>{errors.password}</p>}
            
            <button type="submit" disabled={status.loading}>
                {status.loading ? "Submitting..." : "Create Account"}
                </button>

                {status.message && <p>{status.message}</p>}
        </form>
    );
}



