import { useDetailsContext } from './useDetailsContext';
import { Button } from '../shadcn/ui/button';
import { useFormContext } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '../shadcn/ui/sheet';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../shadcn/ui/select';
import { Label } from '../shadcn/ui/label';
import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../shadcn/ui/popover';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { Calendar } from '../shadcn/ui/calendar';
import { cn } from '../shadcn/lib/utils';
import { Input } from '../shadcn/ui/input';
import { toast } from '../shadcn/ui/use-toast';
import { ToastAction } from '../shadcn/ui/toast';
import { FormMessage } from '../shadcn/ui/form';
export default function Details({
	replacementTitle,
	acceptRequest,
	canDelete,
	children,
}: React.PropsWithChildren<{
	replacementTitle?: string;
	canDelete?: boolean;
	acceptRequest?: boolean;
}>) {
	const {
		isAddMode,
		isEditMode,
		setIsAddMode,
		setIsEditMode,
		title,
		id,
		canEdit,
	} = useDetailsContext();

	const { handleSubmit } = useFormContext();
	const navigate = useNavigate();

	const [quantity, setQuantity] = useState<number>(1);
	const [vehicleType, setVehicleType] = useState<string>();
	const [date, setDate] = useState<string>();
	const [time, setTime] = useState<string>();

	const onSubmit = (_: any) => {
		if (isAddMode) {
			setIsAddMode(false);
			navigate(-1);
		} else if (isEditMode) {
			setIsEditMode(false);
		} else {
			setIsEditMode(true);
		}
	};

	const isTeacher = title === 'Teaching post';
	const isDoctor = title === 'Medical case';
	const isTeacherOrDoctor = isTeacher || isDoctor;

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<div className="h-16 w-full flex justify-between pl-6 pr-12  items-center bg-white rounded-b-lg">
				<h1 className="text-3xl font-bold text-black">
					{isAddMode && !replacementTitle
						? `Add ${title}`
						: isEditMode
							? `Editing ` + replacementTitle ?? `${title} - ${id}`
							: replacementTitle ?? `${title} - ${id}` + ` Details`}
				</h1>
				{canEdit && (
					<Button className="text-white w-32 h-10 text-lg" type="submit">
						{isAddMode && !replacementTitle
							? 'Add'
							: isEditMode
								? 'Save'
								: 'Edit'}
					</Button>
				)}
				{canDelete && (
					<Button
						className="text-white w-32 h-10 text-lg"
						onClick={() => {
							toast({
								title: 'Deleted!',
								description: `The ${title} has been deleted.`,
							});
							navigate(-1);
						}}
					>
						Delete
					</Button>
				)}
				{acceptRequest && (
					<Sheet>
						<SheetTrigger asChild>
							<Button className="text-white w-44 h-10 text-lg">
								Accept Request
							</Button>
						</SheetTrigger>
						<SheetContent>
							<SheetHeader>
								<SheetTitle>Accept Request</SheetTitle>
								<SheetDescription>
									Please fill the below fields then click accept.
								</SheetDescription>
							</SheetHeader>
							<div className="flex flex-col gap-6 py-6">
								{!isTeacherOrDoctor && (
									<>
										<div className="flex flex-col gap-2">
											<Label>Quantity</Label>
											<Input
												type="number"
												onChange={(e) =>
													setQuantity(Math.abs(parseInt(e.target.value)))
												}
												value={quantity}
											/>
										</div>
										<div className="flex flex-col gap-2">
											<Label>Type of vehicle</Label>
											<Select
												onValueChange={(value) => setVehicleType(value)}
												value={vehicleType}
											>
												<SelectTrigger>
													<SelectValue placeholder="Select the type of vehicle to pick up your donation" />
												</SelectTrigger>
												<SelectContent>
													<SelectItem value="truck">Truck</SelectItem>
													<SelectItem value="car">Car</SelectItem>
													<SelectItem value="motorcycle">Motorcyle</SelectItem>
												</SelectContent>
											</Select>
										</div>
									</>
								)}
								<div className="flex flex-col gap-2">
									<Label>
										{isTeacherOrDoctor
											? isTeacher
												? 'Class Date'
												: 'Appointment Date'
											: 'Donation Pickup Date'}
									</Label>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant={'outline'}
												className={cn(
													'w-full justify-start text-left font-normal',
													!date && 'text-muted-foreground'
												)}
											>
												<CalendarIcon className="mr-2 h-4 w-4" />
												{date ? format(date, 'PPP') : <span>Pick a date</span>}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-auto p-0">
											<Calendar
												mode="single"
												selected={date}
												onSelect={setDate}
												initialFocus
											/>
										</PopoverContent>
									</Popover>
								</div>
								<div className="flex flex-col gap-2">
									<Label>
										{isTeacherOrDoctor
											? isTeacher
												? 'Class Time'
												: 'Appointment Time'
											: 'Donation Pickup Time'}
									</Label>
									<Input
										type="time"
										className="w-full h-10 border border-gray-300 rounded-md px-4"
										onChange={(e) => setTime(e.target.value)}
									/>
								</div>
							</div>
							<SheetFooter>
								<SheetClose asChild>
									<Button
										type="submit"
										disabled={!vehicleType || !date || !time || !quantity}
										onClick={() => {
											toast({
												title: 'Donation request accepted!',
												description: `
													The ${vehicleType} will be dispatched on ${format(
														date ?? '',
														'PPP'
													)} at ${time} to pick up your donation.
												`,
												action: (
													<ToastAction altText="Goto schedule to undo">
														Dismiss
													</ToastAction>
												),
											});
											navigate(-1);
										}}
										className="text-white w-44 h-10 text-lg"
									>
										Accept request
									</Button>
								</SheetClose>
							</SheetFooter>
						</SheetContent>
					</Sheet>
				)}
			</div>
			<div className="flex flex-col w-full h-full items-center justify-center p-5">
				<div className="flex flex-col bg-white w-full rounded-lg">
					{children}
				</div>
			</div>
		</form>
	);
}
