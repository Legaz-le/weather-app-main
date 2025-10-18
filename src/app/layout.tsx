import "../app/styles/index.css";

export const metadata = { title: "Weather" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0F0E1A] text-white">
          {children}
      </body>
    </html>
  );
}