import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusChart } from "@/components/charts/status-chart";
import { MonthlyChart } from "@/components/charts/monthly-chart";
import { ConversionRates } from "@/components/charts/conversion-rates";
import { SankeyChart } from "@/components/charts/sankey-chart";

export default function StatisticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline text-foreground">Estadísticas</h1>
        <p className="text-muted-foreground">Analiza el rendimiento de tus postulaciones</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Flujo de Postulaciones</CardTitle>
        </CardHeader>
        <CardContent>
          <SankeyChart />
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Distribución por Estado</CardTitle>
          </CardHeader>
          <CardContent>
            <StatusChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Postulaciones por Mes</CardTitle>
          </CardHeader>
          <CardContent>
            <MonthlyChart />
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
            <CardTitle>Tasa de Conversión</CardTitle>
        </CardHeader>
        <CardContent>
            <ConversionRates />
        </CardContent>
      </Card>
    </div>
  );
}
