

import { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "smtp_port" ? parseInt(value) || "" : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Sender form submitted:", formData);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <Input
          name="smtp_host"
          placeholder="SMTP Host"
          value={formData.smtp_host}
          onChange={handleChange}
        />
        <Input
          name="smtp_port"
          type="number"
          placeholder="SMTP Port"
          value={formData.smtp_port.toString()}
          onChange={handleChange}
        />
        <Input
          name="smtp_user"
          placeholder="SMTP User"
          value={formData.smtp_user}
          onChange={handleChange}
        />
        <Input
          name="smtp_pass"
          type="password"
          placeholder="SMTP Password"
          value={formData.smtp_pass}
          onChange={handleChange}
        />
        <Button type="submit" className="w-full">
          Save Sender
        </Button>
      </form>
    </div>
  );
};

export default Sender;
