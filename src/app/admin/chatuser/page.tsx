import { getServerSession } from "next-auth";
import { authOptions } from "@/app/server/auth";
import { redirect } from "next/navigation";
import { UserRole } from "@/constants/enums";
import db from "@/lib/prisma";

export const revalidate = 0; // always fresh
export const dynamic = "force-dynamic";

export default async function ChatUserAdminPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/auth/signin?callbackUrl=/admin/chatuser");
  if (session.user?.role !== UserRole.ADMIN) redirect("/profile");

  const messages = await db.chatuser.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <main className="p-6 md:p-10">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Contact Messages</h1>
        <p className="text-sm text-muted-foreground">chatuser submissions</p>
      </div>

      {messages.length === 0 ? (
        <div className="rounded-md border border-white/10 bg-white/5 p-6 text-sm text-gray-300">
          No messages yet.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-md border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Name</th>
                <th className="px-4 py-3 text-left font-semibold">Email</th>
                <th className="px-4 py-3 text-left font-semibold">Message</th>
                <th className="px-4 py-3 text-left font-semibold">Created</th>
              </tr>
            </thead>
            <tbody>
              {messages.map((m) => (
                <tr key={m.id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="px-4 py-3 align-top">{m.name}</td>
                  <td className="px-4 py-3 align-top">
                    <a className="text-blue-400 hover:underline" href={`mailto:${m.email}`}>{m.email}</a>
                  </td>
                  <td className="px-4 py-3 align-top whitespace-pre-wrap max-w-[600px]">{m.message}</td>
                  <td className="px-4 py-3 align-top text-gray-400">{new Date(m.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
