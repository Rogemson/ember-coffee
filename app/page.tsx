import { getProducts } from '@/lib/shopify';
import { Hero } from '@/components/home/hero';
import { FeaturedProducts } from '@/components/home/featured-products';
import { HowItWorks } from '@/components/home/how-it-works';

export const metadata = {
  title: 'Ember Coffee Co. - Start Your Day, Elevated',
  description: 'Exceptional single-origin coffee, ethically sourced and freshly roasted.',
};

export default async function HomePage() {
  // Fetch products with error handling
  let featuredProducts = [];
  
  try {
    const allProducts = await getProducts(8);
    featuredProducts = allProducts.slice(0, 4);
  } catch (error) {
    console.error('Error loading products on homepage:', error);
  }

  return (
    <>
      <Hero />
      
      {/* Only show featured products if we have them */}
      {featuredProducts.length > 0 ? (
        <FeaturedProducts products={featuredProducts} />
      ) : (
        <section className="bg-[#FFF8E1] px-4 py-20">
          <div className="mx-auto max-w-7xl text-center">
            <h2 className="mb-4 text-4xl font-bold text-[#3E2723]">
              Our Featured Roasts
            </h2>
            <p className="mb-8 text-lg text-gray-700">
              Products coming soon! Add products to your Shopify store to see them here.
            </p>
            <div className="rounded-lg border-2 border-dashed border-gray-300 bg-white p-12">
              <svg className="mx-auto mb-4 h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-gray-600">
                <strong>Next step:</strong> Add your coffee products in Shopify Admin
              </p>
            </div>
          </div>
        </section>
      )}
      
      <HowItWorks />
      
      {/* Newsletter CTA */}
      <section className="bg-[#3E2723] px-4 py-20 text-white">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Join Our Coffee Community
          </h2>
          <p className="mb-8 text-gray-300">
            Get brewing tips, new roast announcements, and exclusive offers.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-md border-0 px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FFA726]"
            />
            <button className="rounded-md bg-[#FFA726] px-6 py-3 font-semibold text-[#1B1B1B] transition-colors hover:bg-[#FF9800]">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </>
  );
}