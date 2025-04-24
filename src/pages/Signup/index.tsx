import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const Signup = () => {
  const navigate = useNavigate();

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axiosInstance.post("/signup", {
        name,
        email,
        password,
      });

      console.log("Signup successful:", res.data);

      // Redirect to login page after successful signup
      navigate("/signin");
    } catch (error) {
      console.error("Error during signup:", error);
      // Optionally add a toast or error UI
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-xl">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">Create Account</h1>

          <form className="space-y-4" onSubmit={handleSignup}>
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <Input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating..." : "Sign Up"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/signin" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
