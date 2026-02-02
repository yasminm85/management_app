import { useParams } from "react-router-dom";
import { Card, CardBody, Input, Typography } from "@material-tailwind/react";
import { useState } from "react";

export function ReviewTable({ reviewId, onBack }) {

    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");

    const files = [
        { id: 1, name: "Laporan Audit Jan.pdf", date: "2024-01-12" },
        { id: 2, name: "Evaluasi Proses.docx", date: "2024-02-03" },
        { id: 3, name: "Review Sistem.xlsx", date: "2024-02-10" },
    ];

    const filteredFiles = files.filter(f =>
        f.name.toLowerCase().includes(search.toLowerCase()) &&
        (date ? f.date === date : true)
    );

    return (
        <Card className="m-6">
            <CardBody>
                <button
                    onClick={onBack}
                    className="mb-4 text-sm text-blue-600 hover:underline"
                >
                    ← Kembali ke Struktur File
                </button>
                <Typography variant="h5" className="mb-4">
                    Review {reviewId}
                </Typography>

                {/* Search & Filter */}
                <div className="flex gap-4 mb-4">
                    <Input
                        label="Search by name"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Input
                        type="date"
                        label="Filter by date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>

                {/* Table */}
                <table className="w-full text-sm">
                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Nama File</th>
                            <th className="text-left py-2">Tanggal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredFiles.map(file => (
                            <tr key={file.id} className="border-b hover:bg-gray-50">
                                <td className="py-2">{file.name}</td>
                                <td className="py-2">{file.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardBody>
        </Card>
    );
}
