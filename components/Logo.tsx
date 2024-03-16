import Image from "next/image";
const Logo = ({ width, height }: { width: number; height: number }) => {
  return <Image src="/trust_protocol_logo.png" alt="Logo" width={width} height={height} />;
};

export default Logo;
