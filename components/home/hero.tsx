import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Hero() {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-linear-to-br from-[#3E2723] to-[#2C1810] px-4 py-20 text-white">
      {/* Background pattern - optional */}
      <div className="absolute inset-0 bg-[url('/coffee-pattern.svg')] opacity-10" />
      
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
          Start Your Day,
          <span className="block text-[#FFA726]">Elevated</span>
        </h1>
        
        <p className="mb-8 text-lg text-gray-300 sm:text-xl lg:text-2xl">
          Exceptional single-origin coffee, ethically sourced and freshly roasted.
          <br className="hidden sm:block" />
          Delivered to your door exactly when you need it.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button size="lg" variant="secondary" asChild>
            <Link href="/products">Shop Coffee</Link>
          </Button>
          
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-[#3E2723]" asChild>
            <Link href="/quiz">Find Your Roast</Link>
          </Button>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>Direct Trade</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Freshly Roasted</span>
          </div>
          
          <div className="flex items-center gap-2">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Free Shipping Over $30</span>
          </div>
        </div>
      </div>
    </section>
  );
}