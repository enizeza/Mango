import { useParams } from 'react-router-dom';
import data from './data';

function ProductScreen() {
  const params = useParams();
  const { slug } = params;

  let found = data.products.find((product) => product.slug === slug);

  return (
    // Da implementare interfaccia grafica del prodotto
    <div>
      <h1>{found.name}</h1>
      <h1>{found.price}</h1>
    </div>
  );
}
export default ProductScreen;
