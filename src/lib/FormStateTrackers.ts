import { IMutationTracker, MutationTracker } from "mutation-tracker";
import { FormValidationConfig } from "./FormValidationConfig";

export interface IStateTrackers<T> {
  readonly touchedStateTracker: IMutationTracker<boolean, T>;
  readonly dirtyStateTracker: IMutationTracker<boolean, T>;
  readonly errorStateTracker: IMutationTracker<string[], T>;
}

export class FormStateTrackers<T extends { [field: string]: any } | {}> implements IStateTrackers<T> {

  private _touchedStateTracker: IMutationTracker<boolean, T>;
  private _dirtyStateTracker: IMutationTracker<boolean, T>;
  private _errorStateTracker: IMutationTracker<string[], T>;

  public get touchedStateTracker(): IMutationTracker<boolean, T> {
    return this._touchedStateTracker;
  }

  public get dirtyStateTracker(): IMutationTracker<boolean, T> {
    return this._dirtyStateTracker;
  }

  public get errorStateTracker(): IMutationTracker<string[], T> {
    return this._errorStateTracker;
  }

  constructor(dataObject: T, config?: FormValidationConfig) {
    this._touchedStateTracker = MutationTracker(dataObject, {
      defaultValue: false,
      initialMutation: {
        mutatedAttributes: config?.initiallyTouched,
        mutatedValue: true
      }
    });

    this._dirtyStateTracker = MutationTracker(dataObject, {
      defaultValue: false,
      initialMutation: {
        mutatedAttributes: config?.initiallyDirty,
        mutatedValue: true
      }
    });

    this._errorStateTracker = MutationTracker(dataObject, {
      defaultValue: [] as string[]
    });
  }
}