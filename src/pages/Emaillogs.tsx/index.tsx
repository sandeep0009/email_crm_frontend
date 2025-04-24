import { useEffect, useState } from "react";
import { axiosInstance } from "../../lib/axios";

const EmailLogs = () => {
    const [emailLogs, setEmailLogs] = useState<any[]>([]);

    const getEmailLogs = async () => {
        try {
            const res = await axiosInstance.get('/all-email-logs');
            
            setEmailLogs(res.data.data); 
        } catch (error) {
            console.error("Error fetching email logs:", error);
        }
    };

    useEffect(() => {
        getEmailLogs();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Email Logs</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full table-auto border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Recipient Email</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Template ID</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Sender ID</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Scheduled Time</th>
                            <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {emailLogs.length > 0 ? (
                            emailLogs.map((log) => (
                                <tr key={log._id} className="border-b">
                                    <td className="px-4 py-2 text-sm text-gray-800">{log.recipient_email}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{log.template_id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{log.sender_id}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{new Date(log.scheduled_time).toLocaleString()}</td>
                                    <td className="px-4 py-2 text-sm text-gray-800">{log.status || 'N/A'}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="px-4 py-2 text-sm text-gray-500 text-center">No logs found</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmailLogs;
