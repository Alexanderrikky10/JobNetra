import { useForm } from "react-hook-form";
import authService from "../../services/auth.service";
import * as yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

const registerSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup
    .string()
    .required()
    .min(8, "Password must be at least 8 characters"),
  password_confirmation: yup
    .string()
    .required("password confirmation is a required field")
    .oneOf([yup.ref("password")], "Passwords is not match"),
  terms: yup
    .bool()
    .required("Terms and conditions is required")
    .oneOf([true], "Terms and conditions is required"),
});

const useRegister = () => {
  const navigate = useNavigate();
  const registerReq = async (payload) => {
    const res = await authService.register(payload);
    return res.data;
  };

  const {
    handleSubmit: handleSubmitRegister,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const {
    mutate: mutateRegister,
    isPending: isPendingRegister,
    isSuccess: isSuccessRegister,
    isError: isErrorRegister,
    error: errorRegister,
  } = useMutation({
    mutationFn: registerReq,
    onError: (err) => {},
    onSuccess: (data) => {
      navigate("/login");
    },
  });

  const handleRegister = (payload) => mutateRegister(payload);

  return {
    handleSubmitRegister,
    control,
    errors,
    reset,
    isPendingRegister,
    isSuccessRegister,
    handleRegister,
    isErrorRegister,
    errorRegister,
  };
};

export default useRegister;
