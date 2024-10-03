import Footer from "../../features/common/Footer";
import Navbar from "../../features/navbar/Navbar";
import ProductDetail from "../../features/product/components/ProductDetail";

const ProductDetailPage = () => {
  return (
    <div>
      <Navbar>
        <ProductDetail />
      </Navbar>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
