'use client';

import { useEffect, useState } from 'react';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiDesktop } from 'react-icons/pi';
import { Form } from '@ui/form';
import { Button, Password, Title, Text } from 'rizzui';
import cn from '@utils/class-names';
import { ProfileHeader } from '@/app/shared/account-settings/profile-settings';
import HorizontalFormBlockWrapper from '@/app/shared/account-settings/horiozontal-block';
import {
  passwordFormSchema,
  PasswordFormTypes,
} from '@/validators/password-settings.schema';
import { actualizarUsuario, comprobarPassword, Usuario } from '@/app/services/usuario.service';

export default function PasswordSettingsView({
  settings,
}: {
  settings?: PasswordFormTypes;
}) {
  const [isLoading, setLoading] = useState(false);
  const [reset, setReset] = useState({});
  const [userId, setUserId] = useState<string>('');
  const [token, setToken] = useState<string | null>(null);
  const [usuario, setUsuario] = useState<Usuario>();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [alertOpenNOEN, setAlertOpenNOEN] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);




  useEffect(() => {
    const usuarioString = localStorage.getItem('usuario');
    const tokenLS = localStorage.getItem('token');
    if (usuarioString) {
      try {
        const usuario: any = JSON.parse(usuarioString);
        setUsuario(usuario)
        setUserId(usuario.id_usuario);
      } catch (err) {
        console.error('Error parseando usuario:', err);
      }
    }
    if (tokenLS) {
      setToken(tokenLS);
    }
  }, []);

  const onSubmit: SubmitHandler<PasswordFormTypes> = async (data, e) => {
    setAlertOpenNOEN(false)
    if (usuario) {
      const credenciales = { //cambiar esto cuando este la api
        id_usuario: Number(usuario.id_usuario),
        usuario: usuario.usuario,
        password: data.currentPassword,
        token: usuario.token
      };
      const response = await comprobarPassword(credenciales);
      if (response.mensaje == "OK") {
        credenciales.password = data.confirmedPassword
        const act_user: any = await actualizarUsuario(credenciales)
        console.log(act_user.mensaje)
        setAlertSuccess(true);
        setTimeout(() => setAlertSuccess(false), 3000);
      }
      if (response.mensaje == "NO") {
        setAlertOpenNOEN(true)
        setIsButtonDisabled(true);

      }
    }

    setIsButtonDisabled(true);

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      console.log('Password settings data ->', data);
      e?.target?.reset();
      setReset({
        currentPassword: '',
        newPassword: '',
        confirmedPassword: '',
      });
    }, 600);

  };

  return (
    <>
      <Form<PasswordFormTypes>
        validationSchema={passwordFormSchema}
        onSubmit={onSubmit}
        className="@container"
        useFormProps={{
          mode: 'onChange',
          defaultValues: {
            ...settings,
          },
        }}
      >

        {({ register, control, formState: { errors }, getValues, watch, reset }) => {
          const newPassword = watch('newPassword');
          const confirmedPassword = watch('confirmedPassword');

          useEffect(() => {
            const isValidPassword = newPassword?.length >= 8;
            const doPasswordsMatch = newPassword === confirmedPassword;
            setIsButtonDisabled(!(isValidPassword && doPasswordsMatch));
          }, [newPassword, confirmedPassword]);


          return (
            <>
              <ProfileHeader
                title="Olivia Rhye"
                description="olivia@example.com"
              />

              <div className="mx-auto w-full max-w-screen-2xl">
                <HorizontalFormBlockWrapper
                  title="Contraseña actual"
                  titleClassName="text-base font-medium"
                >
                  <Password
                    {...register('currentPassword')}
                    placeholder="Enter your password"
                    error={errors.currentPassword?.message}
                    onFocus={(e) => {
                      if (!e.target.value) {
                        setAlertOpenNOEN(false);
                      }
                    }}
                  />
                  {alertOpenNOEN && (
                    <div role="alert" className=" col-span-2 text-red text-[13px] mt-0.5 rizzui-password-error-text">La contraseña ingresada es incorrecta</div>
                  )}
                </HorizontalFormBlockWrapper>


                <HorizontalFormBlockWrapper
                  title="Nueva contraseña"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="newPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder="Enter your password"
                        helperText={
                          getValues().newPassword.length < 8 &&
                          'Your current password must be more than 8 characters'
                        }
                        onChange={onChange}
                        error={errors.newPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>

                <HorizontalFormBlockWrapper
                  title="Confirme su nueva contraseña"
                  titleClassName="text-base font-medium"
                >
                  <Controller
                    control={control}
                    name="confirmedPassword"
                    render={({ field: { onChange, value } }) => (
                      <Password
                        placeholder="Enter your password"
                        onChange={onChange}
                        error={errors.confirmedPassword?.message}
                      />
                    )}
                  />
                </HorizontalFormBlockWrapper>


                <div className="mt-6 flex w-auto items-center justify-end gap-3">
                  {alertSuccess && (
                    <div
                      className="flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-md border border-green-300"
                      style={{ width: "max-content" }}
                    >
                      <span className="text-sm font-medium">
                        Contraseña actualizada con éxito
                      </span>
                    </div>
                  )}
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="solid"
                    isLoading={isLoading}
                    disabled={isButtonDisabled}
                  >
                    Update Password
                  </Button>



                </div>
              </div>
            </>
          );
        }}
      </Form>
      {/*<LoggedDevices className="mt-10" />*/}
    </>
  );
}

// Logged devices
function LoggedDevices({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-screen-2xl', className)}>
      <div className="border-b border-dashed border-muted">
        <Title as="h2" className="mb-3 text-xl font-bold text-gray-900">
          Where you’re logged in
        </Title>
        <Text className="mb-6 text-sm text-gray-500">
          We’ll alert you via olivia@untitledui.com if there is any unusual
          activity on your account.
        </Text>
      </div>
      <div className="flex items-center gap-6 border-b border-dashed border-muted py-6">
        <PiDesktop className="h-7 w-7 text-gray-500" />
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Title
              as="h3"
              className="text-base font-medium text-gray-900 dark:text-gray-700"
            >
              2018 Macbook Pro 15-inch
            </Title>
            <Text
              as="span"
              className="relative hidden rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:block"
            >
              Active Now
            </Text>
          </div>
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-500">Melbourne, Australia</Text>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <Text className="text-sm text-gray-500">22 Jan at 4:20pm</Text>
          </div>
          <Text
            as="span"
            className="relative mt-2 inline-block rounded-md border border-muted py-1.5 pe-2.5 ps-5 text-xs font-semibold text-gray-900 before:absolute before:start-2.5 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full before:bg-green sm:hidden"
          >
            Active Now
          </Text>
        </div>
      </div>
      <div className="flex items-center gap-6 py-6">
        <PiDesktop className="h-7 w-7 text-gray-500" />
        <div>
          <Title
            as="h3"
            className="mb-2 text-base font-medium text-gray-900 dark:text-gray-700"
          >
            2020 Macbook Air M1
          </Title>
          <div className="flex items-center gap-2">
            <Text className="text-sm text-gray-500">Melbourne, Australia</Text>
            <span className="h-1 w-1 rounded-full bg-gray-600" />
            <Text className="text-sm text-gray-500">22 Jan at 4:20pm</Text>
          </div>
        </div>
      </div>
    </div>
  );
}
