import { getProduct } from "@/app/_lib/shopify";
import Link from "next/link";
import Gallery from "../_components/shop/Gallery";
import ProductInfo from "../_components/shop/ProductInfo";
import WhatsInsideSection from "../_components/shop/WhatsInsideSection";
import ReviewsCarousel from "../_components/shop/ReviewsCarousel";
import ConnectWithUs from "../_components/shop/ConnectWithUs";

export default async function Shop() {
  //   console.log("Domain:", process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN);
  //   console.log("Token:", process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN);

  const product = await getProduct("samosa", "GB");
  // console.log(JSON.stringify(product, null, 2));
  // console.log(product.description);

  if (!product) {
    return (
      <div className="min-h-screen pt-40 text-center">
        <h1 className="text-4xl font-bystander uppercase text-primary">
          Product Not Found
        </h1>
        <Link href="/" className="text-secondary underline mt-4 inline-block">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Main Product Section */}
      <section className="bg-samosa-cream min-h-screen pt-28 pb-16 lg:pt-44 lg:pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-start gap-6 lg:gap-8">
            <Gallery images={product.images.edges} />
            <ProductInfo product={product} />
          </div>
        </div>
      </section>

      <WhatsInsideSection />
      <ReviewsCarousel />
      <ConnectWithUs />
    </div>
  );
}

// {
//   "id": "gid://shopify/Product/15373174636928",
//   "title": "SAMOSA - The Ultimate Desi Party Game",
//   "description": "Ready for belly laughs, nostalgia, and pure chaos? 🎉 SAMOSA is a fast-paced, desi-themed party word game where teams describe, act, sing or dance their way through desi-themed cards - all in just 30 second turns. 🤩 But land on a SAMOSA and everyone plays at once. Let the chaos begin! 😁 ✨FREE UK SHIPPING✨ Global shipping available ️- Perfect for desi game nights, family hangouts, weddings & pre-drinks ️- 4-20+ players -️ 45-90 mins of non-stop fun, ⚠️warning...you may be playing all night 🙊 ️- Ages 12+ (suggested)",
//   "handle": "samosa",
//   "variants": {
//     "edges": [
//       {
//         "node": {
//           "id": "gid://shopify/ProductVariant/56686365376896",
//           "title": "Default Title",
//           "availableForSale": true,
//           "price": {
//             "amount": "27.99",
//             "currencyCode": "GBP"
//           },
//           "compareAtPrice": null
//         }
//       }
//     ]
//   },
//   "images": {
//     "edges": [
//       {
//         "node": {
//           "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/Box_Mockups_front.png?v=1761839665",
//           "altText": null
//         }
//       },
//       {
//         "node": {
//           "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/IMG_9944-min_f4bf3ccd-25fc-4057-94c8-988196bfc5fa.jpg?v=1761840111",
//           "altText": null
//         }
//       },
//       {
//         "node": {
//           "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/IMG_5500.jpg?v=1761843078",
//           "altText": null
//         }
//       },
//       {
//         "node": {
//           "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/VID20250215160303.gif?v=1761843078",
//           "altText": null
//         }
//       },
//       {
//         "node": {
//           "url": "https://cdn.shopify.com/s/files/1/0949/0189/5552/files/ezgif-1-2960f3ef30-2_a9170775-0345-49cb-9612-f1d939f1ff5a.gif?v=1761842295",
//           "altText": null
//         }
//       }
//     ]
//   }
// }
