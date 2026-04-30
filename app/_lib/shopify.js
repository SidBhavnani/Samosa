import { GraphQLClient } from "graphql-request";
import { GET_PRODUCT_QUERY } from "./queries/product";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

/**
 * Base Storefront API client.
 * Pass a `buyerCountryCode` to enable market-specific pricing.
 */
export function getShopifyClient(buyerCountryCode = null) {
  const headers = {
    "X-Shopify-Storefront-Access-Token": token,
    "Content-Type": "application/json",
  };

  // Shopify uses this header to return market-aware pricing
  if (buyerCountryCode) {
    headers["Accept-Language"] = buyerCountryCode;
  }

  return new GraphQLClient(`https://${domain}/api/2026-04/graphql.json`, {
    headers,
  });
}

/**
 * Fetches a product by its handle.
 * @param {string} handle  - Shopify product handle (slug)
 * @param {string} country - ISO 3166-1 alpha-2 country code, e.g. 'IN', 'US', 'GB'
 */
export async function getProduct(handle, country = "GB") {
  const client = getShopifyClient(country);
  const data = await client.request(GET_PRODUCT_QUERY, {
    handle: "samosa",
    countryCode: country,
  });
  // console.log("Raw response:", JSON.stringify(data, null, 2));
  return data.product;
}
