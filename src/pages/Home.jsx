import Contact from "@/components/Contact";

import Hero from "@/components/Hero";
import ProductList from "@/components/Products";




const Home = () => {
  return (
    <>
      <Hero />
      <ProductList title={'Nossos Produtos'} category={'all'}/>
      <Contact />
      
    </>
  );
};

export default Home;
