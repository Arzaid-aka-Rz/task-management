import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Loader2, LockKeyhole, Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { userLoginSchema } from "@/schema/userSchema";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";

const LoginForm = () => {
  
  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setErrors({
      ...errors,
      [e.target.name]: "",
    });

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginSubmitHandler = async (e) => {
    e.preventDefault();
    //form validation
    const result = userLoginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = result.error.formErrors.fieldErrors;
      setErrors(fieldErrors);
      return;
    }

    // Login API implementation
    try {
      dispatch(setLoading(true));
      const response = await axios.post(
        `${USER_API_END_POINT}/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            withCredentials: true,
          },
        }
      );

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
      error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
      console.log(error);
    }
    finally{
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen">
      <div className="flex justify-center">
        <form
          onSubmit={loginSubmitHandler}
          className="p-8 w-full max-w-md rounded-lg mx-4 bg-white shadow-md shadow-indigo-500/40"
        >
          {/* Heading */}
          <div className="mb-4">
            <h1 className="font-bold text-2xl text-center">Welcome Back</h1>
          </div>

          {/* Input fields */}
          <div className="mb-4">
            <div className="relative">
              <Input
                name="email"
                value={formData.email}
                type="email"
                onChange={changeEventHandler}
                placeholder="Enter your email address"
                className="pl-10 focus-visible:ring-1"
              />
              <Mail className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>
          </div>

          <div className="mb-4">
            <div className="relative">
              <Input
                name="password"
                value={formData.password}
                type="password"
                onChange={changeEventHandler}
                placeholder="Enter your password"
                className="pl-10 focus-visible:ring-1"
              />
              <LockKeyhole className="absolute inset-y-2 left-2 text-gray-500 pointer-events-none" />
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
            </div>
          </div>

          {/* Button */}
          <div className="mb-10">
            {loading ? (
              <Button disabled className="w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                Login
              </Button>
            )}
          </div>

          {/* Separator line */}
          <Separator className="border-t border-gray-500" />

          <p className="mt-2 text-center font-medium">
            Don&apos;t have an account?{" "}
            <Link to={"/signup"} className="text-blue-500">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
