import { useRef, useState } from "react";
import { FormVaidationConfig } from "../types/FormVaidationConfig";
import { FormFieldState } from "../types/FormFieldState";
import { forEach, map, some } from "lodash-es";
import { IValidationErrorMessage } from "../types/IValidationErrorMessage";
import { flattenObjectToArray } from "../utils";
import { IStateTrackers, FormStateTrackers } from "../types/FormStateTrackers";

export function useFormFieldState<T extends { [field: string]: any }>(dataObject: T, config?: FormVaidationConfig) {
  const [errorFlatList, setErrorFlatList] = useState<IValidationErrorMessage[]>([]);
  const stateTrackers = useRef<IStateTrackers<T>>(new FormStateTrackers(dataObject, config));
  const [, setIteration] = useState(0);

  function TriggerChange() {
    setIteration(x => x + 1);
  }

  const touchedStateTracker = stateTrackers.current.touchedStateTracker;
  const dirtyStateTracker = stateTrackers.current.dirtyStateTracker;
  const validStateTracker = stateTrackers.current.errorStateTracker;


  //#region touched functions
  function getFieldTouched(fieldName: string): boolean {
    return touchedStateTracker.getMutatedByAttributeName(fieldName);
  }

  function setFieldTouched(value: boolean, fieldName: string) {
    touchedStateTracker.setMutatedByAttributeName(value, fieldName);
    TriggerChange();
  }

  function setFieldsTouched(value: boolean, fieldNames: string[]) {
    touchedStateTracker.setMutatedByAttributeNames(value, fieldNames);
    TriggerChange();
  }

  function setTouchedAll(value: boolean) {
    touchedStateTracker.setAll(value);
    TriggerChange();
  }
  //#endregion

  //#region dirty functions
  function getFieldDirty(fieldName: string): boolean {
    return dirtyStateTracker.getMutatedByAttributeName(fieldName);
  }

  function setFieldDirty(value: boolean, fieldName: string) {
    dirtyStateTracker.setMutatedByAttributeName(value, fieldName);
    TriggerChange();
  }

  function setFieldsDirty(value: boolean, fieldNames: string[]) {
    dirtyStateTracker.setMutatedByAttributeNames(value, fieldNames);
    TriggerChange();
  }

  function setDirtyAll(value: boolean) {
    dirtyStateTracker.setAll(value);
    TriggerChange();
  }
  //#endregion

  //#region error functions
  function getFieldErrors(fieldName: string): string[] {
    var errors = validStateTracker.getMutatedByAttributeName(fieldName)
    return map(errors, item => item);
  }
  //#endregion

  //#region validation functions
  function getFieldValid(fieldName: string): boolean {
    return (validStateTracker.getMutatedByAttributeName(fieldName).length ?? 0) <= 0;
  }

  function setErrorsAll(errors: IValidationErrorMessage[]) {
    setErrorFlatList(errors);
    validStateTracker.clear();
    var groups = Object.groupBy(errors, ({ key }) => key)
    forEach(groups, (group, key) => {
      var messages = group?.map(x => x.message) || [];
      validStateTracker.setMutatedByAttributeName(messages, key);
    });
  }
  //#endregion

  function isFormDirty(): boolean {
    return some(flattenObjectToArray(dirtyStateTracker.state, "."), (item) => item.value);
  }

  function isFormValid(): boolean {
    return !(errorFlatList.length);
  }

  function getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T> {
    var fieldErrors = validStateTracker.getMutatedByAttributeName(name);
    return {
      name: name,
      currentValue: currentValue,
      previousValue: previousValue,
      touched: touchedStateTracker.getMutatedByAttributeName(name),
      dirty: dirtyStateTracker.getMutatedByAttributeName(name),
      isValid: !!(fieldErrors.length),
      errors: fieldErrors,
    };
  }

  return {
    errorFlatList: errorFlatList,
    errors: validStateTracker.state,
    touched: touchedStateTracker.state,
    dirty: dirtyStateTracker.state,
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