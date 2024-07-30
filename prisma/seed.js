import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

async function seed() {
    try {
        const searches = JSON.parse(await fs.readFile('Searches.json', 'utf8'));
        const createSearches = searches.map(async (item) => {
            const search = await prisma.Searches.findFirst({
                where: {
                    term: item.Terms,
                    searches: item.Searches,
                },
            });
            if (!search) {
                await prisma.Searches.create({
                    data: {
                        term: item.Terms,
                        searches: item.Searches,
                    },
                });
            }
        });

        await Promise.all(createSearches);

        const images = path.join(process.cwd(), '/src/public/imageQuiz/');
        const files = await fs.readdir(images);

        await Promise.all(files.map(async (file) => {
            const match = file.match(/(.+)-(P)\.(jpg)$/);
            if (match) {
                const question = await prisma.questions.create({
                    data: {}
                });
                await prisma.aIImages.create({
                    data: {
                        urlP: `imageQuiz/${file}`,
                        urlI: `imageQuiz/${match[1]}-I.${match[3]}`,
                        questionId: question.id
                    }
                });
            }
        }));

        console.log('Seed data inserted successfully');
    } catch (error) {
        console.error('Error seeding data:', error);
    } finally {
        await prisma.$disconnect();
    }
}

seed();
