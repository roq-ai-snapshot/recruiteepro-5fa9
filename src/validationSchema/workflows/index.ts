import * as yup from 'yup';

export const workflowValidationSchema = yup.object().shape({
  step_name: yup.string().required(),
  step_order: yup.number().integer().required(),
  business_organization_id: yup.string().nullable().required(),
  job_opening_id: yup.string().nullable().required(),
});
