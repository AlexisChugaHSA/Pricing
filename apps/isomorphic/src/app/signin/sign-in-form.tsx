'use client';

import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { SubmitHandler } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Checkbox, Password, Button, Input, Text, Badge } from 'rizzui';
import { Form } from '@ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { User } from '@/data/user';
import { Usuario, loginUsuario } from '../services/usuario.service';
import { useRouter } from 'next/navigation';
import LoadingOverlay from '../services/PopUps/PopUpCargando/loading';
import PopUpErrorPago from '../services/PopUps/PopUpErrorPago/error_pago';

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
  const router = useRouter();
  const [reset, setReset] = useState({});
  const [alertOpenNOEN, setAlertOpenNOEN] = useState(false);
  const [alertOpenTK, setAlertOpenTK] = useState(false);
  const [cargando, setCargando] = useState(false);
  
  const simularCarga = () => {
    setCargando(true);
    setTimeout(() => {
      setCargando(false);
    }, 30000); // Simula 3 segundos de carga
  };

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    user.correo = data.email
    user.password = data.password
    try {
      if (!user.correo || !user.password) {
        console.log('No se proporcionaron credenciales');
        return;
      }
      const response: any = await loginUsuario(user.correo, user.password || '');
      console.log(response)
      if (response.mensaje == 'TK') {
        setAlertOpenNOEN(false)
        setAlertOpenTK(true)
      }
      if (response.mensaje == 'NOEN') {
        setAlertOpenTK(false)
        setAlertOpenNOEN(true)
      }

      const usuario: Usuario = {
        id_usuario: response.id_usuario,
        usuario: user.correo,
        nombre: 'Alexis',//response.nombre,//cambiar esto cuando este la api
        apellido: 'Chuga',//response.apellido,//cambiar esto cuando este la api
        telefono: '593987034462',//cambiar esto cuando este la api
        token: response.token
      };
      if (usuario.token) {
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('token', usuario.token);
        console.log(usuario)
        router.push(routes.eCommerce.shop)
      }
    } catch (err) {
      console.error(err);
    }/*
    signIn('credentials', {
      ...data,
    });*/
  };

  return (
    <>
      <div className="relative">
        <PopUpErrorPago/>
        <LoadingOverlay show={cargando} />
        <div className={cargando ? 'pointer-events-none opacity-50' : ''}>
          <h1 className="text-2xl font-bold mb-4">Mi App</h1>
          <button
            onClick={simularCarga}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Simular carga
          </button>
        </div>
      </div>
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
            {alertOpenNOEN && (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-md border border-red-300">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium">El usuario o la contraseña son incorrectos</span>
              </div>
            )}
            {alertOpenTK && (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-md border border-red-300">
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium">Este usuario ha iniciado sesion en otra máquina.
                  ¿Desea cerrar otras sesiones e ingresar en esta máquina?
                </span>
                <Button className="w-50" type="submit" size="lg">
                  <span>Sí</span>{' '}
                  <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
                </Button>
              </div>
            )}

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
