import type { Metadata } from 'next';
import { DonationContent } from '@/components/donar/donation-content';

export const metadata: Metadata = {
  title: 'Doná al proyecto — JobTracker',
  description:
    'Apoyá JobTracker con Cafecito o Mercado Pago para mantener la infraestructura y el desarrollo.',
};

export default function DashboardDonatePage() {
  return <DonationContent backHref="/dashboard" />;
}
