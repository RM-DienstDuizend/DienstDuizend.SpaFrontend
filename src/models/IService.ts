export interface IService {
    id: string,
    businessId: string,
    title: string,
    description: string | null,
    price: number,
    estimatedDurationInMinutes: number,
    isHomeService: boolean;
    isPubliclyVisible: boolean;
}