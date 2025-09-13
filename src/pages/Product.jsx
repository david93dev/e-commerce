import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import HeaderProductPage from "@/components/HeaderProductPage";
import ProductList from "@/components/Products";
import AddToCartButton from "@/components/AddToCartButton";
import { toast } from "sonner"


const sizes = ["P", "M", "G", "GG"];

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setSelectedSize(null); // reset ao trocar de produto
      } catch (error) {

        toast.error("Erro ao carregar produto", error)
        
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

  const priceBRL = Number(product.price).toFixed(2);

  return (
    <div className="bg-[#f7f7f8]">
      <HeaderProductPage />
      <div className="flex flex-col justify-center items-center">
        <div className="mb-20 mt-8 w-7xl">
          <h1 className="scroll-m-20 text-left text-4xl font-extrabold tracking-tight text-balance">
            Detalhes do produto
          </h1>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 mb-20 px-5">
          {/* Imagem */}
          <div className="flex items-center justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="w-full max-w-sm object-contain"
            />
          </div>

          {/* Infos */}
          <div className="flex flex-col justify-between max-w-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                {product.title}
              </h1>

              <p className="text-gray-600 mb-4">{product.description}</p>

              <p className="text-lg font-semibold text-gray-700 mb-2">
                Categoria: <span className="capitalize">{product.category}</span>
              </p>

              <p className="text-2xl font-bold text-green-600 mb-6">
                R$ {priceBRL}
              </p>

              {/* Tamanhos */}
              <div className="mb-6">
                <span className="text-sm text-gray-500 block mb-2">Tamanho</span>
                <div className="flex gap-2">
                  {sizes.map((size) => {
                    const active = selectedSize === size;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={[
                          "px-3 py-1 border rounded text-sm transition",
                          active
                            ? "bg-black text-white border-black"
                            : "hover:bg-gray-100",
                        ].join(" ")}
                        aria-pressed={active}
                        aria-label={`Selecionar tamanho ${size}`}
                      >
                        {size}
                      </button>
                    );
                  })}
                </div>
                {/* dica de validação */}
                {!selectedSize && (
                  <p className="mt-2 text-xs text-gray-500">
                    Selecione um tamanho antes de adicionar ao carrinho.
                  </p>
                )}
              </div>
            </div>

            {/* Adicionar ao carrinho */}
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                image: product.image,
                price: Number(product.price),
              }}
              size={selectedSize} // será salvo junto ao item no carrinho
              qty={1}
              openOnAdd={true}
            />
          </div>
        </div>
      </div>

      <ProductList title={"Outros Produtos"} />
    </div>
  );
};

export default Product;
