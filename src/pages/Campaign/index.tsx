import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { axiosInstance } from "../../lib/axios";

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
    setSelectedEntries((prev) => [...prev, { template_id: "", sender_id: "", scheduled_time: "" }]);
  };

  const updateEntry = (index: number, key: keyof TemplateEntry, value: string) => {
    const updated = [...selectedEntries];
    updated[index][key] = value;
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
      template: selectedEntries,
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
                <div key={index} className="grid grid-cols-3 gap-4">
                  <select
                    className="border p-2 rounded"
                    value={entry.sender_id}
                    onChange={(e) => updateEntry(index, "sender_id", e.target.value)}
                  >
                    <option value="">Select Sender</option>
                    {senders?.map((s) => (
                      <option key={s._id} value={s._id}>{s.email}</option>
                    ))}
                  </select>

                  <select
                    className="border p-2 rounded"
                    value={entry.template_id}
                    onChange={(e) => updateEntry(index, "template_id", e.target.value)}
                  >
                    <option value="">Select Template</option>
                    {templates?.map((t) => (
                      <option key={t._id} value={t._id}>{t.title}</option>
                    ))}
                  </select>

                  <Input
                    type="datetime-local"
                    value={entry.scheduled_time}
                    onChange={(e) => updateEntry(index, "scheduled_time", e.target.value)}
                  />
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
