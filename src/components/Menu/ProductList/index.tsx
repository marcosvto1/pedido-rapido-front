import { useEffect, useState } from "react";
import { IProduct } from "../../../contexts/OrderContext";
import ProductItem from "./ProductItem";
import Logo from '../../../assets/logo.png'
import './style.css'
import { CategoryService } from "../../../services/category";

const ProductList = ({ category }: { category: number }) => {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    setProducts([]);
    setLoading(true);
    (async () => {   
      const response = await CategoryService.getProductByCategory(category)
      setProducts([...response.products])
      setLoading(false)
    })();
  }, [category])


  if (loading) {
    return <div className="menu-loading" >
      <div className="flex">
        <div className="animate-bounce">
          <img src={Logo} width={100} alt="carregando"/>
        </div>
      </div>
    </div>
  }

  return <>
    <div className="ml-24 md:ml-40 overflow-y-auto grid xl:grid-cols-4 md:grid-cols-4 sm:grid-cols-2 p-8 gap-4 place-items-stretch ">
      {products.map((product) => {
        return <ProductItem key={product.id} product={product} />
      })}
    </div>
  </>
}

export default ProductList;