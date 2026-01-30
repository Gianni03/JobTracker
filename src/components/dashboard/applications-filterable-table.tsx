'use client';

import { useState, useMemo } from 'react';
import type { Application } from '@/lib/definitions';
import { ApplicationsTable } from '@/components/dashboard/applications-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { sub } from 'date-fns';

interface ApplicationsFilterableTableProps {
  initialApplications: Application[];
}

export function ApplicationsFilterableTable({
  initialApplications,
}: ApplicationsFilterableTableProps) {
  const [statusFilter, setStatusFilter] = useState('todos');
  const [dateRangeFilter, setDateRangeFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredApplications = useMemo(() => {
    let filtered = [...initialApplications];

    // Status filter
    if (statusFilter !== 'todos') {
      filtered = filtered.filter((app) => app.status === statusFilter);
    }

    // Date range filter
    if (dateRangeFilter !== 'all') {
      let startDate: Date;
      const endDate = new Date();
      if (dateRangeFilter === 'week') {
        startDate = sub(endDate, { days: 7 });
      } else if (dateRangeFilter === '15days') {
        startDate = sub(endDate, { days: 15 });
      } else {
        // month
        startDate = sub(endDate, { months: 1 });
      }

      filtered = filtered.filter((app) => {
        const appDate = new Date(app.date + 'T00:00:00');
        return appDate >= startDate && appDate <= endDate;
      });
    }

    return filtered;
  }, [initialApplications, statusFilter, dateRangeFilter]);

  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredApplications.slice(startIndex, endIndex);
  }, [filteredApplications, currentPage, itemsPerPage]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-start space-x-2">
        <Select
          value={statusFilter}
          onValueChange={(statusFilter) => {
            setStatusFilter(statusFilter);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por estado" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos los estados</SelectItem>
            <SelectItem value="Aplicado">Aplicado</SelectItem>
            <SelectItem value="Entrevista">Entrevista</SelectItem>
            <SelectItem value="Oferta">Oferta</SelectItem>
            <SelectItem value="Rechazado">Rechazado</SelectItem>
            <SelectItem value="Ghosted">Ghosted</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={dateRangeFilter}
          onValueChange={(dateRangeFilter) => {
            setDateRangeFilter(dateRangeFilter);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filtrar por fecha" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las fechas</SelectItem>
            <SelectItem value="week">Última semana</SelectItem>
            <SelectItem value="15days">Últimos 15 días</SelectItem>
            <SelectItem value="month">Último mes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ApplicationsTable
        applications={paginatedApplications}
        showPagination={true}
        totalApplications={filteredApplications.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        onItemsPerPageChange={(value) => {
          setItemsPerPage(Number(value));
          setCurrentPage(1);
        }}
        from="applications"
      />
    </div>
  );
}
