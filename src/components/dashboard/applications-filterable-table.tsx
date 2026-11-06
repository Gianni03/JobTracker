'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';
import type { Application, ApplicationStatus } from '@/lib/definitions';
import {
  filterApplicationsBySearch,
  sortApplications,
  type ApplicationSort,
} from '@/lib/application-filters';
import { bulkChangeStatus, bulkDeleteApplications } from '@/lib/actions';
import { ApplicationsTable } from '@/components/dashboard/applications-table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { trackEvent } from '@/lib/analytics';
import { STATUS_OPTIONS } from '@/lib/status';
import { sub } from 'date-fns';

interface ApplicationsFilterableTableProps {
  initialApplications: Application[];
}

type StatusFilter = 'todos' | ApplicationStatus;
type DateRangeFilter = 'all' | 'week' | '15days' | 'month';

export function ApplicationsFilterableTable({
  initialApplications,
}: ApplicationsFilterableTableProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isBulkPending, startBulkTransition] = useTransition();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('todos');
  const [dateRangeFilter, setDateRangeFilter] =
    useState<DateRangeFilter>('all');
  const [sortBy, setSortBy] = useState<ApplicationSort>('date-desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [bulkStatus, setBulkStatus] = useState<ApplicationStatus>('Entrevista');
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const filteredApplications = useMemo(() => {
    let filtered = [...initialApplications];

    if (statusFilter !== 'todos') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    if (dateRangeFilter !== 'all') {
      const endDate = new Date();
      const startDate =
        dateRangeFilter === 'week'
          ? sub(endDate, { days: 7 })
          : dateRangeFilter === '15days'
            ? sub(endDate, { days: 15 })
            : sub(endDate, { months: 1 });

      filtered = filtered.filter((app) => {
        const appDate = new Date(app.date + 'T00:00:00');
        return appDate >= startDate && appDate <= endDate;
      });
    }

    filtered = filterApplicationsBySearch(filtered, search);

    return sortApplications(filtered, sortBy);
  }, [initialApplications, statusFilter, dateRangeFilter, search, sortBy]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredApplications.length / itemsPerPage),
  );
  const safePage = Math.min(currentPage, totalPages);
  const paginatedApplications = filteredApplications.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage,
  );

  const pageIds = paginatedApplications.map((app) => app.id);
  const allSelected =
    pageIds.length > 0 && pageIds.every((id) => selectedIds.has(id));
  const someSelected = pageIds.some((id) => selectedIds.has(id));

  const clearSelection = () => setSelectedIds(new Set());

  const resetPaginationAndSelection = () => {
    setCurrentPage(1);
    clearSelection();
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedIds((previous) => {
      const next = new Set(previous);
      if (allSelected) {
        pageIds.forEach((id) => next.delete(id));
      } else {
        pageIds.forEach((id) => next.add(id));
      }
      return next;
    });
  };

  const handleBulkStatus = () => {
    if (selectedIds.size === 0 || isBulkPending) return;

    const ids = [...selectedIds];
    startBulkTransition(async () => {
      try {
        const result = await bulkChangeStatus(ids, bulkStatus);
        trackEvent('bulk_change_status', {
          count: ids.length,
          status: bulkStatus,
        });
        toast({
          title: 'Postulaciones actualizadas',
          description: `${result.updated} postulaciones pasaron a ${bulkStatus}.`,
        });
        clearSelection();
        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description:
            'No se pudieron actualizar las postulaciones. Intentá de nuevo.',
          variant: 'destructive',
        });
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedIds.size === 0 || isBulkPending) return;

    const ids = [...selectedIds];
    startBulkTransition(async () => {
      try {
        const result = await bulkDeleteApplications(ids);
        trackEvent('bulk_delete_applications', { count: ids.length });
        toast({
          title: 'Postulaciones eliminadas',
          description: `${result.deleted} postulaciones fueron eliminadas.`,
        });
        clearSelection();
        setBulkDeleteOpen(false);
        router.refresh();
      } catch (error) {
        console.error(error);
        toast({
          title: 'Error',
          description:
            'No se pudieron eliminar las postulaciones. Intentá de nuevo.',
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              resetPaginationAndSelection();
            }}
            placeholder="Buscar empresa o puesto..."
            className="pl-9"
            aria-label="Buscar postulaciones"
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={(value) => {
            setStatusFilter(value as StatusFilter);
            resetPaginationAndSelection();
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            {STATUS_OPTIONS.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={dateRangeFilter}
          onValueChange={(value) => {
            setDateRangeFilter(value as DateRangeFilter);
            resetPaginationAndSelection();
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Filtrar por fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las fechas</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="15days">Últimos 15 días</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortBy}
          onValueChange={(value) => {
            setSortBy(value as ApplicationSort);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Ordenar por" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Más recientes</SelectItem>
            <SelectItem value="date-asc">Más antiguas</SelectItem>
            <SelectItem value="company-asc">Empresa A-Z</SelectItem>
            <SelectItem value="status">Estado</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedIds.size > 0 && (
        <div className="flex flex-wrap items-center gap-2 rounded-xl border bg-muted/40 p-3">
          <span className="mr-auto text-sm font-medium">
            {selectedIds.size} seleccionada
            {selectedIds.size === 1 ? '' : 's'}
          </span>
          <Select
            value={bulkStatus}
            onValueChange={(value) =>
              setBulkStatus(value as ApplicationStatus)
            }
          >
            <SelectTrigger className="h-8 w-[150px]">
              <SelectValue placeholder="Nuevo estado" />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            size="sm"
            onClick={handleBulkStatus}
            disabled={isBulkPending}
          >
            Cambiar estado
          </Button>
          <Button
            size="sm"
            variant="destructive"
            onClick={() => setBulkDeleteOpen(true)}
            disabled={isBulkPending}
          >
            Eliminar
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={clearSelection}
            disabled={isBulkPending}
          >
            Limpiar
          </Button>
        </div>
      )}

      <ApplicationsTable
        applications={paginatedApplications}
        showPagination={true}
        totalApplications={filteredApplications.length}
        currentPage={safePage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(Number(value));
          setCurrentPage(1);
        }}
        from="applications"
        selectable
        selectedIds={selectedIds}
        onToggleSelect={toggleSelect}
        onToggleAll={toggleSelectAll}
        allSelected={allSelected}
        someSelected={someSelected}
        onAfterDelete={clearSelection}
      />

      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              ¿Eliminar {selectedIds.size} postulaciones?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta acción no se puede deshacer. Se eliminarán permanentemente
              las postulaciones seleccionadas y sus datos asociados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isBulkPending}>
              Cancelar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={(event) => {
                event.preventDefault();
                handleBulkDelete();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              disabled={isBulkPending}
            >
              {isBulkPending ? 'Eliminando...' : 'Eliminar'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
