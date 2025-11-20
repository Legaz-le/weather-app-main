import "../styles/index.css";
import { WeatherProvider } from "@/context/WeatherContext";
import { UnitProvider } from "@/context/UnitContext";
import { ErrorBoundary } from "./components/Shared/ErrorBoundary";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="app-bg min-h-screen transition-colors duration-500">
        <ErrorBoundary>
          <WeatherProvider>
            <UnitProvider>{children}</UnitProvider>
          </WeatherProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
