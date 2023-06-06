import * as yup from 'yup';
import { jobOpeningValidationSchema } from 'validationSchema/job-openings';
import { reportValidationSchema } from 'validationSchema/reports';
import { workflowValidationSchema } from 'validationSchema/workflows';

export const businessOrganizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  user_id: yup.string().nullable().required(),
  job_opening: yup.array().of(jobOpeningValidationSchema),
  report: yup.array().of(reportValidationSchema),
  workflow: yup.array().of(workflowValidationSchema),
});
