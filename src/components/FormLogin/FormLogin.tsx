'use client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const formLoginSchema = z.object({
  email: z
    .string()
    .min(1, 'Por favor, informe um email válido')
    .email('Esse não é um email válido'),
  password: z
    .string()
    .min(6, { message: 'Sua senha deve possuir no mínimo 6 digitos' })
    .max(100)
});

export default function FormLogin() {
  const router = useRouter();

  const form = useForm<z.infer<typeof formLoginSchema>>({
    resolver: zodResolver(formLoginSchema)
  });

  async function onSubmit(values: z.infer<typeof formLoginSchema>) {
    try {
      const response = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false
      });

      if (!response?.error) {
        router.push('/private');
        router.refresh();
      } else {
        alert('Credenciais erradas');
      }
    } catch (error) {
      console.log('Erro no login', error);
    }
  }

  return (
    <div>
      {/* {form.formState.errors.email && ()} */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            name="email"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Insira seu email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Senha</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Insira sua senha"
                    type="password"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Entrar</Button>
        </form>
      </Form>
    </div>
  );
}
