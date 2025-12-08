import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import { createContext, useContext, useId } from 'react';
import {
  Controller,
  FormProvider,
  useFormContext,
  useFormState,
  type Control,
  type ControllerProps,
  type ControllerRenderProps,
  type FieldPath,
  type FieldValues,
  type Path,
  type UseControllerProps,
} from 'react-hook-form';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

function FormItem({ className, ...props }: React.ComponentProps<'div'>) {
  const id = useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div data-slot="form-item" className={cn('grid gap-1', className)} {...props} />
    </FormItemContext.Provider>
  );
}

function FormLabel({ className, ...props }: React.ComponentProps<typeof LabelPrimitive.Root>) {
  const { error, formItemId } = useFormField();

  return (
    <Label
      data-slot="form-label"
      data-error={!!error}
      className={cn('leading-5 text-sm text-gray-600 font-normal', className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`}
      aria-invalid={!!error}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<'p'>) {
  const { formDescriptionId } = useFormField();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<'p'>) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? '') : props.children;

  if (!body) {
    return <div className="h-4" />;
  }

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn('text-secondary-500 text-xs font-normal leading-4', className)}
      {...props}
    >
      {body}
    </p>
  );
}

interface SimpleFieldProps<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>
  extends UseControllerProps<TFieldValues, TName> {
  label?: string;
  control: Control<TFieldValues>;
  direction?: 'vertical' | 'horizontal';
  className?: string;
  icon?: React.ReactNode;
  required?: boolean;
  children: (field: ControllerRenderProps<TFieldValues, TName>) => React.ReactNode;
  enableFormMessage?: boolean;
}

function SimpleField<TFieldValues extends FieldValues, TName extends Path<TFieldValues>>({
  name,
  control,
  label,
  direction = 'vertical',
  children,
  className,
  icon,
  required,
  enableFormMessage = true,
}: SimpleFieldProps<TFieldValues, TName>) {
  return (
    <FormField
      name={name}
      control={control}
      render={({ field }) =>
        direction === 'vertical' ? (
          <FormItem className={cn(className)}>
            <FormLabel className="text-sm text-gray-600 leading-4 h-4">
              {label} {required && <span className="text-secondary-500">*</span>}
            </FormLabel>
            <div className="relative">
              <FormControl>{children(field)}</FormControl>
              <div className="absolute inset-y-0 end-0 flex items-center">{icon}</div>
            </div>
            {enableFormMessage && <FormMessage />}
          </FormItem>
        ) : (
          <FormItem>
            <div className={cn('flex flex-row items-center gap-2', className)}>
              <FormControl>{children(field)}</FormControl>
              <FormLabel className="text-base text-gray-600">{label}</FormLabel>
            </div>
            {enableFormMessage && <FormMessage />}
          </FormItem>
        )
      }
    />
  );
}

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
  SimpleField,
};
