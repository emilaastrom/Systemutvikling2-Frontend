import AuthProvider from "@/context/AuthContext";

export default function NonAuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <body>
        <div className=" bg-gradient-to-b from-background-100 to-background-200 dark:bg-slate-700">
          <div> {children}</div>
        </div>
      </body>
    </html>
  );
}
