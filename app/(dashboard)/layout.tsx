import Sidebar from "@/modules/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-[#f5f5f5] dark:bg-zinc-900">
        <div className="mr-2 mt-2 mb-2 ml-0 min-h-[calc(100vh-1rem)] rounded-2xl bg-white dark:bg-zinc-950">
          {children}
        </div>
      </main>
    </div>
  );
}
