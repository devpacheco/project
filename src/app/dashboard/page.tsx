//IMPORTS DE COMPONENTS
import { Container } from "@/components/container"
import { TicketItem } from "@/app/dashboard/components/ticket"
import { ButtonRefrash } from "./components/button";

//IMPORT DE FUNCIONALIDADES
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import prismaClient from "@/lib/prisma";

export default async function Dashboard(){
    const session = await getServerSession(authOptions)

    if(!session || !session?.user){
        redirect("/")
    }

    const tickets = await prismaClient.ticket.findMany({
        where: {
            status: "ABERTO",
            customer:{
                userId: session.user.id
            }
        },
        include: {
            customer: true,
        },
        orderBy: {
            created_at: "desc"
        }
    })

    console.log(tickets);

    return(
        <Container>
            <main className="mt-9 mb-2">
                {/* INÍCIO BUTTON CHAMADOS */}
                <div className="flex items-center justify-between mb-5">
                    <h1 className="text-3xl font-bold"> Chamados </h1>
                    <div className="flex items-center gap-3">
                        <ButtonRefrash/>
                        <Link href="/dashboard/new" className="bg-blue-500 px-4 py-1 rounded text-white">
                            Abrir chamada
                        </Link>
                    </div>
                </div>
                {/* INÍCIO BUTTON CHAMADOS */}

                {/* INÍCIO DA TABELA */}
                <table className="min-w-full my-2">
                    <thead>
                        <tr>
                            <th className="font-medium text-left pl-1"> CLIENTE </th>
                            <th className="font-medium text-left hidden sm:block"> DATA CADASTRO </th>
                            <th className="font-medium text-left"> STATUS </th>
                            <th className="font-medium text-left"> # </th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket)=>(
                            <TicketItem 
                            key={ticket.id} 
                            customer={ticket.customer}
                            ticket={ticket}
                            />
                        ))}
                    </tbody>
                </table>
                {/* FIM DA TABELA */}

                {tickets.length === 0 && (
                    <h1 className="px-2 md:px-0 text-gray-600"> Nenhum ticket aberto foi encontrado...</h1>
                )}

            </main>
        </Container>
    )
}