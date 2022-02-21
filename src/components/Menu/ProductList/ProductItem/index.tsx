import { faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { IProduct, useOrder } from "../../../../contexts/OrderContext";
import { formatCurrency } from "../../../../util/currency";

type ProductItemProp = {
  product: IProduct
}

const ProductItem = ({ product }: ProductItemProp) => {
  const order = useOrder();

  const onAddProductCart = () => {
    order.addItemCart({
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url,
        category_id: product.category_id
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
        <div tabIndex={0} className="collapse">
          <input type="checkbox" />
          <div className="collapse-title text-sm text-white">
            Descrição
          </div>
          <div className="collapse-content">
            <p>{product.description}</p>
          </div>
        </div>
        <div className="justify-between card-actions w-full items-center">
          <button
            className="btn mt-2"
            onClick={() => onAddProductCart()}
            disabled={order.getCurrentTable()?.order.status === 'in_progress' || order.getCurrentTable()?.order.status === 'opened' ? true : false}
          >
            <FontAwesomeIcon icon={faCartPlus} size={'2x'} />
          </button>
          <p className="text-right text-lg font-bold text-white">{formatCurrency(Number(product.price) || 0)}</p>
        </div>
      </div>
    </div>
  </>
}

export default ProductItem;