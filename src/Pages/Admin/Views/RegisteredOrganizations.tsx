import { useState } from 'react';
import Filter from '../../../Components/Filter';
import { RegisteredOrganizationsOptions } from '../../../assets/filterOptions';
import { organizations } from '../../../assets/dummyData';
import { Organization } from '../../../types';
import { columns } from './ColumnDef/RegOrgColDef';
import { DataTable } from '../../../Components/shadcn/ui/data-table';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';


export default function RegisteredOrganizations() {
	const items: any[] = organizations.filter((org) => org.status === 'approved');
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
