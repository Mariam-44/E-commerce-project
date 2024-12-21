import { data } from "autoprefixer";
import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { object, ref, string } from "yup";
import { UserContext } from "../../context/User.context";
import { NavLink } from "react-router-dom";

export default function Login() {
  let { setToken } = useContext(UserContext);
  const [incorrectError, setincorrectError] = useState(null);
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;

  const validationSchema = object({
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
  });

  async function sendDataTologin(values) {

    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        toast.success("logged in successfully");
      }
    } catch (error) {
      setincorrectError(error.response.data.message);
    }
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: sendDataTologin,
  });
  return (
    <div>
      <h1 className="text-lg text-slate-700 font-semibold mt-10 mb-4">Login</h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="email">
          <input
            type="email"
            className="form-control placeholder:text-sm"
            placeholder="Email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="email"
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-sm mt-2 ps-2">
              *{formik.errors.email}
            </p>
          )}
        </div>

        <div className="password">
          <input
            type="password"
            className="form-control placeholder:text-sm"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="password"
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-sm mt-2 ps-2">
              *{formik.errors.password}
            </p>
          )}
          {incorrectError && (
            <p className="text-red-500 text-sm mt-2 ps-2">*{incorrectError}</p>
          )}
        </div>

        <button className="btn" type="submit">
          Login
        </button>
        <p className="mb-3 font-sm ">
          <NavLink
            to="/Auth-Password/forgetPassword"
            className="text-main ms-1 fw-bold "
          >
            Forgot your password?
          </NavLink>
        </p>
      </form>
    </div>
  );
}
