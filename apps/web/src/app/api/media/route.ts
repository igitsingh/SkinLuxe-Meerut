import { NextRequest, NextResponse } from 'next/server';

// Mock media storage
let media: any[] = [
    {
        id: '1',
        filename: 'hero-main.jpg',
        url: '/hero-main.jpg',
        type: 'IMAGE',
        size: 245000,
        width: 2400,
        height: 800,
        createdAt: new Date().toISOString(),
    },
];

// GET all media
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const search = searchParams.get('search');
        const type = searchParams.get('type');

        let filteredMedia = media;

        if (type && type !== 'ALL') {
            filteredMedia = filteredMedia.filter((m) => m.type === type);
        }

        if (search) {
            filteredMedia = filteredMedia.filter((m) =>
                m.filename.toLowerCase().includes(search.toLowerCase()) ||
                m.alt?.toLowerCase().includes(search.toLowerCase())
            );
        }

        return NextResponse.json({
            success: true,
            data: filteredMedia,
            total: filteredMedia.length,
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to fetch media' },
            { status: 500 }
        );
    }
}

// POST upload media
export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { success: false, error: 'No file provided' },
                { status: 400 }
            );
        }

        // In production, this would upload to storage (S3, Uploadthing, etc.)
        const newMedia = {
            id: Date.now().toString(),
            filename: file.name,
            url: `/uploads/${file.name}`,
            type: file.type.startsWith('image/') ? 'IMAGE' : 'FILE',
            size: file.size,
            mimeType: file.type,
            createdAt: new Date().toISOString(),
        };

        media.push(newMedia);

        return NextResponse.json({
            success: true,
            data: newMedia,
            message: 'File uploaded successfully',
        }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}

// DELETE media
export async function DELETE(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { success: false, error: 'Media ID required' },
                { status: 400 }
            );
        }

        const mediaIndex = media.findIndex((m) => m.id === id);

        if (mediaIndex === -1) {
            return NextResponse.json(
                { success: false, error: 'Media not found' },
                { status: 404 }
            );
        }

        media.splice(mediaIndex, 1);

        return NextResponse.json({
            success: true,
            message: 'Media deleted successfully',
        });
    } catch (error) {
        return NextResponse.json(
            { success: false, error: 'Failed to delete media' },
            { status: 500 }
        );
    }
}
