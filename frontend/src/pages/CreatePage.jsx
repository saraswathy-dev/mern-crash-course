import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  VStack,
  Input,
  useColorModeValue,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product.js";
import { useToast } from "@chakra-ui/react";

const CreatePage = () => {
  const toast = useToast();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: 0,
    image: "",
  });
  const { createProduct } = useProductStore();
  const handleAddProduct = async () => {
    const res = await createProduct(newProduct);
    if (!res.success) {
      toast({
        title: "Error",
        description: res.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    } else {
      toast({
        title: "Success",
        description: res.message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    }
    setNewProduct({ name: "", price: 0, image: "" }); // Reset the form after submission
  };

  return (
    <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          p={6}
          rounded={"lg"}
          shadow={"md"}
        >
          <VStack spacing={4}>
            <Input
              placeholder="product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            ></Input>
            <Input
              placeholder="product Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            ></Input>
            <Input
              placeholder="product image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            ></Input>
            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default CreatePage;
