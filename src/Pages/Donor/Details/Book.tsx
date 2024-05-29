import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { z } from 'zod';
import { schoolSupplies } from '../../../assets/dummyData';
import { DetailsContextProvider } from '../../../Components/details/useDetailsContext';
import { TBookItem } from '../../../types';
import { Form } from '../../../Components/shadcn/ui/form';
import TextField from '../../../Components/details/fields/TextField';
import NumberField from '../../../Components/details/fields/NumberField';
import { useEffect } from 'react';
import ImageField from '../../../Components/details/fields/ImageField';
import Details from '../../../Components/details/Details';
import TextareaField from '../../../Components/details/fields/TextareaField';

export default function Book({ children }: { children?: React.ReactNode }) {
	const { id } = useParams<{ id: string }>();
	const book = schoolSupplies.find(
		(item) => item.id.toString() === id
	) as TBookItem;

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
		bookName: z
			.string({
				message: 'Please enter a valid book name.',
			})
			.min(2, {
				message: 'Book name must be at least 2 characters.',
			}),
		author: z
			.string({
				message: 'Please enter a valid author.',
			})
			.min(2, {
				message: 'Author must be at least 2 characters.',
			}),
		language: z
			.string({
				message: 'Please enter a valid language.',
			})
			.min(2, {
				message: 'Language must be at least 2 characters.',
			}),
		edition: z
			.string({
				message: 'Please enter a valid edition.',
			})
			.min(2, {
				message: 'Edition must be at least 2 characters.',
			}),
		summary: z
			.string({
				message: 'Please enter a valid summary.',
			})
			.min(2, {
				message: 'Summary must be at least 40 characters.',
			}),
	});

	const form = useForm<TBookItem>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			id: undefined,
			name: '',
			quantity: 2,
			img: '',
			author: '',
			bookName: '',
			language: '',
			edition: '',
			summary: '',
		},
	});

	useEffect(() => {
		if (book) {
			form.reset(book);
		}
	}, [book]);

	return (
		<Form {...form}>
			<DetailsContextProvider title="Book" id={id} canEdit={false}>
				<Details acceptRequest={!children} canDelete={!!children}>
					<div className="grid grid-cols-2 gap-5 p-6">
						{children}
						<TextField
							name="bookName"
							label="Book Name"
							description="Name of the book"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="author"
							label="Author"
							description="Author of the book"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="language"
							label="Language"
							description="Language of the book"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextField
							name="edition"
							label="Edition"
							description="Edition of the book"
							detailsClassName=""
							inputClassName=""
							placeholder=""
						/>
						<TextareaField
							name="summary"
							label="Summary"
							description="Summary of the book"
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
