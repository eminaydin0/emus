// src/Home.js

import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <Flex direction="column" align="center" justify="center" mt={10}>
      <Heading mb={6}>Ana Sayfa</Heading>
      <Box>
        <Button as={Link} to="/login" colorScheme="blue" mr={4}>
          Giriş Yap
        </Button>
        <Button as={Link} to="/signup" colorScheme="green">
          Kaydol
        </Button>
      </Box>
    </Flex>
  );
}

export default Home;
