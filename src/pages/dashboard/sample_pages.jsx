import {
  Card,
  CardBody,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import {
  FolderIcon,
  ChartBarIcon,
  ClipboardDocumentCheckIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";

export function SamplePages() {
  const navigate = useNavigate();

  return (
    <div className="mt-8 mb-8 flex flex-col gap-6">

      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl">
        <CardBody className="p-6">
          <Typography variant="h4" className="font-bold mb-2">
            📂 Audit Project Overview
          </Typography>
          <Typography className="text-white/80 max-w-2xl">
            Ringkasan proyek audit internal, status dokumen, dan akses cepat ke
            struktur file serta review audit.
          </Typography>
        </CardBody>
      </Card>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: "Total Folder", value: "128", color: "blue" },
          { title: "Audit Aktif", value: "12", color: "green" },
          { title: "Review Selesai", value: "38", color: "purple" },
          { title: "Tahun Aktif", value: "2023–2025", color: "orange" },
        ].map((item) => (
          <Card key={item.title} className="shadow-md">
            <CardBody>
              <Typography className="text-sm text-gray-500">
                {item.title}
              </Typography>
              <Typography variant="h4" className={`text-${item.color}-600 font-bold`}>
                {item.value}
              </Typography>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* Project Status */}
        <Card className="xl:col-span-2 shadow-lg">
          <CardBody>
            <Typography variant="h6" className="mb-4 font-bold text-gray-800">
              📊 Status Audit per Tahun
            </Typography>

            <div className="space-y-4">
              {[
                { year: 2023, status: "Lengkap", color: "green" },
                { year: 2024, status: "Berjalan", color: "blue" },
                { year: 2025, status: "Perencanaan", color: "orange" },
              ].map((item) => (
                <div
                  key={item.year}
                  className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition"
                >
                  <div>
                    <Typography className="font-semibold text-gray-700">
                      Audit Tahun {item.year}
                    </Typography>
                    <Typography className="text-sm text-gray-500">
                      Status kegiatan audit
                    </Typography>
                  </div>

                  <Chip
                    value={item.status}
                    color={item.color}
                    className="font-semibold"
                  />
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

        {/* Quick Actions */}
        <Card className="shadow-lg">
          <CardBody>
            <Typography variant="h6" className="mb-4 font-bold text-gray-800">
              ⚡ Quick Action
            </Typography>

            <div className="flex flex-col gap-3">
              <Button
                color="blue"
                className="flex items-center gap-2"
                onClick={() => navigate("/dashboard/struktur-file")}
              >
                <FolderIcon className="h-5 w-5" />
                Buka File Explorer
              </Button>

              <Button
                color="green"
                variant="outlined"
                className="flex items-center gap-2"
              >
                <ClipboardDocumentCheckIcon className="h-5 w-5" />
                Lihat Review Audit
              </Button>

              <Button
                color="purple"
                variant="outlined"
                className="flex items-center gap-2"
              >
                <ChartBarIcon className="h-5 w-5" />
                Statistik Audit
              </Button>

              <Button
                color="gray"
                variant="text"
                className="flex items-center gap-2 justify-start"
              >
                <Cog6ToothIcon className="h-5 w-5" />
                Pengaturan Proyek
              </Button>
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}

export default SamplePages;
