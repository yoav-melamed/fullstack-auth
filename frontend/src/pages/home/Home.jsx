import { useState, useEffect } from "react";
import { Typography, Button, Box } from "@mui/material";
import axios from "axios";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    const getContent = async () => {
      try {
        const result = await axios.get("http://localhost:3001/api/content", {
          withCredentials: true,
        });
        setContent(result.data.content);
      } catch (ex) {
        setContent("ERROR LOADING DATA");
      }
    };

    if (!content) getContent();
  }, [content]);

  const handleRefreshClicked = () => {
    setContent("");
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography>{content}</Typography>
      <Button onClick={handleRefreshClicked}>Refresh</Button>
    </Box>
  );
};

export default Home;
