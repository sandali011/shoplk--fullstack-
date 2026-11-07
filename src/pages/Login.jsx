import { useActionState } from "react";
import { useNavigate, useLocation } from "react-router";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from || "/";

  async function loginAction(prevState, formData) {
    const username = formData.get("username").trim();
    const password = formData.get("password");

    const errors = {};
    if (username.length < 3) {
      errors.username = "Username එකේ අකුරු 3ක්වත් තියෙන්න ඕනේ";
    }
    if (password.length < 6) {
      errors.password = "Password එක අකුරු 6ක්වත් දිග වෙන්න ඕනේ";
    }
    if (Object.keys(errors).length > 0) {
      return { errors, username };
    }

    await new Promise(resolve => setTimeout(resolve, 1000));

    login(username);
    navigate(from, { replace: true });
    return { errors: {}, username: "" };
  }

  const [state, formAction, isPending] = useActionState(loginAction, {
    errors: {},
    username: "",
  });

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow p-8 mt-10">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Login</h1>

      <form action={formAction} className="flex flex-col gap-4">
        <div>
          <input
            name="username"
            defaultValue={state.username}
            autoFocus
            placeholder="Username"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {state.errors.username && (
            <p className="text-red-500 text-sm mt-1">{state.errors.username}</p>
          )}
        </div>

        <div>
          <input
            name="password"
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {state.errors.password && (
            <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-300 text-white py-2 rounded-lg font-semibold cursor-pointer"
        >
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>

      <p className="text-xs text-gray-400 text-center mt-4">
       
      </p>
    </div>
  );
}

export default Login;