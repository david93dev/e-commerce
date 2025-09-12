import { Input } from "@/components/ui/input";
import { CiHeart } from "react-icons/ci";
import { IoCartOutline } from "react-icons/io5";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";

const Home = () => {
  return (
    <div>
      <header>
        <div className="flex justify-center items-center bg-black w-full text-white py-2">
          <h3>
            Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!{" "}
            <span className="underline">ShopNow</span>
          </h3>
        </div>
        <div className="flex justify-between items-center px-24 my-8 border-b pb-8">
          <div>
            <span className="text-2xl font-bold">E-commerce</span>
          </div>
          <div className="">
            <ul className="flex justify-center items-center gap-5 underline">
              <li>Home</li>
              <li>Contato</li>
              <li>Sobre Nós</li>
              <li>Cadastre-se</li>
            </ul>
          </div>
          <div className="flex justify-center items-center gap-2">
            <Input placeholder={`Pesquise Aqui`} />
            <CiHeart className="size-8" />
            <IoCartOutline className="size-8" />
          </div>
        </div>
      </header>
      <main>
        <div className="flex justify-around items-center">
          <div className="border border-r-black">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                   <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                   <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                   <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                   <NavigationMenuItem>
                  <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavigationMenuLink>Link</NavigationMenuLink>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <Carousel>
            <CarouselContent className={"h-94 w-2xl"}>
              <CarouselItem>
                <img
                  src="https://cdn.pixabay.com/photo/2017/10/29/17/31/online-2900303_1280.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.pixabay.com/photo/2019/10/07/12/08/online-shopping-4532460_1280.jpg"
                  alt=""
                />
              </CarouselItem>
              <CarouselItem>
                <img
                  src="https://cdn.pixabay.com/photo/2019/02/16/14/19/shopping-4000414_1280.jpg"
                  alt=""
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </main>
    </div>
  );
};

export default Home;
