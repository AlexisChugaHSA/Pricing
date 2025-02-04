'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text } from 'rizzui';
import { Form } from '@ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { User } from '@/data/user';
import { Usuario,loginUsuario } from '../services/usuario.service';

const initialValues: LoginSchema = {
  email: 'admin@admin.com',
  password: 'admin',
  rememberMe: true,
};
const user: User = {
  correo: '',
  password: ''
};

export default function SignInForm() {
  //TODO: why we need to reset it here
  const [reset, setReset] = useState({});

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    user.correo=data.email
    user.password=data.password
    const handleLogin = async () => {
      try {
        if (!user.correo || !user.password) {
          console.log('No se proporcionaron credenciales');
          return;
        }
        const response = await loginUsuario(user.correo, user.password || '');
        const usuario: Usuario = { 
          id_usuario:response.id_usuario,
          usuario:response.usuario,
          nombre:response.nombre,
          apellido:response.apellido,
          telefono:response.telefono,
          token:response.token
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));
      } catch (err) {
        console.error(err);
      }
    };
    await handleLogin();
    signIn('credentials', {
      ...data,
    });
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5">
            <Input
              type="email"
              size="lg"
              label="Correo"
              placeholder="Ingrese su correo"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Contraseña"
              placeholder="Ingrese su contraseña"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="flex items-center justify-between pb-2">
              <Checkbox
                {...register('rememberMe')}
                label="Recuérdame"
                className="[&>label>span]:font-medium"
              />
              <Link
                href={routes.auth.forgotPassword1}
                className="h-auto p-0 text-sm font-semibold text-blue underline transition-colors hover:text-gray-900 hover:no-underline"
              >
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button className="w-full" type="submit" size="lg">
              <span>Iniciar Sesión</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
      ¿No tienes una cuenta? {' '}
        <Link
          href={routes.auth.signUp1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Registrate
        </Link>
      </Text>
    </>
  );
}
