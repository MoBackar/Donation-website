import { columns } from './ColumnDef/UnRegOrgColDef';
import { organizations } from '../../../assets/dummyData';
import { RegisteredOrganizationsOptions } from '../../../assets/filterOptions';
import Filter from '../../../Components/Filter';
import { useState } from 'react';
import { Organization } from '../../../types';
import { DataTable } from '../../../Components/shadcn/ui/data-table';
export default function OrganizationRequests() {
	const items: any[] = organizations.filter((org) => org.status === 'pending');
	const filterOptions: any[] = RegisteredOrganizationsOptions;
	const [data, setData] = useState<Organization[]>(items);

	return (
		<div className="flex h-full w-full">

            <Filter
				setData={setData}
				dummyData={items}
				columnFilters={filterOptions}
				searchColumn={''}
				hidesearchbar={true}
			/>
			<DataTable columns={columns} data={data} />
		</div>
	);
}
