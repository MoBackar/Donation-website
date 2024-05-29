import { columns } from './ColumnDef/UnRegDonColDef';
import { donor } from '../../../assets/dummyData';
import {  UnRegisteredDonorsOptions } from '../../../assets/filterOptions';
import Filter from '../../../Components/Filter';
import { DataTable } from '../../../Components/shadcn/ui/data-table';
import { useState} from 'react';
import { Donor } from '../../../types'

export default function DonorRequests() {
	const items: any[] = donor.filter((org) => org.status === 'pending');
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