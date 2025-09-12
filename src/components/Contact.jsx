const Contact = () => {
  return (
    <div id="contato" className="flex justify-center items-center w-full mx-auto p-6 bg-gray-200">
      <div className="w-3xl my-24">
        <h2 className="scroll-m-20  pb-2 text-3xl text-center font-semibold tracking-tight first:mt-0 mb-5">
          {" "}
          Fale Conosco
        </h2>
        <p className=" text-center pb-2">
          Tem alguma dúvida sobre nossos produtos, tamanhos ou prazos de
          entrega? Entre em contato com nossa equipe, teremos prazer em ajudar
          você!
        </p>
        <p className="text-center">
          contato@lookhorizon.com |  (11) 99999-9999 | WhatsApp
        </p>
      </div>
    </div>
  );
};

export default Contact;
