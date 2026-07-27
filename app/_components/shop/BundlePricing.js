// app/components/GameBundlePricing.jsx

"use client";

import { useState } from "react";
import { Button } from "../ui/button";

// const plans = [
//   {
//     id: 1,
//     title: "1 game",
//     price: "£27.99",
//     subtitle: "per game",
//     discount: null,
//     total: "£27.99 total",
//     save: null,
//   },
//   {
//     id: 2,
//     title: "2 games",
//     price: "£25.19",
//     subtitle: "per game",
//     discount: "10% off",
//     total: "£50.39 total",
//     save: "Save £5.60",
//     popular: true,
//   },
//   {
//     id: 5,
//     title: "5+ games",
//     price: "£23.79",
//     subtitle: "per game",
//     discount: "15% off",
//     total: "£118.95 total",
//     save: "Save £21",
//   },
// ];

export default function BundlePricing({ handleAddToCart, adding, data }) {
  const plans = data.bundle_plans.map((plan) => ({
    id: plan.quantity,
    title: `${plan.quantity} game${plan.quantity > 1 ? "s" : ""}`,
    price: plan.price,
    subtitle: "per game",
    discount: plan.discount || null,
    total: plan.total,
    save: plan.save,
    popular: plan.most_popular,
  }));
  const [selected, setSelected] = useState(plans.find((plan) => plan.popular));

  return (
    <section className="w-full max-w-lg text-foreground">
      <div className="mx-auto max-w-lg">
        {/* Heading */}
        <h2 className="mb-5 text-sm sm:text-base tracking-[0.2em] uppercase text-primary">
          How many are you buying?
        </h2>

        {/* Cards */}
        <div className="grid gap-4 grid-cols-3">
          {plans.map((plan) => {
            const isSelected = selected.id === plan.id;

            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan)}
                className={`relative cursor-pointer rounded-3xl border bg-background px-5 py-4 text-left transition-all duration-200 flex flex-col
                  ${
                    isSelected
                      ? "border-secondary ring-2 ring-secondary"
                      : "border-zinc-700 hover:border-zinc-500"
                  }
                `}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2">
                    <div className="rounded-full w-full text-center bg-secondary text-secondary-foreground px-2 py-1 text-[6px] xl:text-[8px] font-semibold">
                      Most popular
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <p className="font-semibold text-sm text-muted-foreground">
                    {plan.title}
                  </p>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {plan.price}
                    </h3>

                    <p className="text-xs text-muted-foreground">
                      {plan.subtitle}
                    </p>
                  </div>

                  {plan.discount && (
                    <span className="inline-flex rounded-lg bg-secondary/30 px-3 py-1 text-xs font-medium text-secondary">
                      {plan.discount}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Summary */}
        <div className="mt-5 flex flex-col gap-4 rounded-3xl border border-black/20 shadow-xl px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg sm:text-xl font-semibold">
            <span className="text-primary">{selected.title}</span>

            {selected.save && (
              <span className="ml-2 text-secondary">{selected.save}</span>
            )}
          </div>

          <div className="text-3xl sm:text-4xl font-bold">{selected.total}</div>
        </div>

        {/* CTA */}
        {/* <button className="mt-5 w-full rounded-3xl bg-white py-5 text-lg sm:text-xl font-semibold text-black transition hover:bg-zinc-200 active:scale-[0.99]">
          Add to bag
        </button> */}
        <Button
          onClick={() => handleAddToCart(selected.id)}
          disabled={adding}
          className="w-full mt-5 py-7 text-base font-sans font-black uppercase tracking-[0.15em] rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl transition-all text-lg"
        >
          ADD TO BAG
        </Button>
      </div>
    </section>
  );
}
