import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gerador de Roteiros",
  description: "Transforme ideias em roteiros estruturados com 10 partes e detalhes de personagens."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
          <div className="mx-auto max-w-5xl px-6 py-12">{children}</div>
        </div>
      </body>
    </html>
  );
}
