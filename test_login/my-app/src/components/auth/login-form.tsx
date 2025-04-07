"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/auth";
import { login } from "@/lib/api";

const formSchema = z.object({
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать больше 6-ти символов"),
});

export function LoginForm() {
  const { login: authLogin } = useAuth();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "user@mail.com",
      password: "password",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const response = await login(values);
      authLogin(response.data);
      router.push("/home");
    } catch (error) {
      alert("Нет такого пользователя");
    }
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <h2 style={{ alignSelf: "center", marginTop: '-10px' }}>Вход</h2>

      <div style={{ alignSelf: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "5px",
          }}
        >
          <Label htmlFor="email">Email </Label>
          <Input id="email" type="email" {...form.register("email")} />
          {form.formState.errors.email && (
            <p>{form.formState.errors.email.message}</p>
          )}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "10px",
          }}
        >
          <Label htmlFor="password">Password </Label>
          <Input id="password" type="password" {...form.register("password")} />
          {form.formState.errors.password && (
            <p>{form.formState.errors.password.message}</p>
          )}
        </div>
      </div>

      <Button style={{ alignSelf: "center", margin: "20px" }} type="submit">
        Вход
      </Button>
    </form>
  );
}
