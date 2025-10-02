'use client';

import { useCallback, useState } from 'react';


export default function FileUploader({ onFilesLoaded }: any) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDirectoryUpload = useCallback(async (e: any) => {
        const files = e.target.files;
        setLoading(true);
        setError(null);
        try {
            onFilesLoaded(files as unknown as { [key: string]: string });
        } catch (err) {
            setError('Failed to parse directory. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [onFilesLoaded]);

    return (
        <div className="w-full max-w-2xl mx-auto p-8 bg-zinc-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-gray-100">
                Upload Your React/Next.js Project
            </h2>

            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-400 text-sm">{error}</p>
                </div>
            )}

            <div className="space-y-4">
                <div className="text-center text-gray-500 font-medium">OR</div>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
                    <label className="cursor-pointer block">
                        <input
                            type="file"
                            webkitdirectory=""
                            directory=""
                            multiple
                            onChange={handleDirectoryUpload}
                            disabled={loading}
                            className="hidden"
                        />
                        <div className="space-y-2">
                            <svg className="w-12 h-12 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                            </svg>
                            <p className="text-lg font-medium text-gray-700">
                                {loading ? 'Loading...' : 'Upload Project Folder'}
                            </p>
                            <p className="text-sm text-gray-500">Click to select a folder</p>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    );
}