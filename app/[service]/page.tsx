// app/[service]/page.tsx
// Dynamic service pages powered by Strapi CMS
// Note: Static routes (e.g., app/video-production/page.tsx) take precedence over this dynamic route

import { getServicePage, getServicePages } from '@/lib/strapi';
import { StrapiImage } from '@/components/StrapiImage';
import { RichText } from '@/components/RichText';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import type { BlocksContent } from '@strapi/blocks-react-renderer';
import type { ServicePage } from '@/types/strapi';

export const revalidate = 60; // Revalidate every 60 seconds

// Define which slugs are service pages - restricts routing to known slugs only
const SERVICE_SLUGS = ['video-production', 'web-development', 'guided-knowledge-hub'];

export async function generateStaticParams() {
  try {
    const { data: services } = await getServicePages();
    return services
      .filter((service) => SERVICE_SLUGS.includes(service.slug))
      .map((service) => ({ service: service.slug }));
  } catch {
    // If Strapi is unavailable, return empty array (static pages will handle these routes)
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;

  // Only process known service slugs
  if (!SERVICE_SLUGS.includes(serviceSlug)) {
    return { title: 'Not Found' };
  }

  try {
    const service = await getServicePage(serviceSlug);
    if (!service) return { title: 'Service Not Found' };

    return {
      title: service.seo?.metaTitle || `${service.title} | Smarter Revolution`,
      description: service.seo?.metaDescription || service.heroSubheadline,
      openGraph: {
        title: service.seo?.metaTitle || service.title,
        description: service.seo?.metaDescription || service.heroSubheadline,
        images: service.seo?.ogImage?.url || service.heroImage?.url,
      },
    };
  } catch {
    return { title: 'Service Not Found' };
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSlug } = await params;

  // Only handle known service slugs
  if (!SERVICE_SLUGS.includes(serviceSlug)) {
    notFound();
  }

  let serviceData: ServicePage | null;
  try {
    serviceData = await getServicePage(serviceSlug);
  } catch {
    // If Strapi is unavailable, fall through to notFound
    // This allows static pages to handle these routes during development
    notFound();
  }

  if (!serviceData) {
    notFound();
  }

  // Explicitly type the service to help TypeScript after control flow
  const service: ServicePage = serviceData;

  // Pre-extract arrays to help TypeScript inference
  const features = service.features ?? [];
  const benefits = service.benefits ?? [];
  const hasFeatures = features.length > 0;
  const hasBenefits = benefits.length > 0;

  return (
    <main className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32">
        {service.heroImage ? (
          <div className="absolute inset-0 z-0">
            <StrapiImage
              image={service.heroImage}
              fill
              className="object-cover opacity-30"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
          </div>
        ) : null}
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            {service.heroHeadline}
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
            {service.heroSubheadline}
          </p>
          {service.ctaText && service.ctaLink ? (
            <Link
              href={service.ctaLink}
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-lg transition-colors"
            >
              {service.ctaText}
            </Link>
          ) : null}
        </div>
      </section>

      {/* Features Section */}
      {hasFeatures ? (
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Features
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature) => (
                <div key={feature.id} className="text-center p-6 bg-gray-900 rounded-xl">
                  {feature.icon ? (
                    <div className="text-4xl mb-4">{feature.icon}</div>
                  ) : null}
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                  {feature.link ? (
                    <Link
                      href={feature.link}
                      className="inline-block mt-4 text-cyan-500 hover:text-cyan-400 transition-colors"
                    >
                      Learn more →
                    </Link>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Benefits Section */}
      {hasBenefits ? (
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Benefits
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit) => (
                <div
                  key={benefit.id}
                  className="flex gap-4 p-6 bg-gray-900 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition-colors"
                >
                  {benefit.icon ? (
                    <div className="text-3xl flex-shrink-0">{benefit.icon}</div>
                  ) : null}
                  <div>
                    <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Rich Text Content Section */}
      {service.content ? (
        <section className="py-20 bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4">
            <RichText
              content={service.content as BlocksContent}
              className="prose prose-invert prose-lg max-w-none"
            />
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      {service.ctaText && service.ctaLink ? (
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to get started?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Let&apos;s discuss how we can help transform your business.
            </p>
            <Link
              href={service.ctaLink}
              className="inline-block bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-lg transition-colors"
            >
              {service.ctaText}
            </Link>
          </div>
        </section>
      ) : null}
    </main>
  );
}
