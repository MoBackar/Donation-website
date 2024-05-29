import { notifications } from '../../../assets/dummyData';
import { DataTable } from '../../../Components/shadcn/ui/data-table';
import { notification } from '../../../types';
import { ColumnDef } from '@tanstack/react-table';

export const columns: ColumnDef<notification>[] = [
	{
		accessorKey: 'id',
		header: 'ID',
		cell: ({ row }) => <div className="capitalize">{row.getValue('id')}</div>,
	},
	{
		accessorKey: 'name',
		header: 'Name',
		cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
	},
	{
		accessorKey: 'title',
		header: 'Title',
		cell: ({ row }) => <div className="capitalize">{row.getValue('title')}</div>,
	},
	{
		accessorKey: 'description',
		header: 'Description',
		cell: ({ row }) => (
			<div className="lowercase">{row.getValue('description')}</div>
		),
	},
];

export default function Notifications() {
	const data: any[] = notifications;
	return (
		<div className="flex h-full w-full">
			<DataTable columns={columns} data={data} />
		</div>
	);
}
