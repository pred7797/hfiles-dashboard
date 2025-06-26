import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import "./globals.css";

export const metadata = {
  title: "Welcome",
  description: "Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          style={{
            background: "#fff",
            color: "#222",
            minHeight: "100vh",
            margin: 0,
          }}
        >
          <nav
            style={{
              width: "100%",
              background: "#002DB4",
              color: "#fff",
              padding: "0 0",
              display: "flex",
              alignItems: "center",
              height: "64px",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <img
              src="/hfiles%20logo.png"
              alt="hfiles logo"
              style={{ height: "40px", position: "absolute", left: "32px" }}
            />
            
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
