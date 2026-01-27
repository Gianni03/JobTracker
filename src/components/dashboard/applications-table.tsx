"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Application, ApplicationStatus } from "@/lib/definitions";
import { MoreHorizontal, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { useRouter } from "next/navigation";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


const StatusBadge = ({ status, children }: { status: ApplicationStatus, children?: React.ReactNode }) => {
    const variant: { [key in ApplicationStatus]: "default" | "secondary" | "destructive" | "outline" } = {
      "Oferta": "default",
      "Entrevista": "secondary",
      "Aplicado": "secondary",
      "Rechazado": "destructive",
      "Ghosted": "outline",
    };
    const colorClass = {
      "Oferta": "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300",
      "Entrevista": "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300",
      "Aplicado": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300",
      "Rechazado": "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-300 border-red-300",
      "Ghosted": "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-300",
    }
    return <Badge variant={variant[status]} className={`${colorClass[status]} font-normal`}>{children ?? status}</Badge>;
  };

interface ApplicationsTableProps {
    applications: Application[];
    showPagination?: boolean;
    totalApplications?: number;
    currentPage?: number;
    itemsPerPage?: number;
    onPageChange?: (page: number) => void;
    onItemsPerPageChange?: (value: string) => void;
}

export function ApplicationsTable({
    applications,
    showPagination = false,
    totalApplications = 0,
    currentPage = 1,
    itemsPerPage = 10,
    onPageChange = () => {},
    onItemsPerPageChange = () => {},
}: ApplicationsTableProps) {
    const router = useRouter();

    const handleRowClick = (id: string) => {
        router.push(`/dashboard/applications/${id}`);
    }

    const totalPages = Math.ceil(totalApplications / itemsPerPage);

  return (
    <div className="space-y-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Empresa / Puesto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="hidden md:table-cell">Fecha Entrevista</TableHead>
                <TableHead className="hidden md:table-cell">Salarios</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {applications.length > 0 ? (
                applications.map((app: Application) => (
                    <TableRow key={app.id} onClick={() => handleRowClick(app.id)} className="cursor-pointer">
                    <TableCell>
                        <div>
                            <div className="font-medium text-foreground">{app.company}</div>
                            <div className="text-sm text-muted-foreground">{app.role}</div>
                            <div className="text-xs text-muted-foreground">{format(new Date(app.date + "T00:00:00"), "d MMM yyyy", { locale: es })}</div>
                        </div>
                    </TableCell>
                    <TableCell>
                        {app.status === 'Entrevista' && app.interviewStage ? (
                            <div className="flex flex-col items-start gap-1">
                                <StatusBadge status="Entrevista" />
                                <Badge variant="outline" className="font-normal">{app.interviewStage}</Badge>
                            </div>
                        ) : (
                            <StatusBadge status={app.status} />
                        )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        {app.interviewDate ? format(new Date(app.interviewDate), "d MMM yyyy, HH:mm", { locale: es }) : '-'}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                        <div className="text-sm space-y-0.5">
                            <div>
                                <span className="text-muted-foreground">Pretendido: </span>
                                <span className="font-medium text-foreground">
                                    {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 0 }).format(app.salary.desired)}
                                </span>
                            </div>
                            {app.salary.expressed && (
                                <div>
                                    <span className="text-muted-foreground">Expresado: </span>
                                    <span className="font-medium text-foreground">
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 0 }).format(app.salary.expressed)}
                                    </span>
                                </div>
                            )}
                            {app.salary.offer && app.status === 'Oferta' && (
                                <div>
                                    <span className="text-yellow-500">Oferta: </span>
                                    <span className="font-medium text-yellow-500">
                                        {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", notation: "compact", maximumFractionDigits: 0 }).format(app.salary.offer)}
                                    </span>
                                </div>
                            )}
                        </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                                    <span className="sr-only">Abrir menú</span>
                                    <MoreHorizontal className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-destructive" onClick={(e) => {e.stopPropagation(); alert('Funcionalidad de eliminar no implementada.')}}>
                                    <Trash2 className="mr-2 h-4 w-4"/>
                                    Eliminar
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
                    </TableRow>
                ))
            ) : (
                <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                        Todavia no postulaste a ninguna oferta. Animate a hacerlo y éxitos!!!
                    </TableCell>
                </TableRow>
            )}
            </TableBody>
        </Table>
        </div>
        {showPagination && totalPages > 1 && (
            <div className="flex items-center justify-between px-2">
                <div className="text-sm text-muted-foreground">
                    Total de {totalApplications} postulaciones.
                </div>
                <div className="flex items-center space-x-6 lg:space-x-8">
                    <div className="flex items-center space-x-2">
                        <p className="text-sm font-medium">Filas por página</p>
                        <Select
                            value={`${itemsPerPage}`}
                            onValueChange={(value) => onItemsPerPageChange(value)}
                        >
                            <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue placeholder={itemsPerPage} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 15, 20].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`}>
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                        Página {currentPage} de {totalPages}
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            <span className="sr-only">Go to previous page</span>
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="outline"
                            className="h-8 w-8 p-0"
                            onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            <span className="sr-only">Go to next page</span>
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
}
