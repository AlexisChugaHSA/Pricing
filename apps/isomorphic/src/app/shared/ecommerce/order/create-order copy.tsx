'use client';

import { useForm, FormProvider, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input, Title } from 'rizzui';
import { PhoneNumber } from '@ui/phone-input';
import * as z from 'zod';
import cn from '@utils/class-names';

// Esquema de validación con Zod
const facturaSchema = z.object({
  dniRuc: z.string().min(10, 'Debe tener al menos 10 caracteres'),
  nombre: z.string().min(3, 'El nombre es obligatorio'),
  correo: z.string().email('Ingrese un correo válido'),
  telefono: z.string().min(10, 'Ingrese un número válido'),
});

type FacturaFormInput = z.infer<typeof facturaSchema>;

export default function FacturaForm() {
  const methods = useForm<FacturaFormInput>({
    resolver: zodResolver(facturaSchema),
  });

  const onSubmit = (data: FacturaFormInput) => {
    console.log('Datos de facturación:', data);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className={cn('isomorphic-form flex flex-col gap-4')}
      >
        <Title as="h3" className="font-semibold">Datos de facturación (Obligatorio)</Title>

        <Input
          label="DNI / RUC"
          placeholder="Ingrese su DNI o RUC"
          {...methods.register('dniRuc')}
          error={methods.formState.errors.dniRuc?.message}
        />

        <Input
          label="Nombre"
          placeholder="Ingrese su nombre completo"
          {...methods.register('nombre')}
          error={methods.formState.errors.nombre?.message}
        />

        <Input
          label="Correo"
          type="email"
          placeholder="Ingrese su correo"
          {...methods.register('correo')}
          error={methods.formState.errors.correo?.message}
        />

        <Controller
          name="telefono"
          control={methods.control}
          render={({ field }) => (
            <PhoneNumber
              label="Teléfono"
              country="us"
              value={field.value}
              onChange={field.onChange}
              error={methods.formState.errors.telefono?.message}
            />
          )}
        />

        <button type="submit" className="btn-primary mt-4">Guardar</button>
      </form>
    </FormProvider>
  );
}
