import { useForm } from "react-hook-form";
import authService from "../../services/auth.service";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouterReady } from "../../hooks/useQueryReady";
import { useEffect, useState } from "react";

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters"),
  password_confirmation: yup
    .string()
    .required("password confirmation is a required field")
    .oneOf([yup.ref("password")], "Passwords is not match"),
});

const useResetPassword = () => {
  const navigate = useNavigate();
  const isReady = useRouterReady();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    if (!isReady) {
      return;
    }

    const token = searchParams.get("token");
    const email = searchParams.get("email");

    // Validate required parameters
    if (!token?.trim() || !email?.trim()) {
      navigate("/");
      return;
    }

    // All checks passed, proceed with data fetching
    setUser({
      token,
      email,
    });
  }, [navigate, searchParams, isReady]);

  const resetPasswordReq = async (payload) => {
    const { token, email } = user;
    if (!token || !email) throw new Error("Invalid token or email");
    payload = {
      ...payload,
      token,
      email,
    };
    const res = await authService.resetPassword(payload);
    return res.data;
  };

  const {
    handleSubmit: handleSubmitResetPassword,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
  });

  const {
    mutate: mutateResetPassword,
    isPending: isPendingResetPassword,
    isSuccess: isSuccessResetPassword,
    isError: isErrorResetPassword,
    error: errorResetPassword,
  } = useMutation({
    mutationFn: resetPasswordReq,
    onError: (err) => {},
    onSuccess: () => {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    },
  });

  const handleResetPassword = (payload) => mutateResetPassword(payload);

  return {
    handleSubmitResetPassword,
    control,
    errors,
    reset,
    isPendingResetPassword,
    isSuccessResetPassword,
    handleResetPassword,
    isErrorResetPassword,
    errorResetPassword,
  };
};

export default useResetPassword;
