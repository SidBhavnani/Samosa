export default function ShippingPolicy() {
  return (
    <div className="min-h-screen bg-primary pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bystander uppercase leading-[1] tracking-normal text-center text-samosa-cream mb-8">
        Shipping Policy
      </h1>

      <div className="max-w-[470px] mx-4">
        <h2 className="text-3xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          🚚 Shipping Policy
        </h2>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          Thank you for supporting SAMOSA!
          <br />
          <br />
          We’re a small, independent team bringing a spicy twist to desi game
          nights everywhere, and we’re so excited to send your order your way.
        </p>

        <h3 className="text-xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          📦 Order Processing & Tracking
        </h3>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          All orders are carefully packed and prepared for dispatch.
          <br />
          <br />
          We’ll keep you updated by email with shipping timelines and tracking
          info once your order is on the move, so you can follow its journey to
          your doorstep.
        </p>

        <h3 className="text-xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          💌 Delivery Times
        </h3>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          As indicated at Checkout and on Order Confirmation.
          <br />
          <br />
          Please note: Delivery times may vary during busy seasons or due to
          carrier delays.
        </p>

        <h3 className="text-xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          🛳️ International Shipping - Customs, Duties & Taxes
        </h3>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          Orders shipped outside the United Kingdom and United States may be
          subject to import duties, taxes, and fees that are applied by the
          destination country’s customs authorities. These charges are not
          included in the product price or shipping cost at checkout.
          <br />
          <br />
          As the recipient, you are responsible for paying any such customs
          duties, import taxes, or handling fees that may be applicable once the
          package arrives in your country. We have no control over these
          charges, and we cannot predict their amount or reimburse them.
          <br />
          <br />
          If you refuse to pay customs charges and the parcel is returned to us,
          we can issue a refund for the product cost once it arrives back in our
          warehouse, but shipping costs are non-refundable.
        </p>
      </div>
    </div>
  );
}
