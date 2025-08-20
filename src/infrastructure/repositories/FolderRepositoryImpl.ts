import type { FolderRepository, PaginatedResponse } from '../../domain/repositories/FolderRepository';
import type { Content, Folder } from '../../domain/entities/Folder';
import type { FileEntity } from '../../domain/entities/File';
import { apiGet } from '../http/apiClient';

export class FolderRepositoryImpl implements FolderRepository {
    async getRootFolders(page = 1, limit = 50): Promise<PaginatedResponse<Folder>> {
        const res = await apiGet<Folder[]>(`/folders?page=${page}&limit=${limit}`);
        return { items: res.data, meta: res.meta };
    }

    async getSubFolders(folderId: string, page = 1, limit = 50): Promise<PaginatedResponse<Folder>> {
        const res = await apiGet<Folder[]>(`/folders/${folderId}?page=${page}&limit=${limit}`);
        return { items: res.data, meta: res.meta };
    }

    async getFiles(folderId: string, page = 1, limit = 50): Promise<PaginatedResponse<FileEntity>> {
        const res = await apiGet<FileEntity[]>(`/folders/${folderId}/files?page=${page}&limit=${limit}`);
        return { items: res.data, meta: res.meta };
    }

    async getContents(folderId: string, page = 1, limit = 50): Promise<PaginatedResponse<Content>> {
        const res = await apiGet<Content[]>(`/folders/${folderId}/contents?page=${page}&limit=${limit}`);
        return { items: res.data, meta: res.meta };
    }
}