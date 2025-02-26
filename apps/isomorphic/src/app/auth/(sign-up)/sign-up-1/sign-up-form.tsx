'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { Form } from '@ui/form';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';
import { User } from '@/data/user'
import { Usuario,guardarUsuario } from '@/app/services/usuario.service';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';



const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAgreed: false,
};


export default function SignUpForm() {
  const router = useRouter();
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      const usuario: Usuario = { 
        usuario: data.email,
        nombre: data.firstName,
        apellido: data.lastName,
        password: data.confirmPassword,
      };
      const response = await guardarUsuario(usuario);
      console.log("Usuario guardado:", response);
      if (response.id_usuario) {
        router.push(routes.analytics); 
      }
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };
  useEffect(() => {
    setReset({ ...initialValues, isAgreed: false });
  }, []);
  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
            <Input
              type="text"
              size="lg"
              label="Primer Nombre"
              placeholder="Ingresa tu primer nombre"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('firstName')}
              error={errors.firstName?.message}
            />
            <Input
              type="text"
              size="lg"
              label="Apellido"
              placeholder="Ingresa tu apellido"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('lastName')}
              error={errors.lastName?.message}
            />
            <Input
              type="email"
              size="lg"
              label="Correo electrónico"
              className="col-span-2 [&>label>span]:font-medium"
              inputClassName="text-sm"
              placeholder="Ingresa tu correo"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Contraseña"
              placeholder="Ingresa una contraseña"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('password')}
              error={errors.password?.message}
            />
            <Password
              label="Confirma tu contraseña"
              placeholder="Repite tu contraseña"
              size="lg"
              className="[&>label>span]:font-medium"
              inputClassName="text-sm"
              {...register('confirmPassword')}
              error={errors.confirmPassword?.message}
            />
            <div className="col-span-2 flex items-start ">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    Al registrarte has aceptado nuestros{' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Términos
                    </Link>{' '}
                    y {' '}
                    <Link
                      href="/"
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Políticas de Privacidad
                    </Link>
                  </>
                }
              />
            </div>
            <Button size="lg" type="submit" className="col-span-2 mt-2">
              <span>Empezar</span>{' '}
              <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
      ¿Ya tienes una cuenta?{' '}
        <Link
          href={routes.auth.signIn1}
          className="font-semibold text-gray-700 transition-colors hover:text-blue"
        >
          Inicia sesión
        </Link>
      </Text>
    </>
  );
}
