import { useRouter } from 'next/router';
import Products from '../../src/pages/products/Products';
import ProductDetail from '../../src/pages/products/ProductDetail';

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
  
  return <Products />;
}
