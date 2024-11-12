export interface Offer {
  id: number;
  id_company_offer: number;
  id_category_offer: number;
  title_offer: string;
  price_offer: string; // El precio es un string según los datos
  description_offer: string;
  start_date_offer?: string; // Si prefieres un tipo Date, puedes convertirlo después
  end_date_offer?: string;   // Lo mismo para la fecha de fin
  discount_code_offer?: string | null;
  image_offer: string;
  web_offer?: string;
  address_offer?: string | null;
  created_offer?: string;
  updated_offer?: string;
}
