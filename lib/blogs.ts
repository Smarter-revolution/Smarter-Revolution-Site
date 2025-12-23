import { Blog } from '@/types/blog';
import fs from 'fs';
import path from 'path';

const blogsFilePath = path.join(process.cwd(), 'data', 'blogs.json');

// Ensure data directory exists
function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Read blogs from file
export function getBlogs(): Blog[] {
  ensureDataDirectory();
  if (!fs.existsSync(blogsFilePath)) {
    return [];
  }
  try {
    const fileContents = fs.readFileSync(blogsFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading blogs:', error);
    return [];
  }
}

// Write blogs to file
export function saveBlogs(blogs: Blog[]): void {
  ensureDataDirectory();
  fs.writeFileSync(blogsFilePath, JSON.stringify(blogs, null, 2));
}

// Get a single blog by ID
export function getBlogById(id: string): Blog | null {
  const blogs = getBlogs();
  return blogs.find(blog => blog.id === id) || null;
}

// Add a new blog
export function addBlog(blog: Omit<Blog, 'id' | 'createdAt' | 'updatedAt'>): Blog {
  const blogs = getBlogs();
  const newBlog: Blog = {
    ...blog,
    id: Date.now().toString() + Math.random().toString(36).substring(2, 11),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  blogs.push(newBlog);
  saveBlogs(blogs);
  return newBlog;
}

// Delete a blog
export function deleteBlog(id: string): boolean {
  const blogs = getBlogs();
  const filteredBlogs = blogs.filter(blog => blog.id !== id);
  if (filteredBlogs.length === blogs.length) {
    return false; // Blog not found
  }
  saveBlogs(filteredBlogs);
  return true;
}

