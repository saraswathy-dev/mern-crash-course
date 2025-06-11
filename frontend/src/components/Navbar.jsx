import {
  Container,
  Flex,
  Text,
  Link,
  Button,
  HStack,
  useColorMode,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <div>
      <Container maxW={"1140px"} px={4}></Container>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient="linear(to-r, cyan.400, blue.500, purple.600)"
          bgClip={"text"}
        >
          <Link href={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={4} mt={{ base: 4, sm: 0 }}>
          <Link href="/create">
            <Button aria-label="Create new item">
              <PlusSquareIcon fontSize={20} />
            </Button>
          </Link>
          <Link>
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? (
                <IoMoon size={20}></IoMoon>
              ) : (
                <LuSun size={20}></LuSun>
              )}
            </Button>
          </Link>
        </HStack>
      </Flex>
    </div>
  );
};

export default Navbar;
