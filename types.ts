
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  images?: string[]; // Array for gallery
  category: string;
  features: string[];
}

export interface OrderFormData {
  fullName: string;
  phone: string;
  wilaya: string;
  baladiya: string;
  address: string;
  deliveryMethod: 'home' | 'yaledine';
}

export interface CartItem extends Product {
  quantity: number;
}
