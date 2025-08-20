export interface Folder {
    id: string;
    name: string;
    parentId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface Content {
    id: string;
    name: string;
    type: "folder" | "file";
    folderId: string;
    createdAt: string;
    updatedAt: string;
}