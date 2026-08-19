import Link from "next/link";
import HowToPlayPage from "../_components/how-to-play/HowToPlayPage";
import { getProduct } from "../_lib/shopify";
import { createClient } from "@/prismicio";

export async function generateMetadata() {
  const client = createClient();
  const metadata = await client.getSingle("metadata");

  return {
    title: metadata?.data.how_to_play_title,
    description: metadata?.data.how_to_play_description,
  };
}

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
      steps={homepage.data.how_to_play_steps}
      cta={{
        cta_badge_1: homepage.data.cta_badge_1,
        cta_badge_2: homepage.data.cta_badge_2,
        cta_badge_3: homepage.data.cta_badge_3,
        cta_game_box_image: homepage.data.cta_game_box_image,
        minimum_shipping: homepage.data.minimum_shipping,
      }}
    />
  );
}
