import { NextResponse } from "next/server";

//IMPORTS DO USER
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma"

export async function GET(request: Request){
    const { searchParams } = new URL(request.url)
    const customerEmail = searchParams.get("email")

    if(!customerEmail || customerEmail === ""){
        return NextResponse.json({ message: "Customer not found" }, {status: 400})
    }

    try{
        const customer = await prismaClient.customer.findFirst({
            where:{
                email: customerEmail as string
            }
        })
        return NextResponse.json(customer)
    }catch(err){
        return NextResponse.json({ message: "Customer not found" }, {status: 400})
    }

}

//DELETAR CPUSTOMER
export async function DELETE(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session?.user){
        return NextResponse.json({ error: "Not authorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id")

    if(!userId){
        return NextResponse.json({ error: "Failed delete customer" }, { status: 400 })
    }

    const findTickets = await prismaClient.ticket.findFirst({
        where:{
            customerId: userId
        }
    })

    if(findTickets){
        return NextResponse.json({ message: "Failed delete customer" }, {status: 400})
    }
    
    try{
        await prismaClient.customer.delete({
            where: {
                id: userId as string
            }
        })

        return NextResponse.json({ menssage: "Cliente deletado com sucesso!" })

    }catch(err){
        console.log(err)
        return NextResponse.json({ error: "Failed delete customer" }, { status: 400 })
    }


}

//ROTA PARA CADASTRAR CLIENTE
export async function POST(request: Request){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        return NextResponse.json({menssage: "Not authorized"}, {status: 400})
    }

    
    const { name, email, phone, address, userId} = await request.json();

    try{
        await prismaClient.customer.create({
            data: {
                name,
                phone,
                email,
                address: address || "",
                userId: userId,
            }
        })

        return NextResponse.json({ message: "Cliente cadastrado com sucesso!" })

    }catch(err){
        return NextResponse.json({ error: "Failed create new custoer" }, { status: 400 })
    }

}