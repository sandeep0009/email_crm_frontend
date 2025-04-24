import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { services } from "../lib/service";
import ServiceCard from "../components/ServiceCard";
import Footer from "../components/Footer";


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
      <div className="relative w-full mt-12">
        <img
          src="./images/laptop.jpg"
          alt="laptop image"
          className="w-full h-auto object-cover rounded"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <div className="text-white text-2xl md:text-4xl font-bold text-center">
            Start Your Campaign <br />
            <p className="text-sm">With our Email-CRM</p>
          </div>
        </div>
      </div>
      <div>
        <section className="py-16 px-4 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {services.map((service, idx) => (
          <ServiceCard
            key={idx}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
      </div>
      <div>
        <Footer/>
      </div>
    
    </div>
  );
};

export default Home;
