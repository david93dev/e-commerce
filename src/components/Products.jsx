import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom"; 


const ProductList = ({ title }) => {
  const [allProducts, setAllProducts] = useState({ men: [], women: [] });
  const [category, setCategory] = useState("all");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const men = await fetch(
          "https://fakestoreapi.com/products/category/men's clothing"
        ).then((res) => res.json());

        const women = await fetch(
          "https://fakestoreapi.com/products/category/women's clothing"
        ).then((res) => res.json());

        setAllProducts({ men, women });
        setProducts([...men, ...women]);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category === "all") {
      setProducts([...allProducts.men, ...allProducts.women]);
    } else if (category === "men") {
      setProducts(allProducts.men);
    } else if (category === "women") {
      setProducts(allProducts.women);
    }
  }, [category, allProducts]);

  return (
    <div id="produtos" className="w-full mx-auto pb-12 p-6">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 mb-5">
        {title}
      </h2>

      <Tabs value={category} onValueChange={setCategory} className="mb-6">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="men">Masculino</TabsTrigger>
          <TabsTrigger value="women">Feminino</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex overflow-x-auto gap-6 pb-4">
        {products.map((item) => (
          <Link
            key={item.id}
            to={`/products/${item.id}`} 
            className="min-w-[250px] border rounded-lg shadow-sm hover:shadow-md transition bg-white block"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-64 object-contain bg-white p-4"
            />
            <div className="p-4">
              <span className="text-sm text-gray-500">{item.category}</span>
              <h3 className="text-md text-gray-700 font-semibold line-clamp-2">
                {item.title}
              </h3>
              <p className="text-gray-800 text-right font-bold">
                R$ {item.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
