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
        <body className="bg-white text-zinc-800 min-h-screen m-0">
          <nav className="w-full bg-[#002DB4] text-white px-8 flex items-center h-16 justify-between">
            <img
              src="/hfiles%20logo.png"
              alt="hfiles logo"
              className="h-10"
            />
            <div className="flex items-center gap-4">
              <SignedOut>
                <SignInButton>
                  <button className="cursor-pointer rounded-full px-4 sm:px-5 text-white font-medium text-sm sm:text-base h-10 sm:h-12 hover:bg-white/10">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton>
                  <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
