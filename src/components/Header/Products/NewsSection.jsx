import React from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
} from "@mui/material";

const newsItems = [
  {
    title: "Màu Nào Hấp Thụ Nhiệt Nhiều Nhất? Cơ Chế Hấp Thụ Nhiệt Của Màu Sắc",
    date: "28/04/2025",
    description:
      "Bạn đã bao giờ thắc mắc vì sao vào mùa hè, mặc áo đen lại khiến bạn cảm thấy nóng hơn so với áo trắng? Tất cả đều li...",
    imageUrl: "src/assets/images/backgroundFashions/news.webp", // Thay bằng link hình ảnh thật
  },

  {
    title: "Phong Cách Layer - Nghệ Thuật Phối Đồ Nhiều Lớp Dẫn Đầu Xu Hướng",
    date: "18/04/2025",
    description:
      "Nếu bạn nghĩ việc mặc nhiều lớp quần áo chỉ dành cho mùa đông thì có lẽ bạn chưa khám phá hết sức hút của phong cách ...",
    imageUrl: "src/assets/images/backgroundFashions/news2.webp", // Thay bằng link hình ảnh thật
  },
  {
    title: "Streetwear Là Gì? Gợi Ý Outfit Streetwear Cá Tính, Năng Động",
    date: "18/04/2025",
    description:
      "Nếu bạn là một tín đồ thời trang, chắc chắn đã từng nghe đến streetwear - phong cách đình đám xuất phát từ văn hóa đô... ",
    imageUrl: "src/assets/images/backgroundFashions/news3.webp", // Thay bằng link hình ảnh thật
  },
];

const NewsSection = () => {
  return (
    <Box sx={{ marginTop: 4, marginBottom: 4 }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", fontWeight: "bold" }}>
        Tin Thời Trang
      </Typography>
      <Grid container spacing={2}>
        {newsItems.map((item, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <Card>
              <Box sx={{ position: "relative" }}>
                <CardMedia
                  component="img"
                  alt={item.title}
                  height="200"
                  image={item.imageUrl}
                  sx={{ width: "100%", objectFit: "cover" }}
                />
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "#333",
                    opacity: 0.5,
                  }}
                />
              </Box>
              <CardContent>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.date}
                </Typography>
                <Typography variant="body2">{item.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default NewsSection;
