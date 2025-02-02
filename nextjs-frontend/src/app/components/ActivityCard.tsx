import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

interface ActivityCardProps {
  title: string;
  price: string;
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
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        {/* TODO maybe add more images here */}
        <CardMedia
          component="img"
          height="140"
          image="https://images.unsplash.com/photo-1735527919007-3ba8d909049e?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Rating: {rating}
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: special_offer ? "red" : "text.secondary" }}
          >
            From: {price} €
          </Typography>
          <Typography variant="h6">Provided by: {supplierName}</Typography>
          <Typography variant="h6">Address: {supplierAddress}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
