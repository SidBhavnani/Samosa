import { gql } from "graphql-request";

/**
 * Fetches all variants of the single product.
 * priceV2 is market-aware when the buyer's country is passed in the client.
 * compareAtPrice is the original price (used for showing discount strikethroughs).
 */
export const GET_PRODUCT_QUERY = gql`
  query GetProduct($handle: String!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    product(handle: $handle) {
      id
      title
      descriptionHtml
      handle
      variants(first: 10) {
        edges {
          node {
            id
            title
            availableForSale
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
          }
        }
      }
      images(first: 10) {
        edges {
          node {
            url
            altText
          }
        }
      }
    }
  }
`;
