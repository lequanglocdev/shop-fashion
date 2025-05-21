import ImageGallery from "react-image-gallery";

import "react-image-gallery/styles/css/image-gallery.css";
import { Skeleton } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./ProductImage.module.css";

const ProductImage = ({ products, loading }) => {
  if (loading) {
    return <Skeleton variant="rectangular" width={"100%"} height={400} />;
  }

  return (
    <div className={styles.wrapper}>
      <ImageGallery
        items={products.images}
        showPlayButton={false}
        showFullscreenButton={false}
        showNav={true}
        thumbnailPosition="left"
        slideDuration={300}
        additionalClass={styles.gallery}
      />
    </div>
  );
};

ProductImage.propTypes = {
  products: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
  }),
  loading: PropTypes.bool,
};

export default ProductImage;
