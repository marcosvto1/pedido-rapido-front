import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';



const MenuPage = () => {

  const [categories, setCategories] = useState([
    {
      id: 1, title: 'Drinks', image_url: 'https://api.lorem.space/image/drink?w=100&h=100', active: false
    },
    {
      id: 2, title: 'Sanduiches', image_url: 'https://api.lorem.space/image/burger?w=50&h=50', active: true
    },
    {
      id: 3, title: 'Drinks', image_url: 'https://api.lorem.space/image/drink?w=50&h=50', active: false
    },
    {
      id: 4, title: 'Sanduiches', image_url: 'https://api.lorem.space/image/burger?w=50&h=50', active: false
    },
    {
      id: 5, title: 'Drinks', image_url: 'https://api.lorem.space/image/drink?w=50&h=50', active: false
    },
    {
      id: 6, title: 'Sanduiches', image_url: 'https://api.lorem.space/image/burger?w=50&h=50', active: false
    },
    {
      id: 7, title: 'Drinks', image_url: 'https://api.lorem.space/image/drink?w=50&h=50', active: false
    },
    {
      id: 8, title: 'Sanduiches', image_url: 'https://api.lorem.space/image/burger?w=50&h=50', active: false
    }
  ]);

  const handleCategory = (id: number) => {
    const categoriesFiltered = categories.map((item) => ({
      ...item,
      active: item.id === id ? true : false,
    }));
    setCategories([...categoriesFiltered]);
  }

  const renderCategoryItem = (category: { id: number, title: string, image_url: string, active: boolean }) => {
    if (category.active) {
      return <div onClick={() => handleCategory(category.id)} className="bg-black p-4 text-white border-l-2 border-primary flex flex-col justify-center" style={{ wordBreak: 'break-word', fontSize: '10px' }} key={category.id}>
        <img src={category.image_url} className="mask mask-circle" alt={category.title} />
        <div className="mt-3">{category.title}</div>
      </div>
    }
    return <div onClick={() => handleCategory(category.id)} className="bg-base-100  p-4 text-white flex flex-col justify-center " style={{ wordBreak: 'break-word', fontSize: '10px' }} key={category.id}>
      <img src={category.image_url} className="mask mask-circle" alt={category.title} />
      <div className="mt-3">{category.title}</div>
    </div>
  }

  return <div className="flex flex-col ">

    <div className="flex flex-row items-center max-h-full gap-2">
      <div className="categories w-24 md:w-40 bg-base-100 overflow-y-auto text-center mb-1 h-52 min-h-screen border-r-1 border-purple-200">
        {
          categories.map(category => renderCategoryItem(category))
        }
      </div>
      <div className="details w-full max-h-screen flex flex-col justify-center items-center">
        <div className="bg-primary-content w-full h-11 flex  justify-end p-2">
          <span>
            <FontAwesomeIcon icon={faCartShopping} />
          </span>
        </div>
        <div className="w-64 carousel h-full">
          <div id="slide1" className="relative w-full carousel-item">
            <div className="card bg-base-100 shadow-xl">
              <figure><img src="https://api.lorem.space/image/burger?w=250&h=250" alt="Shoes" /></figure>
              <div className="flex flex-col justify-between h-full">
                <div className="flex p-2 text-primary">
                  <h1>X-BURGUER</h1>
                </div>
                <div className="flex p-2 justify-end text-primary font-semibold">
                  <p>R$ 45.45</p>
                </div>
              </div>
            </div>
          </div>
          <div id="slide2" className="relative w-full carousel-item">
            <div className="card bg-base-100 shadow-xl">
              <figure>
                <img src="https://api.lorem.space/image/burger?w=250&h=250" alt="Shoes" />
              </figure>
              <div className="flex flex-col justify-between h-full">
                <div className="flex p-2 text-primary">
                  <h1>X-BURGUER</h1>
                </div>
                <div className="flex p-2 justify-end font-semibold text-primary">
                  <p>R$ 45.45</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


}

export default MenuPage;