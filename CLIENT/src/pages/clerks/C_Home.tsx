import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useRegister } from "../../react-query/clerk";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Name at least 2 characters")
    .required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  rollNumber: yup.string().required("Roll number is required"),
});

const C_Home = () => {
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { mutate: upload, isPending } = useRegister();

  const onSubmit = (data: any) => {
    console.log(data)
    upload(data, {
      onSuccess: (res: any) => {
        toast.success(res.message);
        reset();
      },
      onError: (e: any) => toast.error(e.response.data.message),
    });
  };

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12 flex justify-center items-center h-screen">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 w-80"
        >
          <input
            type="email"
            className="input input-secondary input-lg max-w-none"
            placeholder="Email"
            {...formRegister("email")}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            type="text"
            className="input input-secondary input-lg max-w-none"
            placeholder="Name"
            {...formRegister("name")}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <input
            type="text"
            className="input input-secondary input-lg max-w-none"
            placeholder="Roll Number"
            {...formRegister("rollNumber")}
          />
          {errors.rollNumber && (
            <p className="text-red-500">{errors.rollNumber.message}</p>
          )}

          <button
            className="btn btn-secondary"
            type="submit"
            disabled={isPending}
          >
            {isPending ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default C_Home;
