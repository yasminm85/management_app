import React, { useState, useEffect, useContext } from "react";
import {
  Typography,
} from "@material-tailwind/react";
import {
  FolderIcon,
} from "@heroicons/react/24/solid";
import { StatisticsCard } from "@/widgets/cards";
import { AppContent } from "@/context/AppContext";
import axios from "axios";

export function Home() {
  const { backendUrl } = useContext(AppContent);
  const [data, setData] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          backendUrl + "/api/nested/total",
          { withCredentials: true }
        );

        const sortedData = (res.data.fileCount || [])
          .sort((a, b) => a.parentName.localeCompare(b.parentName));

        setData(sortedData);
      } catch (err) {
        console.error("Gagal ambil activity", err);
      }
    };

    fetchData();
  }, [backendUrl]);


  const statisticsCards = data.map((item, index) => ({
    id: item.parentId,
    title: item.parentName,
    value: item.totalFolders,
    totalFiles: item.totalFiles,
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
        {statisticsCards.map(({ id, icon, title, value, totalFiles }) => (
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
                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm text-gray-600">
                    Total File
                  </span>
                  <span className="rounded-full bg-blue-100 px-3 py-0.5 text-sm font-bold text-blue-700">
                    {totalFiles}
                  </span>
                </div>

              }
            />
          </div>
        ))}

      </div>


    </div>
  );
}

export default Home;
