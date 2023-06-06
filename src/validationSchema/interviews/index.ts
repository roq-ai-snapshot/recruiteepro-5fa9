import * as yup from 'yup';

export const interviewValidationSchema = yup.object().shape({
  date_time: yup.date().required(),
  feedback: yup.string(),
  job_application_id: yup.string().nullable().required(),
  interviewer_id: yup.string().nullable().required(),
});
