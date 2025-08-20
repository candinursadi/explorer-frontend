import type { FolderRepository } from '../../domain/repositories/FolderRepository';
import { FolderRepositoryImpl } from '../../infrastructure/repositories/FolderRepositoryImpl';

// Inversion-of-control friendly: swap implementation here or via DI
const repo: FolderRepository = new FolderRepositoryImpl();

export const FolderService = {
    getRootFolders: (page?: number, limit?: number) => repo.getRootFolders(page, limit),
    getSubFolders: (id: string, page?: number, limit?: number) => repo.getSubFolders(id, page, limit),
    getFiles: (id: string, page?: number, limit?: number) => repo.getFiles(id, page, limit),
    getContents: (id: string, page?: number, limit?: number) => repo.getContents(id, page, limit)
    
};