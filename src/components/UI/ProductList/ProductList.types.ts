export interface Product {
  id: number;
  tag: string;
  image: string;
  name: string;
  category: string;
  rating: number;
  price: number;
  originalPrice: number;
  quantity: number;
  sku: string;
  description: string;
}
export interface ProductListProps {
  products: Product[];
  onProductClick?: (productId: string) => void;
}
export interface ProductListItemProps {
  product: Product;
  isSending: number | null;
  handleAddToCart: (product: Product) => void;
}
