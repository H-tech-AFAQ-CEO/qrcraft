'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import QRCode from 'qrcode'
import {
  ArrowRight,
  Check,
  ChevronDown,
  Download,
  ExternalLink,
  FileImage,
  FileJson,
  Fingerprint,
  Globe2,
  Heart,
  Link2,
  Lock,
  Menu,
  Palette,
  QrCode,
  ShieldCheck,
  Sparkles,
  Upload,
  UserRound,
  Wifi,
  X,
  Zap,
} from 'lucide-react'

const useCases = [
  { icon: Globe2, label: 'Website links', text: 'Share a landing page or product.' },
  { icon: Wifi, label: 'WiFi credentials', text: 'Make joining your network effortless.' },
  { icon: UserRound, label: 'vCard contacts', text: 'Turn a business card into a tap.' },
  { icon: Zap, label: 'Payment links', text: 'Get paid faster with one scan.' },
  { icon: FileJson, label: 'Event tickets', text: 'Send guests straight to the door.' },
  { icon: Heart, label: 'Social profiles', text: 'Grow your audience offline.' },
]

function QRPreview({ content, foreground, background }: { content: string; foreground: string; background: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    QRCode.toCanvas(canvas, content || ' ', {
      errorCorrectionLevel: 'H',
      margin: 2,
      width: 280,
      color: { dark: foreground, light: background },
    })
  }, [content, foreground, background])

  return <canvas ref={canvasRef} className="qr-art qr-canvas" aria-label={`QR code for ${content || 'empty content'}`} role="img" />
}

function AdSlot({ id, className = '' }: { id: string; className?: string }) {
  return <div id={id} className={`ad-slot ${className}`}><span>Reserved ad space</span><small>{id}</small></div>
}

export default function Page() {
  const [content, setContent] = useState('https://qrcraft.ai')
  const [foreground, setForeground] = useState('#111827')
  const [background, setBackground] = useState('#ffffff')
  const [style, setStyle] = useState('rounded')
  const [format, setFormat] = useState('PNG')
  const [menuOpen, setMenuOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const helperText = useMemo(() => content.length > 0 ? 'Your QR code updates as you type.' : 'Add a link, text, or anything you want to share.', [content])

  const downloadQr = async (kind: 'png' | 'svg') => {
    const value = content || ' '
    if (kind === 'png') {
      const dataUrl = await QRCode.toDataURL(value, { errorCorrectionLevel: 'H', margin: 2, width: 1200, color: { dark: foreground, light: background } })
      const link = document.createElement('a')
      link.href = dataUrl
      link.download = 'qrcraft-code.png'
      link.click()
      setFormat('PNG')
    } else {
      const svg = await QRCode.toString(value, { type: 'svg', errorCorrectionLevel: 'H', margin: 2, width: 1200, color: { dark: foreground, light: background } })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }))
      link.download = 'qrcraft-code.svg'
      link.click()
      URL.revokeObjectURL(link.href)
      setFormat('SVG')
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#07111f] text-white">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <nav className="site-nav">
        <a className="brand" href="#top" aria-label="QRCraft AI home"><span className="brand-icon"><QrCode size={20} /></span><span>QRCraft <em>AI</em></span></a>
        <div className="nav-links"><a href="#features">Features</a><a href="#how-it-works">How it works</a><a href="#faq">FAQ</a></div>
        <a href="#generator" className="nav-cta">Try it free <ArrowRight size={15} /></a>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X /> : <Menu />}</button>
      </nav>
      {menuOpen && <div className="mobile-menu"><a href="#features" onClick={() => setMenuOpen(false)}>Features</a><a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a><a href="#faq" onClick={() => setMenuOpen(false)}>FAQ</a></div>}

      <section id="top" className="hero section-shell">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-dot" /> The simplest QR generator on the web</div>
          <h1>Make every scan<br /><span>mean something.</span></h1>
          <p>Create beautiful, high-resolution QR codes in seconds. No accounts, no tracking, no friction.</p>
          <div className="hero-trust"><span><ShieldCheck size={15} /> 100% private</span><span><Zap size={15} /> Instant download</span></div>
        </div>

        <div id="generator" className="generator-layout">
          <section className="generator-card glass-card">
            <div className="card-heading"><div><span className="kicker">QR GENERATOR</span><h2>What do you want to share?</h2></div><span className="live-pill"><span /> LIVE</span></div>
            <label className="input-label" htmlFor="qr-content">URL or text</label>
            <div className="text-input-wrap"><Link2 size={17} /><input id="qr-content" value={content} onChange={(event) => setContent(event.target.value)} placeholder="Paste a link or type anything..." /><button onClick={() => setContent('')} aria-label="Clear input"><X size={16} /></button></div>
            <p className="helper-text">{helperText}</p>
            <div className="controls-grid">
              <label className="control-field">Foreground color<div className="color-control"><input type="color" value={foreground} onChange={(event) => setForeground(event.target.value)} /><span>{foreground.toUpperCase()}</span></div></label>
              <label className="control-field">Background color<div className="color-control"><input type="color" value={background} onChange={(event) => setBackground(event.target.value)} /><span>{background.toUpperCase()}</span></div></label>
            </div>
            <div className="style-row"><span className="control-field">Dot style</span><div className="segmented-control">{['square', 'rounded', 'dots'].map((item) => <button key={item} className={style === item ? 'selected' : ''} onClick={() => setStyle(item)}>{item}</button>)}</div></div>
            <button className="upload-box"><Upload size={16} /><span><strong>Add a logo</strong><small>Optional · PNG or SVG</small></span><span className="plus">+</span></button>
          </section>
          <section className="preview-card glass-card">
            <div className="preview-top"><span className="kicker">PREVIEW</span><span className="format-label"><FileImage size={15} /> {format}</span></div>
            <div className="qr-stage"><QRPreview content={content} foreground={foreground} background={background} /></div>
            <div className="preview-footer"><div><strong>Ready to scan</strong><span>High-resolution output</span></div><div className="download-actions"><button className="download-secondary" onClick={() => downloadQr('svg')}><FileJson size={16} /> SVG</button><button className="download-primary" onClick={() => downloadQr('png')}><Download size={16} /> {copied ? 'Saved' : 'Download PNG'}</button></div></div>
          </section>
          <AdSlot id="ad-slot-1" className="side-ad" />
        </div>
        <AdSlot id="ad-slot-leaderboard" className="leaderboard" />
      </section>

      <section id="how-it-works" className="content-section section-shell"><div className="section-intro"><span className="kicker">HOW IT WORKS</span><h2>From idea to scan<br /><span>in three simple steps.</span></h2></div><div className="steps-grid">{[{ icon: Link2, n: '01', title: 'Enter your content', text: 'Paste a link, write a message, or add anything you want to share.' }, { icon: Palette, n: '02', title: 'Make it yours', text: 'Choose your colors, dot style, and add your logo for a personal touch.' }, { icon: Download, n: '03', title: 'Download & share', text: 'Export a crisp QR code and put it wherever your audience is.' }].map(({ icon: Icon, n, title, text }) => <article className="step-card" key={n}><div className="step-icon"><Icon size={20} /></div><span className="step-number">{n}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section id="features" className="content-section section-shell"><div className="section-intro centered"><span className="kicker">WHY Q R CRAFT</span><h2>Powerful by default.<br /><span>Simple by design.</span></h2><p>Everything you need to make QR codes people actually want to scan.</p></div><div className="features-grid">{[{ icon: Sparkles, title: '100% free', text: 'All the essentials, without a paywall or a catch.' }, { icon: Fingerprint, title: 'No sign-up', text: 'Start creating instantly. We never ask for your email.' }, { icon: Lock, title: 'Private by nature', text: 'Everything runs in your browser. Your data stays yours.' }, { icon: FileImage, title: 'High-resolution', text: 'Beautiful exports that look sharp at any size.' }].map(({ icon: Icon, title, text }) => <article className="feature-card" key={title}><Icon size={20} /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

      <section className="content-section section-shell use-case-section"><div className="section-intro"><span className="kicker">MADE FOR REAL LIFE</span><h2>One small square.<br /><span>Endless possibilities.</span></h2></div><div className="use-cases-grid">{useCases.map(({ icon: Icon, label, text }) => <article className="use-case" key={label}><Icon size={19} /><div><h3>{label}</h3><p>{text}</p></div></article>)}</div></section>

      <section id="faq" className="faq-section section-shell"><div className="section-intro"><span className="kicker">FAQ</span><h2>Good questions.<br /><span>Clear answers.</span></h2></div><div className="faq-list">{[['Is QRCraft AI really free?', 'Yes. QRCraft AI is free to use, with no sign-up, hidden limits, or surprise paywalls.'], ['Do QR codes expire?', 'No. The QR code itself never expires. As long as the destination link works, your code will keep working.'], ['What formats can I download?', 'Download your code as a crisp PNG or infinitely scalable SVG, perfect for print or digital use.']].map(([question, answer]) => <details key={question}><summary>{question}<ChevronDown size={18} /></summary><p>{answer}</p></details>)}</div></section>

      <section className="founder-section section-shell"><div className="founder-avatar">AA</div><div><span className="kicker">BUILT WITH CARE</span><h2>“The best tools<br />get out of your way.”</h2><p>QRCraft AI is made by <strong>Afaq Ahmad</strong>, Founder & Developer. A tiny, focused tool for making the internet a little more connected.</p></div><a href="#top" className="icon-link" aria-label="Back to top"><ArrowRight size={20} /></a></section>

      <footer className="site-footer section-shell"><a className="brand" href="#top"><span className="brand-icon"><QrCode size={18} /></span><span>QRCraft <em>AI</em></span></a><p>Simple QR codes for a connected world.</p><div><a href="#features">Features</a><a href="#faq">FAQ</a><a href="#top">Privacy</a></div><span className="copyright">© 2026 QRCraft AI</span></footer>
    </main>
  )
}
