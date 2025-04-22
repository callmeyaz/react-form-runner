import * as mutation_tracker from 'mutation-tracker';
import { KeyValuePair } from 'mutation-tracker';

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

type FormVaidationConfig = {
    initiallyTouched?: string[];
    initiallyDirty?: string[];
};

declare const useMabel: <T extends KeyValuePair>(validator: IFormValidator<IValidationErrorMessage>, dataObject: T, config?: FormVaidationConfig) => {
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

declare function useStateTrackers<T extends {
    [field: string]: any;
} | {}>(dataObject: T, config?: FormVaidationConfig): {
    errorStateTracker: {
        readonly initiallyMutatedAttributes: string[] | undefined;
        readonly initiallyMutatedValue: string[] | undefined;
        readonly state: mutation_tracker.MutatedAttribute<T, string[]>;
        clear: () => void;
        reset: () => void;
        setAll: (value: string[]) => void;
        getMutatedByAttributeName: (attributeName: string) => string[];
        setMutatedByAttributeName: (value: string[], attributeName: string) => void;
        setMutatedByAttributeNames: (value: string[], attributeNames: string[]) => void;
    };
    touchedStateTracker: {
        readonly initiallyMutatedAttributes: string[] | undefined;
        readonly initiallyMutatedValue: boolean | undefined;
        readonly state: mutation_tracker.MutatedAttribute<T, boolean>;
        clear: () => void;
        reset: () => void;
        setAll: (value: boolean) => void;
        getMutatedByAttributeName: (attributeName: string) => boolean;
        setMutatedByAttributeName: (value: boolean, attributeName: string) => void;
        setMutatedByAttributeNames: (value: boolean, attributeNames: string[]) => void;
    };
    dirtyStateTracker: {
        readonly initiallyMutatedAttributes: string[] | undefined;
        readonly initiallyMutatedValue: boolean | undefined;
        readonly state: mutation_tracker.MutatedAttribute<T, boolean>;
        clear: () => void;
        reset: () => void;
        setAll: (value: boolean) => void;
        getMutatedByAttributeName: (attributeName: string) => boolean;
        setMutatedByAttributeName: (value: boolean, attributeName: string) => void;
        setMutatedByAttributeNames: (value: boolean, attributeNames: string[]) => void;
    };
};

declare function useFormFieldState<T extends {
    [field: string]: any;
}>(dataObject: T, config?: FormVaidationConfig): {
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

export { flattenObject, flattenObjectToArray, getDeep, setDeep, useFormFieldState, useMabel, useStateTrackers };
