import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/prismaClient";
import { createIssueSchema } from "./validationSchemas";

type IssueType = {
    title: string,
    description: string
}

export async function POST(request: NextRequest){
    const body: IssueType = await request.json();
    const validation = createIssueSchema.safeParse(body);
    if(!validation.success) return NextResponse.json(validation.error.format(), {status: 400});

    const newIssue = await prisma.issue.create({data: {
        title: body.title,
        description: body.description
    }})
    return NextResponse.json(newIssue, {status: 201})
}