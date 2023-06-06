import { JobOpeningInterface } from 'interfaces/job-opening';
import { ReportInterface } from 'interfaces/report';
import { WorkflowInterface } from 'interfaces/workflow';
import { UserInterface } from 'interfaces/user';

export interface BusinessOrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  job_opening?: JobOpeningInterface[];
  report?: ReportInterface[];
  workflow?: WorkflowInterface[];
  user?: UserInterface;
  _count?: {
    job_opening?: number;
    report?: number;
    workflow?: number;
  };
}
