# react-form-runner 0.0.12
**React Form Runner** is Form validation and management library for **react**. It is built on top of **[form-runner](https://www.npmjs.com/package/form-runner)**.  

React-form-runner provides **userFormRunner()** hook for handling Form data, validation errors, dirty and touched states.  

We can use any data validation library with react-form-runner, whether it's [Yup](https://github.com/jquense/yup), [Zod](https://github.com/colinhacks/zod), [Joi](https://github.com/hapijs/joi) or any other validation library.

### How to Use?

Consider the HTML below:

In a browser:
```browser
<input type="text" id="firstname" />
<input type="text" id="lastname" />
<textarea id="address"></textarea>
```
The JSON object below represents the state of a HTML Form above:
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
interface IYupValidationMessage 
  extends IValidationMessage, Record<string, unknown> {
  errorCode: string
}

class YupValidator<T extends Yup.Maybe<Yup.AnyObject>> 
  implements IFormValidator<IYupValidationMessage> {
  
  constructor(private validationSchema: Yup.ObjectSchema<T>) { }

// Make sure errors returned by Yup Schema Validation are typed to IYupValidationMessage interface.
// Below, we achieve that using test() functions for Yup Schema which sets errors of type IYupValidationMessage.
// We can setup up multiple test for same property since form-runner can manage multiple errors for same Form field.

//  Example:
//  Yup.string().defined()
//    .test(function (item) {
//      if (!item) {
//        return this.createError({
//        message: {
//          key: this.path,  message: "Firstname is not provided."
//        } as Yup.Message<IYupValidationMessage>
//        });
//      }
//    return true;
//   })

  public validate(data: T): Promise<IYupValidationMessage[]> {
    return this.validationSchema.validate(data, { abortEarly: false })
      .then((_) => [])
      .catch((err) => {
        return err.errors as IYupValidationMessage[];
      });
  }
}
```

### Step 2 - Start using *FormRunner*

In our react component, first we make use of useFormRunner by passing it a custom validator and object to validate.

Then we track changes in the Form by tracking *click*, *blur* and *change* events and validate our Form when needed.

Below is an implementation of Form validation using react-form-runner and Yup validation library. 

```javascript
// Create Yup validation schema
export const userSchema: Yup.ObjectSchema<typeof user> = Yup.object({
    name: Yup.object({
      firstname: Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "First name not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      }),
      lastname: Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "Last name not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      })
    }),
    roles:  Yup.array().defined().of(
      Yup.string().defined().test(function(val) { return !val ?
        this.createError({ 
          message: { key: this.path, message: "Role not provided" } as 
            Yup.Message<IYupValidationMessage> })
        : true 
      })
    ),
    address: Yup.string().defined().test(function(val) { return !val ?
      this.createError({ 
        message: { key: this.path, message: "Address not provided" } as 
            Yup.Message<IYupValidationMessage> })
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
          {!!touched?.name?.firstname &&
            errors?.name?.firstname?.map((item: string, index: number) =>
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
          {!!touched?.name?.lastname &&
            errors?.name?.lastname?.map((item: string, index: number) =>
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
                {!!touched?.roles?.[index] &&
                  errors?.roles?.[index]?.map((item: string, index: number) =>
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
          {!!touched?.address &&
            errors?.address?.map((item: string, index: number) =>
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

