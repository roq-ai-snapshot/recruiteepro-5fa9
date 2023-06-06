import * as yup from 'yup';

export const reportValidationSchema = yup.object().shape({
  report_data: yup.string().required(),
  date_generated: yup.date().required(),
  business_organization_id: yup.string().nullable().required(),
});
