# react-form-runner 0.0.8
**React Form Runner** is a front-end form validation and management library for **react**. It is built on top of **[form-runner](https://www.npmjs.com/package/form-runner)**.

React-form-runner provides **userFormRunner()** hook for handling form data, validations, errors, dirty and touched states.

You can use any data validation library with react-form-runner, whether it's Yup, Zod, Joi or any other.

### How to Use?

Consider the HTML below:

In a browser:
```browser
<input type="text" id="firstname" />
<input type="text" id="lastname" />
<textarea id="address"></textarea>
```
The JSON object below represents the state of a HTML form above:
```javascript
var user = {
  name: {
    firstname: "John",
    lastname: "Doe"
  },
    roles: [
        "contributor",
        ""
    ],
  address: "123 Main Street"
}
```

### Step 1 - Plug your favorite validation library to form-runner
Plugging in an validation library is very straight forward. Just provide implementation of two interfaces *IValidationMessage* and *IFormValidator* and you are done:

Below is the implement validator for Yup. Prety simple isn't it?

```javascript
export interface IYupValidationMessage extends IValidationMessage, Record<string, unknown> {
    errorCode: string
}

export class YupValidator<T extends Yup.Maybe<Yup.AnyObject>> implements IFormValidator<IYupValidationMessage> {
  constructor(private validationSchema: Yup.ObjectSchema<T>) { }

  public validate(data: T): Promise<IYupValidationMessage[]> {
    return this.validationSchema.validate(data, { abortEarly: false })
      .then((_) => [])
      .catch((err) => {
      // Make sure errors returned by Yup Validation Tests are typed to IYupValidationMessage interface
      //  Example:
      //  Yup.string().defined()
      //      .test(function (item) {
      //      if (!item) {
      //        return this.createError({
      //        message: {
      //          key: this.path,  message: "Firstname is not provided."
      //        } as Yup.Message<IYupValidationMessage>
      //        });
      //      }
      //      return true;
      //      })
          return err.errors as IYupValidationMessage[];
      });
    }
}
```

### Step 2 - Start using *FormRunner*

In your component,  make use of useFormRunner for your form by passing it the validator and object to validate. Then track changes to your form by tracking click and change events and validate your for when needed.

Below is an implementation of Form validation using React Form Runner and Yup validation library. 

```javascript
// Create Yup validation schema
export const userSchema: Yup.ObjectSchema<typeof user> = Yup.object({
  name: Yup.object({
    firstname: Yup.string().defined().test(function(val) { return !val ?
      this.createError({ message: { key: this.path, message: "First name not provided" } as Yup.Message<IYupValidationMessage> })
      : true 
    }),
    lastname: Yup.string().defined().test(function(val) { return !val ?
      this.createError({ message: { key: this.path, message: "Last name not provided" } as Yup.Message<IYupValidationMessage> })
      : true 
    })
  }),
  roles:  Yup.array().defined().of(
    Yup.string().defined().test(function(val) { return !val ?
      this.createError({ message: { key: this.path, message: "Role not provided" } as Yup.Message<IYupValidationMessage> })
      : true 
    })
  ),
  address: Yup.string().defined().test(function(val) { return !val ?
    this.createError({ message: { key: this.path, message: "Address not provided" } as Yup.Message<IYupValidationMessage> })
    : true 
  })
});

export default function App() {
  const [userState, setUserState] = useState<User>(user);
  const {
    errors,
    touched,
    dirty,
    isSubmitting,
    errorFlatList,
    validate,
    validateAsync,
    setIsSubmitting,
    isFormDirty,
    isFormValid,
    getFieldState,
    getFieldTouched,
    setFieldTouched,
    setFieldsTouched,
    setTouchedAll,
    getFieldDirty,
    setFieldDirty,
    setFieldsDirty,
    setDirtyAll,
    getFieldValid,
    getFieldErrors

  } = useFormRunner(new YupValidator(userSchema), userState, {});

  useEffect(() => {
    runValidation();
  }, [userState])

  function runValidation(): boolean {
    return validate();
  }
  
  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2>User Form</h2>
      </div>
      <div>
        <ul>
          {!!touched?.name?.firstname && errors?.name?.firstname?.map((item: string, index: number) =>
            <li key={index}>{item}</li>)}
        </ul>
        <div>First Name</div>
        <input
          onChange={(e) => {
            setUserState(s => s && setDeep(s, e.target.value, "name.firstname"));
            setFieldDirty(true, "name.firstname");
          }}
          onBlur={() => {
            setFieldTouched(true, "name.firstname");
          }}
        />
      </div>
      <div>
        <ul>
          {!!touched?.name?.lastname && errors?.name?.lastname?.map((item: string, index: number) =>
            <li key={index}>{item}</li>)}
        </ul>
        <div>Last Name</div>
        <input onChange={(e) => {
          setUserState(s => s && setDeep(s, e.target.value, "name.lastname"));
          setFieldDirty(true, "name.lastname");
        }}
          onBlur={() => {
            setFieldTouched(true, "name.lastname");
          }}
        />
      </div>
      <div>
        <div>Roles</div>
        {
          userState.roles.map((item, index) => (
            <div key={index}>
              <ul>
                {!!touched?.roles?.[index] && errors?.roles?.[index]?.map((item: string, index: number) =>
                  <li key={index}>{item}</li>)}
              </ul>
              <input key={index} defaultValue={item} onChange={
                (e) => {
                  setUserState(s => s && setDeep(s, e.target.value, `roles[${index}]`));
                  setFieldDirty(true, `roles[${index}]`);
                }}
                onBlur={() => {
                  setFieldTouched(true, `roles[${index}]`);
                }}
              />
            </div>
          ))
        }
      </div>
      <div>
        <ul>
          {!!touched?.address && errors?.address?.map((item: string, index: number) =>
            <li key={index}>{item}</li>)}
        </ul>
        <div>Address</div>
        <input onChange={
          (e) => {
            setUserState(s => s && setDeep(s, e.target.value, "address"));
            setFieldDirty(true, "address");
          }}
          onBlur={() => {
            setFieldTouched(true, "address");
          }}
        />
      </div>
    </>
  )
}




```

### Documentation

comming soon!

