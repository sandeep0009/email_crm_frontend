import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { axiosInstance } from "../../lib/axios";

interface SenderFormData {
  email: string;
  smtp_host: string;
  smtp_port: number | "";
  smtp_user: string;
  smtp_pass: string;
}

const Sender = () => {
  const [formData, setFormData] = useState<SenderFormData>({
    email: "",
    smtp_host: "",
    smtp_port: "",
    smtp_user: "",
    smtp_pass: "",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === "smtp_port" ? (value === "" ? "" : parseInt(value)) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/create-sender", formData);
      console.log("Sender created successfully:", response.data);

      // Optionally reset the form
      setFormData({
        email: "",
        smtp_host: "",
        smtp_port: "",
        smtp_user: "",
        smtp_pass: "",
      });
    } catch (err: any) {
      console.error("Error creating sender:", err);
      setError(err?.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add Sender</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="smtp_host"
          placeholder="SMTP Host"
          value={formData.smtp_host}
          onChange={handleChange}
          required
        />
        <Input
          name="smtp_port"
          type="number"
          placeholder="SMTP Port"
          value={formData.smtp_port.toString()}
          onChange={handleChange}
          required
        />
        <Input
          name="smtp_user"
          placeholder="SMTP User"
          value={formData.smtp_user}
          onChange={handleChange}
          required
        />
        <Input
          name="smtp_pass"
          type="password"
          placeholder="SMTP Password"
          value={formData.smtp_pass}
          onChange={handleChange}
          required
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Saving..." : "Save Sender"}
        </Button>
      </form>

      {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
    </div>
  );
};

export default Sender;
