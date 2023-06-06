import { BusinessOrganizationInterface } from 'interfaces/business-organization';
import { JobOpeningInterface } from 'interfaces/job-opening';

export interface WorkflowInterface {
  id?: string;
  business_organization_id: string;
  job_opening_id: string;
  step_name: string;
  step_order: number;

  business_organization?: BusinessOrganizationInterface;
  job_opening?: JobOpeningInterface;
  _count?: {};
}
