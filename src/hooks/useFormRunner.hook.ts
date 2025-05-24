import { useEffect, useState } from "react";
import { useFormFieldState } from "./useFormFieldState.hook";
import { FormStateConfig, IFormValidator, IValidationMessage } from "form-runner";

export { type IValidationMessage } from "form-runner";

export function useFormRunner<T extends { [field: string]: any }>(
  validator: IFormValidator<IValidationMessage>,
  dataObject: T, config?: FormStateConfig) {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const {
    errorFlatList,
    errors,
    touched,
    dirty,
    getFieldTouched,
    setFieldTouched,
    setFieldsTouched,
    setTouchedAll,
    getFieldDirty,
    setFieldDirty,
    setFieldsDirty,
    setDirtyAll,
    getFieldValid,
    getFieldErrors,
    getFieldState,
    isFormDirty,
    isFormTouched,
    isFormValid,
    validateAsync,
  } = useFormFieldState(validator, dataObject, config)

  useEffect(() => {
    validate(dataObject);
  }, [])

  function validate(model: T): boolean {
    var result: boolean = false;
    (
      async () => await validateAsync(model)
        .then((response) => result = response)
        .catch(() => result = false)
    )();
    return result;
  }

  function setIsSubmitting(isSubmitting: boolean): void {
    setSubmitting(isSubmitting);
  }

  return {
    errorFlatList: errorFlatList,
    errors: errors,
    touched: touched,
    dirty: dirty,
    isSubmitting: submitting,
    isFormDirty: isFormDirty,
    isFormTouched: isFormTouched,
    isFormValid: isFormValid,
    validateAsync: validateAsync,
    validate: validate,
    setIsSubmitting: setIsSubmitting,
    getFieldState: getFieldState,
    getFieldTouched: getFieldTouched,
    setFieldTouched: setFieldTouched,
    setFieldsTouched: setFieldsTouched,
    setTouchedAll: setTouchedAll,
    getFieldDirty: getFieldDirty,
    setFieldDirty: setFieldDirty,
    setFieldsDirty: setFieldsDirty,
    setDirtyAll: setDirtyAll,
    getFieldValid: getFieldValid,
    getFieldErrors: getFieldErrors
  }
}
