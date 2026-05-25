import { useRouter } from 'next/router';
import Products from '../../src/pages/products/Products';
import ProductDetail from '../../src/pages/products/ProductDetail';
import ProductEnquiry from '../../src/pages/products/ProductEnquiry';

export default function ProductsPage() {
  const router = useRouter();
  
  if (!router) return null;
  
  const { path } = router.query;

  // If path is like: /products/category-name (length of 1)
  if (path && path.length === 1) {
    return <Products category={path[0]} />;
  }

  // If path is like: /products/category-name/product-slug (length of 2)
  if (path && path.length === 2) {
    return <ProductDetail category={path[0]} slug={path[1]} />;
  }

  // If path is like: /products/category-name/product-slug/enquire (length of 3)
  if (path && path.length === 3 && path[2] === 'enquire') {
    return <ProductEnquiry category={path[0]} slug={path[1]} />;
  }
  
  return <Products />;
}
