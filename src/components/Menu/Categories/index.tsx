import { useState } from "react";
import Logo from '../../../assets/logo.png';


const Categories = ({ onCategorySelect }: { onCategorySelect: (category: number) => void }) => {
  const [categories, setCategories] = useState([
    {
      id: 1, title: 'Entradas', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/7_entradas.png', active: false
    },
    {
      id: 2, title: 'Pratos Principais', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/7_entradas.png', active: true
    },
    {
      id: 3, title: 'Pratos Especiais', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/16_especiais.png', active: false
    },
    {
      id: 4, title: 'Sobremesas', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/9_sobremesas.png', active: false
    },
    {
      id: 5, title: 'Não Alcoólicos', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/5_nao_alcoolicas.png', active: false
    },
    {
      id: 6, title: 'Carta de Vinhos', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/4_vinhos.png', active: false
    },
    {
      id: 7, title: 'Pratos Especiais', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/16_especiais.png', active: false
    },
    {
      id: 8, title: 'Sobremesas', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/9_sobremesas.png', active: false
    },
    {
      id: 9, title: 'Não Alcoólicos', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/5_nao_alcoolicas.png', active: false
    },
    {
      id: 10, title: 'Carta de Vinhos', image_url: 'http://maramobile.com.br/cardapio_site/img/cardapio/4_vinhos.png', active: false
    },
  ]);

  const handleCategory = (id: number) => {
    const categoriesFiltered = categories.map((item) => ({
      ...item,
      active: item.id === id ? true : false,
    }));
    setCategories([...categoriesFiltered]);
    onCategorySelect(id)
  }

  const renderCategoryItem = (category: { id: number, title: string, image_url: string, active: boolean }) => {
    if (category.active) {
      return <div onClick={() => handleCategory(category.id)} className="bg-black p-4  text-white border-l-2 border-primary flex flex-col justify-center" style={{ wordBreak: 'break-word', fontSize: '10px' }} key={category.id}>
        <img src={category.image_url} className="mask mask-circle" alt={category.title} />
        <div className="mt-2">{category.title}</div>
      </div>
    }
    return <div onClick={() => handleCategory(category.id)} className="bg-base-100  hover:bg-base-200 cursor-pointer p-4 text-white flex flex-col justify-center transition ease-in-out" style={{ wordBreak: 'break-word', fontSize: '10px' }} key={category.id}>
      <img src={category.image_url} className="mask mask-circle" alt={category.title} />
      <div className="mt-2 font-medium">{category.title}</div>
    </div>
  }

  return (
    <div className="categories w-24 md:w-36 bg-base-100 overflow-y-auto text-center mb-20 mt-20 h-80 min-h-screen border-r-1 border-purple-200 no-scrollbar">
      <div className="mt-10">
      </div>
      {
        categories.map(category => renderCategoryItem(category))
      }
    </div>
  )
}

export default Categories;