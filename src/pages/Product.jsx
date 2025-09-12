import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import HeaderProductPage from "@/components/HeaderProductPage";
import ProductList from "@/components/Products";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
      } catch (error) {
        console.error("Erro ao carregar produto:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Carregando produto...</p>
      </div>
    );
  }

  return (
    <div className=" bg-[#f7f7f8]">
      <HeaderProductPage />
      <div className="flex flex-col justify-center items-center">
        <div className="mb-20 mt-8 w-7xl" >
            <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
          Detalhes do produto
        </h1>
        </div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 mb-20 px-5">
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-sm object-contain"
            />
          </div>

          <div className="flex flex-col justify-between max-w-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>
              <p className="text-gray-600 mb-4">{product.description}</p>

              <p className="text-lg font-semibold text-gray-700 mb-2">
                Categoria:{" "}
                <span className="capitalize">{product.category}</span>
              </p>

              <p className="text-2xl font-bold text-green-600 mb-6">
                R$ {product.price}
              </p>

              <div className="mb-6">
                <span className="text-sm text-gray-500 block mb-2">
                  Tamanho
                </span>
                <div className="flex gap-2">
                  {["P", "M", "G", "GG"].map((size) => (
                    <button
                      key={size}
                      className="px-3 py-1 border rounded hover:bg-gray-100 text-sm"
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <Button className="w-full md:w-auto">Adicionar ao Carrinho</Button>
          </div>
        </div>
      </div>
      <ProductList title={'Outros Produtos'} />
    </div>
  );
};

export default Product;
