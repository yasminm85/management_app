import React, { useState } from "react";
import { Dialog, DialogBody, DialogHeader } from "@material-tailwind/react";

const orgData = {
  ceo: {
    name: "Yoshi Kenna",
    role: "Project Trainee",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    ring: "ring-red-500",
    department: "CEO",
    level: "CEO",
  },
  departments: [
    {
      name: "DEPARTMENT",
      color: "ring-blue-500",
      head: {
        name: "Patricia Kenna",
        role: "Senior Manager",
        img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
        level: "HEAD",
      },
      members: [
        {
          name: "Pascal Cartrain",
          role: "Project Trainee",
          img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
          level: "STAFF",
        },
        {
          name: "Liu Wong",
          role: "Senior S/W Engg",
          img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300",
          level: "STAFF",
        },
        {
          name: "Helvetis Nagy",
          role: "Project Trainee",
          img: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300",
          level: "STAFF",
        },
      ],
    },
    {
      name: "DEPARTMENT",
      color: "ring-green-500",
      head: {
        name: "Helen Marie",
        role: "Project Trainee",
        img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=300",
        level: "HEAD",
      },
      members: [
        {
          name: "Jose Pavarotti",
          role: "S/W Engg",
          img: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=300",
          level: "STAFF",
        },
        {
          name: "Horst Kloss",
          role: "Project Trainee",
          img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300",
          level: "STAFF",
        },
      ],
    },
  ],
};

// ===== Reusable Person Card =====
function PersonCard({ person, ringColor, onClick }) {
  return (
    <div
      onClick={onClick}
      className="cursor-pointer flex flex-col items-center 
                 transition-all duration-500 
                 opacity-0 animate-fadeInUp hover:scale-105"
    >
      {/* Level Label */}
      <span className="mb-2 text-xs font-bold bg-gray-800 text-white px-3 py-1 rounded-full">
        {person.level}
      </span>

      {/* Avatar */}
      <div
        className={`w-24 h-24 rounded-full overflow-hidden ring-4 ${ringColor} shadow-lg`}
      >
        <img
          src={person.img}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      </div>

      <h3 className="mt-3 font-semibold text-gray-800">{person.name}</h3>
      <p className="text-sm text-gray-500">{person.role}</p>
    </div>
  );
}

export function Notifications() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openModal = (person) => {
    setSelected(person);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">

      {/* ===== CEO ===== */}
      <div className="flex justify-center mb-10">
        <PersonCard
          person={orgData.ceo}
          ringColor={orgData.ceo.ring}
          onClick={() => openModal(orgData.ceo)}
        />
      </div>

      {/* ===== LINE ===== */}
      <div className="flex justify-center mb-10">
        <div className="w-1 h-12 bg-gray-300 rounded-full"></div>
      </div>

      {/* ===== DEPARTMENTS ===== */}
      <div className="flex justify-center gap-24 flex-wrap">

        {orgData.departments.map((dept, i) => (
          <div key={i} className="flex flex-col items-center">

            {/* Department Label */}
            <div className="mb-4 px-5 py-1 bg-indigo-500 text-white text-xs font-bold rounded-full shadow-md">
              {dept.name}
            </div>

            {/* Department Head */}
            <PersonCard
              person={dept.head}
              ringColor={dept.color}
              onClick={() => openModal(dept.head)}
            />

            {/* Line */}
            <div className="w-1 h-10 bg-gray-300 rounded-full my-3"></div>

            {/* Members */}
            <div className="flex gap-6">
              {dept.members.map((member, idx) => (
                <PersonCard
                  key={idx}
                  person={member}
                  ringColor={dept.color}
                  onClick={() => openModal(member)}
                />
              ))}
            </div>
          </div>
        ))}

      </div>

      {/* ===== MODAL ===== */}
      <Dialog open={open} handler={() => setOpen(false)} size="sm">
        {selected && (
          <>
            <DialogHeader className="justify-center">
              {selected.name}
            </DialogHeader>
            <DialogBody className="text-center">
              <div className="flex justify-center mb-4">
                <img
                  src={selected.img}
                  alt={selected.name}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-indigo-500"
                />
              </div>
              <p className="font-semibold">{selected.role}</p>
              <p className="text-sm text-gray-500 mt-2">
                Detail informasi untuk {selected.name}
              </p>
            </DialogBody>
          </>
        )}
      </Dialog>

      {/* Fade animation */}
      <style>
        {`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
        `}
      </style>
    </div>
  );
}

export default Notifications;
