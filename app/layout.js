// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "./_contexts/CartContext";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { CartDrawer } from "./_components/layout/CartDrawer";
import Providers from "./_components/Providers";
import { getProduct } from "./_lib/shopify";
import ProductProvider from "./_components/ProductProvider";
import { createClient } from "@/prismicio";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const proximaNova = localFont({
  variable: "--font-proxima-nova",
  src: [
    {
      path: "../public/fonts/Proxima Nova Regular.ttf",
      weight: "400",
      style: "normal",
      display: "swap",
    },
    {
      path: "../public/fonts/Proxima Nova Semibold.ttf",
      weight: "700",
      style: "normal",
      display: "swap",
    },
    {
      path: "../public/fonts/Proxima Nova Light.ttf",
      weight: "300",
      style: "normal",
      display: "swap",
    },
  ],
});

export async function generateMetadata() {
  const client = createClient();
  const metadata = await client.getSingle("metadata");

  return {
    title: metadata?.data.home_title,
    description: metadata?.data.home_description,
    icons: {
      icon: metadata?.data.favicon.url,
      shortcut: metadata?.data.favicon.url,
      apple: metadata?.data.favicon.url,
    },
  };
}

export default async function RootLayout({ children }) {
  const product = await getProduct("samosa", "GB");
  const client = createClient();
  const page = await client.getSingle("global_nav");
  // console.log(product);

  return (
    <html lang="en" className={`${proximaNova.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers country="GB">
          <ProductProvider product={product}>
            <div className="min-h-screen flex flex-col">
              <Header data={page.data} />
              <main className="flex-1">{children}</main>
              <Footer data={page.data} />
              <CartDrawer />
            </div>
          </ProductProvider>
        </Providers>
      </body>
    </html>
  );
}
