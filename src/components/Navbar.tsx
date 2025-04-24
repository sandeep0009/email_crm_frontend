import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const token = localStorage.getItem("token");
  console.log(token);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="bg-white p-4 mb-4 shadow">
      <div className="flex justify-between items-center">
        <h1
          className="font-bold text-lg cursor-pointer"
          onClick={() => navigate("/")}
        >
          Reach Flow
        </h1>

        <ul className="hidden md:flex gap-6">
          <li>
            <Link to="/sender" className="hover:font-bold">Sender</Link>
          </li>
          <li>
            <Link to="/template" className="hover:font-bold">Template</Link>
          </li>
          <li>
            <Link to="/campaign" className="hover:font-bold">Campaign</Link>
          </li>
        </ul>

        <div className="hidden md:flex gap-4">
          {token ? (
            <Button onClick={handleLogout}>LogOut</Button>
          ) : (
            <>
              <Button onClick={() => navigate("/signin")}>Login</Button>
              <Button onClick={() => navigate("/signup")}>SignUp</Button>
            </>
          )}
        </div>

        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          <ul className="flex flex-col gap-4">
            <li>
              <Link to="/sender" className="hover:font-bold" onClick={() => setIsMobileMenuOpen(false)}>Sender</Link>
            </li>
            <li>
              <Link to="/template" className="hover:font-bold" onClick={() => setIsMobileMenuOpen(false)}>Template</Link>
            </li>
            <li>
              <Link to="/campaign" className="hover:font-bold" onClick={() => setIsMobileMenuOpen(false)}>Campaign</Link>
            </li>
          </ul>
          <div className="flex flex-col gap-2">
            {token ? (
              <Button onClick={handleLogout}>LogOut</Button>
            ) : (
              <>
                <Button onClick={() => { navigate("/signin"); setIsMobileMenuOpen(false); }}>Login</Button>
                <Button onClick={() => { navigate("/signup"); setIsMobileMenuOpen(false); }}>SignUp</Button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
