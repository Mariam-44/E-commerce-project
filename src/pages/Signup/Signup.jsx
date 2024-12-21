import { data } from "autoprefixer";
import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { object, ref, string } from "yup";

export default function Signup() {
  const [ExistError, setExistError] = useState(null);
  const passRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
  const phoneRegex = /^(02)?01[0125][0-9]{8}$/;
  const validationSchema = object({
    name: string()
      .required("Name is required")
      .min(3, "Name must be more than 3 characters")
      .max(25, "Name must be less than 25 characters"),
    email: string().required("Email is required").email("Email is invalid"),
    password: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password should be minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    rePassword: string()
      .required("Confirm password is required")
      .oneOf([ref("password")], "Password and confirm password should match"),
    phone: string()
      .required("Phone is required")
      .matches(phoneRegex, "Only Egyptian numbers are allowed"),
  });

  async function sendData(values) {
    const loadingID = toast.loading("Waiting...");
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "POST",
        data: values,
      };

      let { data } = await axios.request(options);
      if (data.message === "success") {
        toast.dismiss(loadingID)
        toast.success("user account created successfully");
      }
    } catch (error) {
      setExistError(error.response.data.message);
    }
  }
  
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema,
    onSubmit: sendData,
  });
  return (
    <div>
      <h1 className="text-lg text-slate-700 font-semibold mt-10 mb-4">
        Register now
      </h1>
      <form className="space-y-4" onSubmit={formik.handleSubmit}>
        <div className="name">
          <input
            type="text"
            className="form-control placeholder:text-sm"
            placeholder="Type your name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="name"
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-sm mt-2 ps-2">
              *{formik.errors.name}
            </p>
          )}
        </div>

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
          {ExistError && (
            <p className="text-red-500 text-sm mt-2 ps-2">*{ExistError}</p>
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
        </div>
        <div className="repassword">
          <input
            type="password"
            className="form-control placeholder:text-sm"
            placeholder="Confirm password"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="rePassword"
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 text-sm mt-2 ps-2">
              *{formik.errors.rePassword}
            </p>
          )}
        </div>

        <div className="phone">
          <input
            type="tel"
            className="form-control placeholder:text-sm"
            placeholder="Phone Number"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            name="phone"
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-sm mt-2 ps-2">
              *{formik.errors.phone}
            </p>
          )}
        </div>
        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
}
