import { useState } from 'react';
import { donor } from '../../../assets/dummyData';
import Filter from '../../../Components/Filter';
import { DataTable } from '../../../Components/shadcn/ui/data-table';
import { Donor } from '../../../types';
import {  UnRegisteredDonorsOptions } from '../../../assets/filterOptions';
import { columns } from './ColumnDef/RegDonColDef';

export default function Donors() {
	const items: any[] = donor.filter((org) => org.status === 'approved');
	const filterOptions: any[] = UnRegisteredDonorsOptions;
	const [data, setData] = useState<Donor[]>(items);

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
