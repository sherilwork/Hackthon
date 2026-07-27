import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'CampusPilot AI | Smart Campus Navigation',
  description: 'AI-powered indoor campus navigation with AR guidance, voice assistance and intelligent route planning for universities.',
  keywords: ['campus navigation', 'AI navigation', 'indoor mapping', 'AR directions', 'university', 'smart campus'],
  openGraph: {
    title: 'CampusPilot AI | Navigate Your Campus Smarter with AI',
    description: 'AI-powered indoor campus navigation with AR guidance, voice assistance and intelligent route planning.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased" style={{ backgroundColor: '#FAFBFF' }}>
        {children}
      </body>
    </html>
  );
}
