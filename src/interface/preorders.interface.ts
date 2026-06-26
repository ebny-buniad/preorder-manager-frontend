export interface ICreatePreorder {
    name: string,
    products: number,
    preorderWhen: string;
    startsAt: string;
    endsAt?: string | null;
    status: string;
}

export interface IUpdatePreorder {
    name?: string,
    products?: number,
    preorderWhen?: string;
    startsAt?: string;
    endsAt?: string | null;
    status?: string;
}