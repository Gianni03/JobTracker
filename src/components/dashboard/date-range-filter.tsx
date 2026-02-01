'use client';

import * as React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { es } from 'date-fns/locale';

export function DateRangeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentRange = searchParams.get('range') || '30d';
  const currentFrom = searchParams.get('from');

  const [date, setDate] = React.useState<Date | undefined>(
    currentFrom ? new Date(currentFrom) : undefined
  );

  const handleRangeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('range', value);
    if (value !== 'custom') {
      params.delete('from');
    }
    router.push(`?${params.toString()}`);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('range', 'custom');
      params.set('from', format(selectedDate, 'yyyy-MM-dd'));
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Select value={currentRange} onValueChange={handleRangeChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Seleccionar periodo" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="30d">Últimos 30 días</SelectItem>
          <SelectItem value="3m">Últimos 3 meses</SelectItem>
          <SelectItem value="6m">Últimos 6 meses</SelectItem>
          <SelectItem value="1y">Último año</SelectItem>
          <SelectItem value="all">Total (Todo)</SelectItem>
          <SelectItem value="custom">A partir de fecha...</SelectItem>
        </SelectContent>
      </Select>

      {currentRange === 'custom' && (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[240px] justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? (
                format(date, 'PPP', { locale: es })
              ) : (
                <span>Seleccionar fecha</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={handleDateSelect}
              initialFocus
              locale={es}
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}
