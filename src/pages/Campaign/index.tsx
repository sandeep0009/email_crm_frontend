import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { axiosInstance } from "../../lib/axios";
import { Calendar } from "../../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../../components/ui/popover";
import { format } from "date-fns";
import { Trash2 } from "lucide-react";

interface Sender {
  _id: string;
  email: string;
}

interface Template {
  _id: string;
  title: string;
}

interface TemplateEntry {
  template_id: string;
  sender_id: string;
  scheduled_time: string;
  date?: Date;
  time?: string;
}

const Campaign = () => {
  const [senders, setSenders] = useState<Sender[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [selectedEntries, setSelectedEntries] = useState<TemplateEntry[]>([]);
  const [recipients, setRecipients] = useState<string[]>([]);
  const [campaignName, setCampaignName] = useState("");

  const getSenders = async () => {
    const res = await axiosInstance.get("/get-all-sender");
    setSenders(res.data.data || []);
  };

  const getTemplates = async () => {
    const res = await axiosInstance.get("/get-all-template");
    setTemplates(res.data.data || []);
  };

  useEffect(() => {
    getSenders();
    getTemplates();
  }, []);

  const addTemplateEntry = () => {
    setSelectedEntries((prev) => [...prev, { template_id: "", sender_id: "", scheduled_time: "", date: undefined, time: "12:00" }]);
  };

  const removeTemplateEntry = (index: number) => {
    setSelectedEntries((prev) => prev.filter((_, i) => i !== index));
  };

  const updateEntry = (index: number, key: keyof TemplateEntry, value: any) => {
    const updated = [...selectedEntries];
    updated[index][key] = value;
    if (key === "date" || key === "time") {
      const entry = updated[index];
      if (entry.date && entry.time) {
        const isoString = new Date(`${format(entry.date, "yyyy-MM-dd")}T${entry.time}:00Z`).toISOString();
        entry.scheduled_time = isoString;
      }
    }
    setSelectedEntries(updated);
  };

  const addRecipient = () => {
    setRecipients((prev) => [...prev, ""]);
  };

  const updateRecipient = (index: number, value: string) => {
    const updated = [...recipients];
    updated[index] = value;
    setRecipients(updated);
  };

  const handleSubmit = async () => {
    const payload = {
      name: campaignName,
      template: selectedEntries.map(({ template_id, sender_id, scheduled_time }) => ({
        template_id,
        sender_id,
        scheduled_time,
      })),
      recipients,
    };

    try {
      const res = await axiosInstance.post("/create-campaign", payload);
      console.log("Campaign created:", res.data);
    } catch (error) {
      console.error("Error creating campaign", error);
    }
  };

  return (
    <div className="flex justify-end p-12">
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create Campaign</Button>
        </DialogTrigger>

        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Campaign Name"
              value={campaignName}
              onChange={(e) => setCampaignName(e.target.value)}
            />

            <div className="space-y-4">
              {selectedEntries.map((entry, index) => (
                <div key={index} className="grid grid-cols-4 gap-3 items-center">
                  <select
                    className="border rounded px-3 py-2"
                    value={entry.sender_id}
                    onChange={(e) => updateEntry(index, "sender_id", e.target.value)}
                  >
                    <option value="">Sender</option>
                    {senders.map((s) => (
                      <option key={s._id} value={s._id}>{s.email}</option>
                    ))}
                  </select>

                  <select
                    className="border rounded px-3 py-2"
                    value={entry.template_id}
                    onChange={(e) => updateEntry(index, "template_id", e.target.value)}
                  >
                    <option value="">Template</option>
                    {templates.map((t) => (
                      <option key={t._id} value={t._id}>{t.title}</option>
                    ))}
                  </select>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full">
                        {entry.date ? format(entry.date, "PPP") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Calendar
                        mode="single"
                        selected={entry.date}
                        onSelect={(date) => updateEntry(index, "date", date)}
                      />
                    </PopoverContent>
                  </Popover>

                  <div className="flex items-center gap-2">
                    <Input
                      type="time"
                      value={entry.time}
                      onChange={(e) => updateEntry(index, "time", e.target.value)}
                    />
                    <button onClick={() => removeTemplateEntry(index)} className="text-red-500">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <Button type="button" variant="outline" onClick={addTemplateEntry}>
                + Add Template Entry
              </Button>
            </div>

            <div className="space-y-2">
              {recipients.map((email, index) => (
                <Input
                  key={index}
                  placeholder="Recipient Email"
                  value={email}
                  onChange={(e) => updateRecipient(index, e.target.value)}
                />
              ))}

              <Button type="button" variant="outline" onClick={addRecipient}>
                + Add Recipient
              </Button>
            </div>

            <Button onClick={handleSubmit} className="w-full">
              Submit Campaign
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Campaign;
