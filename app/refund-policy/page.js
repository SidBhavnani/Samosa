export default function RefundPolicy() {
  return (
    <div className="min-h-screen bg-primary pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bystander uppercase leading-[1] tracking-normal text-center text-samosa-cream mb-8">
        Refund Policy
      </h1>

      <div className="max-w-[470px] mx-4">
        <h2 className="text-3xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          🔁 Returns Policy
        </h2>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          We hope you love your SAMOSA, but if something’s not quite right,
          we’re here to help.
        </p>

        <h3 className="text-xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          💔 Damaged or Incorrect Items
        </h3>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          If your order arrives damaged or you received the wrong item, please
          email us within 14 days of delivery at hello@playsamosa.com with:
          <li className="ml-6 mt-2">Your order number</li>
          <li className="ml-6 mb-2">A photo of the issue</li>
          Given appropriate proof is provided, we’ll sort it out ASAP with a
          replacement or refund.
        </p>

        <h3 className="text-xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          🔄 Returns & Refunds
        </h3>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          You may request a refund within 14 days of receiving your goods. To do
          this:
          <li className="ml-6 mt-2">
            Only orders that are unused and in re-sellable condition will be
            eligible for return (shrink wrap in tact).
          </li>
          <li className="ml-6">
            Please email us at hello@playsamosa.com with your order number and
            refund request.
          </li>
          <li className="ml-6">
            You’ll need to return the item in its original, re-sellable
            condition (shrink wrap in tact) within 14 days of notifying us.
          </li>
          <li className="ml-6 mb-2">
            You are responsible for the return shipping costs.
          </li>
          Once we receive the item, we’ll issue your refund within 14 days.
        </p>

        <h3 className="text-xl font-bystander uppercase leading-[1] tracking-normal mb-5">
          📩 Contact Us
        </h3>
        <p className="uppercase font-bystander leading-relaxed text-samosa-cream mb-8">
          Got a question or concern? Email us at{" "}
          <a href="mailto:hello@playsamosa.com" className="underline">
            hello@playsamosa.com
          </a>
          , and we’ll get back to you within 5 business days.
        </p>
      </div>
    </div>
  );
}
