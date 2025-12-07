'use server'
import { prisma } from "@/db/prisma";
import { createGroupSchema } from "../validators";
import { auth } from "@/auth.config";

export async function getGroups(session: any) {
    const groups = await prisma.group.findMany({
        where: {
            groupMembers: {
                some: { userId: session?.user?.id }
            }
        },
        include: {
            groupMembers: {
                include: { user: true }
            }
        },
    });
    // console.log(groups) // groups[0].groupMembers[0].user
    return groups;
}

export async function getGroupById(groupId: string) {
    const groups = await prisma.group.findFirst({
        where: { id: groupId as string },
        include: {
            groupMembers: {
                include: { user: true }
            },
            boards: {
                include: {
                    owner: true
                }
            }
        },
    });
    // console.log(groups)
    return groups;
}

export async function createGroup(
    prevState: any,
    formData: FormData
) {
    try {
        const session = await auth();
        const groupName = formData.get('groupName');
        // console.log(session)

        // do not know how to use Zod Validation
        // const group_parsed = createGroupSchema.safeParse(groupName);

        await prisma.group.create({
            data: {
                name: groupName as string,
                createdBy: session?.user?.name as string,
                groupMembers: {
                    create: {
                        userId: session?.user?.id as string,
                    }
                },
                boards: {
                    create: {
                        ownerId: session?.user?.id as string
                    }
                }
            }
        })
        return { success: true, message: "Group created successfully." }
    }
    catch (error: any) {
        if (error.errors) {
            return { success: false, message: error.errors[0].message };
        }
        return { success: false, message: "Failed to create group. Try again.", error };
    }
}

export async function joinGroup(
    prevState: any,
    formData: FormData
) {
    try {
        const session = await auth();

        const groupMember = await prisma.groupMember.create({
            data: {
                groupId: formData.get('groupId') as string,
                userId: session?.user?.id as string
            }
        })
        await prisma.board.create({
            data: {
                groupId: groupMember.groupId,
                ownerId: groupMember.userId
            }
        })
        return { success: true, message: "Group joined successfully." }
    }
    catch (error) {
        return { success: false, message: "Failed to create group. Try again.", error };
    }
}