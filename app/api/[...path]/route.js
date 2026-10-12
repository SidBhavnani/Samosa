const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
// const API_PATH = "/api/2026-04/graphql.json";
const API_PATH = "/api/unstable/graphql.json";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request) {
  const pathname = new URL(request.url).pathname;

  // Only proxy the expected Shopify Storefront API endpoint.
  if (pathname !== API_PATH) {
    return new Response("Not found", { status: 404 });
  }

  if (!SHOPIFY_DOMAIN) {
    return new Response("Shopify domain is not configured", {
      status: 500,
    });
  }

  const domain = SHOPIFY_DOMAIN.replace(/^https?:\/\//, "").replace(/\/+$/, "");

  const url = `https://${domain}${API_PATH}`;

  // Forward only the headers needed for Shopify requests.
  const headers = new Headers();

  const allowedHeaders = [
    "accept",
    "accept-language",
    "content-type",
    "cookie",
    "origin",
    "referer",
    "user-agent",
    "x-shopify-storefront-access-token",
    "shopify-unique-token",
    "shopify-visit-token",
    "custom-storefront-request-group-id",
    "x-shopify-client-ip",
    "x-shopify-client-ip-sig",
  ];

  for (const name of allowedHeaders) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }

  try {
    const body = await request.arrayBuffer();

    const shopifyResponse = await fetch(url, {
      method: "POST",
      headers,
      body,
      cache: "no-store",
    });

    const responseHeaders = new Headers();

    for (const name of [
      "content-type",
      "cache-control",
      "server-timing",
      "x-request-id",
      "x-shopify-api-version",
    ]) {
      const value = shopifyResponse.headers.get(name);
      if (value) responseHeaders.set(name, value);
    }

    // Preserve Shopify's cookie headers.
    const cookies = shopifyResponse.headers.getSetCookie?.() ?? [];
    for (const cookie of cookies) {
      responseHeaders.append("set-cookie", cookie);
    }

    return new Response(shopifyResponse.body, {
      status: shopifyResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Shopify Storefront API proxy failed:", error);

    return new Response("Shopify request failed", {
      status: 502,
    });
  }
}
