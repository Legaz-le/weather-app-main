import "../styles/index.css";
import { Metadata } from "next";
import { WeatherProvider } from "@/context/WeatherContext";
import { UnitProvider } from "@/context/UnitContext";

export const metadata: Metadata = {
  title: "Weather App",
  description: "Real-time weather information for cities worldwide",
  keywords: "weather, forecast, temperature, humidity",
  viewport: "width=device-width, initial-scale=1",
  icons: {
    icon: "/favicon.ico",
  },
};

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
