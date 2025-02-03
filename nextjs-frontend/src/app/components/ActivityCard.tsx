"use client";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import React from "react";

// Extracted style constants for clarity
const cardStyles = {
  maxWidth: 345,
  height: 400,
  borderRadius: 2,
  boxShadow: 3,
  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
  display: "flex",
  flexDirection: "column",
  "&:hover": {
    transform: "scale(1.02)",
    boxShadow: 6,
  },
};

const titleContainerStyles = {
  height: 75,
  display: "flex",
};

interface ActivityCardProps {
  title: string;
  imageUrl?: string; // optional image URL for flexibility
  price: number;
  rating: number;
  special_offer: boolean;
  supplierName: string;
  supplierAddress: string;
}

/**
 * ActivityCard displays a card with an image, title, rating (stars and numeric value),
 * price information (with special offer indication), and supplier details.
 */
const ActivityCardComponent: React.FC<ActivityCardProps> = ({
  title,
  imageUrl = "https://images.unsplash.com/photo-1735527919007-3ba8d909049e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3",
  price,
  rating,
  special_offer,
  supplierName,
  supplierAddress,
}) => {
  return (
    <Card sx={cardStyles}>
      <CardActionArea
        sx={{ display: "flex", flexDirection: "column", height: "100%" }}
      >
        <CardMedia
          component="img"
          height="180"
          image={imageUrl}
          alt={`Image for ${title}`}
          sx={{ objectFit: "cover" }}
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
          {/* Fixed title area */}
          <Box sx={titleContainerStyles}>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontWeight: "bold",
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

          {/* Price section */}
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
                <Typography
                  variant="body1"
                  component="span"
                  color="red"
                  sx={{ fontWeight: "bold", mr: 0.5 }}
                >
                  From: {price} €
                </Typography>
              </>
            ) : (
              <Typography
                variant="body1"
                color="text.main"
                sx={{ fontWeight: "bold", mr: 0.5 }}
              >
                From: {price} €
              </Typography>
            )}
          </Box>

          {/* Supplier details */}
          <Box>
            <Typography variant="subtitle2" color="text.main">
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

// Wrap in React.memo to avoid unnecessary re-renders if props don't change.
export const ActivityCard = React.memo(ActivityCardComponent);
