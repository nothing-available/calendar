import requireUser from "@/lib/hooks";

export default async function Dashboard() {
  const session = await requireUser();

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}