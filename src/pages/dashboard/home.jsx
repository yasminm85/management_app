import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  Button,
  Progress,
} from "@material-tailwind/react";
import {
  FolderIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { AppContent } from "@/context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Home() {
  const { backendUrl, userData, setUserData, setIsLoggedin } = useContext(AppContent);
  const [treeItems, setTreeItems] = useState([]);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  // useEffect(() => {
  //   const fetchActivity = async () => {
  //     try {
  //       const res = await axios.get(
  //         backendUrl + "/api/activity?limit=5",
  //         { withCredentials: true }
  //       );
  //       setActivities(res.data.items || []);
  //     } catch (err) {
  //       console.error("Gagal ambil activity", err);
  //     }
  //   };

  //   fetchActivity();
  // }, [backendUrl]);

  const countFolderByNames = (names) => {
    return treeItems.filter(
      (item) =>
        item.type === "folder" &&
        names.some((name) =>
          item.name.toLowerCase().includes(name.toLowerCase())
        )
    ).length;
  };

  const auditCount = countFolderByNames([
    "operasional",
    "tematik",
    "investigasi",
  ]);

  const reviewCount = countFolderByNames([
    "review",
    "evaluasi",
  ]);

  const konsultasiCount = countFolderByNames([
    "konsultasi",
  ]);

  const supportingCount = treeItems.filter(
    (item) => item.type === "file"
  ).length;

  const statisticsCards = [
    {
      title: "Audit",
      value: auditCount,
      icon: FolderIcon,
      onClick: () => navigate("/file-explorer?category=audit"),
      footer: {
        value: "Folder",
        label: "audit aktif",
        color: "text-blue-500",
      },
    },
    {
      title: "Review / Evaluasi",
      value: reviewCount,
      icon: CheckCircleIcon,
      onClick: () => navigate("/file-explorer?category=review"),
      footer: {
        value: "Folder",
        label: "review",
        color: "text-green-500",
      },
    },
    {
      title: "Konsultasi",
      value: konsultasiCount,
      icon: ClockIcon,
      onClick: () => navigate("/file-explorer?category=konsultasi"),
      footer: {
        value: "Folder",
        label: "konsultasi",
        color: "text-orange-500",
      },
    },
    {
      title: "Supporting",
      value: supportingCount,
      icon: ExclamationTriangleIcon,
      onClick: () => navigate("/file-explorer?category=supporting"),
      footer: {
        value: "Dokumen",
        label: "pendukung",
        color: "text-red-500",
      },
    },
  ];

  const activityIcon = (action) => {
    switch (action) {
      case "CREATE_FOLDER":
        return <FolderIcon className="w-6 h-6 text-blue-500" />;
      case "UPLOAD_EVIDENCE":
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case "START_REVIEW":
        return <ClockIcon className="w-6 h-6 text-orange-500" />;
      default:
        return <ExclamationTriangleIcon className="w-6 h-6 text-gray-400" />;
    }
  };


  return (
    <div className="mt-12 space-y-10">

      {/* ================= HEADER ================= */}
      <div>
        <Typography variant="h2" className="font-bold text-gray-800">
          Dashboard Audit SPI Files
        </Typography>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCards.map(({ icon, title, footer, value, onClick }) => (
          <div
            key={title}
            onClick={onClick}
            className="cursor-pointer transition hover:-translate-y-1 hover:shadow-lg"
          >
            <StatisticsCard
              title={title}
              value={value}
              icon={React.createElement(icon, {
                className: "w-6 h-6 text-white",
              })}
              footer={
                <Typography className="text-sm text-blue-gray-600">
                  <strong className={footer.color}>{footer.value}</strong>
                  &nbsp;{footer.label}
                </Typography>
              }
            />
          </div>
        ))}
      </div>


      {/* ================= INSIGHT BAR ================= */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100">
        <CardBody className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <Typography variant="h6">📌 Insight Audit Hari Ini</Typography>
            <Typography className="text-sm text-gray-600">
              Audit Operasional mendominasi progres tahun berjalan
            </Typography>
          </div>
          <Button color="blue" size="sm">
            Lihat Detail
          </Button>
        </CardBody>
      </Card>

      {/* ================= DISTRIBUSI AUDIT ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        <Card className="border border-gray-200">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="p-4"
          >
            <Typography variant="h6">Distribusi Audit</Typography>
          </CardHeader>
          <CardBody className="space-y-4 pt-0">
            {[
              { label: "Operasional", value: 65, color: "blue" },
              { label: "Tematik", value: 20, color: "green" },
              { label: "Investigasi", value: 15, color: "red" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.label}</span>
                  <span>{item.value}%</span>
                </div>
                <Progress value={item.value} color={item.color} />
              </div>
            ))}
          </CardBody>
        </Card>

        {/* ================= ACTIVITY ================= */}
        <Card className="xl:col-span-2 border border-gray-200">
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="p-4"
          >
            <Typography variant="h6">Aktivitas Audit Terbaru</Typography>
          </CardHeader>
          <CardBody className="pt-0 space-y-4">

            <CardBody className="pt-0 space-y-4">

              {activities.length === 0 && (
                <Typography className="text-sm text-gray-500">
                  Belum ada aktivitas audit
                </Typography>
              )}

              {activities.map((item) => (
                <div key={item._id} className="flex items-start gap-4">
                  {activityIcon(item.action)}

                  <div>
                    <Typography className="text-sm font-medium">
                      {item.message}
                    </Typography>
                    <Typography className="text-xs text-gray-500">
                      {item.createdBy?.name || "System"} •{" "}
                      {new Date(item.createdAt).toLocaleString("id-ID")}
                    </Typography>
                  </div>
                </div>
              ))}

            </CardBody>


          </CardBody>
        </Card>
      </div>

      {/* ================= QUICK ACTION ================= */}
      <Card className="border border-gray-200 bg-gray-50">
        <CardBody className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-3">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-500" />
            <Typography className="text-sm">
              Ada audit yang mendekati tenggat waktu
            </Typography>
          </div>
          <div className="flex gap-3">
            <Button size="sm" variant="outlined">
              Lihat Deadline
            </Button>
            <Button size="sm" color="red">
              Prioritaskan
            </Button>
          </div>
        </CardBody>
      </Card>

    </div>
  );
}

export default Home;
