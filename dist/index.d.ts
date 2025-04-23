import * as form_runner from 'form-runner';
import { IFormValidator, IValidationErrorMessage, FormValidationConfig, FormFieldState } from 'form-runner';
import * as mutation_tracker from 'mutation-tracker';
import { KeyValuePair } from 'mutation-tracker';

declare function useFormValidation<T extends KeyValuePair>(validator: IFormValidator<IValidationErrorMessage>, dataObject: T, config?: FormValidationConfig): {
    errorFlatList: IValidationErrorMessage[];
    errors: mutation_tracker.MutatedAttribute<T, string[]>;
    touched: mutation_tracker.MutatedAttribute<T, boolean>;
    dirty: mutation_tracker.MutatedAttribute<T, boolean>;
    isSubmitting: boolean;
    isFormDirty: () => boolean;
    isFormValid: () => boolean;
    validateAsync: (model: T) => Promise<boolean>;
    validate: () => boolean;
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

declare const useMabel: typeof useFormValidation;

declare function useFormFieldState<T extends {
    [field: string]: any;
}>(validator: IFormValidator<IValidationErrorMessage>, dataObject: T, config?: FormValidationConfig): {
    errorFlatList: IValidationErrorMessage[];
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
    isFormValid: () => boolean;
    validateAsync: (model: T) => Promise<boolean>;
};

declare function getDeep<T>(obj: any, path: string): T;
declare function setDeep<T>(obj: any, value: T, path: string): any;
declare function flattenObject(obj: any, separator: string): {};
declare function flattenObjectToArray(obj: any, separator: string): {
    key: string;
    value: any;
}[];
declare function deepFreeze<T>(obj: T): T;

export { deepFreeze, flattenObject, flattenObjectToArray, getDeep, setDeep, useFormFieldState, useFormValidation, useMabel };
