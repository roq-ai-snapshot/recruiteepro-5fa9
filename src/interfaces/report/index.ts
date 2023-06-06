import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface ReportInterface {
  id?: string;
  business_organization_id: string;
  report_data: string;
  date_generated: Date;

  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
