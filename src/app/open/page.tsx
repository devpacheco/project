"use client"

//IMPORT DE FUNCIONALIDADES
import { useState } from "react"
import { api } from "@/lib/api"

//IMPORTS DE ICONS
import { FiSearch, FiX } from "react-icons/fi"

//IMPORT DE COMPONENTS
import { Input } from "@/components/input"
import { FormTicket } from "./components/FormtTicket"

//IMPORT DO ZOD
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

const schema = z.object({
    email: z.string().email("Digite o email do cliente para localizar").min(1, "o campo email é obrigatorio")
})

type FormData = z.infer<typeof schema>

export interface CustomerDataInfo{
    id: string;
    name: string;
}

export default function OpenTicket(){
    const [customer, setCustomer] = useState<CustomerDataInfo | null>(null);

    const { register, handleSubmit, setValue, setError ,formState: { errors } } = useForm<FormData>({
        resolver: zodResolver(schema)
    })

    function handleClearCustomer(){
        setCustomer(null);
        setValue("email", "")
    }

    async function handleSearchCustomer(data: FormData){
        const response = await api.get("/api/customer", {
            params: {
                email: data.email
            }
        })

        if(response.data === null){
            setError("email", { type: "custom", message: "Ops cliente não foi encontrado!" })
            return;
        }

        setCustomer({
            id: response.data.id,
            name: response.data.name
        })

    }

    return(
        <div className="w-full max-w-2xl mx-auto px-2">
            <h1 className="font-bold text-3xl text-center mt-24">Abrir chamado</h1>

            <main className="flex flex-col mt-4 mb-2">
                {/* INÍCIO DO FORMULÁRIO */}
                    {customer ? (
                        <div className="bg-slate-200 py-3 px-4 rounded-lg border-2 flex items-center justify-between">
                            <p className="text-lg"><strong>Cliente selecionado:</strong> {customer.name} </p>
                            <button 
                            onClick={handleClearCustomer}
                            className=" h-11 px-2 flex items-center justify-center rounded"
                            >
                                <FiX size={30} color="#ff2929" />
                            </button>
                        </div>
                    ) : (
                    <form 
                    onSubmit={handleSubmit(handleSearchCustomer)}
                    className="bg-slate-200 py-3 px-2 rounded-lg border-2"
                    >
                        {/* INÍCIO DA COMPONENTS */}
                        <div className="flex flex-col gap-3">
                            <Input
                                name="email"
                                placeholder="Digite o email do cliente..."
                                type="text"
                                error={ errors.email?.message }
                                register={register}
                            />
    
                            <button className="bg-blue-500 flex flex-row gap-3 px-2 h-11 items-center justify-center text-white font-bold rounded">
                                Procurar clientes
                                <FiSearch size={24} color="#FFFFFF" />
                            </button>
                        </div>
                        {/* FIM DA COMPONENTS */}
                    </form>
                    )}
                {/* FIM DO FORMULÁRIO */}

                    {customer !== null && <FormTicket customer={customer} /> }

            </main>
        </div>
    )
}