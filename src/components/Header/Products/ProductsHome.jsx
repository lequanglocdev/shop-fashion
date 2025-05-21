import React, { useState } from "react";
import { useProducts } from "./hooks/useProducts";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Container,
  Box,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";

const ProductsHome = () => {
  const { products, loading } = useProducts();
  const [hoveredId, setHoveredId] = useState(null);
  const [visibleCount, setVisibleCount] = useState(6); // Hiển thị 6 sản phẩm đầu tiên

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // Mỗi lần nhấn, tăng thêm 6 sản phẩm
  };

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;

  return (
    <Container sx={{ m: 4 }}>
      <Grid container spacing={3} justifyContent="center">
        {products.slice(0, visibleCount).map((product) => (
          <Grid item xs={12} sm={6} md={3} key={product.id}>
            <Card
              component={Link}
              to={`/product-detail/${product.id}`}
              sx={{ width: 260, minHeight: 400, textDecoration: "none" }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}>
              <Box
                sx={{
                  width: 260,
                  height: 338,
                  position: "relative",
                  overflow: "hidden",
                }}>
                {/* Ảnh mặc định */}
                <Box
                  component="img"
                  src={product?.images[0]?.imageUrl}
                  alt={product?.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transition: "opacity 0.8s ease-in-out",
                    opacity: hoveredId === product.id ? 0 : 1,
                  }}
                />

                {/* Ảnh khi hover */}
                <Box
                  component="img"
                  src={
                    product?.images[1]?.imageUrl || product?.images[0]?.imageUrl
                  }
                  alt={product.name}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    transition: "opacity 0.5s ease-in-out",
                    opacity: hoveredId === product.id ? 1 : 0,
                  }}
                />
              </Box>

              <CardContent sx={{ textAlign: "start" }}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    textDecoration: "none",
                  }}>
                  {product?.name}
                </Typography>

                <Typography sx={{ fontWeight: 500 }}>
                  {product?.price.toLocaleString("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Nút xem thêm */}
      {visibleCount < products.length && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
          }}>
          <Button
            sx={{
              width: "200px",
              height: "40px",
              backgroundColor: "#fff",
              color: "#333",
              textTransform: "none",
              border: "1px solid",
              "&:hover": {
                backgroundColor: "#333", // Màu khi hover
                color: "#fff", // Màu chữ khi hover
              },
            }}
            onClick={handleLoadMore}>
            Xem thêm
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default ProductsHome;
