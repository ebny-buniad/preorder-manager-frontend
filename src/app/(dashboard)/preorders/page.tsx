import { preordersService } from '@/app/services/preorders.service'
import PreordersList from '@/components/Preorder/PreordersList';
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function Preorders({
    searchParams,
}: {
    searchParams: Promise<{
        status?: string;
        page?: string;
        sortBy?: string;
        sortOrder?: string;
    }>;
}) {

    const params = await searchParams;

    const preorderData =
        await preordersService.getAllPreorders({
            status: params.status,
            page: Number(params.page || 1),
            sortBy: params.sortBy,
            sortOrder: params.sortOrder,
        });

    const data = preorderData?.data?.data?.data || []

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h2 className='text-2xl font-bold'>Preorders</h2>
                <Link href="/create-preorder">
                    <Button>Create Preorder +</Button>
                </Link>
            </div>
            <PreordersList preorderData={data}></PreordersList>
        </div>
    )
}
