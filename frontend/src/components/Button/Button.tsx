interface ButtonProps {
  text: string;
  color?: string;
  height?: string;
}

const Button = ({ text, color, height }: ButtonProps) => {
  return (
    <div
      className={`w-full ${
        height ? height : "h-15"
      } text-base md:text-lg py-2 px-4 rounded flex items-center justify-center cursor-pointer hover:bg-blue-900 transition duration-300 ease-in-out ${
        color ? color : "bg-primary-blue text-white"
      }`}
    >
      {text}
    </div>
  );
};

export default Button;
