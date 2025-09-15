'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { PiArrowRightBold } from 'react-icons/pi';
import { Password, Checkbox, Button, Input, Text, Title } from 'rizzui';
import { Form } from '@ui/form';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';
import { User } from '@/data/user'
import { Usuario, comprobarUsuario, guardarUsuario } from '@/app/services/usuario.service';
import { routes } from '@/config/routes';
import { useRouter } from 'next/navigation';
import { PhoneNumber } from '@ui/phone-input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dialog } from '@headlessui/react';



const initialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  isAgreed: false,
};


export default function SignUpForm() {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [alertRepeatEmail, setAlertRepeatEmail] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const router = useRouter();
  const [reset, setReset] = useState({});
  const [isOpenBienvenida, setisOpenBienvenida] = useState(false);
  
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    try {
      const nuevo_usuario: Usuario = {
        usuario: data.email,
        nombre: data.firstName,
        apellido: data.lastName,
        telefono: data.telefono,
        password: data.confirmPassword,
      };
      setUsuario(nuevo_usuario);
      //eliminar esto cuando esté la api
      const credenciales = {
        usuario: data.email,
        password: data.confirmPassword,
      };
      const response = await guardarUsuario(credenciales); //quitar esto cuando este la api
      // const response = await guardarUsuario(usuario); //agregar esto cuando este la api
      console.log("Usuario guardado:", response);

      if (response.id_usuario) {
        setisOpenBienvenida(true)
      }
    } catch (error) {
      console.error("Error al guardar el usuario:", error);
    }
  };
  const handleDniBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    const correo = event.target.value.trim();
    if (!correo) return;
    try {
      const usuario: any = await comprobarUsuario(correo);
      if (usuario.id_usuario) {
        setAlertRepeatEmail(true)
      }
      if (usuario.Mensaje == "NOEN") {
        setAlertRepeatEmail(false)
      }
    } catch (error) {
      console.error('Error al cargar el usuario:', error);
    }
  };
  useEffect(() => {
    setReset({ ...initialValues, isAgreed: false });
  }, []);
  const iniciarSesion = () => {
    setisOpenBienvenida(false)
    router.push(routes.signIn)
  }

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
          mode: "onChange",   
          reValidateMode: "onChange", 
        }}
      >
        {({ register, control, formState: { errors, isValid } }) => (
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
              onBlur={(e) => handleDniBlur(e)}
            />
            {alertRepeatEmail && (
              <div className="flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-md border border-red-300" style={{ 'width': 'max-content' }}>
                <span className="w-2 h-2 rounded-full bg-red-500"></span>
                <span className="text-sm font-medium">Ya existe un usuario registrado con este correo</span>
              </div>
            )}
            <Controller
              control={control}
              name="telefono"
              render={({ field }) => (
                <PhoneNumber
                  label="Teléfono"
                  size='lg'
                  country="ec"
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.telefono?.message}
                  className='col-span-2'
                />
              )}
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
                onChange={(e) => setAcceptTerms(e.target.checked)}
                checked={acceptTerms}
                className="[&>label>span]:font-medium [&>label]:items-start"
                label={
                  <>
                    Al registrarte has aceptado nuestros{' '}
                    <Link
                      href={routes.terms_conditions}
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Términos
                    </Link>{' '}
                    y{' '}
                    <Link
                      href={routes.privacy_policy}
                      className="font-medium text-blue transition-colors hover:underline"
                    >
                      Políticas de Privacidad
                    </Link>
                  </>
                }
              />

            </div>
            <Button
              size="lg"
              type="submit"
              className="col-span-2 mt-2"
              disabled={!isValid || !acceptTerms || alertRepeatEmail}
            >
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
      <Dialog open={isOpenBienvenida} onClose={setisOpenBienvenida} className="relative z-50">
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg" style={{ 'justifyItems': 'center' }}>
            <Title
              as="h1"
              className="text-center text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl"
            >
              Hola {usuario?.nombre} {usuario?.apellido}
            </Title>
            <br />
            <p className='text-center'>
              Muchas gracias por registrarte en nuestra plataforma de analítica.
            </p>
            <br />
            <button
              onClick={() => iniciarSesion()}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded text-center" style={{ 'display': 'block' }}
            >
              Iniciar sesión
            </button>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  );
}
