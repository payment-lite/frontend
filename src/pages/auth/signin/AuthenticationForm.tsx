import {
  Anchor,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PaperProps,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst, useToggle } from "@mantine/hooks";
import { signIn } from "next-auth/react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GoogleButton from "./GoogleButton";

export default function AuthenticationForm(props: Readonly<PaperProps>) {
  const param = useSearchParams().get("error");
  const [error, setError] = useState<null | string>(null);
  const [type, toggle] = useToggle<"login" | "register">(["login", "register"]);
  const [loading, setLoading] = useState(false);
  const form = useForm({
    initialValues: {
      email: "",
      name: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 6 characters"
          : null,
      name: (val) =>
        type === "register" && val.length <= 2
          ? "Name should include at least 2 characters"
          : null,
    },
  });

  const handleSubmit = async (e: {
    email: string;
    name: string;
    password: string;
    terms: boolean;
  }) => {
    setLoading(true);
    form.validate();
    if (type === "login") {
      const res = await fetch("/api/auth/local/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(e),
      });
      if (res.ok) {
        signIn("credentials", { ...e, callbackUrl: "/dashboard" });
      }

      const error = await res.json();
      if (error.error) {
        form.setErrors({
          // @ts-ignore
          unauthorized: error.error,
        });
        setLoading(false);
        return;
      }
    } else if (type === "register") {
      const res = await fetch("/api/auth/local/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(e),
      });

      if (res.ok) {
        signIn("credentials", { ...e, callbackUrl: "/dashboard" });
      }

      const error = await res.json();
      console.log(error);

      if (error.error) {
        form.setErrors({
          // @ts-ignore
          unauthorized: error.error,
        });
        setLoading(false);
        return;
      }
    }
  };

  useEffect(() => {
    form.clearErrors();
    console.log({ error, param });

    if (param) {
      if (param == "Callback") {
        setError("Internal server error");
        return;
      }
      setError(param);
    }
  }, [type, param]);

  return (
    <Paper radius="md" p="xl" pos={"relative"} withBorder {...props}>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
      />
      <Head>
        <title>{type === "login" ? "Sign in" : "Sign up"}</title>
      </Head>
      <Text size="lg" fw={500}>
        Welcome to Payment Lite, {type} with
      </Text>

      <Group grow mb="md" mt="md">
        <GoogleButton
          radius="xl"
          onClick={() => {
            setLoading(true);
            signIn("google", { callbackUrl: "/dashboard" });
          }}
        >
          Google
        </GoogleButton>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form onSubmit={form.onSubmit((e) => handleSubmit(e))}>
        {form.errors.unauthorized && (
          <Text ta={"center"} c={"red"}>
            {form.errors.unauthorized}
          </Text>
        )}
        {error && (
          <Text ta={"center"} c={"red"}>
            {error}
          </Text>
        )}

        <Stack>
          {type === "register" && (
            <TextInput
              label="Name"
              placeholder="Your name"
              value={form.values.name}
              onChange={(event) =>
                form.setFieldValue("name", event.currentTarget.value)
              }
              radius="md"
              error={form.errors.name}
            />
          )}

          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            error={form.errors.email}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={form.errors.password}
            radius="md"
          />
        </Stack>

        <Group justify="space-between" mt="xl">
          <Anchor
            component="button"
            type="button"
            c="dimmed"
            onClick={() => toggle()}
            size="xs"
          >
            {type === "register"
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </Anchor>
          <Button type="submit" radius="xl">
            {upperFirst(type)}
          </Button>
        </Group>
      </form>
    </Paper>
  );
}
