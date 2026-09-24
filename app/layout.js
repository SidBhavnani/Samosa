// import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { CartProvider } from "./_contexts/CartContext";
import { Header } from "./_components/layout/Header";
import { Footer } from "./_components/layout/Footer";
import { CartDrawer } from "./_components/layout/CartDrawer";
import Providers from "./_components/Providers";
import { getAllProducts, getProduct } from "./_lib/shopify";
import ProductProvider from "./_components/ProductProvider";
import { createClient } from "@/prismicio";
import { headers } from "next/headers";
import EmailModal from "./_components/layout/EmailModal";

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
  // const country = request.headers.get("x-vercel-ip-country") || "GB";
  const headersList = await headers();
  const country = headersList.get("x-vercel-ip-country")?.toUpperCase() || "GB";

  const US_CANADA_COUNTRIES = ["US", "CA"];

  const productHandle = US_CANADA_COUNTRIES.includes(country)
    ? "samosa-the-ultimate-desi-party-game-copy"
    : "samosa";

  const product = await getProduct(productHandle, country);

  const allProductEdges = await getAllProducts(country);
  const allProducts = allProductEdges.edges;

  // const productCopy = {
  //   ...allProductEdges?.edges[0].node,
  //   id: allProductEdges?.edges[0].node.id + "-copy",
  //   title: "(Copy) " + allProductEdges?.edges[0].node.title,
  // };
  // const productCopy2 = {
  //   ...allProductEdges?.edges[0].node,
  //   id: allProductEdges?.edges[0].node.id + "-copy2",
  //   title: "(Copy 2) " + allProductEdges?.edges[0].node.title,
  // };
  // const allProducts = [
  //   allProductEdges?.edges[0],
  //   { ...allProductEdges?.edges[0], node: productCopy },
  //   { ...allProductEdges?.edges[0], node: productCopy2 },
  // ];

  // console.log(allProductEdges.edges[0].node);

  // const product = await getProduct("samosa", "GB");
  const client = createClient();
  const page = await client.getSingle("global_nav");
  // console.log(country);

  return (
    <html lang="en" className={`${proximaNova.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers country={country}>
          <ProductProvider product={product} allProducts={allProducts}>
            <div className="min-h-screen flex flex-col">
              <Header data={page.data} />
              <main className="flex-1">{children}</main>
              <Footer data={page.data} />
              <CartDrawer />
              <EmailModal data={page.data} />
            </div>
          </ProductProvider>
        </Providers>
      </body>
    </html>
  );
}
