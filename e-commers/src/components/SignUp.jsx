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
  Grid,
  GridItem,
  Divider,
  useColorModeValue,
  Icon,
  Flex,
  FormHelperText,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { CalendarIcon } from "lucide-react";

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [confirmPasswordValid, setConfirmPasswordValid] = useState(false);

  const bgColor = useColorModeValue("white", "gray.800");
  const gradientBg = "linear(to-br, rgba(0, 204, 255, 0.7), rgba(0, 102, 204, 0.7))";

  const toast = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Signup Form Data:", data);

      toast({
        title: "Başarıyla Kaydoldunuz!",
        description: "Hesabınız başarıyla oluşturuldu. Hoş geldiniz!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Signup Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const passwordRules = [
    { rule: "En az 6 karakter", isValid: passwordValue?.length >= 6 },
    { rule: "En az bir büyük harf", isValid: /[A-Z]/.test(passwordValue) },
    { rule: "En az bir rakam", isValid: /\d/.test(passwordValue) },
  ];

  const handlePasswordChange = () => {
    const isValid = passwordRules.every((rule) => rule.isValid);
    setPasswordValid(isValid);
  };

  const handleConfirmPasswordChange = () => {
    setConfirmPasswordValid(confirmPasswordValue === passwordValue);
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bgGradient={gradientBg}
      padding={{ base: 6, md: 12 }}
      overflow="hidden" // Prevent scrolling
    >
      <Container maxW="lg" p={{ base: 4, md: 8 }}>
        <Box
          bg={bgColor}
          p={{ base: 6, md: 8 }}
          borderRadius="xl"
          boxShadow="xl"
          border="1px"
          borderColor="gray.100"
          backdropFilter="blur(10px)"
        >
          <VStack spacing={8}>
            <Box textAlign="center" w="full">
              <Heading
                fontSize={{ base: "2xl", md: "3xl" }}
                bgGradient="linear(to-r, teal.400, cyan.500)"
                bgClip="text"
                fontWeight="extrabold"
                letterSpacing="tight"
              >
                Aramıza Katıl
              </Heading>
              <Text fontSize="md" color="gray.500" mt={3}>
                Hemen ücretsiz hesabını oluştur ve macerana başla
              </Text>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
              <Grid templateColumns="repeat(2, 1fr)" gap={6}>
                <GridItem>
                  <FormControl isInvalid={!!errors.firstName}>
                    <FormLabel fontSize="sm">Ad</FormLabel>
                    <Input
                      type="text"
                      placeholder="Adınız"
                      size="lg"
                      bg="gray.50"
                      _focus={{ bg: "white", borderColor: "teal.400", boxShadow: "sm" }}
                      {...register("firstName", {
                        required: "Ad zorunludur!",
                        minLength: {
                          value: 2,
                          message: "Ad en az 2 karakter olmalı!",
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.lastName}>
                    <FormLabel fontSize="sm">Soyad</FormLabel>
                    <Input
                      type="text"
                      placeholder="Soyadınız"
                      size="lg"
                      bg="gray.50"
                      _focus={{ bg: "white", borderColor: "teal.400", boxShadow: "sm" }}
                      {...register("lastName", {
                        required: "Soyad zorunludur!",
                        minLength: {
                          value: 2,
                          message: "Soyad en az 2 karakter olmalı!",
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.birthDate}>
                    <FormLabel fontSize="sm">Doğum Tarihi</FormLabel>
                    <InputGroup>
                      <Input
                        type="date"
                        size="lg"
                        bg="gray.50"
                        _focus={{ bg: "white", borderColor: "teal.400", boxShadow: "sm" }}
                        {...register("birthDate", {
                          required: "Doğum tarihi zorunludur!",
                          validate: (value) => {
                            const date = new Date(value);
                            const today = new Date();
                            const age = today.getFullYear() - date.getFullYear();
                            return age >= 18 || "18 yaşından büyük olmalısınız!";
                          },
                        })}
                      />
                      <InputRightElement h="full">
                        <Icon as={CalendarIcon} color="gray.400" />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.birthDate?.message}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.username}>
                    <FormLabel fontSize="sm">Kullanıcı Adı</FormLabel>
                    <Input
                      type="text"
                      placeholder="@kullaniciadi"
                      size="lg"
                      bg="gray.50"
                      _focus={{ bg: "white", borderColor: "teal.400", boxShadow: "sm" }}
                      {...register("username", {
                        required: "Kullanıcı adı zorunludur!",
                        minLength: {
                          value: 3,
                          message: "Kullanıcı adı en az 3 karakter olmalı!",
                        },
                        pattern: {
                          value: /^[a-zA-Z0-9_]+$/,
                          message: "Sadece harf, rakam ve alt çizgi kullanabilirsiniz!",
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem>
                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel fontSize="sm">Email </FormLabel>
                    <Input
                      type="email"
                      placeholder="ornek@email.com"
                      size="lg"
                      bg="gray.50"
                      _focus={{ bg: "white", borderColor: "teal.400", boxShadow: "sm" }}
                      {...register("email", {
                        required: "Email zorunludur!",
                        pattern: {
                          value: /\S+@\S+\.\S+/,
                          message: "Geçerli bir email adresi girin!",
                        },
                      })}
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.password}>
                    <FormLabel fontSize="sm">Şifre</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        size="lg"
                        bg="gray.50"
                        _focus={{ bg: "white", borderColor: "teal.400", boxShadow: "sm" }}
                        {...register("password", {
                          required: "Şifre zorunludur!",
                          minLength: {
                            value: 6,
                            message: "Şifre en az 6 karakter olmalı!",
                          },
                        })}
                        onChange={handlePasswordChange}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          aria-label={showPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                          icon={showPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={() => setShowPassword(!showPassword)}
                          variant="ghost"
                          _hover={{ bg: "transparent" }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <VStack spacing={1} align="flex-start" mt={2}>
                      {passwordRules.map((rule, index) => (
                        <FormHelperText
                          key={index}
                          color={rule.isValid ? "green.500" : "gray.500"}
                          display="flex"
                          alignItems="center"
                        >
                          <Box as="span" mr={2}>
                            {rule.isValid ? "✓" : "○"}
                          </Box>
                          {rule.rule}
                        </FormHelperText>
                      ))}
                    </VStack>
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl isInvalid={!!errors.confirmPassword}>
                    <FormLabel fontSize="sm">Şifre Tekrar</FormLabel>
                    <InputGroup>
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        size="lg"
                        bg="gray.50"
                        _focus={{ bg: "white", borderColor: "teal.400", boxShadow: "sm" }}
                        {...register("confirmPassword", {
                          required: "Şifrenizi tekrar girin!",
                          validate: (value) =>
                            value === passwordValue || "Şifreler eşleşmiyor!",
                        })}
                        onChange={handleConfirmPasswordChange}
                      />
                      <InputRightElement h="full">
                        <IconButton
                          aria-label={showConfirmPassword ? "Şifreyi gizle" : "Şifreyi göster"}
                          icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          variant="ghost"
                          _hover={{ bg: "transparent" }}
                        />
                      </InputRightElement>
                    </InputGroup>
                    <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
                    {confirmPasswordValid && passwordValue && (
                      <FormHelperText color="green.500">
                        ✓ Şifreler eşleşiyor
                      </FormHelperText>
                    )}
                  </FormControl>
                </GridItem>

                <GridItem colSpan={2}>
                  <Button
                    type="submit"
                    size="lg"
                    width="full"
                    height="56px"
                    isLoading={loading}
                    loadingText="Kaydediliyor..."
                    bgGradient="linear(to-r, teal.400, cyan.500)"
                    color="white"
                    _hover={{
                      bgGradient: "linear(to-r, teal.500, cyan.600)",
                    }}
                    _active={{
                      bgGradient: "linear(to-r, teal.600, cyan.700)",
                    }}
                    fontSize="md"
                    mt={4}
                  >
                    Hesabını Oluştur
                  </Button>
                </GridItem>
              </Grid>
            </form>

            <Divider />

            <Text fontSize="sm" color="gray.500" textAlign="center">
              Zaten bir hesabınız var mı?{" "}
              <Link to="/login">
                <Text
                  as="span"
                  color="teal.500"
                  fontWeight="medium"
                  _hover={{ textDecoration: "underline" }}
                >
                  Giriş Yap
                </Text>
              </Link>
            </Text>
          </VStack>
        </Box>
      </Container>
    </Flex>
  );
}
