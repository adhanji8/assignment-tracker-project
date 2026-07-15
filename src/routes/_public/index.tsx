import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_public/")({ component: Landing });

function Landing() {
  return (
    <main className="p-8 max-w-md space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Assignment Tracker</h1>
        <p className="text-lg">
          Keep track of all your assignment deadlines in one place, so nothing
          slips through the cracks.
        </p>
      </div>

      <ul className="list-disc pl-5 space-y-1">
        <li>Add assignments with due dates</li>
        <li>See what's due next at a glance</li>
        <li>Check things off as you finish them</li>
        <li>Stay ahead of every deadline</li>
      </ul>

      <p>
        <Link to="/register" className="underline">
          Sign up
        </Link>{" "}
        or{" "}
        <Link to="/login" className="underline">
          log in
        </Link>{" "}
        to get started.
      </p>
    </main>
  );
}
