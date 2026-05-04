import { gql } from "graphql-request";

export const CART_FRAGMENT = gql`
  fragment CartFields on Cart {
    id
    checkoutUrl
    cost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
    }
    discountCodes {
      code
      applicable
    }
    lines(first: 20) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              price {
                amount
                currencyCode
              }
              product {
                title
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
          }
          discountAllocations {
            discountedAmount {
              amount
              currencyCode
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART_MUTATION = gql`
  ${CART_FRAGMENT}
  mutation CreateCart($lines: [CartLineInput!]!, $countryCode: CountryCode!)
  @inContext(country: $countryCode) {
    cartCreate(input: { lines: $lines }) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const ADD_TO_CART_MUTATION = gql`
  ${CART_FRAGMENT}
  mutation AddToCart(
    $cartId: ID!
    $lines: [CartLineInput!]!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const UPDATE_CART_MUTATION = gql`
  ${CART_FRAGMENT}
  mutation UpdateCart(
    $cartId: ID!
    $lines: [CartLineUpdateInput!]!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;

export const APPLY_DISCOUNT_MUTATION = gql`
  ${CART_FRAGMENT}
  mutation ApplyDiscount(
    $cartId: ID!
    $discountCodes: [String!]!
    $countryCode: CountryCode!
  ) @inContext(country: $countryCode) {
    cartDiscountCodesUpdate(cartId: $cartId, discountCodes: $discountCodes) {
      cart {
        ...CartFields
      }
      userErrors {
        field
        message
      }
    }
  }
`;
