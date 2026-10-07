import "@/src/app/_styles/globals.css";
import { EB_Garamond } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";
import { Toaster } from "sonner";

const garamond = EB_Garamond({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | The Grand Arcadia",
    default: "Grand Arcadia | Luxury Hotel & Resort",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="e">
      <body
        className={`${garamond.className} min-h-screen bg-primary-950 text-primary-100 flex flex-col `}
      >
        <Header />

        <div className="flex-1 px-8 py-12 antialiased grid">
          <main className="max-w-7xl mx-auto  w-full ">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
        <Toaster position="top-center" richColors closeButton />
      </body>
    </html>
  );
}
