import { getSolutionPage, getSolutionPages } from '@/lib/strapi';
import { StrapiImage } from '@/components/StrapiImage';
import { RichText } from '@/components/RichText';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import type { BlocksContent } from '@strapi/blocks-react-renderer';

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const { data: solutions } = await getSolutionPages();
    return solutions.map((solution) => ({ slug: solution.slug }));
  } catch {
    // Return empty array if Strapi is unavailable during build
    // Pages will be generated on-demand
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  try {
    const { slug } = await params;
    const solution = await getSolutionPage(slug);

    if (!solution || !solution.published) {
      return { title: 'Solution Not Found' };
    }

    return {
      title: solution.seo?.metaTitle || `${solution.title} | Smarter Revolution`,
      description: solution.seo?.metaDescription || solution.shortDescription,
      openGraph: {
        title: solution.seo?.metaTitle || solution.title,
        description: solution.seo?.metaDescription || solution.shortDescription,
        ...(solution.seo?.ogImage?.url && { images: [solution.seo.ogImage.url] }),
      },
      ...(solution.seo?.noIndex && { robots: { index: false, follow: false } }),
    };
  } catch {
    return { title: 'Solution | Smarter Revolution' };
  }
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const solution = await getSolutionPage(slug);

  // Return 404 for non-existent or unpublished solutions
  if (!solution || !solution.published) {
    notFound();
  }

  // Extract hero content with proper typing for conditional rendering
  const heroContent = solution.heroContent as BlocksContent | null;

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          {/* Breadcrumb */}
          <nav className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-600/30 bg-red-600/10 text-red-500 text-sm font-medium mb-6">
            <Link href="/solutions" className="hover:text-red-400 transition-colors">
              Solutions
            </Link>
            <span>/</span>
            <span>{solution.title}</span>
          </nav>

          {/* Icon */}
          {solution.icon && (
            <div className="text-6xl mb-6">{solution.icon}</div>
          )}

          {/* Title */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {solution.title}
          </h1>

          {/* Short Description */}
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
            {solution.shortDescription}
          </p>
        </div>
      </section>

      {/* Hero Content (Rich Text) */}
      {heroContent && (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
          <div className="max-w-4xl mx-auto">
            <RichText
              content={heroContent}
              className="prose prose-invert prose-lg max-w-none"
            />
          </div>
        </section>
      )}

      {/* Use Cases Section */}
      {solution.useCases && solution.useCases.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Use Cases
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.useCases.map((useCase) => (
                <div
                  key={useCase.id}
                  className="bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-red-600/50 transition-colors"
                >
                  {useCase.icon && (
                    <div className="text-3xl mb-4">{useCase.icon}</div>
                  )}
                  <h3 className="text-xl font-bold text-white mb-3">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial Section */}
      {solution.testimonial && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111]">
          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
              &ldquo;{solution.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              {solution.testimonial.authorPhoto && (
                <StrapiImage
                  image={solution.testimonial.authorPhoto}
                  size="thumbnail"
                  className="w-14 h-14 rounded-full object-cover"
                />
              )}
              <div className="text-left">
                <p className="font-semibold text-white">
                  {solution.testimonial.authorName}
                </p>
                {(solution.testimonial.authorTitle || solution.testimonial.company) && (
                  <p className="text-gray-400 text-sm">
                    {[solution.testimonial.authorTitle, solution.testimonial.company]
                      .filter(Boolean)
                      .join(' at ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Related Services Section */}
      {solution.relatedServices && solution.relatedServices.length > 0 && (
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
              Related Services
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Explore the services that power this solution
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solution.relatedServices.map((service) => (
                <Link
                  key={service.id}
                  href={`/${service.slug}`}
                  className="group bg-[#111] border border-gray-800 rounded-xl p-6 hover:border-red-600/50 transition-all hover:bg-[#151515]"
                >
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    {service.heroSubheadline}
                  </p>
                  <span className="text-red-500 text-sm font-semibold inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                    Learn more
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#0a0a0a] to-[#111] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-transparent to-transparent" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Let&apos;s discuss how this solution can work for your organization.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold hover:from-red-500 hover:to-red-600 transition-all shadow-lg shadow-red-900/30"
          >
            Schedule a Free Strategy Call
          </Link>
        </div>
      </section>
    </main>
  );
}
