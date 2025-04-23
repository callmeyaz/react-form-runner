import * as mutation_tracker from 'mutation-tracker';
import { KeyValuePair, IMutationTracker, MutatedAttribute } from 'mutation-tracker';

/**
 * interface for validation error message
 */
type IValidationErrorMessage = {
    key: string;
    message: string;
};

/**
 * interface for form validation
 */
interface IFormValidator<M extends IValidationErrorMessage> {
    validate: (data: any) => Promise<M[]>;
}

type FormValidationConfig = {
    initiallyTouched?: string[];
    initiallyDirty?: string[];
};

declare function useFormValidation<T extends KeyValuePair>(validator: IFormValidator<IValidationErrorMessage>, dataObject: T, config?: FormValidationConfig): {
    errorFlatList: IValidationErrorMessage[];
    errors: mutation_tracker.MutatedAttribute<T, string[]>;
    touched: mutation_tracker.MutatedAttribute<T, boolean>;
    dirty: mutation_tracker.MutatedAttribute<T, boolean>;
    isSubmitting: boolean;
    isFormDirty: () => boolean;
    isFormValid: () => boolean;
    validateAsync: () => Promise<boolean>;
    validate: () => boolean;
    setIsSubmitting: (isSubmitting: boolean) => void;
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
};

declare const useMabel: typeof useFormValidation;

interface IStateTrackers<T> {
    readonly touchedStateTracker: IMutationTracker<T, boolean>;
    readonly dirtyStateTracker: IMutationTracker<T, boolean>;
    readonly errorStateTracker: IMutationTracker<T, string[]>;
}
declare class FormStateTrackers<T extends {
    [field: string]: any;
} | {}> implements IStateTrackers<T> {
    private _touchedStateTracker;
    private _dirtyStateTracker;
    private _errorStateTracker;
    get touchedStateTracker(): IMutationTracker<T, boolean>;
    get dirtyStateTracker(): IMutationTracker<T, boolean>;
    get errorStateTracker(): IMutationTracker<T, string[]>;
    constructor(dataObject: T, config?: FormValidationConfig);
}

/**
 * Type represents state of a form field
 */
type FormFieldState<T> = {
    name: string;
    touched: boolean;
    dirty: boolean;
    isValid: boolean;
    currentValue: T;
    previousValue: T;
    errors: string[];
};

declare function useFormFieldState<T extends {
    [field: string]: any;
}>(dataObject: T, config?: FormValidationConfig): {
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
    setErrorsAll: (errors: IValidationErrorMessage[]) => void;
    isFormDirty: () => boolean;
    isFormValid: () => boolean;
};

declare function getDeep<T>(obj: any, path: string): T;
declare function setDeep<T>(obj: any, value: T, path: string): any;
declare function flattenObject(obj: any, separator: string): {};
declare function flattenObjectToArray(obj: any, separator: string): {
    key: string;
    value: any;
}[];
declare function deepFreeze<T>(obj: T): T;

interface IFormStateValidation<T> {
    readonly errorFlatList: IValidationErrorMessage[];
    readonly errors: MutatedAttribute<T, string[]>;
    readonly touched: MutatedAttribute<T, boolean>;
    readonly dirty: MutatedAttribute<T, boolean>;
    getFieldTouched: (fieldName: string) => boolean;
    setFieldTouched: (value: boolean, fieldName: string) => void;
    setFieldsTouched: (value: boolean, fieldNames: string[]) => void;
    setTouchedAll: (value: boolean) => void;
    getFieldDirty: (fieldName: string) => boolean;
    setFieldDirty: (value: boolean, fieldName: string) => void;
    setFieldsDirty: (value: boolean, fieldNames: string[]) => void;
    setDirtyAll: (value: boolean) => void;
    getFieldErrors: (fieldName: string) => string[];
    getFieldValid: (fieldName: string) => boolean;
    setErrorsAll: (errors: IValidationErrorMessage[]) => void;
    isFormDirty: () => boolean;
    isFormValid: () => boolean;
    getFieldState: <T>(name: string, currentValue: T, previousValue: T) => FormFieldState<T>;
}
declare class FormStateValidation<T extends {
    [field: string]: any;
}> implements IFormStateValidation<T> {
    private _stateTrackers;
    private _errorFlatList;
    constructor(dataObject: T, config?: FormValidationConfig);
    get errorFlatList(): IValidationErrorMessage[];
    get errors(): {};
    get touched(): {};
    get dirty(): {};
    private setErrorFlatList;
    getFieldTouched(fieldName: string): boolean;
    setFieldTouched(value: boolean, fieldName: string): void;
    setFieldsTouched(value: boolean, fieldNames: string[]): void;
    setTouchedAll(value: boolean): void;
    getFieldDirty(fieldName: string): boolean;
    setFieldDirty(value: boolean, fieldName: string): void;
    setFieldsDirty(value: boolean, fieldNames: string[]): void;
    setDirtyAll(value: boolean): void;
    getFieldErrors(fieldName: string): string[];
    getFieldValid(fieldName: string): boolean;
    setErrorsAll(errors: IValidationErrorMessage[]): void;
    isFormDirty(): boolean;
    isFormValid(): boolean;
    getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T>;
}

/**
 * Type that represents submission state of form.
 */
type FormSubmissionState = {
    eventSource: string | null;
};

export { FormStateTrackers, FormStateValidation, deepFreeze, flattenObject, flattenObjectToArray, getDeep, setDeep, useFormFieldState, useFormValidation, useMabel };
export type { FormFieldState, FormSubmissionState, FormValidationConfig, IFormStateValidation, IFormValidator, IStateTrackers, IValidationErrorMessage };
