'use client'

import { motion } from 'motion/react'

const wrap = (color: string, children: React.ReactNode, overflow = false) => (
  <div style={{
    width: 52, height: 52, borderRadius: 14, flexShrink: 0,
    background: `${color}14`,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: overflow ? 'hidden' : 'visible',
  }}>
    {children}
  </div>
)

/* ── Voice Application ── amber bars */
export function VoiceAppIcon() {
  const heights = [10, 18, 24, 16, 10]
  return wrap('#f5a347', (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
      {heights.map((h, i) => (
        <motion.div
          key={i}
          style={{ width: 4, borderRadius: 3, backgroundColor: '#f5a347' }}
          animate={{ height: [h, 24, h * 0.35, h] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
        />
      ))}
    </div>
  ))
}

/* ── Chatbot ── periwinkle typing bubble */
export function ChatbotIcon() {
  return wrap('#8a9ef5', (
    <div style={{ position: 'relative' }}>
      <svg width="32" height="27" viewBox="0 0 32 27" fill="none">
        <rect x="0" y="0" width="32" height="21" rx="8" fill="#8a9ef5" fillOpacity="0.2" />
        <path d="M7 21 L11 27 L14 21" fill="#8a9ef5" fillOpacity="0.2" />
      </svg>
      <div style={{ position: 'absolute', top: 7, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 4 }}>
        {[0, 1, 2].map(i => (
          <motion.div
            key={i}
            style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#8a9ef5' }}
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 0.72, repeat: Infinity, delay: i * 0.16, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  ))
}

/* ── Transcription Tool ── teal scanning line */
export function TranscriptionIcon() {
  return wrap('#52bda0', (
    <div style={{ position: 'relative', width: 28, height: 32, overflow: 'hidden' }}>
      {[5, 13, 21].map((top, i) => (
        <div key={i} style={{
          position: 'absolute', top,
          left: 0, right: i === 2 ? '30%' : 0,
          height: 2.5, borderRadius: 2,
          backgroundColor: '#52bda0', opacity: 0.22,
        }} />
      ))}
      <motion.div
        style={{
          position: 'absolute', left: -2, right: -2, height: 2, borderRadius: 1,
          background: 'linear-gradient(to right, transparent, #52bda0 40%, transparent)',
        }}
        animate={{ top: [0, 30] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
      />
      <motion.div
        style={{
          position: 'absolute', left: 0, right: 0, height: 10, borderRadius: 1,
          background: 'linear-gradient(to bottom, #52bda025, transparent)',
        }}
        animate={{ top: [0, 26] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', repeatDelay: 0.5 }}
      />
    </div>
  ))
}

/* ── Translation Service ── purple alternating chars */
export function TranslationIcon() {
  return wrap('#9d7be8', (
    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
      <motion.span
        style={{ fontSize: 16, fontWeight: 700, color: '#9d7be8', fontFamily: 'serif', lineHeight: 1 }}
        animate={{ opacity: [1, 0.2, 1], scale: [1, 0.82, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        अ
      </motion.span>
      <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
        <path d="M1 4h12M9 1l3 3-3 3" stroke="#9d7be8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
      </svg>
      <motion.span
        style={{ fontSize: 16, fontWeight: 700, color: '#9d7be8', lineHeight: 1 }}
        animate={{ opacity: [0.2, 1, 0.2], scale: [0.82, 1, 0.82] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
      >
        A
      </motion.span>
    </div>
  ))
}

/* ── EdTech Platform ── golden book with shimmer */
export function EdTechIcon() {
  return wrap('#d4b84a', (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <svg width="32" height="26" viewBox="0 0 32 26" fill="none">
        <rect x="14.5" y="1" width="2" height="23" rx="1" fill="#d4b84a" opacity="0.7" />
        <path d="M14 2C9 2 3 5 1 9V25C3 21 9 18 14 18V2Z" fill="#d4b84a" fillOpacity="0.3" />
        <path d="M17 2C22 2 28 5 30 9V25C28 21 22 18 17 18V2Z" fill="#d4b84a" fillOpacity="0.5" />
        <line x1="19" y1="11" x2="27" y2="12" stroke="#d4b84a" strokeWidth="1" opacity="0.45" />
        <line x1="19" y1="15" x2="24" y2="16" stroke="#d4b84a" strokeWidth="1" opacity="0.45" />
      </svg>
      <motion.div
        style={{
          position: 'absolute', top: 0, bottom: 0, width: 10,
          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.55), transparent)',
        }}
        animate={{ left: [-10, 42] }}
        transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }}
      />
    </div>
  ), true)
}

/* ── Something else ── rose zap with pulse rings */
export function OtherIcon() {
  return wrap('#e06f95', (
    <div style={{ position: 'relative', width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[0, 0.55].map((delay, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute', width: 28, height: 28, borderRadius: '50%',
            border: '1.5px solid #e06f95',
          }}
          animate={{ scale: [0.45, 1.7], opacity: [0.75, 0] }}
          transition={{ duration: 1.3, repeat: Infinity, delay, ease: 'easeOut' }}
        />
      ))}
      <svg width="15" height="19" viewBox="0 0 15 19" fill="#e06f95">
        <path d="M8.5 0L0 10.5h6.5L5 19l10-10.5H8.5L8.5 0z" />
      </svg>
    </div>
  ))
}
