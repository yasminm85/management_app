import {
  Card,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import {
  RocketLaunchIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

export function SamplePages() {
  return (
    <div className="mt-8 mb-8 flex flex-col gap-6">

      {/* Header Banner */}
      <div className="relative flex items-center justify-between rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 shadow-lg">
        <div>
          <Typography variant="h4" color="white">
            Sample Pages
          </Typography>
          <Typography color="white" className="opacity-80 mt-1">
            Halaman contoh untuk mengembangkan fitur baru
          </Typography>
        </div>
      </div>

      {/* Main Content */}
      <Card>
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Selamat Datang 👋
          </Typography>

          <Typography className="font-normal text-blue-gray-500 mb-6">
            Ini adalah halaman Sample Pages.  
            Gunakan halaman ini sebagai template untuk membuat halaman baru di dashboard kamu.
          </Typography>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Card className="border border-blue-gray-100 shadow-sm">
              <CardBody className="text-center">
                <RocketLaunchIcon className="h-10 w-10 text-blue-500 mx-auto mb-3" />
                <Typography variant="h6" color="blue-gray">
                  Fast Setup
                </Typography>
                <Typography className="text-sm text-blue-gray-500 mt-1">
                  Buat halaman baru dengan struktur yang sudah siap pakai.
                </Typography>
              </CardBody>
            </Card>

            <Card className="border border-blue-gray-100 shadow-sm">
              <CardBody className="text-center">
                <DocumentTextIcon className="h-10 w-10 text-green-500 mx-auto mb-3" />
                <Typography variant="h6" color="blue-gray">
                  Clean Design
                </Typography>
                <Typography className="text-sm text-blue-gray-500 mt-1">
                  Tampilan modern dan konsisten dengan dashboard.
                </Typography>
              </CardBody>
            </Card>

            <Card className="border border-blue-gray-100 shadow-sm">
              <CardBody className="text-center">
                <Cog6ToothIcon className="h-10 w-10 text-purple-500 mx-auto mb-3" />
                <Typography variant="h6" color="blue-gray">
                  Easy Customize
                </Typography>
                <Typography className="text-sm text-blue-gray-500 mt-1">
                  Mudah diubah sesuai kebutuhan project kamu.
                </Typography>
              </CardBody>
            </Card>

          </div>

        </CardBody>
      </Card>
    </div>
  );
}

export default SamplePages;
