import NavBar from "@/components/modules/NavBar";
import "./globals.css";
import Footer from "@/components/modules/Footer";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export const metadata = {
  title: "",
  description: "",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     

      <body className="relative flex min-h-screen flex-col justify-center overflow-hidden m-auto bg-[#F4F5F7]  ">
        {/* <Image src="/img/beams.jpg" alt="" className="absolute left-1/2 top-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width={1308} /> */}
        <Image src='/img/beams.png' alt="" className="absolute left-1/2 top-1/2 max-w-none overflow-hidden -translate-x-1/2 -translate-y-1/2" width={1308} height={1308} />
        <div className="absolute inset-0  bg-[url(/img/grid.svg)] bg-center overflow-hidden [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className=" flex flex-col   items-center min-h-screen w-full z-50 max-w-6xl mt-0">
          <NavBar />
          
          <main className="min-h-screen ">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
