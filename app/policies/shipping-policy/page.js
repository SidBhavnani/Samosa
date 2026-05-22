const data = {
  title: "Shipping Policy",
  policies: [
    {
      title: "🚚 Shipping Policy",
      text: `Thank you for supporting SAMOSA!
          <br />
          <br />
          We’re a small, independent team bringing a spicy twist to desi game
          nights everywhere, and we’re so excited to send your order your way.`,
    },
    {
      title: "📦 Order Processing & Tracking",
      text: `All orders are carefully packed and prepared for dispatch.
          <br />
          <br />
          We’ll keep you updated by email with shipping timelines and tracking
          info once your order is on the move, so you can follow its journey to
          your doorstep.`,
    },
    {
      title: "💌 Delivery Times",
      text: `As indicated at Checkout and on Order Confirmation.
          <br />
          <br />
          Please note: Delivery times may vary during busy seasons or due to
          carrier delays.`,
    },
    {
      title: "🛳️ International Shipping - Customs, Duties & Taxes",
      text: `Orders shipped outside the United Kingdom and United States may be
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
          warehouse, but shipping costs are non-refundable.`,
    },
  ],
};

export default function Page() {
  return (
    <div className="min-h-screen bg-background pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-3xl mx-4">
        <h1 className="text-[38px] text-primary md:text-[44px] lg:text-[53px] font-bystander uppercase leading-[1.1] tracking-[0.03em] mb-8">
          {data.title}
        </h1>

        {data.intro && (
          <p
            className="leading-relaxed text-muted-foreground mb-8"
            dangerouslySetInnerHTML={{ __html: data.intro }}
          />
        )}

        {data.policies.map((policy, index) => (
          <div key={policy.title}>
            <h3 className="text-2xl font-bold mb-3">{policy.title}</h3>
            <p
              className="leading-relaxed text-muted-foreground mb-8"
              dangerouslySetInnerHTML={{ __html: policy.text }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
