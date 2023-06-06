import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createWorkflow } from 'apiSdk/workflows';
import { Error } from 'components/error';
import { workflowValidationSchema } from 'validationSchema/workflows';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';
import { JobOpeningInterface } from 'interfaces/job-opening';
import { getBusinessOrganizations } from 'apiSdk/business-organizations';
import { getJobOpenings } from 'apiSdk/job-openings';
import { WorkflowInterface } from 'interfaces/workflow';

function WorkflowCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: WorkflowInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createWorkflow(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<WorkflowInterface>({
    initialValues: {
      step_name: '',
      step_order: 0,
      business_organization_id: (router.query.business_organization_id as string) ?? null,
      job_opening_id: (router.query.job_opening_id as string) ?? null,
    },
    validationSchema: workflowValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Workflow
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="step_name" mb="4" isInvalid={!!formik.errors?.step_name}>
            <FormLabel>Step Name</FormLabel>
            <Input type="text" name="step_name" value={formik.values?.step_name} onChange={formik.handleChange} />
            {formik.errors.step_name && <FormErrorMessage>{formik.errors?.step_name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="step_order" mb="4" isInvalid={!!formik.errors?.step_order}>
            <FormLabel>Step Order</FormLabel>
            <NumberInput
              name="step_order"
              value={formik.values?.step_order}
              onChange={(valueString, valueNumber) =>
                formik.setFieldValue('step_order', Number.isNaN(valueNumber) ? 0 : valueNumber)
              }
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            {formik.errors.step_order && <FormErrorMessage>{formik.errors?.step_order}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<BusinessOrganizationInterface>
            formik={formik}
            name={'business_organization_id'}
            label={'Select Business Organization'}
            placeholder={'Select Business Organization'}
            fetcher={getBusinessOrganizations}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <AsyncSelect<JobOpeningInterface>
            formik={formik}
            name={'job_opening_id'}
            label={'Select Job Opening'}
            placeholder={'Select Job Opening'}
            fetcher={getJobOpenings}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'workflow',
  operation: AccessOperationEnum.CREATE,
})(WorkflowCreatePage);
