import "./globals.css";

export const metadata = {
  title: "Welcome",
  description: "Next.js App",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ background: '#fff', color: '#222', minHeight: '100vh', margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
