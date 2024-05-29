import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TOrgPost } from '../../../types';
import { Card } from '../../../Components/shadcn/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../../../Components/shadcn/ui/form';
import { Input } from '../../../Components/shadcn/ui/input';
import { Button } from '../../../Components/shadcn/ui/button';
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '../../../Components/shadcn/ui/select';
import { Textarea } from '../../../Components/shadcn/ui/textarea';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '../../../Components/shadcn/ui/use-toast';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { Label } from '../../../Components/shadcn/ui/label';

export default function CreatePost() {
	const [type, setType] = useState<string>('');
	const [marker, setMarker] = useState({
		lat: 29.987031,
		lng: 31.440164,
	});
	const navigate = useNavigate();
	const schema = {
		stationary: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			type: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
		}),
		medical_case: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			patientName: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			age: z.number().min(0, {
				message: 'Age must be at least 0.',
			}),
			weight: z.number().min(0, {
				message: 'Weight must be at least 0.',
			}),
			orgName: z.string().min(2, {
				message: 'Organisation name must be at least 2 characters',
			}),
		}),
		teaching_post: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			students: z.number().min(0, {
				message: 'Number of students must be at least 0.',
			}),
			subject: z.string().min(2, {
				message: 'Subject must be at least 2 characters.',
			}),
		}),
		blood_donation: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			bloodType: z.string().min(2, {
				message: 'Blood type must be at least 2 characters.',
			}),
			volume: z.number().min(0, {
				message: 'Volume must be at least 0.',
			}),
			hospital: z.string().min(2, {
				message: 'Hospital name must be at least 2 characters.',
			}),
			area: z.string().min(2, {
				message: 'Area must be at least 2 characters.',
			}),
			gov: z.string().min(2, {
				message: 'Governorate must be at least 2 characters.',
			}),
			address: z.string().min(2, {
				message: 'Address must be at least 2 characters.',
			}),
		}),
		medical_supplies: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			type: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			use: z.string().min(2, {
				message: 'Use must be at least 2 characters.',
			}),
		}),
		food: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			type: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
		}),
		toys: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			type: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			ageGroup: z.string().min(2, {
				message: 'Age group must be at least 2 characters',
			}),
			gender: z.string().min(2, {
				message: '',
			}),
		}),
		clothes: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			type: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			ageGroup: z.string().min(2, {
				message: 'Age group must be at least 2 characters',
			}),
			season: z.string().min(2, {
				message: 'Season must be at least 2 characters.',
			}),
			material: z.string().min(2, {
				message: 'Material must be at least 2 characters',
			}),
		}),
		book: z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
			type: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			bookName: z.string().min(2, {
				message: 'Book name must be at least 2 characters.',
			}),
		}),
		'': z.object({
			name: z.string().min(2, {
				message: 'Name must be at least 2 characters.',
			}),
			postCategory: z.string().min(2, {
				message: 'Type must be at least 2 characters.',
			}),
			quantity: z.number().min(0, {
				message: 'Quantity must be at least 0.',
			}),
		}),
	};

	const form = useForm<TOrgPost>({
		// resolver: zodResolver(schema[type as keyof typeof schema]),
		defaultValues: {
			id: undefined,
			name: '',
			type: '',
			quantity: 0,
			address: '',
			postCategory: '',
			itemType: '',
			street: '',
			location: '',
			specialty: '',
			condition: '',
			area: '',
			age: 0,
			ageGroup: '',
			author: '',
			bloodType: '',
			bookName: '',
			category: '',
			city: '',
			description: '',
			edition: '',
			gender: '',
			gov: '',
			hospital: '',
			language: '',
			material: '',
			orgName: '',
			patientName: '',
			img: '',
			season: '',
			students: 0,
			subject: '',
			summary: '',
			use: '',
		},
	});

	const { watch } = form;
	useEffect(() => {
		setType(watch('type'));
	}, [watch('type')]);

	const { control, handleSubmit } = form;
	const onSubmit = (data: TOrgPost) => {
		toast({
			title: 'Post created!',
		});
		navigate('/organisation/');
	};

	const typeField = (
		<FormField
			control={control}
			name="type"
			render={({ field }) => (
				<FormItem className="flex flex-col h-[100px] w-72">
					<FormLabel>Type</FormLabel>
					<FormControl>
						<Input placeholder="Enter type" type="text" {...field} />
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	);

	const formBody = {
		stationary: typeField,
		medical_case: (
			<>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="patientName"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Patient name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter patient name"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="age"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-56">
								<FormLabel>Patient Age</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter patient age"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="weight"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-56">
								<FormLabel>Patient weight</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter patient weight"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="orgName"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Organisation Name</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter organisation name"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="gender"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-56">
								<FormLabel>Patient Gender</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select patient gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="gov"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Governorate</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter governorate"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="address"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input placeholder="Enter address" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="area"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Area</FormLabel>
								<FormControl>
									<Input placeholder="Enter area" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="street"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Street</FormLabel>
								<FormControl>
									<Input placeholder="Enter street" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<div className="flex flex-col gap-2">
						<Label className="flex gap-2 items-center">
							Location
							<span className="text-xs text-gray-500">
								Click on the map to set the location
							</span>
						</Label>
						<APIProvider apiKey={'AIzaSyCYG5qJiDS6VEhVTucACoUiSsV2IuNGykk'}>
							<Map
								zoom={12}
								center={{ lat: 29.987031, lng: 31.440164 }}
								style={{
									height: '200px',
									width: '400px',
								}}
								onClick={(event) => {
									// @ts-ignore
									setMarker(event.detail.latLng);
								}}
							>
								<Marker position={marker} />
							</Map>
						</APIProvider>
					</div>
					<FormField
						control={control}
						name="description"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[200px] w-[30rem]">
								<FormLabel>Case Description</FormLabel>
								<FormControl>
									<Textarea
										placeholder="Enter case description"
										{...field}
										className="resize-none"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</>
		),
		teaching_post: (
			<>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="students"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Area</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter number of students"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="subject"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Subject</FormLabel>
								<FormControl>
									<Input placeholder="Enter subject" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="gender"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Your Gender</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select your gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="weight"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Weight</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter patient weight"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</>
		),
		blood_donation: (
			<>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="bloodType"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Blood Type</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter blood type"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="volume"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Volume</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter volume of blood"
										type="number"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="hospital"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Hospital</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter hospital name"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="area"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Area</FormLabel>
								<FormControl>
									<Input placeholder="Enter area" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="gov"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Governorate</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter governorate"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="address"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Address</FormLabel>
								<FormControl>
									<Input placeholder="Enter address" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</>
		),
		medical_supplies: (
			<>
				{typeField}
				<FormField
					control={control}
					name="use"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel>Use</FormLabel>
							<FormControl>
								<Input
									placeholder="Enter use of medical supply"
									type="text"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</>
		),
		food: (
			<FormField
				control={control}
				name="type"
				render={({ field }) => (
					<FormItem className="flex flex-col h-[100px] w-72">
						<FormLabel>Food type</FormLabel>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<FormControl>
								<SelectTrigger>
									<SelectValue placeholder="Select the type of food" />
								</SelectTrigger>
							</FormControl>
							<SelectContent>
								<SelectItem value="male">Fresh</SelectItem>
								<SelectItem value="female">Canned</SelectItem>
								<SelectItem value="baked">Baked</SelectItem>
								<SelectItem value="all">Fruits and vegtables</SelectItem>
							</SelectContent>
						</Select>
						<FormMessage />
					</FormItem>
				)}
			/>
		),
		toys: (
			<>
				<div className="flex gap-2">
					{typeField}
					<FormField
						control={control}
						name="ageGroup"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Age Group</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter toy age group"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="gender"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Patient Gender</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select patient gender" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">Male</SelectItem>
										<SelectItem value="female">Female</SelectItem>
										<SelectItem value="all">All</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="category"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Category</FormLabel>
								<Select
									onValueChange={field.onChange}
									defaultValue={field.value}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select the category of the yoy" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										<SelectItem value="male">Board Games</SelectItem>
										<SelectItem value="female">Stuffed Toys</SelectItem>
										<SelectItem value="all">Dolls</SelectItem>
										<SelectItem value="all">Dolls</SelectItem>
										<SelectItem value="all">Cars</SelectItem>
										<SelectItem value="all">Outdoor</SelectItem>
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</>
		),
		clothes: (
			<>
				<div className="flex gap-2">
					{typeField}
					<FormField
						control={control}
						name="ageGroup"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Age Group</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter clothes age group"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="season"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Season</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter clothes season"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="material"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Material</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter clothes material"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="gender"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[100px] w-72">
							<FormLabel>Gender</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select cloth gender" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									<SelectItem value="male">Male</SelectItem>
									<SelectItem value="female">Female</SelectItem>
									<SelectItem value="all">All</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
			</>
		),
		book: (
			<>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="bookName"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Book Name</FormLabel>
								<FormControl>
									<Input placeholder="Enter book name" type="text" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="author"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Author</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter book author"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className="flex gap-2">
					<FormField
						control={control}
						name="language"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Language</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter book language"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={control}
						name="edition"
						render={({ field }) => (
							<FormItem className="flex flex-col h-[100px] w-72">
								<FormLabel>Edition</FormLabel>
								<FormControl>
									<Input
										placeholder="Enter book edition"
										type="text"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={control}
					name="summary"
					render={({ field }) => (
						<FormItem className="flex flex-col h-[200px] w-[30rem]">
							<FormLabel>Summary</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Enter book summary"
									{...field}
									className="resize-none"
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
		<div className="absolute flex h-full w-full flex-col items-center justify-center">
			<Card className="bg-white px-12 py-6 flex flex-col rounded-2xl mt-5 h-[120vh] w-[140vh] text-black border border-gray-700">
				<Form {...form}>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col items-center gap-5"
					>
						<div className="flex flex-col items-center">
							<div className="text-3xl font-bold">Create Donation Post</div>
						</div>
						<div className="flex flex-col items-center justify-center">
							<div className="flex gap-5">
								<FormField
									control={control}
									name="name"
									render={({ field }) => (
										<FormItem className="flex flex-col h-[100px] w-72">
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter post name"
													type="text"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="quantity"
									render={({ field }) => (
										<FormItem className="flex flex-col h-[100px] w-72">
											<FormLabel>Donation Quantity</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter post quantity"
													type="number"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									control={control}
									name="img"
									render={({ field }) => (
										<FormItem className="flex flex-col h-[100px] w-72">
											<FormLabel>Post image</FormLabel>
											<FormControl>
												<Input
													placeholder="Enter post quantity"
													type="file"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormField
								control={control}
								name="postCategory"
								render={({ field }) => (
									<FormItem className="flex flex-col h-[100px] w-72">
										<FormLabel>Donation Category</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Select the category for the post" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="clothes">Clothes</SelectItem>
												<SelectItem value="toys">Toys</SelectItem>
												<SelectItem value="food">Food</SelectItem>
												<SelectItem value="medical_supplies">
													Medical Supplies
												</SelectItem>
												<SelectItem value="stationary">Stationary</SelectItem>
												<SelectItem value="book">Book</SelectItem>
												<SelectItem value="blood_donation">
													Blood Donation
												</SelectItem>
												<SelectItem value="teaching_post">
													Teaching Post
												</SelectItem>
												<SelectItem value="medical_case">
													Medical Case
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
							<div className="flex flex-col items-center justify-start h-[540px]">
								{formBody[form.watch('postCategory') as keyof typeof formBody]}
							</div>
						</div>
						<Button
							variant="outline"
							size="lg"
							className="text-white bg-black p-6"
							type="submit"
						>
							Submit
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
