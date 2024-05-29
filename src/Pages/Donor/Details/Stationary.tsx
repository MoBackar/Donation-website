import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { schoolSupplies } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TStationaryItem } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import { useEffect } from 'react';
import ImageField from '../../../Components/details/fields/ImageField';
import Details from '../../../Components/details/Details';

export default function Stationary({
	children,
}: {
	children?: React.ReactNode;
}) {
	const { id } = useParams<{ id: string }>();
	const stationary = schoolSupplies.find(
		(item) => item.id.toString() === id
	) as TStationaryItem;

	const formSchema = z.object({
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
	});

	const form = useForm<TStationaryItem>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: undefined,
			name: '',
			type: '',
			quantity: 0,
			img: '',
			itemType: 'stationary',
		},
	});

	useEffect(() => {
		if (stationary) {
			form.reset(stationary);
		}
	}, [stationary]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Stationary" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="name"
							label="Item Name"
							description="Name of the stationary item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="type"
							label="Type"
							description="Type of the stationary item"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="quantity"
							label="Quantity"
							description="Quantity of the book"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<ImageField
							name="img"
							label="Image"
							description="Image of the book"
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
