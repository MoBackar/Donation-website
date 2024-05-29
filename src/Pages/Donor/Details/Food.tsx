import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { foods } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TFoodItem } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import { useEffect } from 'react';
import Details from '../../../Components/details/Details';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import ImageField from '../../../Components/details/fields/ImageField';

export default function Food({ children }: { children?: React.ReactNode }) {
	const { id } = useParams<{ id: string }>();
	const food = foods.find((item) => item.id.toString() === id) as TFoodItem;

	const form = useForm<TFoodItem>({
		defaultValues: {
			id: undefined,
			name: '',
			type: 'fresh',
			img: '',
			quantity: 0,
		},
	});

	useEffect(() => {
		if (food) {
			form.reset(food);
		}
	}, [food]);

	const foodType = form.watch('type');

	const typeUnit = {
		fresh: 'kg',
		canned: 'liters',
		baked: 'items',
		'fruits and vegetables': 'kg',
	};

	return (
		<Form {...form}>
			<DetailsContextProvider title="Clothes item" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="name"
							label="Name"
							description="Name of the food"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="type"
							label="Type"
							description="Type of the food"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<NumberField
							name="quantity"
							label={`Quantity (${typeUnit[foodType as keyof typeof typeUnit]})`}
							description={`Quantity of the clothes item in ${typeUnit[foodType as keyof typeof typeUnit]}`}
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<ImageField
							name="img"
							label="Image"
							description="Image of the food item"
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
