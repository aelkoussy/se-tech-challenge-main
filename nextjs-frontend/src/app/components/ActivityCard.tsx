"use client";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";

interface ActivityCardProps {
  title: string;
  price: number;
  rating: number;
  special_offer: boolean;
  supplierName: string;
  supplierAddress: string;
}

export const ActivityCard = ({
  title,
  price,
  rating,
  special_offer,
  supplierName,
  supplierAddress,
}: ActivityCardProps) => {
  // Define a fixed height for the title area.
  const TITLE_HEIGHT = 90;

  return (
    <Card
      sx={{
        maxWidth: 345,
        height: 450, // Fixed overall height for consistency
        borderRadius: 2,
        boxShadow: 3,
        transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
        display: "flex",
        flexDirection: "column",
        "&:hover": {
          transform: "scale(1.02)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <CardMedia
          component="img"
          height="180"
          image="https://images.unsplash.com/photo-1735527919007-3ba8d909049e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3"
          alt={title}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            pt: 2,
          }}
        >
          {/* Title container with fixed height */}
          <Box
            sx={{
              height: TITLE_HEIGHT,
              display: "flex",
            }}
          >
            <Typography
              variant="h6"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {title}
            </Typography>
          </Box>

          {/* Rating section */}
          <Box sx={{ mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Rating
                name="read-only"
                value={rating}
                precision={0.5}
                readOnly
                size="small"
              />
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ ml: 0.5 }}
              >
                {rating.toFixed(1)}
              </Typography>
            </Box>
          </Box>

          {/* Price section on its own line */}
          <Box sx={{ mb: 1 }}>
            {special_offer ? (
              <>
                <Typography
                  variant="body1"
                  component="span"
                  color="red"
                  sx={{ fontWeight: "bold", mr: 0.5 }}
                >
                  Special Offer!
                </Typography>
                <Typography variant="body1" component="span" color="red">
                  From: {price} €
                </Typography>
              </>
            ) : (
              <Typography variant="body1" color="text.secondary">
                From: {price} €
              </Typography>
            )}
          </Box>

          {/* Supplier details */}
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Provided by: {supplierName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {supplierAddress}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
