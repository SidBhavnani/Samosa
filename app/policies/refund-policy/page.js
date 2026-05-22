const data = {
  title: "Refund Policy",
  policies: [
    {
      title: "🔁 Returns Policy",
      text: `We hope you love your SAMOSA, but if something’s not quite right,
          we’re here to help.`,
    },
    {
      title: "💔 Damaged or Incorrect Items",
      text: `If your order arrives damaged or you received the wrong item, please
          email us within 14 days of delivery at hello@playsamosa.com with:
          <li class="ml-6 mt-2">Your order number</li>
          <li class="ml-6 mb-2">A photo of the issue</li>
          Given appropriate proof is provided, we’ll sort it out ASAP with a
          replacement or refund.`,
    },
    {
      title: "🔄 Returns & Refunds",
      text: `You may request a refund within 14 days of receiving your goods. To do
          this:
          <li class="ml-6 mt-2">
            Only orders that are unused and in re-sellable condition will be
            eligible for return (shrink wrap in tact).
          </li>
          <li class="ml-6">
            Please email us at hello@playsamosa.com with your order number and
            refund request.
          </li>
          <li class="ml-6">
            You’ll need to return the item in its original, re-sellable
            condition (shrink wrap in tact) within 14 days of notifying us.
          </li>
          <li class="ml-6 mb-2">
            You are responsible for the return shipping costs.
          </li>
          Once we receive the item, we’ll issue your refund within 14 days.`,
    },
    {
      title: "📩 Contact Us",
      text: `Got a question or concern? Email us at <a href="mailto:hello@playsamosa.com" class="underline">
            hello@playsamosa.com
          </a>
          , and we’ll get back to you within 5 business days.`,
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
