import "@/styles/globals.css";
import { Inter } from 'next/font/google';
import { Metadata } from 'next';
import ClientRootLayout from '@/components/ClientRootLayout';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Chat from '@/components/chat/Chat';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'FB Consulting - AI Automation Solutions',
  description: 'Specialized AI consulting for businesses looking to automate processes and reduce costs',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`}>
        <ClientRootLayout>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Chat />
        </ClientRootLayout>
      </body>
    </html>
  );
}
