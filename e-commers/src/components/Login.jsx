import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Heading,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react";

export default function Login() {
  const toast = useToast();
  const [loading, setLoading] = useState(false);

  // react-hook-form kullanımı
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Form gönderildiğinde çağrılan fonksiyon
  const onSubmit = async (data) => {
    try {
      setLoading(true);

      // API isteği simülasyonu için 1-2 saniyelik gecikme
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Konsola veri yazıyoruz (gerçekte burada API isteği yaparsınız)
      console.log("Form verileri:", data);

      // Başarılı işlem Toast bildirimi
      toast({
        title: "Giriş başarılı.",
        description: "Hoş geldiniz!",
        status: "success",
        duration: 4000,
        isClosable: true,
      });

    
      // const response = await fetch("/api/login", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(data),
      // });
      // if (response.ok) {
      //   // Token kaydet, yönlendir, vs.
      // } else {
      //   // Hata mesajı göster
      // }

    } catch (error) {
      console.error("Login hatası:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={8}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="md"
    >
      <Heading as="h2" size="lg" mb={6} textAlign="center">
        Giriş Yap
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Kullanıcı Adı veya Email */}
        <FormControl isInvalid={!!errors.username} mb={4}>
          <FormLabel>Kullanıcı Adı / Email</FormLabel>
          <Input
            type="text"
            placeholder="Email veya kullanıcı adınızı girin"
            {...register("username", {
              required: "Bu alan zorunludur!",
              minLength: {
                value: 3,
                message: "Kullanıcı adı en az 3 karakter olmalı!",
              },
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        {/* Parola */}
        <FormControl isInvalid={!!errors.password} mb={6}>
          <FormLabel>Parola</FormLabel>
          <Input
            type="password"
            placeholder="Parolanızı girin"
            {...register("password", {
              required: "Parola zorunludur!",
              minLength: {
                value: 4,
                message: "Parola en az 4 karakter olmalı!",
              },
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        {/* Giriş Butonu */}
        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isDisabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Giriş Yap"}
        </Button>
      </form>

      {/* Opsiyonel: Kayıt ol veya şifre unuttum bağlantıları */}
      <Box mt={4} textAlign="center">
        <Text fontSize="sm" color="gray.500">
          Henüz hesabınız yok mu?{" "}
          <Button variant="link" colorScheme="blue">
            Kayıt Ol
          </Button>
        </Text>
        <Text fontSize="sm" color="gray.500" mt={1}>
          Parolanızı mı unuttunuz?{" "}
          <Button variant="link" colorScheme="blue">
            Şifre Sıfırla
          </Button>
        </Text>
      </Box>
    </Box>
  );
}
