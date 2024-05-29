import { Donor } from '../../../../types';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../../../../Components/shadcn/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../../../../Components/shadcn/ui/dropdown-menu';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import { ToastAction } from '../../../../Components/shadcn/ui/toast';
import { useToast } from '../../../../Components/shadcn/ui/use-toast';

export const columns: ColumnDef<Donor>[] = [
	{
		accessorKey: 'firstname',
		header: 'First Name',
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue('firstname')}</div>
		),
	},
	{
		accessorKey: 'secondname',
		header: 'Second Name',
		cell: ({ row }) => (
			<div className="capitalize">{row.getValue('secondname')}</div>
		),
	},
	{
		accessorKey: 'type',
		header: 'Type',
		cell: ({ row }) => <div>{row.getValue('type')}</div>,
	},
	{
		accessorKey: 'email',
		header: 'Email',
		cell: ({ row }) => <div className="lowercase">{row.getValue('email')}</div>,
	},
	{
		accessorKey: 'area',
		header: 'Area',
		cell: ({ row }) => <div>{row.getValue('area')}</div>,
	},
	{
		accessorKey: 'gov',
		header: 'Gov',
		cell: ({ row }) => <div>{row.getValue('gov')}</div>,
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const handleAccept = () => {
				// Change the status of the organization to rejected
				const donor = row.original;
				donor.status = 'approved';
				// Perform any other necessary actions
			};
			return <Button onClick={handleAccept}>Accept Request</Button>;
		},
	},
	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const handleReject = () => {
				// Change the status of the organization to rejected
				const donor = row.original;
				donor.status = 'rejected';
				// Perform any other necessary actions
			};
			return <Button onClick={handleReject}>Reject Request</Button>;
		},
	},

	{
		id: 'actions',
		enableHiding: false,
		cell: ({ row }) => {
			const { toast } = useToast()
			
			return (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="h-8 w-8 p-0">
							<DotsHorizontalIcon className="h-4 w-4 " />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>More Actions</DropdownMenuLabel>

						<DropdownMenuItem
							onClick={() => {
								toast({
									title: 'File Downloaded Successfuly ',
									description: '',
									action: <ToastAction altText="Go to see">Undo</ToastAction>,
								});
							}}
						>
							Download Submited Documents
						</DropdownMenuItem>

						<DropdownMenuSeparator />
					</DropdownMenuContent>
				</DropdownMenu>
			);
		},
	},
];
