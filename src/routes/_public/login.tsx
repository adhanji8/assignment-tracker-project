import { Link, createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Spinner, buttonClass } from "#/components/spinner";
import { authClient } from "#/lib/auth-client";
import { getUser } from "#/lib/get-user";

export const Route = createFileRoute("/_public/login")({
  beforeLoad: async () => {
    const user = await getUser();
    if (user) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: LoginPage,
});

const inputClass =
  "block w-full border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-transparent";

function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  async function onSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    const { error } = await authClient.signIn.email({ email, password });
    if (error) {
      setError(error.message ?? "Login failed");
      setPending(false);
      return;
    }
    // Kick off running beforeLoad once more to do the redirect
    await router.invalidate();
  }

  return (
    <form onSubmit={onSubmit} className="p-8 max-w-md space-y-3">
      <h1 className="text-4xl font-bold">Login</h1>
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
        Sign in
      </button>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <p className="text-sm">
        No account?{" "}
        <Link to="/register" className="underline">
          Register
        </Link>
      </p>
    </form>
  );
}
