import { preordersService } from '@/app/services/preorders.service';
import FormHeader from '@/components/form/FormHeader';
import UpdatePreorderForm from '@/components/Preorder/UpdatePreorderForm';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

export default async function UpdatePreorder({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const preorderData = await preordersService.getPreorderBySlug(slug)
    const data = preorderData?.data?.data;

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            <Button
                asChild
                variant="outline"
                className="gap-2 py-5"
            >
                <Link href="/preorders">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Link>
            </Button>

            <div className="rounded-xl border shadow-md">
                <FormHeader />
                <UpdatePreorderForm data={data} />
            </div>
        </div>
    )
}
