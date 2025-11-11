import { Metadata } from 'next';
import Link from 'next/link';

// Set metadata for the About page
export const metadata: Metadata = {
  title: 'About Us - Ember Coffee Co.',
  description: 'Learn about our obsession with quality and our mission to deliver exceptional, freshly roasted coffee.',
};

export default function AboutPage() {
  return (
    <>
      {/* Section 1: Hero
        Uses the same light background and dark brown text as your homepage.
      */}
      <section className="bg-[#FFF8E1] px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold text-[#3E2723] sm:text-5xl">
            Life's too short for bad coffee.
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-700">
            At Ember Coffee Co., we're on a mission to elevate your morning
            ritual. We're obsessed with quality, from the farm to your cup.
          </p>
        </div>
      </section>

      {/* Section 2: Our Story
        This section uses the brand story you provided.
      */}
      <section className="bg-white px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="mb-8 text-center text-3xl font-bold text-[#3E2723] sm:text-4xl">
            Our Story
          </h2>
          <div className="mt-8 space-y-6 text-lg text-gray-700">
            <p>
              At Ember Coffee Co., we believe your morning ritual deserves more
              than mediocre coffee. We source exceptional single-origin beans
              directly from farmers who share our obsession with quality.
            </p>
            <p>
              Each roast is carefully crafted to bring out unique flavor
              profiles—from bright and fruity to deep and chocolatey.
            </p>
            <p>
              Whether you're a pour-over purist or a French press devotee, our
              subscription delivers freshly roasted coffee to your door exactly
              when you need it. No stale beans. No guesswork. Just exceptional
              coffee, every morning.
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: Our Values / Process
        This breaks down your story into key pillars, using your brand's 
        accent color [#FFA726] for the icons.
      */}
      <section className="bg-[#FFF8E1] px-4 py-20 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-[#3E2723] sm:text-4xl">
            Our Obsession
          </h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
            {/* Value 1 */}
            <div className="text-center">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-[#FFA726]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <h3 className="mb-2 text-xl font-semibold text-[#3E2723]">
                Ethical Sourcing
              </h3>
              <p className="text-gray-700">
                We source exceptional single-origin beans directly from farmers
                who share our obsession with quality.
              </p>
            </div>
            {/* Value 2 */}
            <div className="text-center">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-[#FFA726]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M17.25 9.75 19.5 12m0 0 2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25M12 3s-4.5 6-4.5 12.75C7.5 19.807 9.489 21.75 12 21.75c2.51 0 4.5-1.943 4.5-5.25C16.5 9 12 3 12 3Z"
                />
              </svg>
              <h3 className="mb-2 text-xl font-semibold text-[#3E2723]">
                Craft Roasting
              </h3>
              <p className="text-gray-700">
                Each roast is carefully crafted to bring out unique flavor
                profiles, from bright and fruity to deep and chocolatey.
              </p>
            </div>
            {/* Value 3 */}
            <div className="text-center">
              <svg
                className="mx-auto mb-4 h-12 w-12 text-[#FFA726]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H6m6 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H9m9 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h-3.75m-9.375 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0H3V6.75A2.25 2.25 0 0 1 5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5m-9.375 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-1.5c-.621 0-1.125-.504-1.125-1.125v-1.5c0-.621.504-1.125 1.125-1.125h1.5Z"
                />
              </svg>
              <h3 className="mb-2 text-xl font-semibold text-[#3E2723]">
                Fresh Delivery
              </h3>
              <p className="text-gray-700">
                Our subscription delivers freshly roasted coffee to your door
                exactly when you need it. No stale beans.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Call to Action (CTA)
        This mimics your homepage's newsletter CTA, but directs users
        to shop for coffee instead.
      */}
      <section className="bg-[#3E2723] px-4 py-20 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Ready to Elevate Your Morning?
          </h2>
          <p className="mb-8 text-gray-300">
            Find your next favorite roast. We guarantee you'll taste the
            difference.
          </p>
          <Link
            href="/collections/all" // Standard Shopify "all products" collection URL
            className="inline-block rounded-md bg-[#FFA726] px-8 py-3 font-semibold text-[#1B1B1B] transition-colors hover:bg-[#FF9800]"
          >
            Shop All Coffee
          </Link>
        </div>
      </section>
    </>
  );
}