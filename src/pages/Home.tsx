import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 py-12">
      <div className="text-4xl md:text-6xl font-bold text-center mb-6">
        More Than a CRM – Your Revenue <br />
        Operating System
      </div>
      <p className="text-gray-500 text-lg text-center max-w-3xl mx-auto">
        Engage leads, close deals faster, nurture relationships, and provide seamless support – all from
        one AI-powered intuitive platform designed to help you grow.
      </p>
      <div className="flex flex-col md:flex-row items-center justify-center mt-10 gap-6">
        <Button onClick={() => navigate("/signup")} size="lg">
          Start Now
        </Button>
        <Button variant="outline" size="lg" onClick={() => navigate("/signin")}>
          Login Now
        </Button>
      </div>
    </div>
  );
};

export default Home;
