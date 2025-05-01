import "./globals.css";
import { AuthProvider } from "./Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
        
      </body>
    </html>
  );
}
