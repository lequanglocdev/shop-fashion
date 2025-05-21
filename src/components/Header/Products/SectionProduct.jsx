import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";

const instagramImages = [
  "/src/assets/images/backgroundFashions/section1.webp",
  "/src/assets/images/backgroundFashions/section2.webp",
  "/src/assets/images/backgroundFashions/section3.webp",
  "/src/assets/images/backgroundFashions/section4.webp",
  "/src/assets/images/backgroundFashions/section5.webp",
];

const SectionProduct = () => {
  return (
    <Box sx={{ mt: 6, mb: 6, textAlign: "center" }}>
      <Typography variant="h6" fontWeight="bold" mb={4}>
        Follow Instagram @Marseille Xstore theme
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        {instagramImages.map((img, index) => (
          <Grid item key={index}>
            <Box
              sx={{
                position: "relative",
                width: 200,
                height: 250,
                overflow: "hidden",
                borderRadius: 1,
                cursor: "pointer",
                "&:hover .img": {
                  opacity: 0.3,
                  transform: "scale(1.05)",
                },
                "&:hover .icon": {
                  opacity: 1,
                },
              }}>
              {/* Hình ảnh */}
              <Box
                component="img"
                src={img}
                alt={`insta-${index}`}
                className="img"
                sx={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  transition: "all 0.4s ease",
                }}
              />

              {/* Icon Instagram */}
              <Box
                className="icon"
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  transition: "opacity 0.3s ease",

                  p: 1,
                }}>
                <InstagramIcon sx={{ fontSize: 30, color: "#000" }} />
              </Box>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SectionProduct;
