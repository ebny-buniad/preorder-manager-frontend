export default function DashboardPage() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] flex-col justify-center">
      <div className="mx-auto max-w-4xl text-center">

        <h1 className="mb-14 text-5xl font-bold tracking-tight">
          Welcome to Preorder Manager
        </h1>

        <p className="mb-8 text-muted-foreground text-lg">
          Manage your preorders efficiently. Create, update, track, and monitor
          all preorder campaigns from a single dashboard.
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border p-6 text-left">
            <h3 className="font-semibold">Create Preorder</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Launch new preorder campaigns with custom settings.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-left">
            <h3 className="font-semibold">Manage Orders</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              View and manage all active and inactive preorders.
            </p>
          </div>

          <div className="rounded-xl border p-6 text-left">
            <h3 className="font-semibold">Track Performance</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Monitor preorder timelines and campaign activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}