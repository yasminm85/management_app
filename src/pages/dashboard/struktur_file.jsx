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
  PhotoIcon,
  FilmIcon,
  MusicalNoteIcon,
  CodeBracketIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export function StrukturFile() {
  const treeData = [
    {
      id: "1",
      name: "Perencanaan",
      type: "folder",
      icon: FolderIcon,
      color: "blue",
      children: [
        {
          id: "1-1",
          name: "PT",
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
          id: "1-2",
          name: "PA",
          type: "folder",
          icon: FolderIcon,
          color: "green",
          children: [
            { id: "1-2-1", name: "Resume.pdf", type: "file", icon: DocumentTextIcon, size: "124 KB" },
            { id: "1-2-2", name: "Cover Letter.docx", type: "file", icon: DocumentTextIcon, size: "86 KB" },
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Audit",
      type: "folder",
      icon: FolderIcon,
      color: "pink",
      children: [
        {
          id: "2-1",
          name: "Medan",
          type: "folder",
          icon: FolderIcon,
          color: "orange",
          children: [
            { id: "2-1-1", name: "Perencanaan", type: "folder", icon: FolderIcon, color: "red", children: [{id: "2-1-1-1", name: "PKA", type: "file", icon: DocumentTextIcon}, {id: "2-1-1-2", name: "Proposal Audit", type: "file", icon: DocumentTextIcon}, {id: "2-1-1-3", name: "Surat Tugas", type: "file", icon: DocumentTextIcon}]},
            { id: "2-1-2", name: "Pelaksanaan", type: "folder", icon: FolderIcon, color: "purple", children: []},
            { id: "2-1-3", name: "Pelaporan", type: "folder", icon: FolderIcon, color: "red", children: [{id: "2-1-3-1", name: "LHS", type: "file", icon: DocumentTextIcon}] },
          ]
        },
      ]
    },
    {
      id: "3",
      name: "Revisi/Evaluasi",
      type: "folder",
      icon: FolderIcon,
      color: "red",
      children: [
        { id: "3-1", name: "tutorial.mp4", type: "video", icon: FilmIcon, size: "156 MB" },
        { id: "3-2", name: "presentation.mov", type: "video", icon: FilmIcon, size: "89 MB" },
      ]
    },
    // {
    //   id: "4",
    //   name: "Music",
    //   type: "folder",
    //   icon: FolderIcon,
    //   color: "indigo",
    //   children: [
    //     { id: "4-1", name: "playlist.mp3", type: "audio", icon: MusicalNoteIcon, size: "8.2 MB" },
    //     { id: "4-2", name: "podcast.mp3", type: "audio", icon: MusicalNoteIcon, size: "45 MB" },
    //   ]
    // },
    // {
    //   id: "5",
    //   name: "Projects",
    //   type: "folder",
    //   icon: FolderIcon,
    //   color: "cyan",
    //   children: [
    //     {
    //       id: "5-1",
    //       name: "Website",
    //       type: "folder",
    //       icon: CodeBracketIcon,
    //       color: "teal",
    //       children: [
    //         { id: "5-1-1", name: "index.html", type: "code", icon: CodeBracketIcon, size: "12 KB" },
    //         { id: "5-1-2", name: "style.css", type: "code", icon: CodeBracketIcon, size: "8 KB" },
    //         { id: "5-1-3", name: "script.js", type: "code", icon: CodeBracketIcon, size: "24 KB" },
    //       ]
    //     }
    //   ]
    // },
    // {
    //   id: "6",
    //   name: "Archives",
    //   type: "folder",
    //   icon: FolderIcon,
    //   color: "gray",
    //   children: [
    //     { id: "6-1", name: "backup.zip", type: "archive", icon: ArchiveBoxIcon, size: "1.2 GB" },
    //     { id: "6-2", name: "old_files.tar.gz", type: "archive", icon: ArchiveBoxIcon, size: "856 MB" },
    //   ]
    // }
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