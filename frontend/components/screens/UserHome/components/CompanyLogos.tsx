"use client"

const companies = [
  { id: 1, name: "Google", logo: "https://placehold.co/200x100?text=Google" },
  { id: 2, name: "Microsoft", logo: "https://placehold.co/200x100?text=Microsoft" },
  { id: 3, name: "Apple", logo: "https://placehold.co/200x100?text=Apple" },
  { id: 4, name: "Amazon", logo: "https://placehold.co/200x100?text=Amazon" },
  { id: 5, name: "Meta", logo: "https://placehold.co/200x100?text=Meta" },
  { id: 6, name: "IBM", logo: "https://placehold.co/200x100?text=IBM" },
  { id: 7, name: "Oracle", logo: "https://placehold.co/200x100?text=Oracle" },
  { id: 8, name: "Intel", logo: "https://placehold.co/200x100?text=Intel" },
];

const CompanyLogos = () => {
  return (
    <section className="py-6 bg-indigo-100">
      <div className="container mx-auto">
        {/* Section Title */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-semibold text-gray-800">
            Trusted by <span className="text-indigo-600"> Top Companies</span> Worldwide
          </h2>
          <p className="text-gray-400 mt-2">
            We collaborate with industry leaders to bring you the best opportunities.
          </p>
        </div>

        <div
          className={`
            grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-6 items-center justify-items-center
            opacity-100 transition-opacity duration-1000 ease-in-out
          `}
        >
          {companies.map((company) => (
            <div
              key={company.id}
              className="h-12 flex items-center justify-center grayscale hover:grayscale-0 hover:scale-105 transition-transform duration-300"
            >
              <img
                src={company.logo}
                alt={`${company.name} logo`}
                className="max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;