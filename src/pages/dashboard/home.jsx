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
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          backendUrl + "/api/nested/folder-total",
          { withCredentials: true }
        );

        const sortedData = (res.data.folderCount || [])
          .sort((a, b) => a.Name.localeCompare(b.Name));

        setData(sortedData);
      } catch (err) {
        console.error("Gagal ambil activity", err);
      }
    };

    fetchData();
  }, [backendUrl]);


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

  const statisticsCards = data.map((item) => ({
    id: item.parentId,
    title: item.Name,
    value: item.folderCount,
    icon: FolderIcon,

    footer: {
      value: "Folder",
      label: "aktif",
      color: "text-blue-500",
    },
  }));



  return (
    <div className="mt-12 space-y-10">

      <div>
        <Typography variant="h2" className="font-bold text-gray-800">
          Dashboard Audit SPI Files
        </Typography>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCards.map(({ id, icon, title, footer, value, onClick }) => (
          <div
            key={id}
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


    </div>
  );
}

export default Home;
