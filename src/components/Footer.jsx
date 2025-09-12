const Footer = () => {
  return (
    <footer className="bg-white border-t w-full px-6 py-8 flex justify-center">
        <p className="text-xs text-gray-500 text-center md:text-right">
          © {new Date().getFullYear()} Look Horizon. Todos os direitos reservados.
        </p>
    </footer>
  );
};

export default Footer;
