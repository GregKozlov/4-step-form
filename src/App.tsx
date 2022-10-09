import {useMultiStepForm} from './useMultiStepForm';
import './style.scss';
import {UserForm} from './UserForm';
import {AddressForm} from './AddressForm';
import {AccountForm} from './AccountForm';
import {FormEvent, useState} from 'react';

type FormData = {
  firstName: string;
  lastName: string;
  age: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  email: string;
  password: string;
};

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  age: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  email: '',
  password: ''
};

function App() {
  const [data, setData] = useState(INITIAL_DATA);

  function updateFields(fields: Partial<FormData>) {
    setData(prev => {
      return {...prev, ...fields};
    });
  }

  const {steps, currentStepIndex, step, isFirstStep, isLastStep, back, next} = useMultiStepForm([
    <UserForm {...data} updateFields={updateFields} />,
    <AddressForm {...data} updateFields={updateFields} />,
    <AccountForm {...data} updateFields={updateFields} />
  ]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isLastStep) return next();
    alert('Successful Account Creation');
  }

  return (
    <div className="form">
      <form onSubmit={onSubmit}>
        <div className="form__count">
          {currentStepIndex + 1}/{steps.length}
        </div>
        <div className="form__field">{step}</div>
        <div className="form__buttons">
          {!isFirstStep && (
            <button type="button" onClick={back}>
              Back
            </button>
          )}

          <button type="submit">{isLastStep ? 'Finish' : 'Next'}</button>
        </div>
      </form>
    </div>
  );
}

export default App;
