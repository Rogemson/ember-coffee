import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404: Page Not Found - Ember Coffee Co.',
  description: 'The page you were looking for could not be found.',
};

export default function NotFound() {
  return (
    // This section uses your brand's light cream background and is set up 
    // to vertically center the content, taking up most of the screen.
    <section className="flex min-h-[calc(100vh-150px)] items-center bg-[#FFF8E1] px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-md text-center">
        {/* Uses your brand's accent color for the 404 status */}
        <p className="text-base font-semibold text-[#FFA726]">404</p>
        
        {/* Main heading in your brand's dark brown */}
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-[#3E2723] sm:text-5xl">
          Page not found
        </h1>
        
        {/* Helper text */}
        <p className="mt-6 text-lg leading-7 text-gray-700">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have
          been moved or deleted.
        </p>
        
        {/* Call-to-action buttons using your brand's button styles */}
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/"
            className="rounded-md bg-[#FFA726] px-6 py-3 font-semibold text-[#1B1B1B] shadow-sm transition-colors hover:bg-[#FF9800] focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#FFA726]"
          >
            Go Back Home
          </Link>
          <Link 
            href="/collections/all" 
            className="font-semibold text-[#3E2723] hover:text-opacity-80"
          >
            Shop coffee <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}