const data = {
  title: "Terms of Service",
  intro: `Welcome to SAMOSA! These Terms and Conditions ("Terms") govern your
          use of our website (www.playsamosa.com) and any purchases you make
          through it.
          <br />
          <br />
          By accessing our site or placing an order, you agree to be bound by
          these Terms. If you do not agree, please do not use our website.`,
  policies: [
    {
      title: "1. Who We Are",
      text: `SAMOSA is an independent brand offering a unique strategy board game
          designed for fun and friendly competition. All content on this site is
          owned by us unless otherwise stated.`,
    },
    {
      title: "2. Products & Availability",
      text: `We do our best to keep product descriptions accurate and up to date.
          However:
          <li class="ml-6 mt-2">
            We reserve the right to change or discontinue any product at any
            time without notice.
          </li>
          <li class="ml-6 mt-2">
            All prices listed include applicable taxes unless stated otherwise.
          </li>`,
    },
    {
      title: "3. Orders & Payments",
      text: `When you place an order:
          <li class="ml-6 mt-2">
            You agree to provide accurate, complete, and current information.
          </li>
          <li class="ml-6 mt-2">
            Payments are processed securely through our third-party providers
            (e.g. Stripe, PayPal).
          </li>
          <li class="ml-6 mt-2">
            We reserve the right to refuse or cancel orders at our discretion
            (e.g. for suspected fraud or incorrect pricing).
          </li>`,
    },
    {
      title: "4. Shipping & Delivery",
      text: `We aim to dispatch all orders within 3 business days. Shipping times
          vary depending on your location. Delivery delays due to customs,
          holidays, or carrier issues are outside of our control.
          <br />
          <br />
          More info is available on our Shipping & Returns page.`,
    },
    {
      title: "5. Returns & Refunds",
      text: `If you're not satisfied with your order, you may be eligible for a
          return or refund under our Returns Policy.
          <br />
          Please refer to our full Returns Policy for details.`,
    },
    {
      title: "6. Intellectual Property",
      text: `All content on this site, including the game name, logo,
          illustrations, and text, is the intellectual property of SAMOSA. You
          may not copy, distribute, or use our content without permission.`,
    },
    {
      title: "7. Limitation of Liability",
      text: `To the fullest extent permitted by applicable law:
          <li class="ml-6 mt-2">
            SAMOSA is not liable for any indirect, incidental, or consequential
            damages.
          </li>
          <li class="ml-6 mt-2">
            Our total liability for any claim shall not exceed the amount paid
            for the product in question.
          </li>
          SAMOSA is provided “as is” without any warranties of any kind, whether
          express or implied, including but not limited to implied warranties of
          merchantability, fitness for a particular purpose, and
          non-infringement, to the fullest extent permitted by law.`,
    },
    {
      title: "8. User Conduct",
      text: `You agree not to:
          <li class="ml-6 mt-2">
            Use our website for any unlawful purpose
          </li>
          <li class="ml-6 mt-2">
            Interfere with its operation or security
          </li>
          <li class="ml-6 mt-2">
            Try to access secure areas or other users’ data
          </li>`,
    },
    {
      title: "9. Privacy",
      text: `Your use of our site is also governed by our Privacy Policy, which
          outlines how we collect, use, and protect your information.`,
    },
    {
      title: "10. Governing Law",
      text: `If you are a customer located in the United Kingdom, these Terms are
          governed by the laws of England and Wales, without regard to its
          conflict of laws principles.
          <br />
          <br />
          If you are a customer located in the United States, these Terms are
          governed by the laws of the State of Texas, without regard to its
          conflict of law principles.
          <br />
          <br />
          By using the website or placing an order, you agree to submit to the
          exclusive jurisdiction of the courts in the relevant region based on
          your location at the time of purchase.`,
    },
    {
      title: "11. Changes to These Terms",
      text: `We may update these Terms from time to time. Changes will be posted
          here with the updated date. Continued use of the site means you accept
          any updates.`,
    },
    {
      title: "12. Contact Us",
      text: `If you have any questions about these Terms, feel free to contact us
          at: 📧 hello@playsamosa.com`,
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
