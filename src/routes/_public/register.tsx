import { Link, createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Spinner, buttonClass } from "#/components/spinner";
import { authClient } from "#/lib/auth-client";
import { getUser } from "#/lib/get-user";

export const Route = createFileRoute("/_public/register")({
  beforeLoad: async () => {
    const user = await getUser();
    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: RegisterPage,
});

const inputClass =
  "block w-full border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-transparent";

function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    if (error) {
      setError(error.message ?? "Registration failed");
      setPending(false);
      return;
    }
    await router.invalidate();
  }

  return (
    <form onSubmit={onSubmit} className="p-8 max-w-md space-y-3">
      <h1 className="text-4xl font-bold">Register</h1>
      <input
        className={inputClass}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={inputClass}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={inputClass}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={pending} className={buttonClass}>
        {pending && <Spinner />}
        Sign up
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-sm">
        Have an account?{" "}
        <Link to="/login" className="underline">
          Login
        </Link>
      </p>
    </form>
  );
}
