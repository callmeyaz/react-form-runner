import * as form_runner from 'form-runner';
import { IFormValidator, IValidationMessage, FormStateConfig, FormFieldState } from 'form-runner';
export { IValidationMessage } from 'form-runner';
import * as mutation_tracker from 'mutation-tracker';

declare function useFormRunner<T extends {
    [field: string]: any;
}>(validator: IFormValidator<IValidationMessage>, dataObject: T, config?: FormStateConfig): {
    errorFlatList: IValidationMessage[];
    errors: mutation_tracker.MutatedAttribute<T, string[]>;
    touched: mutation_tracker.MutatedAttribute<T, boolean>;
    dirty: mutation_tracker.MutatedAttribute<T, boolean>;
    isSubmitting: boolean;
    isFormDirty: () => boolean;
    isFormTouched: () => boolean;
    isFormValid: () => boolean;
    validateAsync: (model: T) => Promise<boolean>;
    validate: (model: T) => boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
    getFieldState: <T_1>(name: string, currentValue: T_1, previousValue: T_1) => form_runner.FormFieldState<T_1>;
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

/**
 *
 * @param validator Validator to validate the data object for errors
 * @param dataObject JSON Object to initialize the hook.
 * @param config Configuration to initialize hook.
 * @returns returns useFormFieldState hook reference.
 */
declare function useFormFieldState<T extends {
    [field: string]: any;
}>(validator: IFormValidator<IValidationMessage>, dataObject: T, config?: FormStateConfig): {
    errorFlatList: IValidationMessage[];
    errors: mutation_tracker.MutatedAttribute<T, string[]>;
    touched: mutation_tracker.MutatedAttribute<T, boolean>;
    dirty: mutation_tracker.MutatedAttribute<T, boolean>;
    getFieldState: <T_1>(name: string, currentValue: T_1, previousValue: T_1) => FormFieldState<T_1>;
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
