import { Outlet, createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Spinner, buttonClass } from "#/components/spinner";
import { authClient } from "#/lib/auth-client";
import { getUser } from "#/lib/get-user";

export const Route = createFileRoute("/_auth")({
  beforeLoad: async () => {
    const user = await getUser();
    if (!user) {
      throw redirect({ to: "/login" });
    }
    return { user };
  },
  component: AuthLayout,
});

// 🚀 Note to class: The layout below will be applied to ALL _auth'd pages
function AuthLayout() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function onSignOut() {
    setPending(true);
    await authClient.signOut();
    // router.invalidate triggers calling beforeLoad again -> redirect to login page
    await router.invalidate();
  }

  return (
    <div className="w-full max-w-md">
      <header className="flex items-center justify-between p-4 border-b border-neutral-200 dark:border-neutral-800">
        <span className="font-bold">Assignment Tracker</span>
        <button onClick={() => void onSignOut()} disabled={pending} className={buttonClass}>
          {pending && <Spinner />}
          Log out
        </button>
      </header>
      <Outlet />
    </div>
  );
}
