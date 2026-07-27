import Link from "next/link";
import HowToPlayPage from "../_components/how-to-play/HowToPlayPage";
import { getProduct } from "../_lib/shopify";
import { createClient } from "@/prismicio";

export default async function HowToPlay() {
  const product = await getProduct("samosa", "GB");
  const client = createClient();
  const page = await client.getSingle("how_to_play");
  const homepage = await client.getSingle("homepage");

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
    <HowToPlayPage
      product={product}
      data={page.data}
      homepage={homepage.data}
    />
  );
}
