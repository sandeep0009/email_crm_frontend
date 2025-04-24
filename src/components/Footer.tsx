const Footer = () => {
  return (
    <footer className=" text-black  border-t-2 py-4 bottom-0 w-full">
      <div className=" mx-auto text-center">
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;