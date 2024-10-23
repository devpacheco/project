import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { AuthProvider } from "@/providers/auth";

const Roboto_init = Roboto({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-roboto",
})

export const metadata: Metadata = {
  title: "Dev Controle - Seu sistema de Gerenciamento",
  description: "Gerencie seus clientes e atendimentos de forma fácil",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${Roboto_init.variable} antialiased`}
      >
        <AuthProvider>
          <Header/>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
