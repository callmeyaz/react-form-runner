import { useRef, useState } from "react";
import { FormValidationConfig } from "../lib/FormValidationConfig";
import { FormFieldState } from "../lib/FormFieldState";
import { IValidationErrorMessage } from "../lib/IValidationErrorMessage";
import { FormStateValidation, IFormStateValidation } from "../lib/FormStateValidation";

export function useFormFieldState<T extends { [field: string]: any }>(dataObject: T, config?: FormValidationConfig) {
  const validationTrackerRef = useRef<IFormStateValidation<T>>(new FormStateValidation(dataObject, config));
  const validationTracker = validationTrackerRef.current;
  const [, setIteration] = useState(0);

  function TriggerChange() {
    setIteration(x => x + 1);
  }

  //#region touched functions
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
  //#endregion

  //#region dirty functions
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
  //#endregion

  //#region error functions
  function getFieldErrors(fieldName: string): string[] {
    return validationTracker.getFieldErrors(fieldName);
  }
  //#endregion

  //#region validation functions
  function getFieldValid(fieldName: string): boolean {
    return validationTracker.getFieldValid(fieldName)
  }

  function setErrorsAll(errors: IValidationErrorMessage[]) {
    validationTracker.setErrorsAll(errors);
    TriggerChange();
  }
  //#endregion

  function isFormDirty(): boolean {
    return validationTracker.isFormDirty();
  }

  function isFormValid(): boolean {
    return validationTracker.isFormValid();
  }

  function getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T> {
    return validationTracker.getFieldState(name, currentValue, previousValue);
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
    setErrorsAll: setErrorsAll,
    isFormDirty: isFormDirty,
    isFormValid: isFormValid
  }

}