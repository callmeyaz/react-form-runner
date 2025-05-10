import * as form_runner from 'form-runner';
import { IFormValidator, IValidationMessage, FormStateConfig, FormFieldState } from 'form-runner';

interface KeyValuePair {
    [field: string]: any;
}
declare function useFormRunner<T extends KeyValuePair>(validator: IFormValidator<IValidationMessage>, dataObject: T, config?: FormStateConfig): {
    errorFlatList: IValidationMessage[];
    errors: MutatedAttribute<T_1, string[]>;
    touched: MutatedAttribute<T_1, boolean>;
    dirty: MutatedAttribute<T_1, boolean>;
    isSubmitting: boolean;
    isFormDirty: () => boolean;
    isFormTouched: () => boolean;
    isFormValid: () => boolean;
    validateAsync: (model: T) => Promise<boolean>;
    validate: () => boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    getFieldState: <T_2>(name: string, currentValue: T_2, previousValue: T_2) => form_runner.FormFieldState<T_2>;
    getFieldTouched: (fieldName: string) => boolean;
    setFieldTouched: (value: boolean, fieldName: string) => void;
    setFieldsTouched: (value: boolean, fieldNames: string[]) => void;
    setTouchedAll: (value: boolean) => void;
    getFieldDirty: (fieldName: string) => boolean;
    setFieldDirty: (value: boolean, fieldName: string) => void;
    setFieldsDirty: (value: boolean, fieldNames: string[]) => void;
    setDirtyAll: (value: boolean) => void;
    getFieldValid: (fieldName: string) => boolean;
    getFieldErrors: (fieldName: string) => string[];
};

declare function useFormFieldState<T extends {
    [field: string]: any;
}>(validator: IFormValidator<IValidationMessage>, dataObject: T, config?: FormStateConfig): {
    errorFlatList: IValidationMessage[];
    errors: MutatedAttribute<T_1, string[]>;
    touched: MutatedAttribute<T_1, boolean>;
    dirty: MutatedAttribute<T_1, boolean>;
    getFieldState: <T_2>(name: string, currentValue: T_2, previousValue: T_2) => FormFieldState<T_2>;
    getFieldTouched: (fieldName: string) => boolean;
    setFieldTouched: (value: boolean, fieldName: string) => void;
    setFieldsTouched: (value: boolean, fieldNames: string[]) => void;
    setTouchedAll: (value: boolean) => void;
    getFieldDirty: (fieldName: string) => boolean;
    setFieldDirty: (value: boolean, fieldName: string) => void;
    setFieldsDirty: (value: boolean, fieldNames: string[]) => void;
    setDirtyAll: (value: boolean) => void;
    getFieldValid: (fieldName: string) => boolean;
    getFieldErrors: (fieldName: string) => string[];
    isFormDirty: () => boolean;
    isFormTouched: () => boolean;
    isFormValid: () => boolean;
    validateAsync: (model: T) => Promise<boolean>;
};

export { useFormFieldState, useFormRunner };
export type { KeyValuePair };
