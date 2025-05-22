import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Container,
  Snackbar,
  Stack,
  Typography,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

import styles from "./index.module.css";
import SwiperProducts from "@/components/SwiperProducts";
import ProductsHome from "@/components/Header/Products/ProductsHome";
import SectionProduct from "@/components/Header/Products/SectionProduct";
import NewsSection from "@/components/Header/Products/NewsSection";
import { useDispatch } from "react-redux";
import { clearCartItemsFromApi } from "@/store/redux/cart/reducer";

const slides = [
  "/src/assets/images/backgroundFashions/banner4.webp",
  "/src/assets/images/backgroundFashions/banner.jpg",
  "/src/assets/images/backgroundFashions/banner2.webp",
  "/src/assets/images/backgroundFashions/banner3.jpg",
];

// Ánh xạ ID danh mục sang đường dẫn ảnh tương ứng
const categoryImages = {
  1: "/src/assets/images/categories/Shirt.jpg", // Quần tây
  2: "/src/assets/images/categories/T-shirt.jpg", // Áo thun
  5: "/src/assets/images/categories/Jacket.jpg", // Áo sơ mi
  6: "/src/assets/images/categories/Shorts.jpg",
  7: "/src/assets/images/categories/quantay.webp",
  8: "/src/assets/images/categories/Accessories.jpg",
};

const Home = () => {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  // Gọi API lấy danh mục khi vào trang
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    fetch(
      "http://222.255.119.40:8080/adamstore/v1/categories?pageNo=1&pageSize=10",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Gửi token ở đây
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA FETCHED:", data);
        setCategories(data.result.items);
      })
      .catch((err) => {
        console.error("Lỗi khi fetch màu sắc:", err);
      });
  }, []);

  // Hiển thị snackbar khi đăng nhập thành công
  useEffect(() => {
    if (location.state?.message) {
      setSnackbar({
        open: true,
        message: location.state.message,
        severity: location.state.severity || "success",
      });
    }
    window.history.replaceState({}, document.title);
  }, [location]);

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  // Xử lý callback VNPAY nếu có
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const responseCode = queryParams.get("vnp_ResponseCode");
    const orderId = queryParams.get("vnp_TxnRef");
    const token = localStorage.getItem("accessToken");
    if (responseCode === "00" && orderId) {
      fetch("http://222.255.119.40:8080/adamstore/v1/orders/vn-pay-callback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          responseCode: responseCode,
          orderId: Number(orderId),
        }),
      })
        .then(async (res) => {
          const text = await res.text(); // lấy raw text
          console.log("↩️ Response status:", res.status);
          console.log("↩️ Response text:", text);

          try {
            const json = JSON.parse(text);
            console.log("✅ Parsed JSON:", json);
            setSnackbar({
              open: true,
              message: "Thanh toán thành công!",
              severity: "success",
            });
            dispatch(clearCartItemsFromApi());
          } catch (error) {
            console.error("❌ Không parse được JSON:", error);
            setSnackbar({
              open: true,
              message: "Lỗi phản hồi từ server khi xác nhận thanh toán.",
              severity: "error",
            });
          }
        })
        .catch((error) => {
          console.error("❌ Lỗi callback thanh toán:", error);
          setSnackbar({
            open: true,
            message: "Lỗi không thể kết nối callback.",
            severity: "error",
          });
        });

      // Xoá query params để tránh xử lý lại nếu reload
      window.history.replaceState({}, document.title, "/");
    }
  }, [location.search]);

  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "right", horizontal: "right" }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          variant="filled"
          sx={{ width: "100%", p: "10px 20px" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: true }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        style={{ width: "100%", height: "600px", color: "#fff" }}>
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
              src={slide}
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <Typography
        sx={{
          textAlign: "center",
          marginTop: "20px",
          fontSize: "30px",
          fontWeight: "bold",
        }}
        variant="body1">
        Sản phẩm nổi bật
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <ProductsHome />
      </Box>
      <SectionProduct />
      <NewsSection />
    </>
  );
};

export default Home;
