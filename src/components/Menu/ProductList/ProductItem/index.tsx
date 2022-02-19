import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { IProduct, useOrder } from "../../../../contexts/OrderContext";

type ProductItemProp = {
  product: IProduct
}

const ProductItem = ({product}: ProductItemProp) => {
  const order = useOrder();

  const onAddProductCart = (productId: number) => {
    order.addItemCart({
      product: {
        id: productId,
        name: "Product",
        price: 45.45,
        image_url: 'https://api.lorem.space/image/burger?w=250&h=250',
        category_id: 1
      },
      quantity: 1
    });
    toast.success("Produto adicionado!", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }

  return <>
    <div className="card w-full md:w-full bg-base-100 h-full card-compact shadow-xl border-primary">
      <figure><img src={product.image_url} alt="Shoes" /></figure>
      <div className="card-body">
        <h2 className="card-title text-white">
          {product.name}
        </h2>
        <p></p>
        <div className="justify-between card-actions w-full items-center">
          <button
            className="btn mt-2"
            onClick={() => onAddProductCart(product.id)}
            disabled={order.getCurrentTable()?.order.status === 'in_progress' ? true : false}
          >
            <FontAwesomeIcon icon={faCartPlus} size={'2x'} />
          </button>
          <p className="text-right text-lg font-bold text-white">R$ {product.price.toFixed()}</p>
        </div>
      </div>
    </div>
  </>
}

export default ProductItem;