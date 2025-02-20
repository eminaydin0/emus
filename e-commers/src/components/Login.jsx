import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Text,
  useToast,
  InputGroup,
  InputRightElement,
  IconButton,
  Container,
  VStack,
  Checkbox,
  Divider,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Simulate API request delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Form verisi:", data);

      toast({
        title: "Giriş başarılı.",
        description: "Hoş geldiniz!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Giriş hatası:", error);
      toast({
        title: "Hata",
        description: "Bir şeyler ters gitti.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxW="lg" p={6} centerContent>
      <Box
        w="full"
        p={10}
        borderWidth={1}
        borderRadius="xl"
        boxShadow="xl"
        bg={useColorModeValue("white", "gray.800")}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <VStack spacing={8} align="stretch">
          <Heading as="h2" size="lg" textAlign="center" color="blue.500">
            Tekrar Hoş Geldiniz
          </Heading>
          <Text textAlign="center" color="gray.500">
            Hesabınıza giriş yaparak kaldığınız yerden devam edin.
          </Text>

          <Divider />

          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={5}>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel>Kullanıcı Adı veya Email</FormLabel>
                <Input
                  type="text"
                  placeholder="Kullanıcı adınızı veya email adresinizi girin"
                  {...register("username", {
                    required: "Bu alan zorunludur.",
                    minLength: {
                      value: 3,
                      message: "Kullanıcı adı en az 3 karakter olmalı.",
                    },
                  })}
                  focusBorderColor="blue.400"
                />
                <FormErrorMessage>
                  {errors.username && errors.username.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel>Parola</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolanızı girin"
                    {...register("password", {
                      required: "Parola zorunludur.",
                      minLength: {
                        value: 4,
                        message: "Parola en az 4 karakter olmalı.",
                      },
                    })}
                    focusBorderColor="blue.400"
                  />
                  <InputRightElement>
                    <IconButton
                      aria-label={showPassword ? "Parolayı gizle" : "Parolayı göster"}
                      icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                      onClick={() => setShowPassword(!showPassword)}
                      variant="ghost"
                      size="sm"
                      colorScheme="blue"
                    />
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>
                  {errors.password && errors.password.message}
                </FormErrorMessage>
              </FormControl>

              <Checkbox {...register("rememberMe")} colorScheme="blue">
                Beni hatırla
              </Checkbox>

              <Button
                type="submit"
                colorScheme="blue"
                width="full"
                isLoading={loading}
                loadingText="Giriş yapılıyor..."
                spinnerPlacement="start"
                isDisabled={loading}
                _hover={{ bg: "blue.500" }}
              >
                Giriş Yap
              </Button>
            </VStack>
          </form>

          <Divider />

          <VStack spacing={3}>
            <Button variant="link" colorScheme="blue">
              <Link to="/forgot-password">Parolanızı mı unuttunuz?</Link>
            </Button>
            <Text fontSize="sm" color="gray.500">
              Hesabınız yok mu?{" "}
              <Link to="/signup">
                <Button variant="link" colorScheme="blue">
                  Kayıt Ol
                </Button>
              </Link>
            </Text>
          </VStack>
        </VStack>
      </Box>
    </Container>
  );
}
