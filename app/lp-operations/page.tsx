'use client';

import { useState } from 'react';
import BookingFlow from '@/components/booking/BookingFlow';

export default function LandingPageOperations() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

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
            <img src="/LogosAsset/1rb.png" alt="Smarter Revolution" style={{ height: '40px' }} />
          </div>
          <a href="#book" style={{ background: 'var(--revolution-red)', color: 'white', padding: '0.65rem 1.25rem', borderRadius: '50px', textDecoration: 'none', fontWeight: 600, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'transform 0.2s, box-shadow 0.2s' }}>
            Free Strategy Call <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
        </nav>

        {/* Hero Section */}
        <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', padding: '3rem 3rem 4rem', maxWidth: '1400px', margin: '0 auto', minHeight: '70vh' }}>
          <div style={{ paddingRight: '1rem' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 700, lineHeight: '1.3', marginBottom: '1.5rem' }}>
              AI-powered training videos your team will actually watch, retain, and apply.<br /><br />
              <span style={{ background: 'linear-gradient(90deg, var(--highlight-yellow), var(--highlight-orange), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Complete visibility. No more chasing. No more guessing.
              </span>
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.7', marginBottom: '1.5rem' }}>
              You've seen the training that doesn't work. PDFs nobody opens. Videos so boring they become background noise. Content scattered across seventeen folders that even you can't navigate. Your team deserves better. And frankly, so do you.
            </p>
            <p style={{ color: 'var(--text-white)', fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: 'var(--revolution-red)' }}>▶</span> Watch 2 minutes. See the difference.
            </p>
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-blue), #0F172A)', borderRadius: '16px', aspectRatio: '16/10', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.1)', overflow: 'hidden', position: 'relative' }}>
              {/* Video - Open Source Placeholder (Pexels) - Replace with actual video later */}
              {!isVideoPlaying ? (
                <>
                  <video
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }}
                    autoPlay
                    muted
                    loop
                    playsInline
                  >
                    <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                  </video>
                  <div
                    onClick={() => setIsVideoPlaying(true)}
                    style={{ width: '70px', height: '70px', background: 'var(--revolution-red)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', zIndex: 1 }}
                  >
                    <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px', fill: 'white', marginLeft: '4px' }}><path d="M8 5v14l11-7z"/></svg>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '1rem', zIndex: 1, background: 'rgba(0,0,0,0.5)', padding: '0.25rem 0.75rem', borderRadius: '4px' }}>Overview Video • 2 min</p>
                </>
              ) : (
                <video
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                  autoPlay
                  controls
                  playsInline
                >
                  {/* Replace this URL with actual overview video */}
                  <source src="https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </section>

        {/* Mid-page CTA */}
        <section style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', padding: '4rem 3rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
              Tired of training that <span style={{ background: 'linear-gradient(90deg, var(--highlight-orange), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>can't be tracked?</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', marginBottom: '1.5rem' }}>
              Book a free strategy session. We'll explore whether this actually solves your problems — or just creates new ones.
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
              Training infrastructure <span style={{ background: 'linear-gradient(90deg, var(--highlight-orange), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>that actually works</span>
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Four problems solved — without creating new headaches for your team</p>
          </div>

          {/* Feature 1: Visibility */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              {/* Placeholder image - Replace with actual analytics dashboard image */}
              <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop" alt="Real-time training completion dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Visibility</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                Complete visibility, <span style={{ color: 'var(--revolution-red)' }}>zero chasing.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Picture this: Someone asks which team members completed last month's safety training. You don't send emails. You don't ping supervisors. You don't open a spreadsheet that may or may not be current.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                You pull up a dashboard. You see exactly who started, who completed, who stopped halfway through and never came back. Every shift. Every location. Real time.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 That's not a fantasy. That's how it should have worked all along.</p>
              </div>
            </div>
          </div>

          {/* Feature 2: Onboarding */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem', direction: 'rtl' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              {/* Placeholder image - Replace with actual training content library image */}
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop" alt="Consistent training content library" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem', direction: 'ltr' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Onboarding</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                New hires productive <span style={{ color: 'var(--revolution-red)' }}>faster.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Onboarding usually works like this: New person shadows experienced person. Experienced person explains things while trying to do their actual job. Both end up frustrated. Training quality varies wildly depending on who's doing the explaining.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                Now imagine: New hire watches professional, consistent training videos. They learn the right way the first time. Your experienced people stay focused on their work.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 Same training. Every time. For everyone.</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem', margin: '5rem 0', padding: '3rem', background: 'linear-gradient(135deg, var(--card-dark), rgba(30, 41, 59, 0.5))', borderRadius: '20px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(90deg, var(--highlight-yellow), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>100%</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Training consistency</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(90deg, var(--highlight-yellow), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>1-click</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Compliance reports</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, background: 'linear-gradient(90deg, var(--highlight-yellow), var(--revolution-red))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>0</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Excuses left</div>
            </div>
          </div>

          {/* Feature 3: Organization */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              {/* Placeholder image - Replace with actual content hub image */}
              <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop" alt="Centralized training content hub" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Organization</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                One place for <span style={{ color: 'var(--revolution-red)' }}>everything.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                "Where do I find the video on [X]?" If answering that question requires detective work, something's broken.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                Your team goes to one hub. They find what they need. They watch it. Done. No hunting through email threads. No asking three people for the same link. No wondering if they found the current version or the one from 2019.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 One place. Everything they need. Actually findable.</p>
              </div>
            </div>
          </div>

          {/* Feature 4: Proof */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '5rem', direction: 'rtl' }}>
            <div style={{ background: 'linear-gradient(135deg, var(--card-dark), var(--card-blue))', borderRadius: '16px', aspectRatio: '4/3', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(255, 255, 255, 0.08)', overflow: 'hidden' }}>
              {/* Placeholder image - Replace with actual compliance/timestamped records image */}
              <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop" alt="Timestamped completion records" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div style={{ padding: '1rem', direction: 'ltr' }}>
              <span style={{ display: 'inline-block', background: 'rgba(229, 57, 53, 0.15)', color: 'var(--revolution-red)', fontSize: '0.75rem', fontWeight: 600, padding: '0.4rem 0.8rem', borderRadius: '50px', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Protection</span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem', lineHeight: '1.3' }}>
                Proof <span style={{ color: 'var(--revolution-red)' }}>that holds up.</span>
              </h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '1rem' }}>
                Someday, someone will claim they weren't trained on something. It happens. When it does, you'll have timestamped completion records. Who watched what. When they watched it. How much they watched.
              </p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.8', marginBottom: '0' }}>
                When auditors ask questions, you answer in seconds, not days. When someone says "nobody told me," you have receipts.
              </p>
              <div style={{ background: 'rgba(249, 115, 22, 0.1)', borderLeft: '3px solid var(--highlight-orange)', padding: '1rem 1.25rem', marginTop: '1.5rem', borderRadius: '0 8px 8px 0' }}>
                <p style={{ color: 'var(--text-gray)', fontSize: '0.9rem', margin: 0 }}>💡 That's not micromanagement. That's protection — for them and for you.</p>
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
            No one's going to read slides at you or push you toward something that doesn't fit. This is a conversation about your training challenges, your compliance requirements, your team's needs. If this won't make your life easier, we'll tell you.
          </p>

          {/* Integrated Calendar */}
          <div style={{ maxWidth: '1200px', margin: '0 auto 2rem' }}>
            <BookingFlow eventTypeSlug="strategy-session" />
          </div>

          <div style={{ marginTop: '2rem' }}>
            <p style={{ fontWeight: 600, color: 'var(--text-white)', fontSize: '0.95rem' }}>Wolf Krammel</p>
            <p style={{ color: 'var(--revolution-red)', fontSize: '0.85rem' }}>CEO, Smarter Revolution</p>
          </div>
        </section>

        {/* Footer Note */}
        <div style={{ padding: '2.5rem 3rem', borderTop: '1px solid rgba(255, 255, 255, 0.08)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic', maxWidth: '650px', margin: '0 auto 1rem', lineHeight: '1.6' }}>
            Training that exists but can't be proven isn't training. It's liability. You already know this. Now there's a better way to fix it.
          </p>
          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)' }}>
            Smarter <span style={{ color: 'var(--revolution-red)' }}>Revolution</span>
          </div>
        </div>
      </div>
    </>
  );
}
