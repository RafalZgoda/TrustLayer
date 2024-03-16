import Link from "next/link";
import Logo from "./Logo";
import { menuLinks } from "@/lib/menuLinks";

const Footer: React.FC = () => {
  return (
    <footer className="w-full flex justify-between items-center px-4 sm:px-12 bg-custom-dark-blue/70 py-16 text-gray-600 border-t border-white/20">
      <Link href="/">
        <Logo width={100} height={100} />
      </Link>
      <div>
        <nav className="flex items-center justify-center">
          {menuLinks.map((link, index) => (
            <Link className="mx-4" key={index} href={link.route}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
      <div>
        <p>Trust Layer © 2024</p>
      </div>
    </footer>
  );
};

export default Footer;
