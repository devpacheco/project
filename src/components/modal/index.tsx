"use client"

//IMPORTS DE CONTEXT
import { MouseEventHandler, useContext, useRef, MouseEvent } from "react"
import { ModalContext } from "@/providers/modal"

export function ModalTicket(){
    const { handleModalVisible, ticket } = useContext(ModalContext);
    const modalRef = useRef<HTMLDivElement | null>(null);

    const handleModalClick = (e: MouseEvent<HTMLDivElement>) => {
        if(modalRef.current && !modalRef.current.contains(e.target as Node)){
            handleModalVisible();
        }
    }

    return(
        <div className="absolute bg-gray-900/80 w-full min-h-screen" onClick={handleModalClick}>
            <div className="absolute inset-0 flex justify-center items-center">{/* INÍCIO DA RESIZE */}
                <div ref={modalRef} className="bg-white shadow-lg w-4/5 md:w-1/2 max-w-2xl p-3 rounded">{/* INÍCIO DO CONTEUDO */}
                    
                    <div className="flex items-center justify-between mb-4">{/* TITLE MODAL */}
                        <h1 className="font-bold text-lg md:text-2xl">Detalhes do chamado</h1>
                        <button
                        onClick={handleModalVisible} 
                        className="bg-red-500 p-1 px-2 text-white rounded">
                            Fechar
                        </button>
                    </div>{/* FIM DO TITLE MODAL */}

                    <div className="flex flex-wrap gap-1 mb-2">{/* NOME DO TICKET */}
                        <h2 className="font-bold">Nome:</h2>
                        <p> {ticket?.ticket.name} </p>
                    </div>{/* FIM NOME DO TICKET */}

                    <div className="flex flex-wrap flex-col gap-1 mb-2">{/* DESCRIPTION DO TICKET */}
                        <h2 className="font-bold">Descrição:</h2>
                        <p> {ticket?.ticket.description} </p>
                    </div>{/* FIM DESCRIPTION DO TICKET */}
                    
                    <div className="w-full border-b-[2px] my-4"></div>
                    {/* INÍCIO DE DETALHES DO CLIENTE */}
                    <h1 className="font-bold text-lg mb-4">Detalhes do cliente</h1>

                    <div className="flex flex-wrap gap-1 mb-2">{/* NOME DO CLIENTE */}
                        <h2 className="font-bold">Nome:</h2>
                        <p>{ticket?.customer?.name}</p>
                    </div>{/* FIM NOME DO CLIENTE */}

                    <div className="flex flex-wrap gap-1 mb-2">{/* PHONE DO CLIENTE */}
                        <h2 className="font-bold">Telefone:</h2>
                        <p>{ticket?.customer?.phone}</p>
                    </div>{/* FIM PHONE DO CLIENTE */}

                    <div className="flex flex-wrap gap-1 mb-2">{/* EMAIL DO CLIENTE */}
                        <h2 className="font-bold">Email:</h2>
                        <p> {ticket?.customer?.email} </p>
                    </div>{/* FIM EMAIL DO CLIENTE */}

                    {/* ADDRESS DO CLIENTE */}
                    {ticket?.customer?.address && (
                    <div className="flex flex-wrap gap-1 mb-2">
                        <h2 className="font-bold">Endereço:</h2>
                        <p> {ticket?.customer?.address} </p>
                    </div>
                    )}
                    {/* FIM ADDRESS DO CLIENTE */}

                </div>{/* FIM DO CONTEUDO */}
            </div>{/* FIM DA RESIZE */}
        </div>
    )
}