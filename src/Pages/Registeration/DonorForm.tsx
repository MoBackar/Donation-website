import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../Components/shadcn/ui/form';
import { Input } from '../../Components/shadcn/ui/input';
import { useFormContext } from 'react-hook-form';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../Components/shadcn/ui/select';

export default function DonorForm() {
	const { control, watch } = useFormContext();

	const selectedDonorType = watch('donor_type');

	const donorFormMap = {
		regular: <></>,
		teacher: (
			<>
				<div className="flex gap-5">
					<FormField
						control={control}
						name="subjects"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel className="text-base font-heading ml-1">
									Subjects
								</FormLabel>
								<FormControl>
									<Input
										className="shadow-inner"
										placeholder="Subjects"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="teach"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel className="text-base font-heading ml-1">
									How many classes can you teach?
								</FormLabel>
								<FormControl>
									<Input className="shadow-inner" placeholder="5" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="proofteacher"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px]">
							<FormLabel className="text-base font-heading ml-1">
								Proof of Work
							</FormLabel>
							<FormControl>
								<Input
									className="flex rounded-full border space-x-2 shadow-inner"
									id="file"
									type="file"
									multiple={true}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</>
		),
		doctor: (
			<>
				<div className="flex gap-5">
					<FormField
						control={control}
						name="specialty"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel className="text-base font-heading ml-1">
									Specialty
								</FormLabel>
								<FormControl>
									<Input
										className="shadow-inner"
										placeholder="Insert Specialty"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="cases"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel className="text-base font-heading ml-1">
									How many cases can you take?
								</FormLabel>
								<FormControl>
									<Input className="shadow-inner" placeholder="6" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="proofdoctor"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px]">
							<FormLabel className="text-base font-heading ml-1">
								Proof of Work
							</FormLabel>
							<FormControl>
								<Input
									className="flex rounded-full border space-x-2 shadow-inner"
									id="file"
									type="file"
									multiple={true}
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</>
		),
	};

	return (
		<>
			<FormField
				control={control}
				name="address"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px] w-full">
						<FormLabel className="text-base font-heading ml-1">
							Address
						</FormLabel>
						<FormControl>
							<Input
								className="shadow-inner"
								placeholder="123 Main St."
								{...field}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="flex gap-5">
				<FormField
					control={control}
					name="area"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								Area
							</FormLabel>
							<FormControl>
								<Input className="shadow-inner" placeholder="Area" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={control}
					name="city"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel className="text-base font-heading ml-1">
								City
							</FormLabel>
							<FormControl>
								<Input className="shadow-inner" placeholder="City" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</div>
			<FormField
				control={control}
				name="donor_type"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px]">
						<FormLabel className="text-base font-heading ml-1">
							Type of donation
						</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger className="shadow-inner">
									<SelectValue placeholder="Select the type of donation you can offer" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="regular">Regular</SelectItem>
								<SelectItem value="teacher">Teacher</SelectItem>
								<SelectItem value="doctor">Doctor</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
			<div className="flex flex-col h-[200px]">
				{
					donorFormMap[
						(selectedDonorType ?? 'regular') as keyof typeof donorFormMap
					]
				}
			</div>
		</>
	);
}
