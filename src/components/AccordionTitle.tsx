import { CheckIcon } from "@phosphor-icons/react";

interface IFProps {
	title: string;
	isCompleted: boolean;
}
export const AccordionTitle = ({ title, isCompleted }: IFProps) => {
	return (
		<span className="flex items-center justify-between">
			{title}
			{isCompleted && (
				<div className="rounded-full bg-success text-white w-fit p-1">
					<CheckIcon className="size-5" />
				</div>
			)}
		</span>
	);
};
