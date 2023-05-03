//
import Navbar from '@/components/bars/Navbar';
import './globals.css';
import { Open_Sans } from 'next/font/google';
import AuthContext from '@/context/AuthContext';
import SWRConfigContext from '@/context/SWRConfigContext';

const openSans = Open_Sans({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'Sikstagram',
    template: 'Sikstagram | %s',
  },
  description: 'Sikstagram Photos',
  icons: {
    icon: 'favicon.ico',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={openSans.className}>
      <body className="w-full h-screen bg-neutral-50 overflow-auto">
        {/* tip) 바디 하위 페이지 및 컴포넌트에서 auth정보를 사용하기 위해 사용 */}
        <AuthContext>
          <header className="sticky top-0 bg-white z-10 border-b">
            <div className=" max-w-screen-xl mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="w-full flex justify-center max-w-screen-xl mx-auto">
            <SWRConfigContext>{children}</SWRConfigContext>
          </main>
        </AuthContext>
        {/*  tip) react에서 제공해주는 포탈, PortalDialog.tsx파일 참고해야함 */}
        <div id="portal"></div>
      </body>
    </html>
  );
}
