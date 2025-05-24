import { useRef, useState } from "react";
import { IFormValidator, FormRunner, FormFieldState, IValidationMessage, FormStateConfig, IFormRunner } from "form-runner";

/**
 * 
 * @param validator Validator to validate the data object for errors
 * @param dataObject JSON Object to initialize the hook.
 * @param config Configuration to initialize hook.
 * @returns returns useFormFieldState hook reference.
 */
export function useFormFieldState<T extends { [field: string]: any }>(
  validator: IFormValidator<IValidationMessage>,
  dataObject: T,
  config?: FormStateConfig) {

  const validationTrackerRef = useRef<IFormRunner<T>>(new FormRunner(validator, dataObject, config));
  const validationTracker = validationTrackerRef.current;
  const [, setIteration] = useState(0);

  function TriggerChange() {
    setIteration(x => x + 1);
  }

  function getFieldTouched(fieldName: string): boolean {
    return validationTracker.getFieldTouched(fieldName);
  }

  function setFieldTouched(value: boolean, fieldName: string) {
    validationTracker.setFieldTouched(value, fieldName);
    TriggerChange();
  }

  function setFieldsTouched(value: boolean, fieldNames: string[]) {
    validationTracker.setFieldsTouched(value, fieldNames);
    TriggerChange();
  }

  function setTouchedAll(value: boolean) {
    validationTracker.setTouchedAll(value);
    TriggerChange();
  }

  function getFieldDirty(fieldName: string): boolean {
    return validationTracker.getFieldDirty(fieldName);
  }

  function setFieldDirty(value: boolean, fieldName: string) {
    validationTracker.setFieldDirty(value, fieldName);
    TriggerChange();
  }

  function setFieldsDirty(value: boolean, fieldNames: string[]) {
    validationTracker.setFieldsDirty(value, fieldNames);
    TriggerChange();
  }

  function setDirtyAll(value: boolean) {
    validationTracker.setDirtyAll(value);
    TriggerChange();
  }

  function getFieldErrors(fieldName: string): string[] {
    return validationTracker.getFieldErrors(fieldName);
  }

  function getFieldValid(fieldName: string): boolean {
    return validationTracker.getFieldValid(fieldName)
  }

  function isFormDirty(): boolean {
    return validationTracker.isFormDirty();
  }

  function isFormValid(): boolean {
    return validationTracker.isFormValid();
  }

  function isFormTouched(): boolean {
    return validationTracker.isFormTouched();
  }

  function getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T> {
    return validationTracker.getFieldState(name, currentValue, previousValue);
  }

  function validateAsync(model: T) {
    return validationTracker
      .validateAsync(model)
      .then(response => {
        TriggerChange();
        return response;
      })
  }

  return {
    errorFlatList: validationTracker.errorFlatList,
    errors: validationTracker.errors,
    touched: validationTracker.touched,
    dirty: validationTracker.dirty,
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
    getFieldErrors: getFieldErrors,
    isFormDirty: isFormDirty,
    isFormTouched: isFormTouched,
    isFormValid: isFormValid,
    validateAsync: validateAsync
  }

}