import { useForm } from "react-hook-form";
import authService from "../../services/auth.service";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});

const useForgotPassword = () => {
  const navigate = useNavigate();
  const forgotPasswordReq = async (payload) => {
    const res = await authService.forgotPassword(payload);
    return res.data;
  };

  const {
    handleSubmit: handleSubmitForgotPassword,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const {
    mutate: mutateForgotPassword,
    isPending: isPendingForgotPassword,
    isSuccess: isSuccessForgotPassword,
    isError: isErrorForgotPassword,
    error: errorForgotPassword,
  } = useMutation({
    mutationFn: forgotPasswordReq,
    onError: (err) => {},
    onSuccess: () => {
      navigate("/email-success");
    },
  });

  const handleForgotPassword = (payload) => mutateForgotPassword(payload);

  return {
    handleSubmitForgotPassword,
    control,
    errors,
    reset,
    isPendingForgotPassword,
    isSuccessForgotPassword,
    handleForgotPassword,
    isErrorForgotPassword,
    errorForgotPassword,
  };
};

export default useForgotPassword;
