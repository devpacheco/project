"use client";

//IMPORTS DO HOOK FORM
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//IMPORTS DE COMPONENTS
import { Input } from "@/components/input";

//IMPORTS DE FUNCIONALIDADES
import { useRouter } from "next/navigation";
import { api } from "@/lib/api"

const schema = z.object({
    name: z.string().min(1, "O campo nome é obrigatório"),
    email: z.string().email("Digite um email valido").min(1, "O Email é obrigatório"),
    phone: z.string().refine((value)=>{
        return /^(?:\(\d{2}\)\s?)\d{9}$/.test(value) || /^\d{2}\s\d{9}$/.test(value) || /^\d{11}$/.test(value)
    }, {
        message: "O Número de Telefone deve estar (DD) 999999999"
    }),
    address: z.string(),
})

type FormData = z.infer<typeof schema>

export function NewCustomerForm({userId}:{userId: string}){
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
        resolver: zodResolver(schema)
    })
    const router = useRouter();

    //INÍCIO DE REGISTER
    async function handleRegiterCustomer(data: FormData){
        const response = await api.post("/api/customer",{
            name: data.name,
            phone: data.phone,
            email: data.email,
            address: data.address,
            userId: userId
        })
        reset();
        router.refresh();
        router.replace("/dashboard/customer")
    }


    return(
        <form 
        onSubmit={handleSubmit(handleRegiterCustomer)}
        className="flex flex-col mt-6 "
        >
            {/* NAME */}
            <label className="mb-1 text-lg font-medium">Nome completo</label>
            <Input
                type="text"
                name="name"
                placeholder="Digite o nome completo"
                error={errors.name?.message}
                register={register}
            />{/* FIM NAME */}
            {/* RESIZE PHONE E EMAIL */}
            <section className="flex gap-2 my-2 flex-col sm:flex-row">
                {/* PHONE */}
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Telefone</label>
                    <Input
                        type="number"
                        name="phone"
                        placeholder="Exemplo (DD) 991019000"
                        error={errors.phone?.message}
                        register={register}
                    />
                </div>{/* FIM PHONE */}
                {/* EMAILS */}
                <div className="flex-1">
                    <label className="mb-1 text-lg font-medium">Email</label>
                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite o email..."
                        error={errors.email?.message}
                        register={register}
                    />
                </div>
                {/* FIM EMAIL */}
            </section>{/* FINAL RESIZE PHONE E EMAIL */}
            {/* ADDRESS */}
            <label className="mb-1 text-lg font-medium">Endereço completo</label>
            <Input
                type="text"
                name="address"
                placeholder="Digite o endereço do cliente..."
                error={errors.address?.message}
                register={register}
            />{/* FIM ADDRESS */}

            <button 
            type="submit"
            className="bg-blue-500 my-4 px-2 h-11 rounded text-white font-bold"
            >
                Cadastrar
            </button>

        </form>
    )
}