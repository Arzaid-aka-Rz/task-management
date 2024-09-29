import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="grid md:grid-cols-10 w-full h-screen">
      <div className=" hidden md:flex col-span-4 bg-black flex-col justify-center">
        <div className="flex justify-center mb-4">
          <h1 className="text-4xl  text-white font-bold">Task Flow</h1>
        </div>
      </div>

      <div className=" w-full md:col-span-6 bg-[#111827]">
        <LoginForm/>
      </div>
    </div>
  );
};

export default Login;
