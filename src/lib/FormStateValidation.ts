import forEach from "lodash-es/forEach";
import map from "lodash-es/map";
import some from "lodash-es/some";
import { FormFieldState } from "./FormFieldState";
import { FormStateTrackers, IStateTrackers } from "./FormStateTrackers";
import { FormValidationConfig } from "./FormValidationConfig";
import { IValidationErrorMessage } from "./IValidationErrorMessage";
import { flattenObjectToArray } from "../utils";
import { MutatedAttribute } from "mutation-tracker";

export interface IFormStateValidation<T> {
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

export class FormStateValidation<T extends { [field: string]: any }> implements IFormStateValidation<T> {

  private _stateTrackers: IStateTrackers<T>;
  private _errorFlatList: IValidationErrorMessage[] = [];

  public constructor(dataObject: T, config?: FormValidationConfig) {
    this._stateTrackers = new FormStateTrackers(dataObject, config);
  }

  get errorFlatList() {
    return this._errorFlatList;
  }

  get errors() {
    return this._stateTrackers.errorStateTracker.state || {};
  }

  get touched() {
    return this._stateTrackers.touchedStateTracker.state || {};
  }

  get dirty() {
    return this._stateTrackers.dirtyStateTracker.state || {};
  }

  private setErrorFlatList(errors: IValidationErrorMessage[]) {
    this._errorFlatList = errors;
  }

  //#region touched functions
  public getFieldTouched(fieldName: string): boolean {
    return this._stateTrackers.touchedStateTracker.getMutatedByAttributeName(fieldName);
  }

  public setFieldTouched(value: boolean, fieldName: string) {
    this._stateTrackers.touchedStateTracker.setMutatedByAttributeName(value, fieldName);
  }

  public setFieldsTouched(value: boolean, fieldNames: string[]) {
    this._stateTrackers.touchedStateTracker.setMutatedByAttributeNames(value, fieldNames);
  }

  public setTouchedAll(value: boolean) {
    this._stateTrackers.touchedStateTracker.setAll(value);
  }
  //#endregion

  //#region dirty functions
  public getFieldDirty(fieldName: string): boolean {
    return this._stateTrackers.dirtyStateTracker.getMutatedByAttributeName(fieldName);
  }

  public setFieldDirty(value: boolean, fieldName: string): void {
    this._stateTrackers.dirtyStateTracker.setMutatedByAttributeName(value, fieldName);
  }

  public setFieldsDirty(value: boolean, fieldNames: string[]): void {
    this._stateTrackers.dirtyStateTracker.setMutatedByAttributeNames(value, fieldNames);
  }

  public setDirtyAll(value: boolean): void {
    this._stateTrackers.dirtyStateTracker.setAll(value);
  }
  //#endregion

  //#region error functions
  public getFieldErrors(fieldName: string): string[] {
    var errors = this._stateTrackers.errorStateTracker.getMutatedByAttributeName(fieldName)
    return map(errors, item => item);
  }
  //#endregion

  //#region validation functions
  public getFieldValid(fieldName: string): boolean {
    return (this._stateTrackers.errorStateTracker.getMutatedByAttributeName(fieldName).length ?? 0) <= 0;
  }

  public setErrorsAll(errors: IValidationErrorMessage[]) {
    this.setErrorFlatList(errors);
    this._stateTrackers.errorStateTracker.clear();
    var groups = Object.groupBy(errors, ({ key }) => key)
    forEach(groups, (group, key) => {
      var messages = group?.map(x => x.message) || [];
      this._stateTrackers.errorStateTracker.setMutatedByAttributeName(messages, key);
    });
  }
  //#endregion

  public isFormDirty(): boolean {
    return some(flattenObjectToArray(this._stateTrackers.dirtyStateTracker.state, "."), (item) => item.value);
  }

  public isFormValid(): boolean {
    return !(this.errorFlatList.length);
  }

  public getFieldState<T>(name: string, currentValue: T, previousValue: T): FormFieldState<T> {
    var fieldErrors = this._stateTrackers.errorStateTracker.getMutatedByAttributeName(name);
    return {
      name: name,
      currentValue: currentValue,
      previousValue: previousValue,
      touched: this._stateTrackers.touchedStateTracker.getMutatedByAttributeName(name),
      dirty: this._stateTrackers.dirtyStateTracker.getMutatedByAttributeName(name),
      isValid: !!(fieldErrors.length),
      errors: fieldErrors,
    };
  }
}