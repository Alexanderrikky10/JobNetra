import { useForm } from "react-hook-form";
import authService from "../../services/auth.service";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

const useLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const loginReq = async (payload) => {
    const res = await authService.login(payload);
    return res.data;
  };

  const {
    handleSubmit: handleSubmitLogin,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const {
    mutate: mutateLogin,
    isPending: isPendingLogin,
    isSuccess: isSuccessLogin,
    isError: isErrorLogin,
    error: errorLogin,
  } = useMutation({
    mutationFn: loginReq,
    onError: (err) => {},
    onSuccess: (data) => {
      login(data);
      navigate("/");
    },
  });

  const handleLogin = (payload) => mutateLogin(payload);

  return {
    handleSubmitLogin,
    control,
    errors,
    reset,
    isPendingLogin,
    isSuccessLogin,
    handleLogin,
    isErrorLogin,
    errorLogin,
  };
};

export default useLogin;
