'use client';

import Link from "next/link";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// Animated background grid
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Horizontal lines */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/10 to-transparent"
          style={{ top: `${(i + 1) * 12}%` }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.1 }}
        />
      ))}
      
      {/* Vertical lines */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-red-500/5 to-transparent"
          style={{ left: `${(i + 1) * 8}%` }}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: i * 0.05 }}
        />
      ))}
      
      {/* Glowing intersection points */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute w-1 h-1 rounded-full bg-red-500"
          style={{
            left: `${20 + (i % 3) * 30}%`,
            top: `${25 + Math.floor(i / 3) * 50}%`,
          }}
          animate={{
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.5, 1],
            boxShadow: [
              '0 0 5px rgba(239, 68, 68, 0.3)',
              '0 0 15px rgba(239, 68, 68, 0.6)',
              '0 0 5px rgba(239, 68, 68, 0.3)',
            ],
          }}
          transition={{
            duration: 3,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Animated logo with hover effect
function AnimatedLogo() {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <Link 
      href="/" 
      className="inline-block group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 bg-red-500/20 rounded-xl blur-xl"
          animate={{
            opacity: isHovered ? 0.4 : 0,
            scale: isHovered ? 1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
        />
        
        <h3 className="text-2xl font-bold relative z-10">
          <motion.span 
            className="text-white"
            animate={{ color: isHovered ? '#ffffff' : '#ffffff' }}
          >
            Smarter{' '}
          </motion.span>
          <motion.span 
            className="relative"
            animate={{
              color: isHovered ? '#f87171' : '#dc2626',
            }}
          >
            Revolution
            {/* Animated underline */}
            <motion.span
              className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.span>
        </h3>
      </motion.div>
    </Link>
  );
}

// Magnetic social button
function MagneticSocialButton({ 
  href, 
  icon, 
  label 
}: { 
  href: string; 
  icon: React.ReactNode; 
  label: string;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set((e.clientX - centerX) * 0.3);
    y.set((e.clientY - centerY) * 0.3);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.a
      ref={buttonRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 overflow-hidden group"
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label}
    >
      {/* Hover gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-red-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      {/* Icon */}
      <motion.div 
        className="relative z-10 group-hover:text-white transition-colors"
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        {icon}
      </motion.div>
      
      {/* Shine effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
      />
    </motion.a>
  );
}

// Animated link with hover effect
function AnimatedLink({ href, children, delay = 0 }: { href: string; children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -10 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.4, delay }}
    >
      <Link
        href={href}
        className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors duration-300"
      >
        <motion.span
          className="w-0 h-px bg-red-500 group-hover:w-3 transition-all duration-300"
        />
        <span className="relative">
          {children}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
        </span>
      </Link>
    </motion.li>
  );
}

// Animated section header
function SectionHeader({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true });
  
  return (
    <motion.h4
      ref={ref}
      className="text-sm font-semibold text-white mb-4 uppercase tracking-wider relative inline-block"
      initial={{ opacity: 0, y: 10 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      {children}
      <motion.span
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-red-500 to-transparent"
        initial={{ width: 0 }}
        animate={isInView ? { width: '50%' } : {}}
        transition={{ duration: 0.5, delay: delay + 0.3 }}
      />
    </motion.h4>
  );
}

// Animated contact info
function ContactInfo({ icon, href, children }: { icon: React.ReactNode; href: string; children: React.ReactNode }) {
  return (
    <motion.a
      href={href}
      className="flex items-center gap-3 text-sm text-gray-400 hover:text-red-400 transition-colors group"
      whileHover={{ x: 5 }}
    >
      <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-gray-500 group-hover:text-red-500 group-hover:bg-red-500/10 transition-all">
        {icon}
      </span>
      {children}
    </motion.a>
  );
}

// Back to top button
function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <motion.button
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 w-12 h-12 rounded-xl bg-gradient-to-br from-red-600 to-orange-600 text-white flex items-center justify-center shadow-lg shadow-red-500/25 z-50"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
      }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.svg 
        className="w-5 h-5" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
      </motion.svg>
    </motion.button>
  );
}

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const isInView = useInView(footerRef, { once: true, margin: '-100px' });

  const footerLinks = {
    services: [
      { name: "Video Production", href: "/video-production" },
      { name: "Web Development", href: "/web-development" },
      { name: "Guided Knowledge Hub", href: "/guided-knowledge-hub" },
    ],
    solutions: [
      { name: "Training & Onboarding", href: "/solutions/training-onboarding" },
      { name: "Sales & Partner Enablement", href: "/solutions/sales-enablement" },
      { name: "Customer Education", href: "/solutions/customer-education" },
      { name: "Compliance & Documentation", href: "/solutions/compliance-documentation" },
      { name: "Website Modernization", href: "/solutions/website-modernization" },
      { name: "Custom Portals", href: "/solutions/custom-portals" },
    ],
    resources: [
      { name: "Blog", href: "/blog" },
      { name: "Team", href: "/team" },
    ],
    company: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <>
      <footer 
        ref={footerRef}
        className="relative border-t border-white/10 bg-[#0a0a0a] overflow-hidden"
      >
        {/* Animated background */}
        <AnimatedGrid />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none" />
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-6">
            {/* Brand Column */}
            <motion.div 
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <AnimatedLogo />
              
              <motion.p 
                className="mt-4 text-sm text-gray-400 leading-relaxed max-w-sm"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                AI-powered video, training, and web infrastructure. We help mid-market companies create faster, perform better, and get discovered everywhere.
              </motion.p>
              
              {/* Social Links */}
              <motion.div 
                className="mt-6 flex items-center gap-4"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <MagneticSocialButton
                  href="https://linkedin.com/company/smarterrevolution"
                  label="LinkedIn"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  }
                />
                <MagneticSocialButton
                  href="https://twitter.com/smarterrevolution"
                  label="Twitter"
                  icon={
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  }
                />
              </motion.div>
              
              {/* Newsletter signup hint */}
              <motion.div
                className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10"
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="text-xs text-gray-500 mb-2">Ready to transform your content?</p>
                <Link 
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-medium text-red-500 hover:text-red-400 transition-colors group"
                >
                  Get started today
                  <motion.svg 
                    className="w-4 h-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </Link>
              </motion.div>
            </motion.div>

            {/* Services */}
            <div>
              <SectionHeader delay={0.1}>Services</SectionHeader>
              <ul className="space-y-3">
                {footerLinks.services.map((link, i) => (
                  <AnimatedLink key={link.href} href={link.href} delay={0.2 + i * 0.05}>
                    {link.name}
                  </AnimatedLink>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div>
              <SectionHeader delay={0.15}>Solutions</SectionHeader>
              <ul className="space-y-3">
                {footerLinks.solutions.map((link, i) => (
                  <AnimatedLink key={link.href} href={link.href} delay={0.25 + i * 0.05}>
                    {link.name}
                  </AnimatedLink>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <SectionHeader delay={0.25}>Company</SectionHeader>
              <ul className="space-y-3">
                {footerLinks.company.map((link, i) => (
                  <AnimatedLink key={link.href} href={link.href} delay={0.35 + i * 0.05}>
                    {link.name}
                  </AnimatedLink>
                ))}
              </ul>

              {/* Contact Info */}
              <motion.div 
                className="mt-6 space-y-3"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <ContactInfo 
                  href="mailto:info@smarterrevolution.com"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                >
                  info@smarterrevolution.com
                </ContactInfo>
                <ContactInfo 
                  href="tel:+12133028260"
                  icon={
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                >
                  (213) 302-8260
                </ContactInfo>
              </motion.div>
            </div>

            {/* Resources */}
            <div>
              <SectionHeader delay={0.2}>Resources</SectionHeader>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, i) => (
                  <AnimatedLink key={link.href} href={link.href} delay={0.3 + i * 0.05}>
                    {link.name}
                  </AnimatedLink>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <motion.div 
            className="mt-12 pt-8 border-t border-white/10"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <motion.p 
                className="text-sm text-gray-500 flex items-center gap-2"
                whileHover={{ color: '#9ca3af' }}
              >
                <span>©</span>
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {currentYear}
                </motion.span>
                <span>Smarter Revolution. All rights reserved.</span>
              </motion.p>
              
              <div className="flex items-center gap-6">
                <Link
                  href="/privacy"
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors relative group"
                >
                  Privacy Policy
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
                </Link>
                <span className="text-gray-700">•</span>
                <Link
                  href="/terms"
                  className="text-sm text-gray-500 hover:text-red-500 transition-colors relative group"
                >
                  Terms of Service
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-red-500 group-hover:w-full transition-all duration-300" />
                </Link>
              </div>
            </div>
            
          </motion.div>
        </div>
      </footer>
      
      {/* Back to top button */}
      <BackToTopButton />
    </>
  );
}
