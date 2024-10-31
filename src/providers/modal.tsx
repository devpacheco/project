"use client"

//IMPORTS DE FUNCIONALIDADE
import { createContext, ReactNode, useState } from "react"

//IMPORTS DE TIPAGENS
import { TicketProps } from "@/utils/ticket.type"
import { CustomerProps } from "@/utils/customer.type"

//IMPORTS DE COMPONENTS
import { ModalTicket } from "@/components/modal"

interface ModalContextData{
    visable: boolean;
    handleModalVisible: ()=> void;
    ticket: TicketInfo | undefined;
    setDetailTicket: (detail: TicketInfo)=> void;
}

interface TicketInfo {
    ticket: TicketProps;
    customer: CustomerProps | null;
}

export const ModalContext = createContext({} as ModalContextData)

export const ModalProvider = ({children}:{children: ReactNode}) => {
    const [visable, setVisable] = useState(false);
    const [ticket, setTicket] = useState<TicketInfo>()

    function handleModalVisible(){
        setVisable(!visable)
    }

    function setDetailTicket(detail: TicketInfo){
        console.log(detail);
        setTicket(detail)
    }

    return(
        <ModalContext.Provider
         value={{
            visable,
            handleModalVisible,
            ticket,
            setDetailTicket
         }}
         
        >
            {visable && <ModalTicket/>}
            {children}
        </ModalContext.Provider>
    )
}