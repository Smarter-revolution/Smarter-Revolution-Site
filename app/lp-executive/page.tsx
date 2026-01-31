'use client';

import { useState } from 'react';
import Link from 'next/link';
import MeetingTypeSelector from '@/components/booking/MeetingTypeSelector';

export default function LandingPageExecutive() {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <>
      <style jsx global>{`
        :root {
          --bg-black: #0D0D0D;
          --bg-dark: #111111;
          --bg-darker: #080808;
          --card-blue: #1E293B;
          --card-dark: #151921;
          --revolution-red: #E53935;
          --highlight-orange: #F97316;
          --highlight-yellow: #FACC15;
          --text-white: #FFFFFF;
          --text-muted: #9CA3AF;
          --text-gray: #D1D5DB;
        }
      `}</style>

      <div style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif', backgroundColor: 'var(--bg-black)', color: 'var(--text-white)', lineHeight: '1.6' }}>
        {/* Navigation */}
        <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 3rem', maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>
            Smarter <span style={{ color: 'var(--revolution-red)' }}>Revolution</span>
          </div>
          <a href="#book" style={{ background: 'var(--revolution-red)', color: 'white', padding: '0.65rem 1.25rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            Free Strategy Call <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </nav>

        {/* Hero Section */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', padding: '3rem 3rem 4rem', maxWidth: '1400px', margin: '0 auto', minHeight: '70vh' }}>
          <div style={{ paddingRight: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, lineHeight: '1.3', marginBottom: '1.5rem' }}>
              What if every product, every process, every sales pitch had a professional video?<br /><br />
              <span style={{ background: 'linear-gradient(90deg, var(--highlight-yellow), var(--highlight-orange), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Finally build the training library your budget never allowed.
              </span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              Traditional video production is slow, expensive, and impossible to scale. That math is about to change. AI-powered production compresses months into days.
            </p>
            <p style={{ color: 'var(--text-white)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--revolution-red)' }}>▶</span> Watch 2 minutes. See how it works.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-blue), #0F172A)', borderRadius: '16px', aspectRatio: '16/10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden', position: 'relative' }}>
              {/* Video Placeholder - will be replaced with actual video */}
              <div style={{ width: '70px', height: '70px', background: 'var(--revolution-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', zIndex: 1 }}>
                <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px', fill: 'white', marginLeft: '4px' }}><path d="M8 5v14l11-7z"/></svg>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', zIndex: 1 }}>Overview Video • 2 min</p>
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', padding: '4rem 3rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Ready to see what's possible <span style={{ background: 'linear-gradient(90deg, var(--highlight-orange), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>for your team?</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Book a free strategy session. No pitch, no pressure — just a practical conversation about your content needs.
            </p>
            <a href="#book" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'var(--revolution-red)', color: 'white', padding: '0.85rem 1.75rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', transition: 'transform 0.2s, box-shadow 0.2s' }}>
              Book Your Free Call <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
          </div>
        </section>

        {/* Content Section */}
        <section style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 3rem 5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.75rem' }}>
              How it <span style={{ background: 'linear-gradient(90deg, var(--highlight-orange), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>actually works</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Four capabilities that change what's possible for your content</p>
          </div>

          {/* Feature 1: Speed */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              <img src="/images/speed.png" alt="AI-powered video production speed" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Speed</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                Days, not months. <span style={{ color: 'var(--revolution-red)' }}>That's not a typo.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                AI-powered video production compresses timelines that used to stretch into quarters. Launch a product with content ready on day one. Onboard new hires before they forget why they were excited.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                When production takes days instead of months, you stop planning around content limitations. You start planning around possibilities.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 Respond to market shifts while they're still shifts, not ancient history.</p>
              </div>
            </div>
          </div>

          {/* Feature 2: Scale */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem', direction: 'rtl' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              <img src="/images/infinitevideos.png" alt="Massive content library" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem', direction: 'ltr' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Scale</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                Every product. Every process. <span style={{ color: 'var(--revolution-red)' }}>Every pitch.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Remember that list of videos you need? The one that keeps getting longer while your budget stays flat?
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                Training for the new product line. Refreshed explainers for the features you launched last quarter. Sales enablement for the pitch that actually works now.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 That list becomes achievable. Not "someday when we have budget." Actually achievable.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', margin: '5rem 0', padding: '3rem', background: 'linear-gradient(135deg, var(--card-dark), rgba(30, 41, 59, 0.5))', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(90deg, var(--highlight-yellow), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>10x</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>More content output</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(90deg, var(--highlight-yellow), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>85%</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Faster production</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(90deg, var(--highlight-yellow), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>1</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Unified hub for everything</div>
            </div>
          </div>

          {/* Feature 3: Organization */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              <img src="/images/contenthub.png" alt="Organized content hub" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Organization</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                One system, <span style={{ color: 'var(--revolution-red)' }}>not scattered files.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Where do your training videos live right now? If the answer involves SharePoint, Google Drive, "ask Mike, he knows," or "I think there's a YouTube unlisted link somewhere" — you're not set up for scale.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                Your videos deserve a home. A single hub where your team finds what they need without a treasure map. Organized. Searchable. Professional.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 Not a folder. A system.</p>
              </div>
            </div>
          </div>

          {/* Feature 4: Accountability */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem', direction: 'rtl' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              <img src="/images/analytics.png" alt="Training analytics and compliance dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem', direction: 'ltr' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Accountability</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                Proof <span style={{ color: 'var(--revolution-red)' }}>when you need it.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                "Did the team complete the training?" If answering that question requires emails, spreadsheets, or educated guessing, something's broken.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                The system tracks who watched, who completed, who's stuck. Compliance reporting takes one click, not one afternoon. When leadership asks about training ROI, you have numbers, not narratives.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 You'll know what's happening. Not hope. Know.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section with Calendar */}
        <section id="book" style={{ background: 'linear-gradient(180deg, var(--bg-black) 0%, var(--bg-darker) 100%)', padding: '5rem 3rem', textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '1rem' }}>
            Book a Free Strategy Session <span style={{ background: 'linear-gradient(90deg, var(--highlight-orange), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>→</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '550px', margin: '0 auto 2rem', fontSize: '0.95rem', lineHeight: '1.7' }}>
            This isn't a 45-minute slide deck. It's a conversation about your situation, your content needs, and whether this makes sense for you. No pitch. No pressure.
          </p>

          {/* Integrated Calendar */}
          <div style={{ maxWidth: '900px', margin: '0 auto 2rem' }}>
            <MeetingTypeSelector />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '0.95rem' }}>Wolf Krammel</p>
            <p style={{ color: 'var(--revolution-red)', fontSize: '0.85rem' }}>CEO, Smarter Revolution</p>
          </div>
        </section>

        {/* Footer Note */}
        <div style={{ padding: '2.5rem 3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', maxWidth: '650px', margin: '0 auto 1rem', lineHeight: '1.6' }}>
            The companies pulling ahead aren't outspending you on content. They're out-producing you. The window to catch up is open — it won't stay open forever.
          </p>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Smarter <span style={{ color: 'var(--revolution-red)' }}>Revolution</span>
          </div>
        </div>
      </div>
    </>
  );
}
