import React from 'react';
import { withFormik, FormikProps } from 'formik';
import { CardElement, injectStripe } from 'react-stripe-elements';
import Field from '../../../utils/FieldAdapter';
import { Form, RenderField, Button, Alert, Label } from '../../common/components/web';
import { required, validateForm } from '../../../../../common/validation';
import { CardValues, CardFormProps } from '../types';

const commentFormSchema = {
  name: [required]
};

const validate = (values: CardValues) => validateForm(values, commentFormSchema);

class SubscriptionCardForm extends React.Component<CardFormProps & FormikProps<CardValues>, any> {
  public render() {
    const { handleSubmit, submitting, action, error, values } = this.props;
    return (
      <Form name="subscription" onSubmit={handleSubmit}>
        <Field
          name="name"
          component={RenderField}
          type="text"
          label="Name On Card"
          validate={required}
          value={values.name}
        />
        <Label>Payment Info</Label>
        <CardElement className="form-control" style={{ base: { lineHeight: '30px' } }} />
        {error && <Alert color="error">{error}</Alert>}
        <Button color="primary" type="submit" disabled={submitting} style={{ marginTop: 15 }}>
          {action}
        </Button>
      </Form>
    );
  }
}

const SubscriptionFormWithFormik = withFormik<CardFormProps, CardValues>({
  mapPropsToValues: () => ({ name: '' }),
  async handleSubmit(values, { props }) {
    const onSubmitForm = async ({ name }: any) => {
      const { stripe, onSubmit } = props;
      const { token, error } = await stripe.createToken({ name });
      if (error) {
        return;
      }
      const { id, card: { exp_month, exp_year, last4, brand } } = token;

      await onSubmit({
        token: id,
        expiryMonth: exp_month,
        expiryYear: exp_year,
        last4,
        brand
      });
    };
    await onSubmitForm(values);
  },
  validate: values => validate(values),
  displayName: 'SubscriptionForm', // helps with React DevTools,
  enableReinitialize: true
});

export default injectStripe(SubscriptionFormWithFormik(SubscriptionCardForm));
