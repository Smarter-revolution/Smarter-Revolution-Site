import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

const blogDirectory = path.join(process.cwd(), 'content', 'blog');

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  pubDate: string;
  author: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  category?: string;
  content: string;
  contentHtml: string;
}

export function getAllBlogPosts(): BlogPost[] {
  // Ensure directory exists
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  const allPostsData = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(blogDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || '',
        description: data.description || '',
        pubDate: data.pubDate || '',
        author: data.author || '',
        tags: data.tags || [],
        image: data.image || '',
        imageAlt: data.imageAlt || '',
        featured: data.featured || false,
        category: data.category || '',
        content,
        contentHtml: '', // Will be processed when needed
      };
    })
    .sort((a, b) => {
      if (a.pubDate < b.pubDate) {
        return 1;
      } else {
        return -1;
      }
    });

  return allPostsData;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const fullPath = path.join(blogDirectory, `${slug}.md`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const file = await remark()
    .use(remarkHtml)
    .process(content);
  const contentHtml = String(file);

  return {
    slug,
    title: data.title || '',
    description: data.description || '',
    pubDate: data.pubDate || '',
    author: data.author || '',
    tags: data.tags || [],
    image: data.image || '',
    imageAlt: data.imageAlt || '',
    featured: data.featured || false,
    category: data.category || '',
    content,
    contentHtml,
  };
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

