import type { Content, Folder } from '../entities/Folder';
import type { FileEntity } from '../entities/File';

export interface PaginationMeta {
    total: number;
    perPage: number;
    currentPage: number;
    lastPage: number;
}

export interface PaginatedResponse<T> {
    items: T[];
    meta: PaginationMeta;
}

export interface FolderRepository {
    getRootFolders(page?: number, limit?: number): Promise<PaginatedResponse<Folder>>;
    getSubFolders(folderId: string, page?: number, limit?: number): Promise<PaginatedResponse<Folder>>;
    getFiles(folderId: string, page?: number, limit?: number): Promise<PaginatedResponse<FileEntity>>;
    getContents(folderId: string, page?: number, limit?: number): Promise<PaginatedResponse<Content>>;
}