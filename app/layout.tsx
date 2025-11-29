import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nayi Kahani - AI for Primary Teachers',
  description: 'Generate unique creative content, visual stories, and kids ebooks tailored for Indian primary classrooms.',
  icons: { icon: '/icon.png' }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="container">
          <div className="brand">
            <span className="logo">??</span>
            <div>
              <h1>Nayi Kahani</h1>
              <p className="tag">AI Assistant for Primary Teachers in India</p>
            </div>
          </div>
          <nav className="nav">
            <a href="/" className="nav-link">Home</a>
            <a href="/stories" className="nav-link">Visual Stories</a>
            <a href="/ebooks" className="nav-link">Kids Ebook</a>
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="footer">
          <div className="container">
            <p>Made for Indian classrooms ? No sign-in ? Works on mobile</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
