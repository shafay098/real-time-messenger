"use client";

import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Image from "next/image";
import { FaFacebookMessenger } from "react-icons/fa";
import { Formik, useFormik } from "formik";
import FormikInput from "@/components/CommonComponents/formikInput";
import { SignupSchema, SiginSchema } from "@/utils/AllSchemas";
import { Button } from "@/components/CommonComponents/Button";
import { FaGithub } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

// import useResponsiveHook from "@/hooks/useResponsiveHook";

export const LandingPage = () => {
  const [variant, setvariant] = useState("LOGIN");
  const [submitLoading, setSubmitLoading] = useState(false);
  const session = useSession();
  console.log("🚀 ~ LandingPage ~ session:", session);
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status, router]);

  const signUpFormik = useFormik({
    initialValues: {
      email: "",
      name: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: async (values) => {
      setSubmitLoading(true);
      axios
        .post("/api/register", values)
        .then((res) => {
          console.log("🚀 ~ .then ~ res:", res);
          toast.success("succesfull registeres");
          router.push("/users");
        })
        .catch(() => toast.error("Error registering"))
        .finally(() => setSubmitLoading(false));
    },
  });

  const loginInFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SiginSchema,
    onSubmit: (values) => {
      setSubmitLoading(true);
      signIn("credentials", { ...values, redirect: false })
        .then((res) => {
          if (res?.error) {
            toast.error("invalid credientails");
          }
          if (res?.ok) {
            toast.success("Successfully logged in");
            router.push("/users");
          }
        })
        .finally(() => setSubmitLoading(false));
    },
  });

  const socialActions = (action) => {
    setSubmitLoading(true);
    signIn(action, { redirect: false })
      .then((res) => {
        if (res?.error) {
          toast.error("invalid credientails");
        }
        if (res?.ok && !res?.error) {
          toast.success("Successfully logged in");
          router.push("/users");
        }
      })
      .finally(() => setSubmitLoading(false));
  };

  return (
    <Container className="bg-slate-100" fluid>
      <Row>
        <Col xs={12}>
          <div className="flex flex-col h-screen justify-center align-middle sm:w-full sm:max-w-md sm:mx-auto my-auto j">
            <FaFacebookMessenger
              size={50}
              color="blue"
              className="text-center mx-auto"
            />
            {variant === "LOGIN" ? (
              <p className="text-gray-900 text-3xl mx-auto mt-6 font-bold tracking-tight ">
                Sign In To Your Account
              </p>
            ) : (
              <p className="text-gray-900 text-3xl mx-auto mt-6 font-bold tracking-tight ">
                Register Your Account
              </p>
            )}

            <div className="bg-white h-max rounded p-4 mt-3">
              {variant === "LOGIN" ? (
                <form onSubmit={loginInFormik.handleSubmit}>
                  <label
                    className="text-lg font-bold text-black w-full"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <FormikInput
                    disabled={submitLoading}
                    id="email"
                    name="email"
                    type="email"
                    onChange={loginInFormik.handleChange}
                    value={loginInFormik.values.email}
                    error={
                      loginInFormik.touched.email && loginInFormik.errors.email
                        ? loginInFormik.errors.email
                        : ""
                    }
                    handleBlur={loginInFormik.handleBlur}
                  />

                  <label
                    className="text-lg font-bold text-black w-full mt-3 "
                    htmlFor="email"
                  >
                    Password
                  </label>

                  <FormikInput
                    disabled={submitLoading}
                    id="password"
                    name="password"
                    type="password"
                    onChange={loginInFormik.handleChange}
                    value={loginInFormik.values.password}
                    handleBlur={loginInFormik.handleBlur} // Corrected prop name
                    error={
                      loginInFormik.touched.password &&
                      loginInFormik.errors.password
                        ? loginInFormik.errors.password
                        : ""
                    }
                  />

                  <Button
                    disabled={submitLoading}
                    containerClass={
                      "mt-3 w-full text-center flex flex-row justify-center"
                    }
                    variant="primary"
                  >
                    Sign In
                  </Button>
                </form>
              ) : (
                <form onSubmit={signUpFormik.handleSubmit}>
                  <label
                    className="text-lg font-bold text-black w-full"
                    htmlFor="email"
                  >
                    Name
                  </label>

                  <FormikInput
                    disabled={submitLoading}
                    name="name"
                    onChange={signUpFormik.handleChange}
                    value={signUpFormik.values.name}
                    error={
                      signUpFormik.touched.name && signUpFormik.errors.name
                        ? signUpFormik.errors.name
                        : ""
                    }
                    handleBlur={signUpFormik.handleBlur}
                  />

                  <label
                    className="text-lg font-bold text-black w-full"
                    htmlFor="email"
                  >
                    Email
                  </label>

                  <FormikInput
                    disabled={submitLoading}
                    id="email"
                    name="email"
                    type="email"
                    onChange={signUpFormik.handleChange}
                    value={signUpFormik.values.email}
                    error={
                      signUpFormik.touched.email && signUpFormik.errors.email
                        ? signUpFormik.errors.email
                        : ""
                    }
                    handleBlur={signUpFormik.handleBlur}
                  />

                  <label
                    className="text-lg font-bold text-black w-full mt-3 "
                    htmlFor="email"
                  >
                    Password
                  </label>

                  <FormikInput
                    disabled={submitLoading}
                    id="password"
                    name="password"
                    type="password"
                    onChange={signUpFormik.handleChange}
                    value={signUpFormik.values.password}
                    handleBlur={signUpFormik.handleBlur} // Corrected prop name
                    error={
                      signUpFormik.touched.password &&
                      signUpFormik.errors.password
                        ? signUpFormik.errors.password
                        : ""
                    }
                  />

                  <Button
                    containerClass={
                      "mt-3 w-full text-center flex flex-row justify-center"
                    }
                    variant="primary"
                    disabled={submitLoading}
                  >
                    Register
                  </Button>
                </form>
              )}

              <div className="flex mt-3 md:flex-row sm:flex-col flex-col">
                <div className="border-t mt-[0.65rem] border-gray w-full"></div>
                <p className="text-sm mx-3 text-gray-400 min-w-max">
                  Or Continue With
                </p>
                <div className="border-t mt-[0.65rem] border-gray w-full"></div>
              </div>

              <div className="flex flex-row gap-2 mt-3">
                <button
                  onClick={() => {
                    socialActions("github");
                  }}
                  disabled={submitLoading}
                  className={`p-2 ${
                    submitLoading ? "" : "hover:bg-slate-400"
                  } justify-center flex text-center w-full border-gray-300 border-1 border-solid`}
                >
                  <FaGithub size={15} />
                </button>
                <button
                  onClick={() => {
                    socialActions("google");
                  }}
                  disabled={submitLoading}
                  className={`p-2 ${
                    submitLoading ? "" : "hover:bg-slate-400"
                  } justify-center flex text-center w-full border-gray-300 border-1 border-solid`}
                >
                  <FaGoogle size={15} />
                </button>
              </div>

              <div className="flex flex-row justify-center w-full mt-4">
                {!submitLoading &&
                  (variant === "LOGIN" ? (
                    <p className="text-gray-400 text-sm ">
                      New to Messenger?{" "}
                      <span
                        onClick={() => {
                          signUpFormik.resetForm();
                          setvariant("REGISTER");
                        }}
                        className="pl-1 underline hover:cursor-pointer"
                      >
                        Create an account
                      </span>
                    </p>
                  ) : (
                    <p className="text-gray-400 text-sm ">
                      Already have an account?{" "}
                      <span
                        onClick={() => {
                          loginInFormik.resetForm();
                          setvariant("LOGIN");
                        }}
                        className="pl-1 underline hover:cursor-pointer"
                      >
                        Log in
                      </span>
                    </p>
                  ))}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
