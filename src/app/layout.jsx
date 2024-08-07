import { Inter, Poppins } from "next/font/google";
import { mergeClass } from "../utils/HelperFunctions";
// import { Header } from "@/components/CommonComponents/Header";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./colors.css";
import "./typograpghy.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import ToasterContext from "./context/TosterContext";
import AuthContext from "./context/AuthContext";
// import { Footer } from "@/components/CommonComponents/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--Inter" });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "--Poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Messenger Clone",
  description: "Messenger Clone App",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={mergeClass(inter.variable, poppins.variable, "htmlClass")}
    >
      <body className={"bodyContainerStyle"}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
