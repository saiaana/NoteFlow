import { headers } from "next/headers";
import ClientLayout from "@/components/ui/layout/ClientLayout";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const prefers = h.get("Sec-CH-Prefers-Color-Scheme");
  const initialTheme = prefers === "dark" ? "dark" : "light";

  return (
    <html
      lang="en"
      style={{ colorScheme: initialTheme }}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <ClientLayout initialTheme={initialTheme}>{children}</ClientLayout>
      </body>
    </html>
  );
}
