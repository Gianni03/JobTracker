import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface ResourceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    href: string;
}

export function ResourceCard({ title, description, icon, href }: ResourceCardProps) {
    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    {icon}
                </div>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
                <CardDescription className="flex-1">{description}</CardDescription>
                <Link href={href} className="mt-4 text-sm font-medium text-primary hover:underline flex items-center">
                    Ver recursos
                    <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </CardContent>
        </Card>
    );
}
