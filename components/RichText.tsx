'use client';

import { BlocksRenderer, type BlocksContent } from '@strapi/blocks-react-renderer';
import Image from 'next/image';
import Link from 'next/link';

interface RichTextProps {
  content: BlocksContent;
  className?: string;
}

export function RichText({ content, className }: RichTextProps) {
  const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || '';

  return (
    <div className={className}>
      <BlocksRenderer
        content={content}
        blocks={{
          paragraph: ({ children }) => <p className="mb-4">{children}</p>,
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return <h1 className="text-4xl font-bold mb-6">{children}</h1>;
              case 2:
                return <h2 className="text-3xl font-bold mb-5">{children}</h2>;
              case 3:
                return <h3 className="text-2xl font-bold mb-4">{children}</h3>;
              case 4:
                return <h4 className="text-xl font-bold mb-3">{children}</h4>;
              case 5:
                return <h5 className="text-lg font-bold mb-2">{children}</h5>;
              case 6:
                return <h6 className="text-base font-bold mb-2">{children}</h6>;
              default:
                return <h2 className="text-3xl font-bold mb-5">{children}</h2>;
            }
          },
          list: ({ children, format }) => {
            if (format === 'ordered') {
              return <ol className="list-decimal list-inside mb-4 space-y-2">{children}</ol>;
            }
            return <ul className="list-disc list-inside mb-4 space-y-2">{children}</ul>;
          },
          'list-item': ({ children }) => <li>{children}</li>,
          quote: ({ children }) => (
            <blockquote className="border-l-4 border-cyan-500 pl-4 italic my-4">
              {children}
            </blockquote>
          ),
          code: ({ children }) => (
            <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto mb-4">
              <code className="text-sm text-gray-100">{children}</code>
            </pre>
          ),
          image: ({ image }) => {
            const url = image.url.startsWith('http') ? image.url : `${STRAPI_URL}${image.url}`;
            return (
              <figure className="my-6">
                <Image
                  src={url}
                  alt={image.alternativeText || ''}
                  width={image.width}
                  height={image.height}
                  className="rounded-lg"
                />
                {image.caption && (
                  <figcaption className="text-center text-sm text-gray-500 mt-2">
                    {image.caption}
                  </figcaption>
                )}
              </figure>
            );
          },
          link: ({ children, url }) => (
            <Link href={url} className="text-cyan-500 hover:text-cyan-400 underline">
              {children}
            </Link>
          ),
        }}
        modifiers={{
          bold: ({ children }) => <strong className="font-bold">{children}</strong>,
          italic: ({ children }) => <em className="italic">{children}</em>,
          underline: ({ children }) => <u className="underline">{children}</u>,
          strikethrough: ({ children }) => <s className="line-through">{children}</s>,
          code: ({ children }) => (
            <code className="bg-gray-800 px-1.5 py-0.5 rounded text-cyan-400">{children}</code>
          ),
        }}
      />
    </div>
  );
}
