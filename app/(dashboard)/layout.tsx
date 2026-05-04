import Sidebar from "@/modules/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full min-h-screen">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-900">
        <div className="mr-2 mt-2 mb-2 ml-0 flex h-[calc(100vh-1rem)] flex-col overflow-y-auto rounded-2xl bg-white border border-neutral-200 dark:bg-zinc-950 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {children}
        </div>
      </main>
    </div>
  );
}
