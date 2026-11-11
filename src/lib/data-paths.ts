import fs from 'fs';
import path from 'path';

export type DataFileName =
    | 'editions.json'
    | 'registrations.json'
    | 'registrations.db'
    | 'coupons.json'
    | 'campaigns.json'
    | 'contacts.json'
    | 'enquiries.json'
    | 'analytics.json'
    | 'admin-config.json';

/**
 * Resolves the canonical path for runtime JSON/SQLite data files inside `/data`,
 * automatically falling back to legacy root paths if present.
 */
export function getDataFilePath(filename: DataFileName): string {
    const cwd = process.cwd();
    const dataDir = path.join(cwd, 'data');
    const canonicalPath = path.join(dataDir, filename);

    if (fs.existsSync(canonicalPath)) {
        return canonicalPath;
    }

    // Legacy fallback names at project root
    const legacyName = filename === 'admin-config.json' ? 'admin_config.json' : filename;
    const legacyPath = path.join(cwd, legacyName);
    if (fs.existsSync(legacyPath)) {
        return legacyPath;
    }

    // Ensure `/data` directory exists for new writes
    if (!fs.existsSync(dataDir)) {
        try {
            fs.mkdirSync(dataDir, { recursive: true });
        } catch {
            // ignore mkdir error in read-only environments
        }
    }

    return canonicalPath;
}
