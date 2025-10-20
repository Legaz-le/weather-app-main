import "../styles/index.css";
import { WeatherProvider } from "@/context/WeatherContext";

export const metadata = { title: "Weather" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F0E1A] text-white">
        <WeatherProvider>{children}</WeatherProvider>
      </body>
    </html>
  );
}
