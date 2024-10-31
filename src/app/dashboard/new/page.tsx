//IMPORTS DE FUNCIONALIDADES
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

//IMPORT DE COMPONENTS
import { Container } from "@/components/container";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import prismaClient from "@/lib/prisma";

export default async function NewTicket(){
    const session = await getServerSession(authOptions);

    if(!session || !session.user){
        redirect("/")
    }

    const customers = await prismaClient.customer.findMany({
        where: {
            userId: session.user.id
        }
    })

    async function handleRegisterTicket(formData: FormData){
        "use server"

        const name = formData.get("name")
        const description = formData.get("description")
        const customerId = formData.get("customer")

        if(!name || !description || !customerId){
            return;
        }

        await prismaClient.ticket.create({
            data:{
                name: name as string,
                description: description as string,
                customerId: customerId as string,
                status: "ABERTO",
                userId: session?.user.id,
            }
        })

        redirect("/dashboard")

    }

    return(
        <Container>
            <main className="mt-9 mb-2">
                {/* BOTÃO DE VOLTAR + TITLE */}
                <div className="flex items-center gap-3">
                    <Link 
                    className="text-white px-4 py-1 rounded bg-gray-900"
                    href="/dashboard"
                    >
                        voltar
                    </Link>
                    <h1 className="text-3xl font-bold"> Novo chamado </h1>
                </div>
                {/* FINAL BOTÃO DE VOLTAR + TITLE */}

                {/* INÍCIO DO FORM  */}
                <form className="flex flex-col mt-6" action={handleRegisterTicket}>
                    <label className="mb-1 font-medium text-lg">Nome do Chamado</label>
                    <input 
                    className="w-full border-2 rounded-md mb-2 px-2 h-11"
                    type="text" 
                    placeholder="Digite o nome do chamado"
                    required
                    name="name"
                    />

                    <label className="mb-1 font-medium text-lg">Nome do Chamado</label>
                    <textarea 
                    className="w-full border-2 rounded-md mb-2 h-24 p-2 resize-none"
                    placeholder="Descreva o problema..."
                    required
                    name="description"
                    ></textarea>

                    {/* INÍCO DA SELECT */}
                    {customers.length !== 0 && (
                        <>
                            <label className="mb-1 font-medium text-lg">Selecioner o Cliente</label>
                            <select
                            className="w-full border-2 rounded-md px-2 mb-2 h-11 resize-none bg-white"
                            name="customer"
                            >
                                {customers.map((item)=>(
                                    <option 
                                        key={item.id} 
                                        value={item.id}
                                    > 
                                        {item.name} 
                                    </option>
                                ))}
                            </select>
                        </>
                    )}
                    {/* FIM DA SELECT */}

                    {/* INÍCO DO LINK CADASTRO */}
                        {customers.length === 0 &&(
                            <Link href="/dashboard/customer/new">
                                Você ainda não tem nenhum cliente <span className="text-blue-500 font-medium">Cadastrar cliente</span>
                            </Link>
                        )}
                    {/* FIM DO LINK CADASTRO */}

                    <button 
                    type="submit"
                    className="bg-blue-500 text-white font-bold px-1 h-11 rounded-md my-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    disabled={customers.length === 0 ? true : false}
                    >
                        Cadastrar
                    </button>

                </form>
                {/* FIM DO FORM  */}

            </main>
        </Container>
    )
}