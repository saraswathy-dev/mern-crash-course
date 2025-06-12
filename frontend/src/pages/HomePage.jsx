import { Container, VStack, Link, Text, SimpleGrid } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useProductStore } from "../store/product.js";
import ProductCard from "../components/ProductCard.jsx";

const HomePage = () => {
  const { fetchProcucts, products } = useProductStore();
  useEffect(() => {
    fetchProcucts();
  }, [fetchProcucts]);
  console.log(products);
  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="30"
          fontWeight="bold"
          bgGradient="linear(to-r, cyan.400, blue.500)"
          bgClip="text"
          textAlign="center"
        >
          Current Products
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} w={"full"}>
          {products.length > 0 ? (
            products.map((product) => (
              <ProductCard key={product._id} product={product}></ProductCard>
            ))
          ) : (
            <Text
              fontSize="xl"
              fontWeight="bold"
              color="gray.500"
              textAlign="center"
            >
              No Product found.🙂{""}
              <Link href="/create">
                <Text
                  as="span"
                  color="blue.500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Create a Product
                </Text>
              </Link>
            </Text>
          )}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default HomePage;
