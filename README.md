# React-form-runner 0.0.12
**React Form Runner** is Form validation and management library for **react**. It is built on top of **[form-runner](https://www.npmjs.com/package/form-runner)**.  

React-form-runner provides **userFormRunner()** hook for handling Form data, validation errors, dirty and touched states.  

We can use any data validation library with react-form-runner, whether it's [Yup](https://github.com/jquense/yup), [Zod](https://github.com/colinhacks/zod), [Joi](https://github.com/hapijs/joi) or any other validation library.

A demo react application is available [here to download](https://github.com/callmeyaz/react-form-runner-app) that provides a dashboard to show case almost all the react-form-runner API uses. 

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
  address: "123 Main Street"
}
```

### Step 1 - Plug your favorite validation library to form-runner
Choose one of the following validation plugins built for Yup, Zod or Joi validation libraries or [build your own](https://github.com/callmeyaz/react-form-runner?tab=readme-ov-file#step-1---plug-your-favorite-validation-library-to-form-runner):

* [Yup Validation plugin For Form-Runner](https://github.com/callmeyaz/form-runner-yup-plugin)
* [zod Validation plugin For Form-Runner](https://github.com/callmeyaz/form-runner-zod-plugin)
* [joi Validation plugin For Form-Runner](https://github.com/callmeyaz/form-runner-joi-plugin)

### Step 2 - Create validation schema

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
    address: Yup.string().defined().test(function(val) { return !val ?
      this.createError({ 
        message: { key: this.path, message: "Address not provided" } as 
            Yup.Message<IYupValidationMessage> })
      : true 
    })
  });

```

### Step 3 - Use FormRunner

In our react component, first we make use of useFormRunner by passing it a custom validator and object to validate.

Then we track changes in the Form by tracking *click*, *blur* and *change* events and validate our Form when needed.

```javascript
// Create React component

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
            setUserState(s => {
              var s = userState;
              s.name.firstname = e.target.value;
              return s;
            });
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
            setUserState(s => {
              var s = userState;
              s.name.lastname = e.target.value;
              return s;
            });
          setFieldDirty(true, "name.lastname");
        }}
          onBlur={() => {
            setFieldTouched(true, "name.lastname");
          }}
        />
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
            setUserState(s => {
              var s = userState;
              s.name.address = e.target.value;
              return s;
            });
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

