import "../styles/index.css";
import { WeatherProvider } from "@/context/WeatherContext";
import { UnitProvider } from "@/context/UnitContext";

export const metadata = { title: "Weather" };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0F0E1A] text-white">
        <WeatherProvider>
          <UnitProvider>{children}</UnitProvider>
        </WeatherProvider>
      </body>
    </html>
  );
}
