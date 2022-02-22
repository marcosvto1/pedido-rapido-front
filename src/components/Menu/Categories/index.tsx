import { useCallback, useEffect, useState } from "react";
import { CategoryService } from "../../../services/category";

const Categories = ({ onCategorySelect }: { onCategorySelect: (category: number) => void }) => {
  const [categories, setCategories] = useState<{ id: number, title: string, image_url: string, active: boolean}[]>([]);

  const fetchData = useCallback(async () =>{
    const response = await CategoryService.index()
    const categories = response.categories;
    categories[0].active = true
    setCategories([
      ...categories
    ])
  }, [])

  useEffect(() => {
    fetchData();    
  }, [fetchData]);

  

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
        <img src={category.image_url} className="w-32 mask mask-circle" alt={category.title} />
        <div className="mt-2 text-primary font-semibold">{category.title}</div>
      </div>
    }
    return <div onClick={() => handleCategory(category.id)} className="bg-base-100 hover:bg-base-200 cursor-pointer p-4 text-white flex flex-col justify-center transition ease-in-out" style={{ wordBreak: 'break-word', fontSize: '10px' }} key={category.id}>
      <img src={category.image_url} className="w-32 mask mask-circle" alt={category.title} />
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