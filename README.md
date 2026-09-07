# QRCraft AI

QRCraft AI is a privacy-first, real-time QR code generator built for fast sharing. Enter any URL or text and the QR preview updates immediately in your browser.

## Features

- Real-time QR code rendering as content changes
- URL and plain-text support
- Custom foreground and background colors
- PNG and SVG downloads
- High-resolution exports for digital and print use
- No account or sign-up required
- Client-side generation for privacy
- Responsive interface for mobile, tablet, desktop, and wide screens
- SEO metadata, Open Graph sharing data, and Twitter card support

## How it works

1. Enter a URL, message, contact detail, payment link, or any other content.
2. Customize the QR code colors and style controls.
3. Download a real QR code as PNG or SVG.

The generated code contains the exact input provided. It does not rely on static sample data.

## Technology

- Next.js App Router
- React and TypeScript
- `qrcode` for QR encoding and rendering
- Tailwind CSS and custom responsive styling
- Lucide React icons

## Development

Install dependencies and start the development server:

```bash
pnpm install
pnpm dev
```

Create a production build:

```bash
pnpm build
pnpm start
```

## Privacy

QR generation happens in the browser. QRCraft AI does not require an account and does not need to send the QR content to a backend service to render or download it.

## Developer

QRCraft AI was created by **Afaq Ahmad**, Founder and Developer. The platform is designed to keep QR generation simple, useful, and accessible across devices.

## License

This project is maintained as the QRCraft AI platform. Add your preferred license before distributing the source publicly.
