// TODO: Re-enable Strapi integration once environment variables are configured
// import { getNavigation } from '@/lib/strapi';
import Navbar from './Navbar';
import type { MenuItem } from '@/types/strapi';

// Default fallback navigation when Strapi is unavailable
const defaultNavigation = {
  mainMenu: [
    {
      id: 1,
      label: 'Home',
      url: '/',
      openInNewTab: false,
    },
    {
      id: 2,
      label: 'Services',
      url: '#',
      openInNewTab: false,
      children: [
        { id: 21, label: 'Video Production', url: '/video-production', openInNewTab: false },
        { id: 22, label: 'Web Development', url: '/web-development', openInNewTab: false },
        { id: 23, label: 'Guided Knowledge Hub', url: '/guided-knowledge-hub', openInNewTab: false },
      ],
    },
    {
      id: 3,
      label: 'Solutions',
      url: '#',
      openInNewTab: false,
      children: [
        { id: 31, label: 'Training & Onboarding', url: '/solutions/training-onboarding', openInNewTab: false },
        { id: 32, label: 'Sales & Partner Enablement', url: '/solutions/sales-enablement', openInNewTab: false },
        { id: 33, label: 'Customer Education', url: '/solutions/customer-education', openInNewTab: false },
        { id: 34, label: 'Compliance & Documentation', url: '/solutions/compliance-documentation', openInNewTab: false },
        { id: 35, label: 'Website & Platform Modernization', url: '/solutions/website-modernization', openInNewTab: false },
        { id: 36, label: 'Custom Portals & Systems', url: '/solutions/custom-portals', openInNewTab: false },
      ],
    },
    {
      id: 4,
      label: 'About',
      url: '#',
      openInNewTab: false,
      children: [
        { id: 41, label: 'About', url: '/about', openInNewTab: false },
        { id: 42, label: 'Team', url: '/team', openInNewTab: false },
      ],
    },
    {
      id: 5,
      label: 'Blog',
      url: '/blog',
      openInNewTab: false,
    },
    {
      id: 6,
      label: 'Contact',
      url: '/contact',
      openInNewTab: false,
    },
  ] as MenuItem[],
};

export default async function NavbarWrapper() {
  // TODO: Re-enable Strapi integration once environment variables are configured
  // Temporarily using default navigation to allow build to succeed
  const mainMenu: MenuItem[] = defaultNavigation.mainMenu;

  // Commented out Strapi call - will re-enable after configuring environment variables
  // try {
  //   const response = await getNavigation();
  //   if (response?.data?.mainMenu && response.data.mainMenu.length > 0) {
  //     mainMenu = response.data.mainMenu;
  //   }
  // } catch (error) {
  //   // Use default navigation if Strapi is unavailable
  //   console.error('Failed to fetch navigation from Strapi:', error);
  // }

  return <Navbar mainMenu={mainMenu} />;
}
