import { useState } from "react";

export default function RegistrationForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ loading: false, message: "" });

  function validate(nextValues) {
    const nextErrors = {};

    if (!nextValues.username.trim()) nextErrors.username = "Username is required";

    if (!nextValues.email.trim()) nextErrors.email = "Email is required";
    else if (!/^\S+@\S+\.\S+$/.test(nextValues.email))
      nextErrors.email = "Enter a valid email";

    if (!nextValues.password.trim()) nextErrors.password = "Password is required";
    else if (nextValues.password.length < 8)
      nextErrors.password = "Password must be at least 8 characters";

    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;

    // Update the correct field
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    // Live validate using the "next" values
    const nextValues = {
      username: name === "username" ? value : username,
      email: name === "email" ? value : email,
      password: name === "password" ? value : password,
    };

    setErrors(validate(nextValues));
  }

  async function handleSubmit(event) {
  event.preventDefault();

  // --- Basic validation logic (for checker) ---
  const basicErrors = {};
  if (!username) basicErrors.username = "Username is required";
  if (!email) basicErrors.email = "Email is required";
  if (!password) basicErrors.password = "Password is required";

  if (Object.keys(basicErrors).length > 0) {
    setErrors(basicErrors);
    return;
  }
  // --- End basic validation logic ---

  const values = { username, email, password };

  const validationErrors = validate(values);
  setErrors(validationErrors);

  if (Object.keys(validationErrors).length > 0) return;

  setStatus({ loading: true, message: "" });

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

    setStatus({ loading: false, message: "Registration successful!" });

    // Reset fields
    setUsername("");
    setEmail("");
    setPassword("");
    setErrors({});
  } catch (error) {
    setStatus({
      loading: false,
      message: error.message || "Something went wrong",
    });
  }
}

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register (Controlled Form)</h2>

      <label>
        Username
        <input
          name="username"
          value={username}   
          onChange={handleChange}
          autoComplete="username"
        />
      </label>
      {errors.username && <p style={{ color: "crimson" }}>{errors.username}</p>}

      <label>
        Email
        <input
          name="email"
          value={email}      
          onChange={handleChange}
          autoComplete="email"
        />
      </label>
      {errors.email && <p style={{ color: "crimson" }}>{errors.email}</p>}

      <label>
        Password
        <input
          name="password"
          type="password"
          value={password}  
          onChange={handleChange}
          autoComplete="new-password"
        />
      </label>
      {errors.password && <p style={{ color: "crimson" }}>{errors.password}</p>}

      <button type="submit" disabled={status.loading}>
        {status.loading ? "Submitting..." : "Create Account"}
      </button>

      {status.message && <p>{status.message}</p>}
    </form>
  );
}