import { useState } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axiosInstance.post("/signin", {
        email,
        password,
      });

      console.log("Login successful:", res.data);
      navigate("/sender");
    } catch (error) {
      console.error("Error during sign in:", error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-6 shadow-xl">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">Login to Account</h1>

          <form className="space-y-4" onSubmit={handleSignIn}>
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
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;
