import { useNavigate } from 'react-router-dom';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '../Components/shadcn/ui/form';
import { Input } from '../Components/shadcn/ui/input';
import { z } from 'zod';
import { Button } from '../Components/shadcn/ui/button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card } from '../Components/shadcn/ui/card';
import { credentials } from '../assets/dummyData';
import { User } from '../types';

export default function Login() {
	const navigate = useNavigate();
	const formSchema = z.object({
		username: z.string().min(3, {
			message: 'Wrong Username.',
		}),
		password: z.string().min(6, {
			message: 'Wrong Password.',
		}),
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const user = credentials.find(
			(cred: User) =>
				cred.username === values.username && cred.password === values.password
		);

		if (user) {
			navigate(`/${user.type}`); // Navigate based on user type
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			alert('Invalid username or password.');
		}
	}

	return (
		<div className="absolute flex h-full w-full flex-col items-center justify-center">
			<Card className="flex h-[500px] w-[500px] flex-col gap-5 rounded-2xl border border-gray-700  p-12 text-2xl shadow-2xl">
				<div className="flex w-full flex-col items-center justify-center gap-5">
					<div className="text-3xl font-bold font-heading">Login</div>
					<div className="flex w-full items-center justify-center gap-1 text-lg font-body">
						<div className="">Don't have an account?</div>
						<a
							className=" text-primary-500 hover:text-primary-300 cursor-pointer font-medium underline"
							onClick={() => navigate('/register')}
						>
							Sign up.
						</a>
					</div>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-2"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="h-[100px]">
									<FormLabel className="text-base font-heading ml-1">
										Username
									</FormLabel>
									<FormControl>
										<Input
											className="shadow-inner"
											placeholder="ahmed123"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="h-[100px]">
									<FormLabel className="text-base font-heading ml-1">
										Password
									</FormLabel>
									<FormControl>
										<Input
											className="shadow-inner"
											type="password"
											placeholder="password123"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button
							type="submit"
							variant="default"
							size="lg"
							className="mt-5 text-xl font-heading w-full"
						>
							Login
						</Button>
					</form>
				</Form>
			</Card>
		</div>
	);
}
