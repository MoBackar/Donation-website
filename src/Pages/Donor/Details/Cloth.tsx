import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { clothes } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TClothesItem } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import { useEffect } from 'react';
import Details from '../../../Components/details/Details';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import ImageField from '../../../Components/details/fields/ImageField';

export default function Cloth({ children }: { children?: React.ReactNode }) {
	const { id } = useParams<{ id: string }>();
	const cloth = clothes.find(
		(item) => item.id.toString() === id
	) as TClothesItem;

	const formSchema = z.object({
		name: z
			.string({
				message: 'Please enter a valid name.',
			})
			.min(2, {
				message: 'Name must be at least 2 characters.',
			}),
		img: z
			.string({
				message: 'Please enter a valid URL.',
			})
			.url({
				message: 'Please enter a valid URL.',
			}),
		quantity: z
			.number({
				message: 'Please enter a valid number.',
			})
			.min(0, {
				message: 'Quantity must be a positive number.',
			}),
		type: z
			.string({
				message: 'Please enter a valid type.',
			})
			.min(2, {
				message: 'Type must be at least 2 characters.',
			}),
		ageGroup: z
			.string({
				message: 'Please enter a valid age group.',
			})
			.min(2, {
				message: 'Age group must be at least 2 characters.',
			}),
		season: z
			.string({
				message: 'Please enter a valid season.',
			})
			.min(2, {
				message: 'Season must be at least 2 characters.',
			}),
		material: z
			.string({
				message: 'Please enter a valid material.',
			})
			.min(2, {
				message: 'Material must be at least 2 characters',
			}),
		gender: z
			.string({
				message: 'Please enter a valid gender.',
			})
			.min(2, {
				message: 'Gender must be at least 2 characters.',
			}),
	});

	const form = useForm<TClothesItem>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: '',
			type: '',
			ageGroup: '',
			quantity: 0,
			img: '',
			season: '',
			material: '',
			gender: '',
		},
	});

	useEffect(() => {
		if (cloth) {
			form.reset(cloth);
		}
	}, [cloth]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Clothes item" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="name"
							label="Name"
							description="Name of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="type"
							label="Type"
							description="Type of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="ageGroup"
							label="Age Group"
							description="Age group of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="quantity"
							label="Quantity"
							description="Quantity of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="season"
							label="Season"
							description="Season of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="material"
							label="Material"
							description="Material of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="gender"
							label="Gender"
							description="Gender of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<ImageField
							name="img"
							label="Image"
							description="Image of the clothes item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
					</div>
				</Details>
			</DetailsContextProvider>
		</Form>
	);
}
