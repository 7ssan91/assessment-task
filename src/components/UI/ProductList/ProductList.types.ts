export interface Product {
    id: string;
    name: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

export interface ProductListProps {
    products: Product[];
    onProductClick?: (productId: string) => void;
}