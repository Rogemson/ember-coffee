export function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Choose Your Coffee',
      description: 'Browse our selection of single-origin beans or take our quiz to find your perfect match.',
      icon: (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'We Roast Fresh',
      description: 'Your beans are roasted to order, ensuring peak flavor and freshness.',
      icon: (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Delivered to Your Door',
      description: 'Receive your coffee within days of roasting. Set up a subscription or order one-time.',
      icon: (
        <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
    },
  ];

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#3E2723]">
            How It Works
          </h2>
          <p className="text-lg text-gray-700">
            From bean to cup in three simple steps
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#FFA726] text-white">
                  {step.icon}
                </div>
              </div>
              
              <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-[#FFA726]">
                Step {step.number}
              </div>
              
              <h3 className="mb-4 text-2xl font-bold text-[#3E2723]">
                {step.title}
              </h3>
              
              <p className="text-gray-700">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}