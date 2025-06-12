import {
  Heading,
  HStack,
  IconButton,
  Box,
  Image,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Input,
  Button,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product.js";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.800", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const toast = useToast();
  const [updateProduct, setUpdateProduct] = useState(product);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { deleteProducts, updateProducts } = useProductStore();

  const handleUpdate = async () => {
    const { success, message } = await updateProducts(
      product._id,
      updateProduct
    );
    if (success) {
      toast({
        title: "Product Updated",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose(); // Close the modal after deletion
  };
  const handleDelete = async (id) => {
    const { success, message } = await deleteProducts(id);
    if (success) {
      toast({
        title: "Product Deleted",
        description: message,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      ></Image>
      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price.toFixed(2)}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<FaRegEdit />}
            colorScheme="blue"
            onClick={onOpen}
          ></IconButton>
          <IconButton
            icon={<RiDeleteBin5Line />}
            colorScheme="red"
            onClick={() => {
              handleDelete(product._id);
              console.log(`Delete product with id: ${product._id}`);
            }}
          ></IconButton>
        </HStack>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Modal Title</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                placeholder="product Name"
                name="name"
                mb={1}
                value={updateProduct.name}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, name: e.target.value })
                }
              ></Input>
              <Input
                placeholder="product Price"
                name="price"
                mb={1}
                value={updateProduct.price}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, price: e.target.value })
                }
              ></Input>
              <Input
                placeholder="product image URL"
                name="image"
                value={updateProduct.image}
                onChange={(e) =>
                  setUpdateProduct({ ...updateProduct, image: e.target.value })
                }
              ></Input>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdate}>
                Update Product
              </Button>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </Box>
  );
};

export default ProductCard;
