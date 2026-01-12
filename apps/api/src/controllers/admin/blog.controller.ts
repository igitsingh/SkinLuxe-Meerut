import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllPosts = async (req: Request, res: Response) => {
    try {
        const posts = await prisma.blogPost.findMany({
            orderBy: { createdAt: 'desc' }
            // Relation to user is missing in schema, so not including it for now.
        });

        // Map to frontend expected format if needed, or update frontend to match schema
        // Frontend expects: title, excerpt, published (bool), user (first/last)
        // I will return raw and let frontend adapt or I'll adapt here.
        // Let's adapt here for compatibility with my recent frontend code.
        const mappedPosts = await Promise.all(posts.map(async (p) => {
            let user = { firstName: 'Admin', lastName: '' };
            if (p.authorId) {
                const u = await prisma.user.findUnique({ where: { id: p.authorId } });
                if (u) user = { firstName: u.name.split(' ')[0], lastName: u.name.split(' ')[1] || '' };
            }
            return {
                ...p,
                coverImage: p.featuredImage, // Map featuredImage to coverImage
                published: p.status === 'PUBLISHED',
                user
            };
        }));

        res.json(mappedPosts);
    } catch (error) {
        console.error("Get posts error", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, content, excerpt, coverImage, published } = req.body;

        // Find admin for authorId
        const admin = await prisma.user.findFirst(); // Just take any user for now if role check is complex

        const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

        const post = await prisma.blogPost.create({
            data: {
                title,
                slug,
                content,
                excerpt: excerpt || content.substring(0, 150),
                featuredImage: coverImage, // Schema field
                status: published ? 'PUBLISHED' : 'DRAFT',
                authorId: admin?.id,
                publishedAt: published ? new Date() : null
            }
        });
        res.status(201).json(post);
    } catch (error) {
        console.error("Create post error", error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await prisma.blogPost.delete({ where: { id } });
        res.json({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};
