import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';

const STORAGE_PATH = process.env.FILE_STORAGE_PATH || './public/beats';
const MAX_FILE_SIZE = parseInt(process.env.MAX_FILE_SIZE || '314572800'); // 300MB default

export async function ensureStorageDirectory() {
  try {
    await fs.mkdir(STORAGE_PATH, { recursive: true });
  } catch (error) {
    console.error('Error creating storage directory:', error);
    throw error;
  }
}

export function generateSecureToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

export async function saveBeatFile(
  file: Buffer,
  fileName: string,
  beatId: string,
  fileType: 'preview' | 'mp3' | 'wav' | 'midi' | 'stems'
) {
  try {
    // Validate file size
    if (file.length > MAX_FILE_SIZE) {
      throw new Error(`File size exceeds maximum limit of ${MAX_FILE_SIZE} bytes`);
    }

    // Ensure storage directory exists
    await ensureStorageDirectory();

    // Create beat-specific directory
    const beatDir = path.join(STORAGE_PATH, beatId);
    await fs.mkdir(beatDir, { recursive: true });

    // Sanitize filename and create safe path
    const safeName = `${fileType}-${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
    const filePath = path.join(beatDir, safeName);

    // Save file
    await fs.writeFile(filePath, file);

    return {
      filePath: filePath.replace(/\\/g, '/'), // Convert Windows paths to forward slashes
      fileName: safeName,
      size: file.length,
      type: fileType,
      savedAt: new Date(),
    };
  } catch (error) {
    console.error('Error saving beat file:', error);
    throw error;
  }
}

export async function getBeatFile(filePath: string): Promise<Buffer> {
  try {
    // Prevent directory traversal attacks
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(path.normalize(STORAGE_PATH))) {
      throw new Error('Invalid file path');
    }

    return await fs.readFile(normalizedPath);
  } catch (error) {
    console.error('Error reading beat file:', error);
    throw error;
  }
}

export async function deleteBeatFile(filePath: string): Promise<void> {
  try {
    // Prevent directory traversal attacks
    const normalizedPath = path.normalize(filePath);
    if (!normalizedPath.startsWith(path.normalize(STORAGE_PATH))) {
      throw new Error('Invalid file path');
    }

    await fs.unlink(normalizedPath);
  } catch (error) {
    console.error('Error deleting beat file:', error);
    throw error;
  }
}

export async function deleteBeatDirectory(beatId: string): Promise<void> {
  try {
    const beatDir = path.join(STORAGE_PATH, beatId);
    const normalizedPath = path.normalize(beatDir);

    if (!normalizedPath.startsWith(path.normalize(STORAGE_PATH))) {
      throw new Error('Invalid directory path');
    }

    await fs.rm(normalizedPath, { recursive: true, force: true });
  } catch (error) {
    console.error('Error deleting beat directory:', error);
    throw error;
  }
}

export async function listBeatFiles(beatId: string): Promise<string[]> {
  try {
    const beatDir = path.join(STORAGE_PATH, beatId);
    const normalizedPath = path.normalize(beatDir);

    if (!normalizedPath.startsWith(path.normalize(STORAGE_PATH))) {
      throw new Error('Invalid directory path');
    }

    const files = await fs.readdir(beatDir);
    return files;
  } catch (error) {
    if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
      return [];
    }
    console.error('Error listing beat files:', error);
    throw error;
  }
}

export function isValidFileType(fileType: string): boolean {
  const validTypes = ['preview', 'mp3', 'wav', 'midi', 'stems', 'artwork'];
  return validTypes.includes(fileType.toLowerCase());
}

export function getFileExtension(fileType: string): string {
  const extensions: Record<string, string> = {
    preview: '.mp3',
    mp3: '.mp3',
    wav: '.wav',
    midi: '.mid',
    stems: '.zip',
    artwork: '.jpg',
  };
  return extensions[fileType.toLowerCase()] || '.bin';
}
