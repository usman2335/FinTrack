import "./logo.css";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <span
      className={`font-alexandria ${className} font-bold text-primary-blue`}
    >
      Fin<span className="logo-gradient">Track.</span>
    </span>
  );
};

export default Logo;
