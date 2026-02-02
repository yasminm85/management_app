import React, { useState } from "react";
import {
  Card,
  CardBody,
  Typography,
  IconButton,
  Chip,
} from "@material-tailwind/react";
import {
  ChevronRightIcon,
  ChevronDownIcon,
  FolderIcon,
  DocumentTextIcon,
  MusicalNoteIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export function StrukturFile() {
  const treeData = [
    {
      id: "1",
      name: "Audit",
      type: "folder",
      icon: FolderIcon,
      color: "blue",
      children: [
        {
          id: "1-1",
          name: "Operasional",
          type: "folder",
          icon: FolderIcon,
          color: "purple",
          children: [
            {
              id: "1-1-1",
              name: "Cabang A",
              type: "folder",
              icon: FolderIcon,
              color: "pink",
              children: [
                {
                  id: "1-1-1-1",
                  name: "Perencanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-1-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-1-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                }
              ]
            },
            {
              id: "1-1-2",
              name: "Cabang B",
              type: "folder",
              icon: FolderIcon,
              color: "brown",
              children: [
                {
                  id: "1-1-2-1",
                  name: "Perencanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-2-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-2-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                }
              ]
            },
            {
              id: "1-1-3",
              name: "Cabang C",
              type: "folder",
              icon: FolderIcon,
              color: "green",
              children: [
                {
                  id: "1-1-3-1",
                  name: "Perencanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-3-2",
                  name: "Pelaksanaan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                },
                {
                  id: "1-1-3-3",
                  name: "Pelaporan",
                  type: "folder",
                  icon: FolderIcon,
                  color: "purple",
                  children: [
                    { id: "1-1-1", name: "Project Proposal.docx", type: "file", icon: DocumentTextIcon, size: "2.4 MB" },
                    { id: "1-1-2", name: "Budget 2024.xlsx", type: "file", icon: DocumentTextIcon, size: "856 KB" },
                    { id: "1-1-3", name: "Presentation.pptx", type: "file", icon: DocumentTextIcon, size: "5.2 MB" },
                  ]
                }
              ]
            },
          ]
        },
        {
          id: "1-2",
          name: "Tematik",
          type: "folder",
          icon: FolderIcon,
          color: "green",
          children: [
            {
              id: "1-2-1",
              name: "Fokus A",
              type: "folder",
              icon: FolderIcon,
              color: "purple",
            },
            {
              id: "1-2-2",
              name: "Fokus B",
              type: "folder",
              icon: FolderIcon,
              color: "red",
            },
            {
              id: "1-2-3",
              name: "Fokus C",
              type: "folder",
              icon: FolderIcon,
              color: "black",
            },
          ]
        },
        {
          id: "1-3",
          name: "Investigasi",
          type: "folder",
          icon: FolderIcon,
          color: "orange",
          children: [
            {
              id: "1-3-1",
              name: "Infestasi A",
              type: "folder",
              icon: FolderIcon,
              color: "purple",
            },
            {
              id: "1-3-2",
              name: "Infestasi B",
              type: "folder",
              icon: FolderIcon,
              color: "red",
            },
            {
              id: "1-3-3",
              name: "Infestasi C",
              type: "folder",
              icon: FolderIcon,
              color: "black",
            },
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Review/Evaluasi",
      type: "folder",
      icon: FolderIcon,
      color: "brown",
      children: [
        {
          id: "2-1",
          name: "Review/Evaluasi 1",
          type: "folder",
          icon: FolderIcon,
          color: "green",
        },
        {
          id: "2-2",
          name: "Review/Evaluasi 2",
          type: "folder",
          icon: FolderIcon,
          color: "blue",
        },
        {
          id: "2-3",
          name: "Review/Evaluasi 3",
          type: "folder",
          icon: FolderIcon,
          color: "orange",
        },
      ]
    },
    {
      id: "3",
      name: "Konsultasi",
      type: "folder",
      icon: FolderIcon,
      color: "pink",
      children: [
        {
          id: "3-1",
          name: "Teknik",
          type: "folder",
          icon: FolderIcon,
          color: "indigo",
        },
        {
          id: "3-2",
          name: "Keuangan",
          type: "folder",
          icon: FolderIcon,
          color: "grey",
        },
        {
          id: "3-3",
          name: "Personalia & Umum",
          type: "folder",
          icon: FolderIcon,
          color: "blue",
        },
        {
          id: "3-4",
          name: "Pengadaan Barang & Jasa",
          type: "folder",
          icon: FolderIcon,
          color: "purple",
        },
        {
          id: "3-5",
          name: "Operasi",
          type: "folder",
          icon: FolderIcon,
          color: "red",
        },
      ]
    },
    {
      id: "4",
      name: "Supporting",
      type: "folder",
      icon: FolderIcon,
      color: "green",
      children: [
        {
          id: "4-1",
          name: "Perencanaan Tahunan",
          type: "folder",
          icon: FolderIcon,
          color: "blue",
          children: [
            {id: "4-1-1",
              name: "RKM",
              type: "folder",
              icon: FolderIcon,
              color: "green",
            },
            {
            id: "4-1-2",
              name: "PKPT",
              type: "folder",
              icon: FolderIcon,
              color: "purple",
            },
            {
            id: "4-1-3",
              name: "KPI",
              type: "folder",
              icon: FolderIcon,
              color: "pink",
            },
          ]
        },
        {
          id: "4-2",
          name: "Pelaporan",
          type: "folder",
          icon: FolderIcon,
          color: "purple",
           children: [
            {
            id: "4-2-1",
              name: "Pelaporan M..",
              type: "folder",
              icon: FolderIcon,
              color: "brown",
            },
            {
            id: "4-2-2",
              name: "Laporan Audit Internal",
              type: "folder",
              icon: FolderIcon,
              color: "orange",
            },
            {
            id: "4-2-3",
              name: "Laporan WBS",
              type: "folder",
              icon: FolderIcon,
              color: "blue",
            },
          ]
        },
      ]
    },
  ];

  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const expandAll = () => {
    const allIds = {};
    const collectIds = (nodes) => {
      nodes.forEach(node => {
        if (node.children && node.children.length > 0) {
          allIds[node.id] = true;
          collectIds(node.children);
        }
      });
    };
    collectIds(treeData);
    setExpanded(allIds);
  };

  const collapseAll = () => {
    setExpanded({});
  };

  const TreeNode = ({ node, level = 0 }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expanded[node.id];
    const Icon = node.icon;

    return (
      <div className="select-none">
        {/* Node Item */}
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors group"
          style={{ paddingLeft: `${level * 24 + 12}px` }}
          onClick={() => hasChildren && toggleExpand(node.id)}
        >
          {/* Expand/Collapse Icon */}
          {hasChildren ? (
            <div className="flex-shrink-0">
              {isExpanded ? (
                <ChevronDownIcon className="w-5 h-5 text-gray-600" />
              ) : (
                <ChevronRightIcon className="w-5 h-5 text-gray-600" />
              )}
            </div>
          ) : (
            <div className="w-5" />
          )}

          {/* Item Icon */}
          <Icon className={`w-5 h-5 text-${node.color || 'gray'}-500 flex-shrink-0`} />

          {/* Item Name */}
          <Typography className="flex-1 text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
            {node.name}
          </Typography>

          {/* File Size */}
          {node.size && (
            <Chip
              value={node.size}
              size="sm"
              className="bg-gray-100 text-gray-600 font-normal"
            />
          )}

          {/* Children Count */}
          {hasChildren && (
            <Chip
              value={node.children.length}
              size="sm"
              className={`bg-${node.color || 'gray'}-50 text-${node.color || 'gray'}-600`}
            />
          )}
        </div>

        {/* Children */}
        {hasChildren && isExpanded && (
          <div className="border-l-2 border-gray-200 ml-4">
            {node.children.map(child => (
              <TreeNode key={child.id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-8 mb-8 flex flex-col gap-6">
      <Card>
        <CardBody className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <div>
              <Typography variant="h4" color="blue-gray" className="font-bold">
                File Explorer
              </Typography>

            </div>
            <div className="flex gap-2">
              <IconButton
                variant="outlined"
                size="sm"
                onClick={expandAll}
                className="border-gray-300"
              >
                <ChevronDownIcon className="w-4 h-4" />
              </IconButton>
              <IconButton
                variant="outlined"
                size="sm"
                onClick={collapseAll}
                className="border-gray-300"
              >
                <ChevronRightIcon className="w-4 h-4" />
              </IconButton>
            </div>
          </div>

          {/* Tree View */}
          <div className="space-y-1">
            {treeData.map(node => (
              <TreeNode key={node.id} node={node} />
            ))}
          </div>

          {/* Stats */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <FolderIcon className="w-4 h-4" />
                <span>3 Folders</span>
              </div>
              <div className="flex items-center gap-2">
                <DocumentTextIcon className="w-4 h-4" />
                <span>15 Files</span>
              </div>
              <div className="flex items-center gap-2">
                <ArchiveBoxIcon className="w-4 h-4" />
                <span>2.1 GB Total</span>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default StrukturFile;