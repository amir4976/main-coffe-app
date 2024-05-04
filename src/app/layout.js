import "./globals.css";
import { Inter } from "next/font/google";
import AOSInit from "@/utils/aos";
import ScrollToTop from "@/utils/SctollToTop";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "فروشگاه انلاین قهوه وست کافی",
  description: "وست کافی",
  icons: {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFBnR6gUU7O0DFHW16fAHmujEXz5ZCm0fpfPHUHaXVdQ&s",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa">
      <body className={inter.className}>
        <AOSInit />
        {children}
        <ScrollToTop />
        </body>
    </html>
  );
}
