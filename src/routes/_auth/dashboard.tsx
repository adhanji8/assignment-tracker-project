import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { Spinner, buttonClass } from "#/components/spinner";
import { createAssignment, getAssignments } from "#/lib/assignments";

export const Route = createFileRoute("/_auth/dashboard")({
  loader: async ({ context }) => {
    const assignments = await getAssignments();
    return { user: context.user, assignments };
  },
  component: Dashboard,
});

const inputClass =
  "block w-full border border-neutral-300 dark:border-neutral-700 px-3 py-2 bg-transparent";

function Dashboard() {
  const { user, assignments } = Route.useLoaderData();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [pending, setPending] = useState(false);

  async function onCreate(e: React.SubmitEvent) {
    e.preventDefault();
    setPending(true);
    await createAssignment({ data: { title, dueDate } });
    setTitle("");
    setDueDate("");
    await router.invalidate();
    setPending(false);
  }

  return (
    <div className="p-8 max-w-md space-y-6">
      <h1 className="text-4xl font-bold">Welcome, {user.name}</h1>

      <form onSubmit={onCreate} className="space-y-3">
        <h2 className="text-2xl font-semibold">New assignment</h2>
        <input
          className={inputClass}
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className={inputClass}
          type="datetime-local"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
        <button disabled={pending} className={buttonClass}>
          {pending && <Spinner />}
          Add assignment
        </button>
      </form>

      <section className="space-y-2">
        <h2 className="text-2xl font-semibold">Your assignments</h2>
        {assignments.length === 0 ? (
          <p>No assignments yet.</p>
        ) : (
          <ul className="space-y-1">
            {assignments.map((a) => (
              <li key={a.id} className="border-b border-neutral-200 dark:border-neutral-800 py-1">
                <span className="font-medium">{a.title}</span> — due{" "}
                {new Date(a.dueDate).toLocaleString()}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
