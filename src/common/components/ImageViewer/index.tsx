import { Box, Modal } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import React, { useState } from "react";

interface ImageViewerProps {
  urlImage: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ urlImage }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Card sx={{ maxWidth: 345, cursor: "pointer" }} onClick={handleOpen}>
        <CardMedia
          component="img"
          height={50}
          image={urlImage}
          alt="Imagem visualizada"
        />
      </Card>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "auto",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <img src={urlImage} alt="" />
        </Box>
      </Modal>
    </>
  );
};

export default ImageViewer;
