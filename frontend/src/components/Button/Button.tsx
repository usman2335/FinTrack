interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <div className="w-full h-15 bg-primary-blue text-white text-lg py-2 px-4 rounded flex items-center justify-center cursor-pointer hover:bg-blue-900 transition duration-300 ease-in-out">
      {text}
    </div>
  );
};

export default Button;
